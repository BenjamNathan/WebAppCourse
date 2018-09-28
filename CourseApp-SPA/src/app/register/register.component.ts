import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() valuesFromHome: any;
  // This is to receive properties into the child component. The values come from the home html component
  // The same name needs to be used in the home html and the register html
  model: any = {};

  constructor() {}

  ngOnInit() {}

  register() {
    console.log(this.model);
  }

  cancel() {
    console.log('Cancelled');
  }
}
