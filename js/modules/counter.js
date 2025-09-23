// 计数器功能模块
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

export default initCounter;