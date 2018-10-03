import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-available-shooters-list',
  templateUrl: './available-shooters-list.component.html',
  styleUrls: ['./available-shooters-list.component.css']
})
export class AvailableShootersListComponent implements OnInit {
  users: User[];
  id: number;

  constructor(private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    }, error => {
      this.alertify.error(error);
    });
  }

  loadUser(id) {
    this.userService.getUser(id).subscribe((user: User) => {
      this.users[id] = user;
    }, error => {
      this.alertify.error(error);
    });
  }

}
