import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Group } from '../../models/group.models';
import { Observable, take } from 'rxjs';
import { User } from 'src/app/auth/models/user.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DataStorageService } from '../../services/data-storage.service';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { removeGroup } from 'src/app/store/actions/groups.actions';
import { GroupPeopleService } from '../../services/groups-people.service';

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

  constructor(private authService: AuthService, private dataStorageService: DataStorageService, private groupPeopleSerice: GroupPeopleService, private store: Store<AppState>) {}

  ngOnInit(): void {
    // Take the value only once and then automatically unsubscribe.
    this.authService.user.subscribe((user) => this.authenticatedUser = <User>user);
  }

  removeGroup(){
    const groupid = this.groupItem.id.S;

    this.groupPeopleSerice.saveGroupId(groupid);
    this.groupPeopleSerice.showOrHideConfirmationModal(true);
  }
}
