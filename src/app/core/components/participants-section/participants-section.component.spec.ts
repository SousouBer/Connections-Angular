import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantsSectionComponent } from './participants-section.component';

describe('ParticipantsSectionComponent', () => {
  let component: ParticipantsSectionComponent;
  let fixture: ComponentFixture<ParticipantsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ParticipantsSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipantsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
