import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRiesgos } from './admin-riesgos';

describe('AdminRiesgos', () => {
  let component: AdminRiesgos;
  let fixture: ComponentFixture<AdminRiesgos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRiesgos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRiesgos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
