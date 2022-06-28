import axios from "axios";
import moment from "moment";
import { DateTime } from "luxon";

function Home({ data }) {
  const current_weather = data.current;
  const hourly_weather = data.hourly.slice(1, 16);

  return (
    <div className="bg-gradient-to-r from-[#4B79A1] to-[#283E51] h-screen w-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center  h-3/4 w-2/5 text-white gap-4">
        <span className="text-2xl">
          {DateTime.fromSeconds(current_weather.dt)
            .setZone(data.timezone)
            .toFormat("cccc, dd LLL yyyy' | Local time: 'hh:mm a")}
        </span>
        <span className="text-xl">Mansoorabad, IN</span>
        <span className="text-xl">
          {current_weather.weather[0].description}
        </span>
        <div className="flex items-center justify-between w-full">
          <img
            src={`http://openweathermap.org/img/wn/${current_weather.weather[0].icon}@2x.png`}
            alt="weather_icon"
          />
          <span className="text-4xl">{current_weather.temp.toFixed(1)}°C</span>
          <div className="flex flex-col justify-around gap-2">
            <span className="flex gap-2">
              <img
                className="inline white-stroke"
                height={10}
                width={23}
                src="/pressure.svg"
              />
              <b>Pressure: </b>
              {current_weather.pressure}
            </span>
            <span className="flex gap-2">
              <img
                className="inline white-stroke"
                height={10}
                width={23}
                src="/humidity.svg"
              />
              <b>Humidity: </b>
              {current_weather.humidity} %
            </span>
          </div>
        </div>
        <div className="flex justify-between w-full">
          <span className="flex gap-2">
            <img
              className="inline white-stroke"
              height={10}
              width={23}
              src="/sunrise.svg"
            />
            <b>rise: </b>{" "}
            {DateTime.fromSeconds(current_weather.sunrise)
              .setZone(data.timezone)
              .toFormat("hh:mm a")}
          </span>
          <span className="flex gap-2">
            <img
              className="inline white-stroke"
              height={10}
              width={23}
              src="/sunset.svg"
            />
            <b>set: </b>{" "}
            {DateTime.fromSeconds(current_weather.sunset)
              .setZone(data.timezone)
              .toFormat("hh:mm a")}
          </span>
          <span className="flex gap-2">
            <img
              className="inline white-stroke"
              height={10}
              width={23}
              src="/speed.svg"
            />
            <b>speed: </b>
            {current_weather.wind_speed} km/h
          </span>
          <span className="flex gap-2">
            <img
              className="inline white-stroke"
              height={10}
              width={23}
              src="/direction.svg"
            />
            <b>direction: </b>
            {current_weather.wind_deg} km/h
          </span>
        </div>
        <div className="w-full">
          <span>Hourly Forecast</span>
          <hr className="w-full my-3" />
          <div className="flex flex-wrap items-center justify-center gap-6">
            {hourly_weather.map((hour, key) => (
              <div key={key} className="flex flex-col items-center">
                <span>
                  {DateTime.fromSeconds(hour.dt)
                    .setZone(data.timezone)
                    .toFormat("hh:mm a")}
                </span>
                <img
                  src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                  alt="weather_icon"
                />
                <span>{hour.temp.toFixed(1)}°C</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const appid = process.env.API_TOKEN;
  const lat = "17.3923739";
  const lng = "78.5179078";
  const baseurl = "https://api.openweathermap.org/data/2.5/";
  const URL = `${baseurl}onecall?lat=${lat}&lon=${lng}&exclude=minutely,alerts,daily&units=metric&appid=${appid}`;

  try {
    const response = await axios.get(URL);
    return {
      props: { data: response.data },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default Home;
