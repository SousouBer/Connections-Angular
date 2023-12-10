import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Participant } from '../../models/participants.models';
import { DataStorageService } from '../../services/data-storage.service';

@Component({
  selector: 'app-participant',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.scss']
})
export class ParticipantComponent implements OnInit {
  @Input() participantItem!: Participant;

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
  }

  makeConversation(){
    this.dataStorageService.createUserConversation(this.participantItem.uid.S).subscribe(val => console.log(val));
  }
}
