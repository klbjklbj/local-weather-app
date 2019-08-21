import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { ICurrentWeather } from "../icurrent-weather";
import { map } from "rxjs/operators";

interface ICurrentWeatherData {
  weather: [
    {
      description: string;
      icon: string;
    }
  ];
  main: {
    temp: number;
  };
  sys: {
    country: string;
  };
  dt: number;
  name: string;
}

@Injectable({
  providedIn: "root"
})
export class WeatherService {
  constructor(private httpClient: HttpClient) {}

  getCurrentWeather(
    search: string | number,
    country?: string //associates interface to call
  ) {
    let uriParams = "";
    if (typeof search === "string") {
      uriParams = `q=${search}`;
    } else {
      uriParams = `zip=${search}`;
    }

    if (country) {
      uriParams = `${uriParams},${country}`;
    }

    return this.httpClient
      .get<ICurrentWeatherData>(
        `${
          environment.baseUrl
        }api.openweathermap.org/data/2.5/weather?${uriParams}&appid=${
          environment.appId
        }`
      )
      .pipe(map(data => this.transformToICurrentWeather(data)));
  }

  // transform iCurrentWeatherData to ICurrentWeather
  // ICurrentWeatherData is input and ICurrentWeather is output
  private transformToICurrentWeather(
    data: ICurrentWeatherData
  ): ICurrentWeather {
    return {
      //data.something being used is because data is the parameter
      city: data.name,
      country: data.sys.country,
      date: data.dt * 1000,
      image: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      temperature: data.main.temp,
      description: data.weather[0].description
    };
  }
}
