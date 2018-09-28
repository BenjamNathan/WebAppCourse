import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';

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

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  register() {
    this.authService.register(this.model).subscribe(() => {
      console.log('registration successful');
      // Using emptpy brackets because after this is successful no information is needed from the respoonse
    }, error => {
      console.log(error);
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('Cancelled');
  }
}
