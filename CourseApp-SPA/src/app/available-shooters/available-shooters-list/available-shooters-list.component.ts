import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-available-shooters-list',
  templateUrl: './available-shooters-list.component.html',
  styleUrls: ['./available-shooters-list.component.css']
})
export class AvailableShootersListComponent implements OnInit {
  users: User[];
  id: number;

  constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'];
    });
  }

  /*
  Commented out because no longer needed thanks to the available-shooter-detail resolver
  loadUsers() {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    }, error => {
      this.alertify.error(error);
    });
  }
  */
}
