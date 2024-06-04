import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PencatatanComponent } from './pencatatan.component';

describe('PencatatanComponent', () => {
  let component: PencatatanComponent;
  let fixture: ComponentFixture<PencatatanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PencatatanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PencatatanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
