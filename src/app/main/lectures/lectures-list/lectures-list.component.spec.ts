import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturesListComponent } from './lectures-list.component';

describe('LecturesListComponent', () => {
  let component: LecturesListComponent;
  let fixture: ComponentFixture<LecturesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LecturesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LecturesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
