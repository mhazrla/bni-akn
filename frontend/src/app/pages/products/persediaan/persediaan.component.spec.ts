import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersediaanComponent } from './persediaan.component';

describe('PersediaanComponent', () => {
  let component: PersediaanComponent;
  let fixture: ComponentFixture<PersediaanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersediaanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersediaanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
