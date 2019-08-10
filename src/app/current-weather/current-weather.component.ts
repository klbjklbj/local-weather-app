import { Component, OnInit } from '@angular/core';
import { ICurrentWeather} from '../icurrent-weather';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {

  current: ICurrentWeather //current is variable of ICurrentWeather type
  constructor() {
    this.current={
      city: 'Bethesda',
      country: 'US',
      date: new Date(),
      temperature: 72,
      description: 'Sunny',
      image: ''
    }
   }

  ngOnInit() {
  }

}
