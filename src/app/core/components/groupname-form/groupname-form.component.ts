import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupPeopleService } from '../../services/groups-people.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DataStorageService } from '../../services/data-storage.service';

@Component({
  selector: 'app-groupname-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './groupname-form.component.html',
  styleUrls: ['./groupname-form.component.scss'],
})
export class GroupnameFormComponent implements OnInit {
  groupForm!: FormGroup;

  constructor(private groupPeopleService: GroupPeopleService, private dataStorageService: DataStorageService) {}

  ngOnInit(): void {
    this.groupForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(30),
        this.onlyLettersAndSpaces.bind(this),
      ]),
    });
  }

  onlyLettersAndSpaces(control: FormControl): { [s: string]: boolean } | null {
    // Shorthand for using the FormControl value
    const value = control.value;

    if (!value) {
      return null;
    }

    // Check for only letters and spaces
    const allowedLetters = /[^a-zA-Z\s]/.test(value);

    if (allowedLetters) {
      return { onlyLettersAndLettersAllowed: true };
    }

    return null;
  }

  // Shorthand for accessing the value in the template.
  get name() {
    return this.groupForm.get('name');
  }

  hideModal() {
    this.groupPeopleService.showOrHideModalWindow(false);
  }

  // Submitting the form and sending the group name to the server
  onSubmit() {
    const groupName = this.groupForm.value.name;

    this.groupPeopleService.addGroupToStore(groupName);

    this.dataStorageService.createGroup(groupName).subscribe(val => console.log(val, groupName))
    console.log(groupName);
    this.groupForm.reset();
    this.hideModal();
  }
}
