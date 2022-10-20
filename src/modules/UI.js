import weatherInfo from './weatherInfo'

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

  const display = () => {
    displayHeader();
  }

  return {display};
})();

export default UI;