import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {FormControl, FormsModule} from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing'; // import the RouterTestingModule
import { trigger } from '@angular/animations';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule,RouterTestingModule],
      declarations: [ LoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should confirm log in if successful', async () => {
    const usernameField = fixture.debugElement.query(By.css('#loginUsername')).nativeElement;
    const passwordField = fixture.debugElement.query(By.css('#loginPassword')).nativeElement;
    const form = fixture.debugElement.query(By.css('form')).nativeElement;

    spyOn(component, 'onSubmit');
    spyOn(component, 'redirectToGame');

    usernameField.value = 'jasmine';
    passwordField.value = 'jasmine';

    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    if (fixture.ngZone) {
      await fixture.ngZone.run(() => {
        expect(component.onSubmit).toHaveBeenCalled();
      });
    }
  });
});
