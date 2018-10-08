import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../_models/user';

@Component({
  selector: 'app-available-shooter-edit',
  templateUrl: './available-shooter-edit.component.html',
  styleUrls: ['./available-shooter-edit.component.css']
})
export class AvailableShooterEditComponent implements OnInit {
  user: User;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
  }

}
