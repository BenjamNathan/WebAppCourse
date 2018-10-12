import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';

@Component({
  selector: 'app-available-shooters-list',
  templateUrl: './available-shooters-list.component.html',
  styleUrls: ['./available-shooters-list.component.css']
})
export class AvailableShootersListComponent implements OnInit {
  users: User[];
  user: User = JSON.parse(localStorage.getItem('user'));
  shooterTypeList = [{value: 'primary-shooter', display: 'Primary Shooter'}, {value: 'secondary-shooter', display: 'Secondary Shooter'}];
  userParams: any = {};
  pagination: Pagination;
  display: string;

  constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });

    this.userParams.shooterType = 'primary-shooter' ? 'secondary-shooter' : 'primary-shooter';
    this.display = this.shooterTypeList.filter(t1 => t1.value === this.userParams.shooterType)[0].display;
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  resetFilters() {
    this.userParams.shooterType = 'primary-shooter' ? 'secondary-shooter' : 'primary-shooter';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.loadUsers();
  }

  // different loadUsers method for loading on pagination
  loadUsers() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
      .subscribe((res: PaginatedResult<User[]>) => {
        this.users = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }

  applyFilters(shooterTypeValue: string) {
    this.display = this.shooterTypeList.filter(t1 => t1.value === shooterTypeValue)[0].display;
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
