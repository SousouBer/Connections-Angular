import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from '../message/message.component';
import { GroupMessage } from '../../models/group.models';
import { Observable, skip, take } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import {
  groupMessages,
  messageTimestamp,
} from 'src/app/store/selectors/group-messages.selectors';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GroupPeopleService } from '../../services/groups-people.service';
import { User } from 'src/app/auth/models/user.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  sendMessageToGroup,
  updateGroupMessages,
} from 'src/app/store/actions/group-messages.actions';
import { groupAuthor } from 'src/app/store/selectors/groups.selectors';

@Component({
  selector: 'app-group-dialog',
  standalone: true,
  imports: [CommonModule, MessageComponent, RouterModule, ReactiveFormsModule],
  templateUrl: './group-dialog.component.html',
  styleUrls: ['./group-dialog.component.scss'],
})
export class GroupDialogComponent implements OnInit {
  // An error message
  errMessage = '';
  showErrorMessage = false;

  groupMessages$!: Observable<GroupMessage[]>;
  groupID!: string | null;
  timeStamp!: Observable<number>;

  // Show or hide the modal window
  showModalWindow = false;

  // A form for a message to send it to the group.
  messageForm!: FormGroup;

  authenticatedUser!: User;

  // Group created by.
  groupCreatedBy$!: Observable<string>;

  constructor(
    private store: Store<AppState>,
    private groupPeopleService: GroupPeopleService,
    private authService: AuthService,
    private router: Router
  ) {
    this.groupPeopleService.groupIdMessages.subscribe(
      (val) => (console.log(val), (this.groupID = val))
    );

    this.groupMessages$ = this.store.select(groupMessages(this.groupID));
    this.timeStamp = this.store.select(messageTimestamp(this.groupID));
  }

  ngOnInit(): void {
    // Take the value from the service and show the error message only if the request fails.
    this.groupPeopleService.showErrorMessageValue.subscribe(val => this.showErrorMessage = val);

    this.groupPeopleService.errorMessage.subscribe(val => this.errMessage = val);

    // Use the groupID to find the name of the group creator in order to show/hide the remove group button.
    this.groupCreatedBy$ = this.store.select(groupAuthor(<string>this.groupID));

    // Use the data of Loggedin user to manipulate the template accordingly.
    this.authService.user.subscribe(
      (user) => (this.authenticatedUser = <User>user)
    );

    this.messageForm = new FormGroup({
      message: new FormControl(null, Validators.required),
    });
  }

  updateMessages() {
    this.timeStamp.pipe(take(1)).subscribe((val) => {
      console.log('dispatched');

      return this.store.dispatch(
        updateGroupMessages({ groupID: <string>this.groupID, timestamp: val })
      );
    });
  }

  onSubmit() {
    let currentTimeStamp;

    this.timeStamp.pipe(take(1)).subscribe((val) => (currentTimeStamp = val));

    const message = this.messageForm.value.message;

    this.store.dispatch(
      sendMessageToGroup({
        groupID: <string>this.groupID,
        textMessage: message,
        timestamp: currentTimeStamp,
      })
    );

    setTimeout(() => {
      this.updateMessages();
    }, 2000);
    this.messageForm.reset();
  }

  // MODAL WINDOW PROPERTIES
  hideModal(){
    this.showModalWindow = false;
  }

  showModal(){
    this.showModalWindow = true;
  }

  stopPropagation(e: Event) {
    e.stopPropagation();
  }

  removeGroup(){
    this.groupPeopleService.groupId.next(<string>this.groupID);
    this.groupPeopleService.deleteGroup();
    this.router.navigate(['/']);
    this.hideModal();
  }
}
