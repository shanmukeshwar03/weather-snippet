import axios from "axios";
import { DateTime } from "luxon";

function Home({ data }) {
  const current_weather = data.current;
  const hourly_weather = data.hourly.slice(1, 16);

  return (
    <div
      style={{
        backgroundImage: "linear-gradient(to right, #4B79A1 , #283E51)",
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        margin: 0,
        padding: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "75%",
          width: "40%",
          color: "#fff",
          gap: "1rem",
        }}
      >
        <span
          style={{
            fontSize: "1.5rem",
            lineHeight: "2rem",
          }}
        >
          {DateTime.fromSeconds(current_weather.dt)
            .setZone(data.timezone)
            .toFormat("cccc, dd LLL yyyy' | Local time: 'hh:mm a")}
        </span>
        <span
          style={{
            fontSize: "1.25rem",
            lineHeight: "1.75rem",
          }}
        >
          Mansoorabad, IN
        </span>
        <span
          style={{
            fontSize: "1.25rem",
            lineHeight: "1.75rem",
          }}
        >
          {current_weather.weather[0].description}
        </span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <img
            src={`http://openweathermap.org/img/wn/${current_weather.weather[0].icon}@2x.png`}
            alt="weather_icon"
          />
          <span
            style={{
              fontSize: "2.25rem",
              lineHeight: "2.5rem",
            }}
          >
            {current_weather.temp.toFixed(1)}°C
          </span>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              gap: "0.5rem",
            }}
          >
            <span
              style={{
                display: "flex",
                gap: "0.5rem",
              }}
            >
              <img
                style={{
                  display: "inline",
                  filter:
                    "invert(100%) sepia(0%) saturate(7459%) hue-rotate(142deg) brightness(116%) contrast(109%)",
                }}
                height={10}
                width={23}
                src="/pressure.svg"
              />
              <b>Pressure: </b>
              {current_weather.pressure}
            </span>
            <span
              style={{
                display: "flex",
                gap: "0.5rem",
              }}
            >
              <img
                style={{
                  display: "inline",
                  filter:
                    "invert(100%) sepia(0%) saturate(7459%) hue-rotate(142deg) brightness(116%) contrast(109%)",
                }}
                height={10}
                width={23}
                src="/humidity.svg"
              />
              <b>Humidity: </b>
              {current_weather.humidity} %
            </span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <span
            style={{
              display: "flex",
              gap: "0.5rem",
            }}
          >
            <img
              style={{
                display: "inline",
                filter:
                  "invert(100%) sepia(0%) saturate(7459%) hue-rotate(142deg) brightness(116%) contrast(109%)",
              }}
              height={10}
              width={23}
              src="/sunrise.svg"
            />
            <b>rise: </b>{" "}
            {DateTime.fromSeconds(current_weather.sunrise)
              .setZone(data.timezone)
              .toFormat("hh:mm a")}
          </span>
          <span
            style={{
              display: "flex",
              gap: "0.5rem",
            }}
          >
            <img
              style={{
                display: "inline",
                filter:
                  "invert(100%) sepia(0%) saturate(7459%) hue-rotate(142deg) brightness(116%) contrast(109%)",
              }}
              height={10}
              width={23}
              src="/sunset.svg"
            />
            <b>set: </b>{" "}
            {DateTime.fromSeconds(current_weather.sunset)
              .setZone(data.timezone)
              .toFormat("hh:mm a")}
          </span>
          <span
            style={{
              display: "flex",
              gap: "0.5rem",
            }}
          >
            <img
              style={{
                display: "inline",
                filter:
                  "invert(100%) sepia(0%) saturate(7459%) hue-rotate(142deg) brightness(116%) contrast(109%)",
              }}
              height={10}
              width={23}
              src="/speed.svg"
            />
            <b>speed: </b>
            {current_weather.wind_speed} km/h
          </span>
          <span
            style={{
              display: "flex",
              gap: "0.5rem",
            }}
          >
            <img
              style={{
                display: "inline",
                filter:
                  "invert(100%) sepia(0%) saturate(7459%) hue-rotate(142deg) brightness(116%) contrast(109%)",
              }}
              height={10}
              width={23}
              src="/direction.svg"
            />
            <b>direction: </b>
            {current_weather.wind_deg} km/h
          </span>
        </div>
        <div
          style={{
            width: "100%",
          }}
        >
          <span>Hourly Forecast</span>
          <hr
            style={{
              width: "100%",
              marginTop: "0.75rem",
              marginBottom: "0.75rem",
            }}
          />
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              gap: "1.5rem",
            }}
          >
            {hourly_weather.map((hour, key) => (
              <div
                key={key}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
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
