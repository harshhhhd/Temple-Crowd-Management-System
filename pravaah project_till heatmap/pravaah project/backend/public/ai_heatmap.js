// ==================== AUTH ====================
function checkAuth() {
    const session = sessionStorage.getItem('userSession');
    if (!session) { window.location.href = 'login.html'; return null; }
    const userData = JSON.parse(session);
    if (userData.role !== 'admin') { window.location.href = 'login.html'; return null; }
    return userData;
}

const userData = checkAuth();
if (userData) {
    const tn = document.getElementById('templeName');
    const tc = document.getElementById('templeCode');
    if (tn) tn.textContent = userData.templeName || 'Temple';
    if (tc) tc.textContent = userData.templeId?.toUpperCase() || 'TEMPLE';
}

const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        if (confirm('Logout?')) {
            sessionStorage.removeItem('userSession');
            window.location.href = 'login.html';
        }
    });
}

// ==================== SOCKET.IO ====================
// FIX: use same-origin connection (no hardcoded localhost:3000)
const socket = io();

const statusDot  = document.getElementById('statusDot');
const statusText = document.getElementById('statusText');

socket.on('connect',    () => { statusDot.classList.add('connected');    statusText.textContent = 'Connected';    });
socket.on('disconnect', () => { statusDot.classList.remove('connected'); statusText.textContent = 'Disconnected'; });

// ==================== HEATMAP SETUP ====================
/*
 * FIX SUMMARY
 * -----------
 * 1. The HTML now has a real <img id="templeMap"> instead of a CSS background.
 *    This lets us (a) listen for 'load' to know when dimensions are available,
 *    and (b) read naturalWidth/naturalHeight for accurate scaling.
 *
 * 2. heatmapInstance is created AFTER the image loads, inside initHeatmap().
 *    Previously it was created at the wrong time / referenced an undefined var.
 *
 * 3. updateHeatmap() scales points from map-image pixel space to display-pixel
 *    space using (displayW / naturalW) instead of a hardcoded 0.4 factor.
 *
 * 4. The server now sends map_width / map_height alongside every heatmap_update
 *    so the scaling is always consistent even if the image differs per temple.
 */

const heatmapContainer = document.getElementById('heatmapContainer');
const templeMapImg     = document.getElementById('templeMap');

let heatmapInstance = null;
// Natural image dimensions — filled once the image loads or from server data
let naturalMapW = 0;
let naturalMapH = 0;

function initHeatmap() {
    naturalMapW = templeMapImg.naturalWidth;
    naturalMapH = templeMapImg.naturalHeight;
    console.log('📐 Map natural size:', naturalMapW, 'x', naturalMapH);
    console.log('📐 Container display size:', heatmapContainer.offsetWidth, 'x', heatmapContainer.offsetHeight);

    heatmapInstance = h337.create({
        container: heatmapContainer,
        radius: 30,
        maxOpacity: 0.7,
        minOpacity: 0,
        blur: 0.9,
        gradient: {
            '0.0': 'blue',
            '0.2': 'cyan',
            '0.4': 'lime',
            '0.6': 'yellow',
            '0.8': 'orange',
            '1.0': 'red'
        }
    });
    console.log('✅ Heatmap initialized');
}

if (templeMapImg.complete && templeMapImg.naturalWidth > 0) {
    initHeatmap();
} else {
    templeMapImg.addEventListener('load', initHeatmap);
    templeMapImg.addEventListener('error', () => {
        console.error('❌ Cannot load temple map image');
        alert('Cannot load assets/temple_1.png — check the file path.');
    });
}

let isAnimationPaused = false;
let peakCount = 0;

// ==================== SOCKET EVENTS ====================
socket.on('initial_data', (data) => {
    if (data.crowdData) updateDashboard(data.crowdData);
    if (data.peakCount) {
        peakCount = data.peakCount;
        document.getElementById('peakCount').textContent = peakCount;
    }
});

socket.on('heatmap_update', (data) => {
    console.log('📊 heatmap_update — people:', data.totalCount, '| points:', data.points?.length);

    // If the server sends map dimensions, use them (most accurate)
    if (data.map_width)  naturalMapW = data.map_width;
    if (data.map_height) naturalMapH = data.map_height;

    updateDashboard(data);
});

// ==================== DASHBOARD ====================
function updateDashboard(data) {
    const count = data.totalCount ?? data.points?.length ?? 0;
    document.getElementById('totalCount').textContent = count;

    let density = 'Low';
    if (count > 50) density = 'High';
    else if (count > 20) density = 'Medium';
    document.getElementById('densityLevel').textContent = density;
    document.getElementById('lastUpdate').textContent = new Date().toLocaleTimeString();

    if (count > peakCount) {
        peakCount = count;
        document.getElementById('peakCount').textContent = peakCount;
    }

    if (data.zones) {
        document.getElementById('entranceCount').textContent = data.zones.entrance ?? 0;
        document.getElementById('sanctumCount').textContent  = data.zones.sanctum  ?? 0;
        document.getElementById('queueCount').textContent    = data.zones.queue    ?? 0;
        document.getElementById('exitCount').textContent     = data.zones.exit     ?? 0;
    }

    const waitEl = document.getElementById('waiting');
    if (waitEl) waitEl.textContent = ((data.waiting_time ?? 0).toFixed(1)) + ' mins';

    const alertEl = document.getElementById('alerts');
    if (alertEl) alertEl.textContent = (data.alerts ?? []).join('\n');

    if (!isAnimationPaused && data.points?.length > 0) {
        updateHeatmap(data.points);
    }
}

// ==================== HEATMAP UPDATE ====================
function updateHeatmap(points) {
    if (!heatmapInstance) {
        console.warn('⚠️ Heatmap not ready yet');
        return;
    }

    // Display size of the container div (what heatmap.js draws into)
    const displayW = heatmapContainer.offsetWidth;
    const displayH = heatmapContainer.offsetHeight;

    // Natural size of the map image (= coordinate space from Python)
    // Fall back to display size if not yet known (same scale → no transform needed)
    const srcW = naturalMapW || displayW;
    const srcH = naturalMapH || displayH;

    const scaleX = displayW / srcW;
    const scaleY = displayH / srcH;

    const scaledPoints = points.map(p => {
        const rawX = Array.isArray(p) ? p[0] : p.x;
        const rawY = Array.isArray(p) ? p[1] : p.y;
        const val  = Array.isArray(p) ? (p[2] ?? 1) : (p.value ?? 1);
        return {
            x: Math.max(0, Math.min(displayW, Math.round(rawX * scaleX))),
            y: Math.max(0, Math.min(displayH, Math.round(rawY * scaleY))),
            value: val
        };
    });

    if (scaledPoints[0]) console.log('📍 First scaled point:', scaledPoints[0]);

    heatmapInstance.setData({ max: 10, data: scaledPoints });
}

// ==================== CONTROLS ====================
document.getElementById('resetHeatmap').addEventListener('click', () => {
    if (heatmapInstance) heatmapInstance.setData({ max: 10, data: [] });
});

document.getElementById('toggleAnimation').addEventListener('click', function() {
    isAnimationPaused = !isAnimationPaused;
    this.innerHTML = isAnimationPaused ? '▶ Resume' : '⏸ Pause';
});
