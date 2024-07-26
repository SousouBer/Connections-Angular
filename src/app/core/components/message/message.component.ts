import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupMessage } from '../../models/group.models';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/auth/models/user.model';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { messageAuthorName } from 'src/app/store/selectors/participants.selectors';
import { Participant } from '../../models/participants.models';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() groupMessage!: GroupMessage;

  // Name of the message creator.
  user$!: Observable<Participant>;

  authenticatedUser!: User;

  constructor(private authService: AuthService, private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.user$ = this.store.select(messageAuthorName(this.groupMessage.authorID.S))
    this.authService.user.subscribe(
      (user) => (this.authenticatedUser = <User>user)
    );
  }

}
