import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Bet, GuiComponent } from './gui.component';
import { ApiService } from './../../services/api.service';
import { AuthService } from './../../services/auth.service';
import { user } from 'src/app/shared/user';

describe('GuiComponent', () => {
  let component: GuiComponent;
  let fixture: ComponentFixture<GuiComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    let apiSpy = jasmine.createSpyObj('ApiService', ['postTypeRequest']);
    let authSpy = jasmine.createSpyObj('AuthService', ['getPlayerDetails', 'setLoggedIn', 'logoutPlayer', 'getLoggedIn', 'setDataInLocalStorage']);
    let routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ GuiComponent ],
      providers: [
        { provide: ApiService, useValue: apiSpy },
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture = TestBed.createComponent(GuiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reroll the coins on spacebar press', () => {
    const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
    spyOn(component, 'reroll');

    window.dispatchEvent(spaceEvent);

    expect(component.reroll).toHaveBeenCalled();
  });


  it('should navigate to login page and logout player when user is not logged in', () => {
    authServiceSpy.getPlayerDetails.and.returnValue(null);

    component.isUserLoggedIn();

    expect(authServiceSpy.logoutPlayer).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['login']);
  });

  it('should update PSessionScore when chosen bet matches result', () => {
    component.coin_1 = true;
    component.coin_2 = true;
    component.PChosenBet = Bet.Two_Heads;

    component.calculateResult();

    expect(component.PSessionScore).toBe(1);
  });

  it('should update PUser score and save data on submitScore', () => {

    component.PUser = new user();
    component.PSessionScore = 5;
    //apiServiceSpy.postTypeRequest.and.returnValue({ status: true, data: component.PUser, token: 'testtoken' });

    component.submitScore();

    expect(apiServiceSpy.postTypeRequest).toHaveBeenCalledWith('user/gui', component.PUser);
    expect(component.PUser.score).toBe(5);
    expect(authServiceSpy.setDataInLocalStorage).toHaveBeenCalledWith('playerData', JSON.stringify(component.PUser));
    expect(authServiceSpy.setDataInLocalStorage).toHaveBeenCalledWith('playerToken', 'testtoken');
  });
});
