import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupMessagegComponent } from './group-messageg.component';

describe('GroupMessagegComponent', () => {
  let component: GroupMessagegComponent;
  let fixture: ComponentFixture<GroupMessagegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ GroupMessagegComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupMessagegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
