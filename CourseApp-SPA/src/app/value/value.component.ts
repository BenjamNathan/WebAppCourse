import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent implements OnInit {
  values: any;
  // This is a values property of type any
  // any allows us ot be flexible with what is contained inside the values

  // Need to inject httpclientserver into the constructor to be able to make use of it inside the class
  // http is the variable name. This intialises the httpclient
  constructor(private http: HttpClient) { }

  // Then use the ngOnInit method to get data from the api because the construtor happens too early
  ngOnInit() {
    this.getValues();
    // This goes to the api, gets the values and then stores them inside the values property above
  }

  getValues() {
    // The get part of the method returns observables, to view these you need to subscribe to them
    this.http.get('http://localhost:5000/api/values').subscribe(response => {
      this.values = response;
    }, error => {
      console.log(error);
    });
  }

}
