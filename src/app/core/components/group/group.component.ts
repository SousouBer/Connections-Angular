import { Component, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Group, GroupMessage } from '../../models/group.models';
import { Observable, take } from 'rxjs';
import { User } from 'src/app/auth/models/user.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DataStorageService } from '../../services/data-storage.service';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { GroupPeopleService } from '../../services/groups-people.service';
import {
  getGroupMessages,
  updateGroupMessages,
} from 'src/app/store/actions/group-messages.actions';
import { Router } from '@angular/router';
import {
  groupMessages,
  messageTimestamp,
} from 'src/app/store/selectors/group-messages.selectors';

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {
  @Input() groupItem!: Group;

  authenticatedUser!: User;

  @Output() groupMessages$!: Observable<GroupMessage[]>;

  constructor(
    private authService: AuthService,
    private dataStorageService: DataStorageService,
    private groupPeopleSerice: GroupPeopleService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Take the value only once and then automatically unsubscribe.
    this.authService.user.subscribe(
      (user) => (this.authenticatedUser = <User>user)
    );
  }

  removeGroup(e: Event) {
    e.stopPropagation();

    const groupid = this.groupItem.id.S;

    this.groupPeopleSerice.saveGroupId(groupid);
    this.groupPeopleSerice.showOrHideConfirmationModal(true);
  }

  getGroupMessages() {
    // const messages = [];
    const itemId = this.groupItem.id.S;
    this.router.navigate(['/group', itemId]);

    this.groupPeopleSerice.createdBy.next(this.groupItem.createdBy.S);

    this.store.select(groupMessages(itemId)).pipe(take(1)).subscribe((data) => {
      if (!data || data === undefined) {
        console.log('first', data);

        this.store.dispatch(getGroupMessages({ groupID: itemId }));
      } else {
        console.log('second', data);
        // this.store.dispatch(updateMessages());
        const timeStamp = this.store
          .select(messageTimestamp(itemId))
          .pipe(take(1))
          .subscribe((val) => {
            console.log(val);
            return this.store.dispatch(
              updateGroupMessages({ groupID: itemId, timestamp: val })
            );
          });
      }
    });

    this.groupPeopleSerice.groupIdMessages.next(itemId);
    this.dataStorageService.groupID.next(itemId);
  }
}
