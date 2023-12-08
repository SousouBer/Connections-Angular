import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GroupPeopleService {
  showModalBoolean = new Subject<boolean>();

  showOrHideModalWindow(value: boolean){
    this.showModalBoolean.next(value);
  }
}