import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaDialogComponent } from './venta-dialog.component';

describe('VentaDialogComponent', () => {
  let component: VentaDialogComponent;
  let fixture: ComponentFixture<VentaDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VentaDialogComponent]
    });
    fixture = TestBed.createComponent(VentaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
