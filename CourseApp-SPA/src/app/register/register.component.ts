import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() valuesFromHome: any;
  // This is to receive properties into the child component. The values come from the home html component
  // The same name needs to be used in the home html and the register html

  @Output() cancelRegister = new EventEmitter();
  // Output properties emit events so need to create a new EventEmitter

  model: any = {};

  constructor() {}

  ngOnInit() {}

  register() {
    console.log(this.model);
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('Cancelled');
  }
}
