import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeartSwitchComponent } from './heart-switch.component';

describe('HeartSwitchComponent', () => {
  let component: HeartSwitchComponent;
  let fixture: ComponentFixture<HeartSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeartSwitchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeartSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
