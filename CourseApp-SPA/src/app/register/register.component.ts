import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // @Input() valuesFromHome: any; Commented out as removed from page but keeping in for reference (HTML code removed though)
  // This is to receive properties into the child component. The values come from the home html component
  // The same name needs to be used in the home html and the register html

  @Output() cancelRegister = new EventEmitter();
  // Output properties emit events so need to create a new EventEmitter

  model: any = {};

  constructor(private authService: AuthService, private alertify: AlertifyService) {}

  ngOnInit() {}

  register() {
    this.authService.register(this.model).subscribe(() => {
      this.alertify.success('Registration Successful');
      // Using emptpy brackets because after this is successful no information is needed from the respoonse
    }, error => {
      this.alertify.error(error);
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
