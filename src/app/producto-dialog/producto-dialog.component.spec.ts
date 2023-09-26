import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoDialogComponent } from './producto-dialog.component';

describe('ProductoDialogComponent', () => {
  let component: ProductoDialogComponent;
  let fixture: ComponentFixture<ProductoDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductoDialogComponent]
    });
    fixture = TestBed.createComponent(ProductoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
