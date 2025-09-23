// 主入口文件
import initCalculator from './modules/calculator.js';
import initTodoList from './modules/todo.js';
import initWeather from './modules/weather.js';
import initColorPicker from './modules/color-picker.js';
import initCounter from './modules/counter.js';

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化各个功能模块
    initCalculator();
    initTodoList();
    initWeather();
    initColorPicker();
    initCounter();
    
    // 实现平滑滚动
    initSmoothScroll();
});

// 平滑滚动功能
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // 减去导航栏高度
                    behavior: 'smooth'
                });
            }
        });
    });
}