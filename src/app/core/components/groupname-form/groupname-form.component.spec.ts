import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupnameFormComponent } from './groupname-form.component';

describe('GroupnameFormComponent', () => {
  let component: GroupnameFormComponent;
  let fixture: ComponentFixture<GroupnameFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ GroupnameFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupnameFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
