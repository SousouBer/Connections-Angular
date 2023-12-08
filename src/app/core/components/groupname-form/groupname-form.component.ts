import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-groupname-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './groupname-form.component.html',
  styleUrls: ['./groupname-form.component.scss']
})
export class GroupnameFormComponent implements OnInit {
  @Output() passDataToParent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  passData(){
    this.passDataToParent.emit(false);
  }
}
