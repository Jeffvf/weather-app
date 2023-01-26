const weatherInfo = (() => {
  async function getLocationWeather(location) {
    try {
      const weather = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=${process.env.API_KEY}&lang=pt_br`);

      const fetchResult = await weather.json();

      return fetchResult;
    } catch (err) {
      alert(err);
    }

    return null;
  }

  async function setWeatherInformation(info) {
    localStorage.setItem('place', info.name);

    Object.keys(info.main).forEach((key) => {
      const value = info.main[`${key}`];
      localStorage.setItem(key, value);
    });

    localStorage.setItem('country', info.sys.country);
    let description = info.weather[0].description;
    const firstLetter = description.charAt(0);
    description = firstLetter.toUpperCase() + description.slice(1)
    localStorage.setItem('description', description);
    localStorage.setItem('icon', info.weather[0].icon);
    localStorage.setItem('wind', info.wind.speed);
  }

  async function reportWeather(location) {
    const report = await getLocationWeather(location);

    try {
      await setWeatherInformation(report);
    } catch (err) {
      alert(err);
    }

    return report;
  }

  return { reportWeather };
})();

export default weatherInfo;
