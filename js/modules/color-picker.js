// 颜色选择器功能模块
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

export default initColorPicker;