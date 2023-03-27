import { ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule, NgForm} from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing'; // import the RouterTestingModule

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterTestingModule, FormsModule],
      declarations: [ LoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    httpMock = TestBed.inject(HttpTestingController)
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should confirm log in if successful', async () => {
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
    const testForm = <NgForm>
    {
      value:
      {
        password: "TestUser1",
        username: "TestUser1"
      }
    }

    // Make api call.
    component.onSubmit(testForm);

    // Set up mock request
    const mockRequest = httpMock.expectOne('http://localhost:4000/user/login');

    // Assert that the correct HTTP method is used
    expect(mockRequest.request.method).toEqual('POST');

    // Respond with mock data
    mockRequest.flush(mockResponse);

    // Assert that the component has logged in a user.
    expect(component.playerIsLoggedin).toEqual(true);
  });
});
