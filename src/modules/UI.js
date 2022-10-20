import weatherInfo from './weatherInfo'
import tempIcon from '/home/jefferson/top/weather-app/src/img/thermometer-lines.png'
import windIcon from '/home/jefferson/top/weather-app/src/img/weather-windy.png'
import humidityIcon from '/home/jefferson/top/weather-app/src/img/water-percent.png'

const UI = (() => {

  const createSearchBar = () => {
    const searchDiv = document.createElement('div');
    const searchBar = document.createElement('input');
    const btn = document.createElement('button');
    const form = document.createElement('form');

    form.method = 'get';

    btn.textContent = 'Search';
    btn.type = 'submit';

    form.addEventListener('submit', (e) => {
      if(searchBar.value != ''){
        weatherInfo.reportWeather(searchBar.value);
        searchBar.value = '';
      }

      e.preventDefault();
    });
    
    form.appendChild(searchBar);
    form.appendChild(btn);

    searchDiv.appendChild(form);
    searchDiv.classList.add('search-bar');

    return searchDiv;
  }

  const displayHeader = () => {
    const header = document.getElementsByTagName('header')[0];

    header.appendChild(document.createElement('div'));
    header.appendChild(createSearchBar());
    header.appendChild(document.createElement('div'));
  }

  const getIcon = async () => {
    const id = localStorage.getItem('icon');
    console.log(id)
    try{
      const img = document.createElement('img');
      img.src = `http://openweathermap.org/img/wn/${id}@2x.png`;
      return img;
    }
    catch(err){
      alert(err);
    }
  }

  const displayData = async () => {

  }

  const display = () => {
    displayHeader();
    displayData();
  }

  return {display};
})();

export default UI;