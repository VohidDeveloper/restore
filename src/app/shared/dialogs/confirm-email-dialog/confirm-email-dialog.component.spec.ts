import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmEmailDialogComponent } from './confirm-email-dialog.component';

describe('ConfirmEmailDialogComponent', () => {
  let component: ConfirmEmailDialogComponent;
  let fixture: ComponentFixture<ConfirmEmailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmEmailDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmEmailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
