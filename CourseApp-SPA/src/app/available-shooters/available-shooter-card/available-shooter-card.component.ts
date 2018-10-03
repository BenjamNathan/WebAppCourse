import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../_models/user';

@Component({
  selector: 'app-available-shooter-card',
  templateUrl: './available-shooter-card.component.html',
  styleUrls: ['./available-shooter-card.component.css']
})
export class AvailableShooterCardComponent implements OnInit {
  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }

}
