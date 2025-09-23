// 天气查询功能模块（模拟）
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

export default initWeather;