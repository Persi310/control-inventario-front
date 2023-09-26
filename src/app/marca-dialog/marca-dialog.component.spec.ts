import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcaDialogComponent } from './marca-dialog.component';

describe('MarcaDialogComponent', () => {
  let component: MarcaDialogComponent;
  let fixture: ComponentFixture<MarcaDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarcaDialogComponent]
    });
    fixture = TestBed.createComponent(MarcaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
