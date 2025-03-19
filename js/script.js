let is24HourMode = true; // 默认为24小时制

function updateDateTime() {
    const now = new Date();
    const hours = is24HourMode ? now.getHours().toString().padStart(2, '0') : now.getHours() % 12 || 12;
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const date = new Intl.DateTimeFormat('zh-CN', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    }).format(now);
    const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const day = days[now.getDay()];

    document.getElementById('flip-date').textContent = date;
    document.getElementById('flip-day').textContent = day;

    updateFlipNumber('flip-hours', hours);
    updateFlipNumber('flip-minutes', minutes);
    updateFlipNumber('flip-seconds', seconds);
}

function updateFlipNumber(elementId, value) {
    const flipNumber = document.getElementById(elementId);
    flipNumber.innerHTML = `
        <div class="flip-number">
            <div class="front">${value}</div>
            <div class="back">${value}</div>
        </div>
    `;
    setTimeout(() => {
        flipNumber.classList.add('active');
    }, 100);
}

function toggleMode() {
    is24HourMode = !is24HourMode;
    updateDateTime();
}

document.getElementById('fullscreen-btn').addEventListener('click', () => {
    document.documentElement.requestFullscreen();
});

document.getElementById('close-btn').addEventListener('click', () => {
    window.close();
});

document.getElementById('toggle-mode-btn').addEventListener('click', toggleMode);

setInterval(updateDateTime, 1000); // 每秒更新时间
updateDateTime(); // 初始化显示