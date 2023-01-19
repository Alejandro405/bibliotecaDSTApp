import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginrUserComponent } from './loginr-user.component';

describe('LoginrUserComponent', () => {
  let component: LoginrUserComponent;
  let fixture: ComponentFixture<LoginrUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginrUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginrUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
