import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  values: any;
  // This is a values property of type any
  // any allows us ot be flexible with what is contained inside the values

  // Need to inject httpclientserver into the constructor to be able to make use of it inside the class
  // http is the variable name. This intialises the httpclient
  constructor(private http: HttpClient) {}

  // Then use the ngOnInit method to get data from the api because the construtor happens too early
  ngOnInit() {
    this.getValues();
    // This goes to the api, gets the values and then stores them inside the values property above
    // 'this' refers to the getValues method inside this class
  }

  registerToggle() {
    this.registerMode = true;
  }

  getValues() {
    // The get part of the method returns observables, to view these you need to subscribe to them
    this.http.get('http://localhost:5000/api/values').subscribe(
      response => {
        this.values = response;
        // 'this' is used to refer to the values property inside the class (class ValueComponent)
      },
      error => {
        console.log(error);
      }
    );
  }

  cancelRegisterMode(registerMode: boolean) {
    this.registerMode = registerMode;
    // registerMode (rhs) is assign to false from the register component and then gets assigned to the registerMode in this component
  }
}
