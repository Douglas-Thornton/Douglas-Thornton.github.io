import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LeaderboardComponent } from './leaderboard.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('LeaderboardComponent', () => {
  let component: LeaderboardComponent;
  let fixture: ComponentFixture<LeaderboardComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule],
      declarations: [ LeaderboardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LeaderboardComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController)
  });

  afterEach(() => {
    httpMock.verify();
  })

  // Component created.
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Fake a API response.
  it('should fetch top users from API', () => {
    // Set up mock response data.
    const mockResponse = {
      status: true,
      data:
      [
        {
          username: 'User1',
          favColorHex: '#000000',
          score: 100
        },
        {
          username: 'User2',
          favColorHex: '#ffffff',
          score: 200
        }
      ]
    }

      // Make API call
      component.ngOnInit();

      // Set up mock request
      const mockRequest = httpMock.expectOne('http://localhost:4000/user/leaderboard');

      // Assert that the correct HTTP method is used
      expect(mockRequest.request.method).toEqual('POST');

      // Respond with mock data
      mockRequest.flush(mockResponse);

      // Assert that the component's topUsers array is populated with the correct data
      expect(component.topUsers.length).toEqual(mockResponse.data.length);
      expect(component.topUsers[0].username).toEqual(mockResponse.data[0].username);
      expect(component.topUsers[0].favColorHex).toEqual(mockResponse.data[0].favColorHex);
      expect(component.topUsers[0].score).toEqual(mockResponse.data[0].score);

      expect(component.topUsers[1].username).toEqual(mockResponse.data[1].username);
      expect(component.topUsers[1].favColorHex).toEqual(mockResponse.data[1].favColorHex);
      expect(component.topUsers[1].score).toEqual(mockResponse.data[1].score);
  });
});
