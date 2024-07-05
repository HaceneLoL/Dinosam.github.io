// script.js
const socket = new WebSocket('ws://localhost:8080'); // استبدل بعنوان الخادم الخاص بك

// قائمة الكلمات الممنوعة
const forbiddenWords = ['سيئة', 'سيئ', 'مسيئة', 'سخيفة', 'سخيف'];

// دالة للتحقق من وجود كلمة ممنوعة
function hasForbiddenWord(message) {
    for (let word of forbiddenWords) {
        if (message.includes(word)) {
            return true;
        }
    }
    return false;
}

socket.onmessage = (event) => {
    const message = event.data;
    displayMessage(message, 'received');
};

function sendMessage() {
    const input = document.getElementById('message-input');
    let message = input.value.trim();
    
    if (message) {
        // التحقق من وجود كلمة ممنوعة
        if (hasForbiddenWord(message)) {
            displayMessage('الرسالة تحتوي على كلمات ممنوعة', 'sent-error');
            input.value = '';
            return;
        }
        
        // إرسال الرسالة إذا لم تحتوي على كلمات ممنوعة
        socket.send(message);
        displayMessage(message, 'sent');
        input.value = '';
    }
}

// دالة عرض الرسائل مع التأكيد على نوع الرسالة (خطأ أو غيرها)
function displayMessage(message, type) {
    const chatMessages = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.textContent = message;
    messageElement.appendChild(messageContent);
    chatMessages.appendChild(messageElement);
}

// تعديل toggleTheme لتبديل بين الأوضاع الليلية والنهارية مع animation للشمس والقمر
function toggleTheme() {
    const body = document.body;
    const sunMoonToggle = document.getElementById('sun-moon-toggle');
    
    // تحديد الصور حسب الوضع الحالي
    const sunImage = 'Images/sun.png'; // صورة الشمس
    const moonImage = 'Images/moon.png'; // صورة القمر

    // التأكد من الوضع الحالي وتبديل الصورة
    if (body.classList.contains('light-mode')) {
        sunMoonToggle.src = moonImage; // عند الوضع الليلي، تعرض صورة القمر
    } else {
        sunMoonToggle.src = sunImage; // عند الوضع النهاري، تعرض صورة الشمس
    }

    // تشغيل الـ animation للشمس والقمر
    sunMoonToggle.style.animation = 'sunMoonAnimation 1s forwards';

    // تغيير النمط بعد انتهاء الـ animation
    setTimeout(() => {
        body.classList.toggle('dark-mode');
        body.classList.toggle('light-mode');
        sunMoonToggle.style.animation = ''; // إعادة تعيين الـ animation
    }, 1000); // انتظر 1 ثانية (1000 ميلي ثانية) قبل تغيير النمط
}