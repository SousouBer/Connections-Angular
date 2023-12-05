import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  editUsername = false;

  constructor() { }

  ngOnInit(): void {
  }

  editUser(){
    this.editUsername = true;
  }

  cancelEdit(){
    this.editUsername = false;
  }

}
