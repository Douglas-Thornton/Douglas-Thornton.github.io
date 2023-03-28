import { ComponentFixture, TestBed } from '@angular/core/testing';
import {FormControl, FormGroup, FormsModule, NgControl, NgForm, ReactiveFormsModule, Validators} from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing'; // import the RouterTestingModule
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]),FormsModule, ReactiveFormsModule],
      declarations: [ LoginComponent ],
      providers: [AuthService]

    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate correct username field', () => {
    const formGroup: FormGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
    });

    // Set a valid username value
    formGroup.controls['username'].setValue('valid-username');
    formGroup.markAllAsTouched();

    console.log(formGroup)
;
    expect(formGroup.controls['username'].valid).toBe(true);
    expect(formGroup.status).toBe("VALID");
  });

  it('should validate incorrect username field', () => {
    const formGroup: FormGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
    });

    // Set an invalid username value
    formGroup.controls['username'].setValue('');
    formGroup.markAllAsTouched();

    expect(formGroup.controls['username'].valid).toBe(false);
    expect(formGroup.controls['username'].errors?.['required']).toBe(true);
    expect(formGroup.status).toBe("INVALID");
  });

  it('should validate correct email field', () => {
    const formGroup: FormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
    });

    // Set a valid email value
    formGroup.controls['email'].setValue('test@example.com');
    formGroup.markAllAsTouched();

    expect(formGroup.controls['email'].valid).toBe(true);
    expect(formGroup.status).toBe("VALID");
  });

  it('should validate incorrect email field', () => {
    const formGroup: FormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
    });

    // Set an invalid email value
    formGroup.controls['email'].setValue('invalid-email');
    formGroup.markAllAsTouched();

    expect(formGroup.controls['email'].valid).toBe(false);
    expect(formGroup.controls['email'].errors?.['email']).toBe(true);
    expect(formGroup.status).toBe("INVALID");
  });

  it('should validate correct password field', () => {
    const formGroup: FormGroup = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });

    // Set a valid password value
    formGroup.controls['password'].setValue('over8characters');
    formGroup.markAllAsTouched();

    expect(formGroup.controls['password'].valid).toBe(true);
    expect(formGroup.status).toBe("VALID");
  });

  it('should validate incorrect password field', () => {
    const formGroup: FormGroup = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8)])    });

    // Set an invalid password value
    formGroup.controls['password'].setValue('under8');
    formGroup.markAllAsTouched();

    console.log(formGroup.controls['password'].errors);
    expect(formGroup.controls['password'].valid).toBe(false);
    expect(formGroup.controls['password'].errors?.['minlength']).toBeTruthy();
    expect(formGroup.status).toBe("INVALID");
  });


  it('shouldnt post form if form is invalid', () => {

    const httpSpy = spyOn(httpClient, 'post');

    const formGroup: FormGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });

    // Set an invalid email value
    formGroup.controls['username'].setValue('');
    formGroup.controls['password'].setValue('invalid-password');

    formGroup.markAllAsTouched();
    expect(formGroup.status).toBe("INVALID");

    // Submit form.
    component.onSubmit(formGroup);

    // Submit should not have called apiservice without a valid form.
    expect(httpSpy).not.toHaveBeenCalled();
  });
});
