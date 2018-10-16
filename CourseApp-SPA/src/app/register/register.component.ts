import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { User } from '../_models/user';
import { Router } from '@angular/router';

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

  user: User;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  // The BsDatepickerConfig class has a lot of required fields but we only wanted to implemented the containerClass
  // in order to customise the theme. Setting it to a partial class makes all required fields optional

  constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService, private fb: FormBuilder) {}

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-blue'
    };
    this.createRegisterForm();

    // Below is one way of creating custom validation for a form but it can be better to create a form group
    // using the FormBuilder class i.e createRegisterForm
    // this.registerForm = new FormGroup({
    //   username: new FormControl('', Validators.required),
    //   password: new FormControl('',
    //     [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
    //   confirmPassword: new FormControl('', Validators.required)
    // }, this.passwordMatchValidator);
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      shooterType: ['primary-shooter'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
    // fb.group is the equivalent of writing new FormGroup in the ngOnInit method
  }

  // Below adds a customer method to FormGroup which can be used to validate that the passwords match
  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      // this.registerForm.value takes all the values from the form and clones them into the empty object.
      // The object is then assigned to user
      this.authService.register(this.user).subscribe( () => {
        this.alertify.success('Registration Successful');
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.authService.login(this.user).subscribe( () => {
          this.router.navigate(['/available-shooters']);
        });
      });
    }

    // Original register method
    // this.authService.register(this.model).subscribe(() => {
    //   this.alertify.success('Registration Successful');
    //   // Using emptpy brackets because after this is successful no information is needed from the respoonse
    // }, error => {
    //   this.alertify.error(error);
    // });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
