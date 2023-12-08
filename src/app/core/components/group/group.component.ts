import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Group } from '../../models/group.models';

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {
  @Input() groupItem!: Group;

 constructor() {}

  ngOnInit(): void {
  }

}
