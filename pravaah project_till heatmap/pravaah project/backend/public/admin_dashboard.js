/* const templeData = {
    somnath: {
        name: 'Somnath Temple',
        code: 'SNT-001',
        location: 'Veraval, Gujarat',
        visitors: {
            current: 12458,
            avg: 11000,
            peak: 25000
        },
        cameras: [
            { id: 1, name: 'Main Entrance', location: 'Gate 1' },
            { id: 2, name: 'Queue Area 1', location: 'North Wing' },
            { id: 3, name: 'Main Sanctum', location: 'Central Hall' },
            { id: 4, name: 'Parking Lot A', location: 'East Parking' },
            { id: 5, name: 'Exit Gate', location: 'Gate 3' },
            { id: 6, name: 'Prasad Counter', location: 'South Wing' }
        ],
        zones: [
            { name: 'Main Entrance', x: 50, y: 50, width: 150, height: 100, density: 85 },
            { name: 'Queue Area 1', x: 220, y: 50, width: 120, height: 100, density: 72 },
            { name: 'Queue Area 2', x: 360, y: 50, width: 120, height: 100, density: 68 },
            { name: 'Main Sanctum', x: 200, y: 180, width: 180, height: 150, density: 92 },
            { name: 'Prasad Counter', x: 50, y: 180, width: 130, height: 80, density: 45 },
            { name: 'Exit Gate', x: 400, y: 180, width: 150, height: 150, density: 38 }
        ],
        queues: [
            { name: 'Entry Gate 1', status: 'open', current: 245, capacity: 300, waitTime: 45 },
            { name: 'Entry Gate 2', status: 'open', current: 287, capacity: 300, waitTime: 55 },
            { name: 'VIP Entry', status: 'open', current: 12, capacity: 50, waitTime: 5 },
            { name: 'Senior Citizen Entry', status: 'open', current: 34, capacity: 100, waitTime: 15 }
        ],
        parking: [
            { name: 'Parking Lot A', total: 500, occupied: 425 },
            { name: 'Parking Lot B', total: 300, occupied: 287 },
            { name: 'VIP Parking', total: 50, occupied: 32 }
        ],
        roads: [
            { name: 'Main Access Road', open: true },
            { name: 'North Entry Road', open: true },
            { name: 'South Entry Road', open: false },
            { name: 'Emergency Route', open: true }
        ]
    },
    dwarka: {
        name: 'Dwarka Temple',
        code: 'DWK-002',
        location: 'Dwarka, Gujarat',
        visitors: {
            current: 15230,
            avg: 13500,
            peak: 30000
        },
        cameras: [
            { id: 1, name: 'Main Gate', location: 'Entrance' },
            { id: 2, name: 'Darshan Hall', location: 'Main Hall' },
            { id: 3, name: 'Queue Zone', location: 'East Side' },
            { id: 4, name: 'Parking Area', location: 'West Lot' },
            { id: 5, name: 'Exit Point', location: 'South Gate' },
            { id: 6, name: 'Donation Counter', location: 'North Wing' }
        ],
        zones: [
            { name: 'Main Gate', x: 60, y: 40, width: 140, height: 110, density: 78 },
            { name: 'Darshan Hall', x: 220, y: 40, width: 160, height: 110, density: 88 },
            { name: 'Queue Zone', x: 400, y: 40, width: 120, height: 110, density: 65 },
            { name: 'Prayer Area', x: 180, y: 170, width: 200, height: 140, density: 82 },
            { name: 'Donation Counter', x: 50, y: 170, width: 120, height: 90, density: 42 },
            { name: 'Exit Point', x: 390, y: 170, width: 140, height: 140, density: 35 }
        ],
        queues: [
            { name: 'Main Entrance', status: 'open', current: 312, capacity: 400, waitTime: 50 },
            { name: 'Special Darshan', status: 'open', current: 98, capacity: 150, waitTime: 20 },
            { name: 'VIP Gate', status: 'open', current: 15, capacity: 50, waitTime: 8 },
            { name: 'Senior Entry', status: 'open', current: 42, capacity: 100, waitTime: 18 }
        ],
        parking: [
            { name: 'Main Parking', total: 600, occupied: 520 },
            { name: 'Bus Parking', total: 100, occupied: 78 },
            { name: 'VIP Parking', total: 80, occupied: 45 }
        ],
        roads: [
            { name: 'Temple Road', open: true },
            { name: 'Beach Road', open: true },
            { name: 'Market Road', open: false },
            { name: 'Service Road', open: true }
        ]
    },
    ambaji: {
        name: 'Ambaji Temple',
        code: 'AMB-003',
        location: 'Banaskantha, Gujarat',
        visitors: {
            current: 9845,
            avg: 9000,
            peak: 20000
        },
        cameras: [
            { id: 1, name: 'Temple Entrance', location: 'Main Door' },
            { id: 2, name: 'Inner Sanctum', location: 'Center' },
            { id: 3, name: 'North Queue', location: 'North Side' },
            { id: 4, name: 'Parking Zone', location: 'East Area' },
            { id: 5, name: 'Exit Area', location: 'West Gate' },
            { id: 6, name: 'Prasad Hall', location: 'South Wing' }
        ],
        zones: [
            { name: 'Temple Entrance', x: 70, y: 60, width: 130, height: 100, density: 72 },
            { name: 'North Queue', x: 220, y: 60, width: 140, height: 100, density: 68 },
            { name: 'Inner Sanctum', x: 380, y: 60, width: 140, height: 100, density: 85 },
            { name: 'Darshan Path', x: 200, y: 180, width: 180, height: 130, density: 75 },
            { name: 'Prasad Hall', x: 60, y: 180, width: 130, height: 80, density: 38 },
            { name: 'Exit Area', x: 390, y: 180, width: 140, height: 130, density: 32 }
        ],
        queues: [
            { name: 'North Entrance', status: 'open', current: 198, capacity: 250, waitTime: 38 },
            { name: 'South Entrance', status: 'open', current: 224, capacity: 250, waitTime: 42 },
            { name: 'Express Entry', status: 'open', current: 65, capacity: 100, waitTime: 15 },
            { name: 'Elderly Gate', status: 'open', current: 28, capacity: 80, waitTime: 12 }
        ],
        parking: [
            { name: 'North Parking', total: 400, occupied: 312 },
            { name: 'South Parking', total: 350, occupied: 268 },
            { name: 'Reserved Parking', total: 60, occupied: 38 }
        ],
        roads: [
            { name: 'Hill Road', open: true },
            { name: 'Bypass Road', open: true },
            { name: 'Old Route', open: false },
            { name: 'Emergency Access', open: true }
        ]
    },
    pavagadh: {
        name: 'Pavagadh Temple',
        code: 'PVG-004',
        location: 'Panchmahal, Gujarat',
        visitors: {
            current: 8234,
            avg: 7500,
            peak: 18000
        },
        cameras: [
            { id: 1, name: 'Ropeway Station', location: 'Base' },
            { id: 2, name: 'Hill Top Entry', location: 'Summit' },
            { id: 3, name: 'Main Temple', location: 'Central' },
            { id: 4, name: 'Stairs Path', location: 'Trekking Route' },
            { id: 5, name: 'Lower Parking', location: 'Base Area' },
            { id: 6, name: 'Temple Exit', location: 'South' }
        ],
        zones: [
            { name: 'Ropeway Station', x: 50, y: 50, width: 150, height: 90, density: 65 },
            { name: 'Stairs Entry', x: 220, y: 50, width: 130, height: 90, density: 58 },
            { name: 'Main Temple', x: 370, y: 50, width: 150, height: 90, density: 88 },
            { name: 'Prayer Zone', x: 190, y: 160, width: 190, height: 140, density: 78 },
            { name: 'Cafeteria', x: 50, y: 160, width: 130, height: 90, density: 42 },
            { name: 'Temple Exit', x: 390, y: 160, width: 140, height: 140, density: 35 }
        ],
        queues: [
            { name: 'Ropeway Queue', status: 'open', current: 156, capacity: 200, waitTime: 35 },
            { name: 'Temple Entry', status: 'open', current: 189, capacity: 220, waitTime: 40 },
            { name: 'Stairs Route', status: 'open', current: 45, capacity: 100, waitTime: 25 },
            { name: 'Express Pass', status: 'open', current: 18, capacity: 50, waitTime: 10 }
        ],
        parking: [
            { name: 'Lower Base Parking', total: 450, occupied: 368 },
            { name: 'Upper Parking', total: 200, occupied: 145 },
            { name: 'Bus Stand', total: 80, occupied: 52 }
        ],
        roads: [
            { name: 'Main Hill Road', open: true },
            { name: 'Service Road', open: true },
            { name: 'Trek Path', open: true },
            { name: 'Alternative Route', open: false }
        ]
    }
};
*/

// Global Variables
let currentTemple = null;
let currentUser = null;
let predictionChart, visitorTrendChart;
let updateInterval;

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', function() {
    checkAuthentication();
    initializeNavigation();
    initializeDateTime();
    initializeCharts();
    initializeAllSections();
    
    // Start real-time updates
    updateInterval = setInterval(updateRealTimeData, 5000);
});

// Check Authentication
function checkAuthentication() {
    const session = sessionStorage.getItem('userSession');
    
    if (!session) {
window.location.href = 'ai_heatmap.html';
    return;
}

const userData = JSON.parse(session);

if (userData.role !== 'admin') {
    window.location.href = 'ai_heatmap.html';
    return;
}

currentUser = userData;
currentTemple = templeData[userData.templeId];

if (!currentTemple) {
    alert('Invalid temple configuration');
    logout();
    return;
}

// Update UI with temple info
updateTempleInfo();
}
// Update Temple Information in UI
function updateTempleInfo() {
document.getElementById('templeNameSidebar').textContent = currentTemple.name;
document.getElementById('templeCode').textContent = currentTemple.code;
document.getElementById('templeLocation').textContent = currentTemple.location;
document.getElementById('adminName').textContent = currentUser.username;
document.title = `${currentTemple.name} - Admin Dashboard`;
// Update stats
updateStats();
}
// Navigation
function initializeNavigation() {
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.content-section');
const pageTitle = document.getElementById('pageTitle');
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.querySelector('.sidebar');
const logoutBtn = document.getElementById('logoutBtn');
navItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        
        navItems.forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
        
        sections.forEach(section => section.classList.remove('active'));
        
        const sectionId = this.getAttribute('data-section');
        document.getElementById(sectionId).classList.add('active');
        
        pageTitle.textContent = this.querySelector('span').textContent;
        
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('open');
        }
    });
});

if (menuToggle) {
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('open');
    });
}

logoutBtn.addEventListener('click', logout);
}
// Logout Function
function logout() {
if (confirm('Are you sure you want to logout?')) {
sessionStorage.removeItem('userSession');
clearInterval(updateInterval);
window.location.href = 'ai_heatmap.html';
}
}
// Date Time Widget
function initializeDateTime() {
function updateDateTime() {
const now = new Date();
const dateEl = document.getElementById('currentDate');
const timeEl = document.getElementById('currentTime');
    const dateOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    dateEl.textContent = now.toLocaleDateString('en-US', dateOptions);
    
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    timeEl.textContent = now.toLocaleTimeString('en-US', timeOptions);
}

updateDateTime();
setInterval(updateDateTime, 1000);
}
// Update Stats
function updateStats() {
const visitors = currentTemple.visitors;
const randomVar = () => Math.floor(Math.random() * 200) - 100;
const currentVisitors = visitors.current + randomVar();
const capacity = Math.min(100, Math.floor((currentVisitors / visitors.peak) * 100));
const avgWait = Math.floor(30 + (capacity * 0.5));
const alerts = capacity > 80 ? Math.floor(Math.random() * 5) + 2 : Math.floor(Math.random() * 3);

document.getElementById('currentVisitors').textContent = currentVisitors.toLocaleString();
document.getElementById('avgWaitTime').textContent = avgWait + ' min';
document.getElementById('capacity').textContent = capacity + '%';
document.getElementById('alerts').textContent = alerts;

// Update changes
const visitorChange = ((currentVisitors - visitors.avg) / visitors.avg * 100).toFixed(1);
const visitorChangeEl = document.getElementById('visitorChange');
visitorChangeEl.textContent = (visitorChange > 0 ? '+' : '') + visitorChange + '% from average';
visitorChangeEl.className = 'stat-change ' + (visitorChange > 0 ? 'positive' : visitorChange < 0 ? 'negative' : 'neutral');

const capacityStatus = document.getElementById('capacityStatus');
if (capacity < 50) {
    capacityStatus.textContent = 'Normal';
    capacityStatus.className = 'stat-change neutral';
} else if (capacity < 80) {
    capacityStatus.textContent = 'Moderate';
    capacityStatus.className = 'stat-change positive';
} else {
    capacityStatus.textContent = 'High';
    capacityStatus.className = 'stat-change negative';
}

const waitChange = document.getElementById('waitChange');
waitChange.textContent = avgWait > 45 ? 'Above Average' : 'Normal';
waitChange.className = 'stat-change ' + (avgWait > 45 ? 'negative' : 'neutral');

const alertStatus = document.getElementById('alertStatus');
alertStatus.textContent = alerts === 0 ? 'All Clear' : 'Requires Attention';
alertStatus.className = 'stat-change ' + (alerts > 0 ? 'negative' : 'positive');
}
// Initialize All Sections
function initializeAllSections() {
initializeAlerts();
initializeCameraFeeds();
initializeHeatmap();
initializeQueue();
initializeResources();
initializeTraffic();
initializeEmergency();
initializeFestivalCalendar();
initializeBookings();
}

alertList.innerHTML = '';
alerts.forEach(alert => {
    const alertItem = document.createElement('div');
    alertItem.className = `alert-item ${alert.type}`;
    alertItem.innerHTML = `
        <div class="alert-header">
            <span class="alert-title">${alert.title}</span>
            <span class="alert-time">${alert.time}</span>
        </div>
        <div class="alert-message">${alert.message}</div>
    `;
    alertList.appendChild(alertItem);
});

const clearBtn = document.getElementById('clearAlertsBtn');
if (clearBtn) {
    clearBtn.addEventListener('click', () => {
        alertList.innerHTML = '<div style="text-align:center; color: #94a3b8; padding: 20px;">No active alerts</div>';
    });
}

// Initialize Camera Feeds
function initializeCameraFeeds() {
const cameraGrid = document.getElementById('cameraGrid');
if (!cameraGrid) return;
cameraGrid.innerHTML = '';
currentTemple.cameras.forEach(camera => {
    const feed = document.createElement('div');
    feed.className = 'camera-feed';
    feed.innerHTML = `
        <img src="https://picsum.photos/400/225?random=${camera.id}" alt="${camera.name}">
        <div class="camera-label">
            <i class="fas fa-video"></i> ${camera.name} - ${camera.location}
        </div>
        <div class="camera-status"></div>
    `;
    cameraGrid.appendChild(feed);
});
}
// Initialize Heatmap
function initializeHeatmap() {
const canvas = document.getElementById('heatmapCanvas');
if (!canvas) return;
const ctx = canvas.getContext('2d');
canvas.width = canvas.offsetWidth;
canvas.height = 500;

const zones = currentTemple.zones;

ctx.clearRect(0, 0, canvas.width, canvas.height);

zones.forEach(zone => {
    let color;
    if (zone.density < 30) color = '#22c55e';
    else if (zone.density < 70) color = '#eab308';
    else color = '#ef4444';
    
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.6;
    ctx.fillRect(zone.x, zone.y, zone.width, zone.height);
    
    ctx.globalAlpha = 1;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeRect(zone.x, zone.y, zone.width, zone.height);
    
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px Arial';
    ctx.fillText(zone.name, zone.x + 10, zone.y + 20);
    ctx.font = 'bold 18px Arial';
    ctx.fillText(zone.density + '%', zone.x + 10, zone.y + 50);
});

updateZoneStats(zones);

const refreshBtn = document.getElementById('refreshHeatmap');
if (refreshBtn) {
    refreshBtn.addEventListener('click', function() {
        this.innerHTML = '<i class="fas fa-sync-alt fa-spin"></i> Refreshing...';
        setTimeout(() => {
            initializeHeatmap();
            this.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh';
        }, 1000);
    });
}
}
function updateZoneStats(zones) {
const zoneStats = document.getElementById('zoneStats');
if (!zoneStats) return;
zoneStats.innerHTML = '';
zones.forEach(zone => {
    const card = document.createElement('div');
    const level = zone.density < 30 ? 'low' : zone.density < 70 ? 'medium' : 'high';
    card.className = `zone-card ${level}`;
    card.innerHTML = `
        <div class="zone-name">${zone.name}</div>
        <div class="zone-occupancy">${zone.density}%</div>
        <div class="zone-count">${Math.floor(zone.density * 15)} people</div>
    `;
    zoneStats.appendChild(card);
});
}


// Initialize Traffic
function initializeTraffic() {
const parkingStatus = document.getElementById('parkingStatus');
const roadStatus = document.getElementById('roadStatus');
if (parkingStatus) {
    parkingStatus.innerHTML = '';
    currentTemple.parking.forEach(lot => {
        const available = lot.total - lot.occupied;
        const percentage = (lot.occupied / lot.total) * 100;
        const div = document.createElement('div');
        div.className = 'parking-lot';
        div.innerHTML = `
            <div class="parking-header">
                <div class="parking-name">${lot.name}</div>
                <div class="parking-availability">${available} spots available</div>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${percentage}%"></div>
            </div>
        `;
        parkingStatus.appendChild(div);
    });
}

if (roadStatus) {
    roadStatus.innerHTML = '';
    currentTemple.roads.forEach(road => {
        const div = document.createElement('div');
        div.className = 'road-item';
        div.innerHTML = `
            <div class="road-name">${road.name}</div>
            <div class="toggle-switch ${road.open ? 'active' : ''}" data-road="${road.name}">
                <div class="toggle-slider"></div>
            </div>
        `;
        roadStatus.appendChild(div);
        
        const toggle = div.querySelector('.toggle-switch');
        toggle.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });
}
}
// Initialize Emergency
function initializeEmergency() {
const emergencyGrid = document.getElementById('emergencyGrid');
if (!emergencyGrid) return;
const emergencies = [
    { type: 'Medical Emergency', location: 'Queue Area 2, Gate B', time: '5 min ago', status: 'Responding' },
    { type: 'Lost Child', location: 'Main Sanctum', time: '12 min ago', status: 'Resolved' }
];

emergencyGrid.innerHTML = '';
emergencies.forEach(emergency => {
    const item = document.createElement('div');
    item.className = 'emergency-item';
    item.innerHTML = `
        <div class="emergency-header">
            <div class="emergency-type">${emergency.type}</div>
            <div class="emergency-time">${emergency.time}</div>
        </div>
        <div class="emergency-location">
            <i class="fas fa-map-marker-alt"></i> ${emergency.location}
        </div>
        <div class="emergency-actions">
            <button class="btn-control">View Details</button>
            ${emergency.status === 'Responding' ? '<button class="btn-primary">Mark Resolved</button>' : ''}
        </div>
    `;
    emergencyGrid.appendChild(item);
});

const panicBtn = document.getElementById('panicAlertBtn');
if (panicBtn) {
    panicBtn.addEventListener('click', function() {
        if (confirm('⚠️ CRITICAL ACTION\n\nAre you sure you want to trigger a PANIC ALERT?\n\nThis will:\n- Notify all emergency services\n- Alert police and ambulance\n- Send mass notification to all staff\n- Activate emergency protocols')) {
            alert('🚨 PANIC ALERT ACTIVATED\n\nAll emergency services have been notified!\nEmergency protocols are now active.');
        }
    });
}
}
// Initialize Festival Calendar
function initializeFestivalCalendar() {
const calendar = document.getElementById('festivalCalendar');
if (!calendar) return;
const festivals = [
    { date: 'Jan 26, 2026', name: 'Republic Day', crowd: 'Expected: 25,000+' },
    { date: 'Feb 14, 2026', name: 'Maha Shivaratri', crowd: 'Expected: 45,000+' },
    { date: 'Mar 25, 2026', name: 'Holi', crowd: 'Expected: 30,000+' },
    { date: 'Apr 10, 2026', name: 'Ram Navami', crowd: 'Expected: 35,000+' }
];

calendar.innerHTML = '';
festivals.forEach(festival => {
    const item = document.createElement('div');
    item.className = 'festival-item';
    item.innerHTML = `
        <div class="festival-date">${festival.date}</div>
        <div class="festival-name">${festival.name}</div>
        <div class="festival-crowd">${festival.crowd}</div>
    `;
    calendar.appendChild(item);
});
}

// Real-time Data Updates
function updateRealTimeData() {
updateStats();
// Update weather randomly
const weatherInfo = document.getElementById('weatherInfo');
if (weatherInfo) {
    const temps = [26, 27, 28, 29, 30];
    const temp = temps[Math.floor(Math.random() * temps.length)];
    weatherInfo.textContent = `${temp}°C`;
}
}

// AI Heatmap Link Handler
const aiHeatmapLink = document.getElementById('aiHeatmapLink');
if (aiHeatmapLink) {
    aiHeatmapLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'ai-heatmap.html';
    });
}
