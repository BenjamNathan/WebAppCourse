import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';
import { Photo } from 'src/app/_models/photo';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-photo-management',
  templateUrl: './photo-management.component.html',
  styleUrls: ['./photo-management.component.css']
})
export class PhotoManagementComponent implements OnInit {
  photos: any;

  constructor(
    private adminService: AdminService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.getPhotosForModeration();
  }

  getPhotosForModeration() {
    this.adminService.getPhotosForModeration().subscribe(
      (photos) => {
        this.photos = photos;
      },
      error => {
        console.log(error);
      }
    );
  }

  approvePhoto(id: number) {
    this.adminService.approvePhoto(id).subscribe(
      () => {
        this.photos.splice(this.photos.findIndex(p => p.id === id, 1));
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

  deletePhoto(id: number) {
    this.alertify.confirm('Are you sure you want to delete this photo?', () => {
      this.adminService.deletePhoto(id).subscribe(
        () => {
          this.photos.splice(this.photos.findIndex(p => p.id === id, 1));
        },
        error => {
          this.alertify.error(error);
        }
      );
    });
  }
}
