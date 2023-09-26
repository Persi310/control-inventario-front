import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiendaDialogComponent } from './tienda-dialog.component';

describe('TiendaDialogComponent', () => {
  let component: TiendaDialogComponent;
  let fixture: ComponentFixture<TiendaDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TiendaDialogComponent]
    });
    fixture = TestBed.createComponent(TiendaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
