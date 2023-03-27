import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RegisterComponent } from './register.component';
import { AuthService } from './../../../services/auth.service'
import {FormGroup, FormsModule, NgForm} from '@angular/forms'
import { RouterTestingModule } from '@angular/router/testing';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let httpMock: HttpTestingController;
  let _auth: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule,FormsModule],
      declarations: [ RegisterComponent ],
      providers: [AuthService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;

    httpMock = TestBed.inject(HttpTestingController)
    fixture.detectChanges();
  });

   afterEach(() => {
    httpMock.verify();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log in a user that has registered', async () =>
  {
    // Set up mock response data.
    const mockResponse = {
      status: true,
      data:
      [
        {
          username: 'User1',
          favColorHex: '#000000',
          score: 100
        }
      ]
    }

    // Set up mock form
    const testForm = <FormGroup>
    {
      value:
      {
        password: "randomUser",
        username: "randomUser",
        email: "randomUser@randomUser.com.au"
      }
    }

    component.onSubmit(testForm);

    // Set up mock request
    const mockRequest = httpMock.expectOne('http://localhost:4000/user/register');

    // Assert that the correct HTTP method is used
    expect(mockRequest.request.method).toEqual('POST');

    // Respond with mock data
    mockRequest.flush(mockResponse);

    // Assert that the component has logged in a user.
    expect(component.playerLoggedin).toEqual(true);

  })
});

