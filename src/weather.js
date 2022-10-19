export async function getWeather(location){
  try{
    const weather = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=507218e34ab44f761e2f3ca63a9eaeec`)

    const fetchResult = await weather.json();

    console.log(fetchResult);
  }
  catch(err){
    console.log(err);
  }
}