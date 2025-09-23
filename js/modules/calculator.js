// 计算器功能模块
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

export default initCalculator;