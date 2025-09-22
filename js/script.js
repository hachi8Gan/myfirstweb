// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 实现计算器功能
    initCalculator();
    
    // 实现待办事项功能
    initTodoList();
    
    // 实现天气查询功能
    initWeather();
    
    // 实现颜色选择器功能
    initColorPicker();
    
    // 实现计数器功能
    initCounter();
    
    // 实现平滑滚动
    initSmoothScroll();
});

// 计算器功能
function initCalculator() {
    const display = document.getElementById('calc-display');
    const buttons = document.querySelectorAll('.calc-buttons button');
    let currentValue = '';
    let previousValue = '';
    let operator = null;
    let resetScreen = false;
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('btn') && !button.classList.contains('operator') && 
                !button.classList.contains('equals') && !button.classList.contains('clear') && 
                !button.classList.contains('decimal')) {
                // 数字按钮
                if (display.value === '0' || resetScreen) {
                    display.value = button.textContent;
                    resetScreen = false;
                } else {
                    display.value += button.textContent;
                }
            } else if (button.classList.contains('operator')) {
                // 运算符按钮
                if (operator !== null) {
                    // 计算之前的运算
                    calculate();
                }
                previousValue = display.value;
                operator = button.textContent;
                resetScreen = true;
            } else if (button.classList.contains('equals')) {
                // 等号按钮
                if (operator !== null) {
                    calculate();
                    operator = null;
                }
            } else if (button.classList.contains('clear')) {
                // 清除按钮
                display.value = '0';
                currentValue = '';
                previousValue = '';
                operator = null;
            } else if (button.classList.contains('decimal')) {
                // 小数点按钮
                if (resetScreen) {
                    display.value = '0.';
                    resetScreen = false;
                } else if (!display.value.includes('.')) {
                    display.value += '.';
                }
            }
        });
    });
    
    function calculate() {
        currentValue = display.value;
        let result;
        
        switch(operator) {
            case '+':
                result = parseFloat(previousValue) + parseFloat(currentValue);
                break;
            case '-':
                result = parseFloat(previousValue) - parseFloat(currentValue);
                break;
            case '*':
                result = parseFloat(previousValue) * parseFloat(currentValue);
                break;
            case '/':
                result = parseFloat(previousValue) / parseFloat(currentValue);
                break;
        }
        
        display.value = result;
        previousValue = result;
        resetScreen = true;
    }
}

// 待办事项功能
function initTodoList() {
    const input = document.getElementById('todo-input');
    const addButton = document.getElementById('add-todo');
    const todoList = document.getElementById('todo-list');
    
    // 从本地存储加载待办事项
    loadTodos();
    
    addButton.addEventListener('click', addTodo);
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
    
    function addTodo() {
        const todoText = input.value.trim();
        if (todoText !== '') {
            const li = document.createElement('li');
            li.textContent = todoText;
            
            const deleteButton = document.createElement('button');
            deleteButton.textContent = '删除';
            deleteButton.addEventListener('click', function() {
                todoList.removeChild(li);
                saveTodos();
            });
            
            li.appendChild(deleteButton);
            todoList.appendChild(li);
            input.value = '';
            
            // 保存到本地存储
            saveTodos();
        }
    }
    
    function saveTodos() {
        const todos = [];
        document.querySelectorAll('#todo-list li').forEach(li => {
            // 获取待办事项文本（不包括删除按钮的文本）
            const todoText = li.firstChild.textContent;
            todos.push(todoText);
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    
    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(todoText => {
            const li = document.createElement('li');
            li.textContent = todoText;
            
            const deleteButton = document.createElement('button');
            deleteButton.textContent = '删除';
            deleteButton.addEventListener('click', function() {
                todoList.removeChild(li);
                saveTodos();
            });
            
            li.appendChild(deleteButton);
            todoList.appendChild(li);
        });
    }
}

// 天气查询功能（模拟）
function initWeather() {
    const cityInput = document.getElementById('city-input');
    const searchButton = document.getElementById('search-weather');
    const weatherResult = document.getElementById('weather-result');
    
    // 模拟天气数据
    const mockWeatherData = {
        '北京': { temp: '15°C', condition: '晴朗', humidity: '45%', wind: '3级' },
        '上海': { temp: '20°C', condition: '多云', humidity: '60%', wind: '2级' },
        '广州': { temp: '28°C', condition: '小雨', humidity: '75%', wind: '1级' },
        '深圳': { temp: '26°C', condition: '阴天', humidity: '70%', wind: '2级' },
        '成都': { temp: '18°C', condition: '雾', humidity: '80%', wind: '1级' }
    };
    
    searchButton.addEventListener('click', searchWeather);
    cityInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchWeather();
        }
    });
    
    function searchWeather() {
        const city = cityInput.value.trim();
        if (city !== '') {
            if (mockWeatherData[city]) {
                const weather = mockWeatherData[city];
                weatherResult.innerHTML = `
                    <h3>${city}天气</h3>
                    <p>温度: ${weather.temp}</p>
                    <p>状况: ${weather.condition}</p>
                    <p>湿度: ${weather.humidity}</p>
                    <p>风力: ${weather.wind}</p>
                `;
            } else {
                weatherResult.innerHTML = `<p>未找到${city}的天气数据</p>`;
            }
        }
    }
}

// 颜色选择器功能
function initColorPicker() {
    const colorInput = document.getElementById('color-input');
    const colorPreview = document.getElementById('color-preview');
    const colorCode = document.getElementById('color-code');
    
    colorInput.addEventListener('input', function() {
        const color = this.value;
        colorPreview.style.backgroundColor = color;
        colorCode.textContent = color;
    });
}

// 计数器功能
function initCounter() {
    const countElement = document.getElementById('count');
    const incrementButton = document.getElementById('increment');
    const decrementButton = document.getElementById('decrement');
    let count = 0;
    
    incrementButton.addEventListener('click', function() {
        count++;
        countElement.textContent = count;
    });
    
    decrementButton.addEventListener('click', function() {
        count--;
        countElement.textContent = count;
    });
}

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