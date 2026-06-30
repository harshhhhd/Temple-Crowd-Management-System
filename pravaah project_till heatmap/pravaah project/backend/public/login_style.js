// Admin Credentials Database
const adminCredentials = {
    somnath: {
        username: 'admin_somnath',
        password: 'somnath123',
        templeName: 'Somnath Temple'
    },
    dwarka: {
        username: 'admin_kedarnath',
        password: 'kedarnath123',
        templeName: 'Kedarnath Temple'
    },
    ambaji: {
        username: 'admin_golden',
        password: 'golden123',
        templeName: 'Golden Temple'
    },
    pavagadh: {
        username: 'admin_jama',
        password: 'jama123',
        templeName: 'Jama Masjid'
    }
};

// Page Elements
const landingPage = document.getElementById('landingPage');
const adminLoginPage = document.getElementById('adminLoginPage');
const userLoginPage = document.getElementById('userLoginPage');
const notification = document.getElementById('notification');
const notificationText = document.getElementById('notificationText');

// Navigation Buttons
const adminCard = document.getElementById('adminCard');
const userCard = document.getElementById('userCard');
const backFromAdmin = document.getElementById('backFromAdmin');
const backFromUser = document.getElementById('backFromUser');

// Forms
const adminLoginForm = document.getElementById('adminLoginForm');
const userLoginForm = document.getElementById('userLoginForm');

// Form Inputs
const adminTempleId = document.getElementById('adminTempleId');
const adminUsername = document.getElementById('adminUsername');
const adminPassword = document.getElementById('adminPassword');
const userPhone = document.getElementById('userPhone');
const userOtp = document.getElementById('userOtp');
const sendOtpBtn = document.getElementById('sendOtpBtn');
const otpTimer = document.getElementById('otpTimer');
const timerCount = document.getElementById('timerCount');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    checkAutoLogin();
});

// Event Listeners
function initializeEventListeners() {
    // Selection cards
    const selectButtons = document.querySelectorAll('.btn-select');
    selectButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const role = this.getAttribute('data-role');
            navigateToLogin(role);
        });
    });

    // Back buttons
    backFromAdmin.addEventListener('click', () => navigateToLanding());
    backFromUser.addEventListener('click', () => navigateToLanding());

    // Password toggle
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {const targetId = this.getAttribute('data-target');
        const input = document.getElementById(targetId);
        const icon = this.querySelector('i');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });
});

// Admin Login Form
adminLoginForm.addEventListener('submit', handleAdminLogin);

// User Login Form
userLoginForm.addEventListener('submit', handleUserLogin);

// Send OTP
sendOtpBtn.addEventListener('click', handleSendOtp);

// Phone number validation
userPhone.addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9]/g, '');
});

// OTP validation
userOtp.addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9]/g, '');
});
}
// Navigation Functions
function navigateToLogin(role) {
landingPage.classList.add('hidden');
if (role === 'admin') {
    adminLoginPage.classList.remove('hidden');
} else {
    userLoginPage.classList.remove('hidden');
}
}
function navigateToLanding() {
adminLoginPage.classList.add('hidden');
userLoginPage.classList.add('hidden');
landingPage.classList.remove('hidden');
// Reset forms
adminLoginForm.reset();
userLoginForm.reset();
}
// Admin Login Handler
function handleAdminLogin(e) {
e.preventDefault();
const templeId = adminTempleId.value;
const username = adminUsername.value.trim();
const password = adminPassword.value;
const rememberMe = document.getElementById('rememberMe').checked;

// Validate inputs
if (!templeId) {
    showNotification('Please select a temple', 'error');
    return;
}

if (!username || !password) {
    showNotification('Please enter username and password', 'error');
    return;
}

// Verify credentials
const temple = adminCredentials[templeId];

if (temple && temple.username === username && temple.password === password) {
    // Successful login
    const loginData = {
        role: 'admin',
        templeId: templeId,
        templeName: temple.templeName,
        username: username,
        loginTime: new Date().toISOString()
    };
    
    // Store login data
    sessionStorage.setItem('userSession', JSON.stringify(loginData));
    
    if (rememberMe) {
        localStorage.setItem('rememberedUser', JSON.stringify({
            role: 'admin',
            templeId: templeId,
            username: username
        }));
    }
    
    showNotification(`Welcome to ${temple.templeName} Dashboard!`, 'success');
    
    // Redirect to dashboard after 1.5 seconds
    setTimeout(() => {
        window.location.href = 'admin_dashboard.html';
    }, 1500);
    
} else {
    showNotification('Invalid credentials. Please check and try again.', 'error');
    adminPassword.value = '';
}
}
// User Login Handler
function handleUserLogin(e) {
e.preventDefault();
const phone = userPhone.value.trim();
const otp = userOtp.value.trim();

// Validate inputs
if (phone.length !== 10) {
    showNotification('Please enter a valid 10-digit mobile number', 'error');
    return;
}

if (otp.length !== 6) {
    showNotification('Please enter a valid 6-digit OTP', 'error');
    return;
}

// Verify OTP (in real app, this would be backend verification)
const storedOtp = sessionStorage.getItem('sentOtp');
const otpPhone = sessionStorage.getItem('otpPhone');

if (storedOtp === otp && otpPhone === phone) {
    // Successful login
    const loginData = {
        role: 'user',
        phone: phone,
        loginTime: new Date().toISOString()
    };
    
    sessionStorage.setItem('userSession', JSON.stringify(loginData));
    
    showNotification('Login successful! Welcome to the Pilgrim Portal', 'success');
    
    // Redirect to user app after 1.5 seconds
    setTimeout(() => {
        window.location.href = 'user-app.html';
    }, 1500);
    
} else {
    showNotification('Invalid OTP. Please try again.', 'error');
    userOtp.value = '';
}
}
// Send OTP Handler
function handleSendOtp() {
const phone = userPhone.value.trim();
if (phone.length !== 10) {
    showNotification('Please enter a valid 10-digit mobile number', 'error');
    return;
}

// Generate random 6-digit OTP
const otp = Math.floor(100000 + Math.random() * 900000).toString();

// Store OTP in session (in real app, this would be sent via SMS)
sessionStorage.setItem('sentOtp', otp);
sessionStorage.setItem('otpPhone', phone);

// Show OTP in console for testing
console.log('OTP sent to', phone, ':', otp);

showNotification(`OTP sent to ${phone}. Check console for demo OTP: ${otp}`, 'success');

// Disable button and start timer
sendOtpBtn.disabled = true;
sendOtpBtn.textContent = 'OTP Sent';
otpTimer.classList.remove('hidden');

let timeLeft = 60;
timerCount.textContent = timeLeft;

const countdown = setInterval(() => {
    timeLeft--;
    timerCount.textContent = timeLeft;
    
    if (timeLeft <= 0) {
        clearInterval(countdown);
        sendOtpBtn.disabled = false;
        sendOtpBtn.textContent = 'Resend OTP';
        otpTimer.classList.add('hidden');
    }
}, 1000);
}
// Auto Login Check
function checkAutoLogin() {
const rememberedUser = localStorage.getItem('rememberedUser');
if (rememberedUser) {
    const userData = JSON.parse(rememberedUser);
    
    if (userData.role === 'admin') {
        adminTempleId.value = userData.templeId;
        adminUsername.value = userData.username;
        document.getElementById('rememberMe').checked = true;
    }
}
}
// Notification Function
function showNotification(message, type = 'success') {
    notificationText.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.remove('hidden');
    
    // Auto hide after 4 seconds
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 4000);
}
// Session Check Function (to be used on dashboard page)
function checkSession() {
const session = sessionStorage.getItem('userSession');
if (!session) {
    window.location.href = 'ai_heatmap.html';
    return null;
}

return JSON.parse(session);
}
// Logout Function
function logout() {
sessionStorage.removeItem('userSession');
sessionStorage.removeItem('sentOtp');
sessionStorage.removeItem('otpPhone');
window.location.href = 'ai_heatmap.html';
}