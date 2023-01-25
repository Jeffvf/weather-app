const weatherInfo = (() => {
  async function getLocationWeather(location) {
    try {
      const weather = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=507218e34ab44f761e2f3ca63a9eaeec`);

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
    localStorage.setItem('description', info.weather[0].main);
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
