import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPangolinComponent } from './my-pangolin.component';

describe('MyPangolinComponent', () => {
  let component: MyPangolinComponent;
  let fixture: ComponentFixture<MyPangolinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPangolinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyPangolinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
