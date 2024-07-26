import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Profile } from 'src/app/store/reducers/profile.reducers';
import { GroupId, GroupMessages } from '../models/group.models';
import { BehaviorSubject, Observable, Subject, catchError, take } from 'rxjs';
import { ConversationsPData, ParticipantsData } from '../models/participants.models';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { messageTimestamp } from 'src/app/store/selectors/group-messages.selectors';
import { GroupPeopleService } from './groups-people.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  private changeUsernameUrl = 'https://tasks.app.rs.school/angular/profile';
  private getUserProfileUrl = 'https://tasks.app.rs.school/angular/profile';
  private getGroupsUrl = 'https://tasks.app.rs.school/angular/groups/list';
  private createNewGroup = 'https://tasks.app.rs.school/angular/groups/create';
  private removeGroupUrl = 'https://tasks.app.rs.school/angular/groups/delete?groupID';
  private getParticipantsUrl = 'https://tasks.app.rs.school/angular/users';
  private getActiveConversations = 'https://tasks.app.rs.school/angular/conversations/list';
  private createConversationUrl = 'https://tasks.app.rs.school/angular/conversations/create';
  private getGroupMessagesUrl = 'https://tasks.app.rs.school/angular/groups/read';
  private sendGroupMessageUrl = 'https://tasks.app.rs.school/angular/groups/append';

  // GroupID to calculate the timestamp.
  groupID = new Subject<string>();

  // Timestamp for the last message in the group.
  // messageTimestamp$!: Observable<number>;


  constructor(private http: HttpClient, private authService: AuthService) { // this.groupID = this.groupPeopleService.groupId;
    // this.messageTimestamp$ = this.store.select(messageTimestamp(this.groupID.getValue()));
  }

  // Get user's (your) profile details.
  getUserProfile() {
    return this.http.get<Profile>(this.getUserProfileUrl);
  }

  // Update your name in the server.
  updateUsername(updatedUsername: string) {
    return this.http.put(this.changeUsernameUrl, {
      name: updatedUsername,
    });
  }

  // Get the Groups data from the remote server.
  getGroupsList() {
    return this.http.get(this.getGroupsUrl);
  }

  // Create a group with a proper name.
  createGroup(name: string) {
    return this.http.post<GroupId>(this.createNewGroup, {
      name: name,
    })
  }

  // Remove the group.
  deleteGroup(groupID: string){
    return this.http.delete(`${this.removeGroupUrl}=${groupID}`);
  }

  //Get the list of all participants.
  getParticipantsList(){
    return this.http.get<ParticipantsData>(this.getParticipantsUrl).pipe(catchError((err) => err));
  }

  //Get conversations' list of a current user.
  getConversations(){
    return this.http.get<ConversationsPData>(this.getActiveConversations);
  }

  // Create conversation with a user.
  createUserConversation(companionID: string){
    return this.http.post(this.createConversationUrl, {
      companion: companionID
    })
  }

  // Get specific group messages.
  getGroupMessages(groupID: string){
    const params = new HttpParams()
            .set("groupID", groupID);

    return this.http.get<GroupMessages>(this.getGroupMessagesUrl, { params })
  }

  // Update group messages.
  updaTeGroupMessages(groupID: string, timestamp: number){
    const params = new HttpParams()
            .set("groupID", groupID)
            .set("since", timestamp);

    return this.http.get<GroupMessages>(this.getGroupMessagesUrl, { params })
  }

  // Send a message to a group.
  sendGroupMessage(groupID: string, message: string){
    return this.http.post(this.sendGroupMessageUrl, {
      groupID: groupID,
      message: message
    });
  }
}
