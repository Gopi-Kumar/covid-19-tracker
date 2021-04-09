import { Component, OnInit } from '@angular/core';
import {DataServiceService} from 'src/app/services/data-service.service'
import {GlobalDataSummary} from 'src/app/models/global-data'
import {DateWiseData} from 'src/app/models/date-wise-data'
import {merge} from 'rxjs'
import {map} from 'rxjs/operators'
@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  data:GlobalDataSummary[];
  countries:string[] = [];
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  selectedContryData : DateWiseData[];
  dateWiseData;
  loading = true;
  constructor(private service: DataServiceService) { }

  ngOnInit(): void {
    // merge(
    //   this.service.getDateWiseData().pipe(map(result => {

    //   })),
    // ),
    this.service.getGlobalData().subscribe(result => {
      console.log("get global data called")
      this.data = result;
      this.data.forEach(cs => {
        this.countries.push(cs.country)
      });
    })
  }
  updateValue(country:string){
      this.data.forEach(cs => {
        if(cs.country == country){
          this.totalActive = cs.active;
          this.totalDeaths = cs.deaths;
          this.totalRecovered = cs.recovered;
          this.totalConfirmed = cs.confirmed;
        }
      })
  }

}
