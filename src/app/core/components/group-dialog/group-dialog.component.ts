import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-group-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './group-dialog.component.html',
  styleUrls: ['./group-dialog.component.scss']
})
export class GroupDialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
