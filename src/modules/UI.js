import weatherInfo from './weatherInfo';
import tempIcon from '../img/thermometer-lines.png';
import windIcon from '../img/weather-windy.png';
import humidityIcon from '../img/water-percent.png';
import maxTempIcon from '../img/thermometer-chevron-up.png';
import minTempIcon from '../img/thermometer-chevron-down.png';
import pressureIcon from '../img/chevron-triple-down.png';

const UI = (() => {
  const createSearchBar = () => {
    const searchDiv = document.createElement('div');
    const searchBar = document.createElement('input');
    const btn = document.createElement('button');
    const form = document.createElement('form');

    searchBar.placeholder = 'Digite sua localização';

    form.method = 'get';

    btn.textContent = 'Buscar';
    btn.type = 'submit';

    form.addEventListener('submit', async (e) => {
      if (searchBar.value !== '') {
        const result = weatherInfo.reportWeather(searchBar.value);

        result.then(() => window.location.reload());
        searchBar.value = '';
      }

      e.preventDefault();
    });

    form.appendChild(searchBar);
    form.appendChild(btn);

    searchDiv.appendChild(form);
    searchDiv.classList.add('search-bar');

    return searchDiv;
  };

  const displayHeader = () => {
    const header = document.getElementsByTagName('header')[0];

    header.appendChild(document.createElement('div'));
    header.appendChild(createSearchBar());
    header.appendChild(document.createElement('div'));
  };

  const getIcon = async () => {
    const id = localStorage.getItem('icon');

    try {
      const img = document.createElement('img');
      img.src = `http://openweathermap.org/img/wn/${id}@2x.png`;
      return img;
    } catch (err) {
      alert(err);
    }

    return null;
  };

  const getPlaceData = () => {
    const place = document.createElement('h1');
    place.textContent = localStorage.getItem('place');
    place.textContent += `, ${localStorage.getItem('country')}`;

    return place;
  };

  const getWeatherDescription = async () => {
    const basicData = document.createElement('div');
    basicData.classList.add('basic-data');

    const description = document.createElement('h1');
    description.textContent = localStorage.getItem('description');

    const img = await getIcon();

    basicData.appendChild(img);
    basicData.appendChild(description);

    return basicData;
  };

  const getCurrentTempData = () => {
    const tempData = document.createElement('div');

    const tempImg = document.createElement('img');
    tempImg.src = tempIcon;

    const temp = document.createElement('h2');
    temp.textContent = localStorage.getItem('temp');
    temp.textContent += ' °C';

    tempData.appendChild(tempImg);
    tempData.appendChild(temp);

    return tempData;
  };

  const getMaxTempData = () => {
    const tempData = document.createElement('div');

    const tempImg = document.createElement('img');
    tempImg.src = maxTempIcon;

    const temp = document.createElement('h2');
    temp.textContent = localStorage.getItem('temp_max');
    temp.textContent += ' °C';

    tempData.appendChild(tempImg);
    tempData.appendChild(temp);

    return tempData;
  };

  const getMinTempData = () => {
    const tempData = document.createElement('div');

    const tempImg = document.createElement('img');
    tempImg.src = minTempIcon;

    const temp = document.createElement('h2');
    temp.textContent = localStorage.getItem('temp_min');
    temp.textContent += ' °C';

    tempData.appendChild(tempImg);
    tempData.appendChild(temp);

    return tempData;
  };

  const getWindData = () => {
    const windData = document.createElement('div');

    const windImg = document.createElement('img');
    windImg.src = windIcon;

    const windSpeed = document.createElement('h2');
    windSpeed.textContent = localStorage.getItem('wind');
    windSpeed.textContent += ' m/s';

    windData.appendChild(windImg);
    windData.appendChild(windSpeed);

    return windData;
  };

  const getHumidityData = () => {
    const humidityData = document.createElement('div');

    const humidityImg = document.createElement('img');
    humidityImg.src = humidityIcon;

    const humidity = document.createElement('h2');
    humidity.textContent = localStorage.getItem('humidity');
    humidity.textContent += '%';

    humidityData.appendChild(humidityImg);
    humidityData.appendChild(humidity);

    return humidityData;
  };

  const getPressureData = () => {
    const pressureData = document.createElement('div');

    const pressureImg = document.createElement('img');
    pressureImg.src = pressureIcon;

    const pressure = document.createElement('h2');
    pressure.textContent = localStorage.getItem('pressure');
    pressure.textContent += ' hpa';

    pressureData.appendChild(pressureImg);
    pressureData.appendChild(pressure);

    return pressureData;
  };

  const displayData = async () => {
    const main = document.getElementsByTagName('main')[0];
    const data = document.createElement('div');

    data.id = 'data';

    data.appendChild(getPlaceData());

    data.appendChild(await getWeatherDescription());

    data.appendChild(getCurrentTempData());

    data.appendChild(getMaxTempData());

    data.appendChild(getMinTempData());

    data.appendChild(getWindData());

    data.appendChild(getHumidityData());

    data.appendChild(getPressureData());

    main.appendChild(document.createElement('div'));
    main.appendChild(data);
    main.appendChild(document.createElement('div'));
  };

  const display = () => {
    if (!localStorage.getItem('place')) {
      const result = weatherInfo.reportWeather('São José dos Campos');

      result.then(() => window.location.reload());
    }
    displayHeader();
    displayData();
  };

  return { display };
})();

export default UI;
