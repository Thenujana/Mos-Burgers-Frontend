import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdersPageComponent } from './oders-page.component';

describe('OdersPageComponent', () => {
  let component: OdersPageComponent;
  let fixture: ComponentFixture<OdersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OdersPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OdersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
