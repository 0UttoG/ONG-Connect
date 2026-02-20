import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSucursales } from './admin-sucursales';

describe('AdminSucursales', () => {
  let component: AdminSucursales;
  let fixture: ComponentFixture<AdminSucursales>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSucursales]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSucursales);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
