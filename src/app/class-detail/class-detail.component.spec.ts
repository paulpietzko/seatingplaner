import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassDetailComponent } from './class-detail.component';

describe('ClassDetailComponent', () => {
  let component: ClassDetailComponent;
  let fixture: ComponentFixture<ClassDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassDetailComponent]
    });
    fixture = TestBed.createComponent(ClassDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
