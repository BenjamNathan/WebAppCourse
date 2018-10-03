import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-available-shooter-detail',
  templateUrl: './available-shooter-detail.component.html',
  styleUrls: ['./available-shooter-detail.component.css']
})
export class AvailableShooterDetailComponent implements OnInit {
  user: User;

  constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
  }

  /*
  Commented out because no longer needed thanks to the available-shooter-detail resolver
  loadUser() {
    // The + turns the string to a number
    this.userService.getUser(+this.route.snapshot.params['id']).subscribe(
      (user: User) => {
        this.user = user;
      }, error => {
        this.alertify.error(error);
      }
    );
  }
  */
}
