import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuiComponent, Bet } from './gui.component';
import { ApiService } from './../../services/api.service';
import { AuthService } from './../../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { user } from 'src/app/shared/user';
import { Observable, of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CoinSpinComponent } from '../coin-spin/coin-spin.component';

describe('GuiComponent', () => {
  let component: GuiComponent;
  let fixture: ComponentFixture<GuiComponent>;
  let authService: AuthService;
  let apiService: ApiService;
  let httpClientModule: HttpClientModule;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, HttpClientModule],
      declarations: [ GuiComponent, CoinSpinComponent ],
      providers: [ApiService, AuthService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuiComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    apiService = TestBed.inject(ApiService);
    httpClientModule = TestBed.inject(HttpClientModule);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate result correctly for two heads bet', () => {
    component.coin_1 = true;
    component.coin_2 = true;
    component.PChosenBet = Bet.Two_Heads;
    component.calculateResult();
    expect(component.Result).toEqual(Bet.Two_Heads);
    expect(component.PSessionScore).toEqual(1);
  });

  it('should calculate result correctly for two tails bet', () => {
    component.coin_1 = false;
    component.coin_2 = false;
    component.PChosenBet = Bet.Two_Tails;
    component.calculateResult();
    expect(component.Result).toEqual(Bet.Two_Tails);
    expect(component.PSessionScore).toEqual(1);
  });

  it('should calculate result correctly for even bet', () => {
    component.coin_1 = true;
    component.coin_2 = false;
    component.PChosenBet = Bet.Even;
    component.calculateResult();
    expect(component.Result).toEqual(Bet.Even);
    expect(component.PSessionScore).toEqual(1);
  });

  it('should add session score to user score and reset session score', () => {
    component.PUser = new user();
    component.PUser.username = 'testuser';
    component.PUser.score = 10;
    component.PSessionScore = 5;

    spyOn(apiService, 'postTypeRequest').and.returnValue(of({ status: true, data: component.PUser, token: 'testtoken' }));
    spyOn(authService, 'setDataInLocalStorage');

    component.submitScore();

    expect(apiService.postTypeRequest).toHaveBeenCalledWith('user/gui', component.PUser);
    expect(component.PUser.score).toEqual(15);
    expect(authService.setDataInLocalStorage).toHaveBeenCalledWith('playerData', JSON.stringify(component.PUser));
    expect(authService.setDataInLocalStorage).toHaveBeenCalledWith('playerToken', 'testtoken');
    expect(component.PSessionScore).toEqual(0);
  });

  it('should select bet type correctly', () => {
    component.PChosenBet = Bet.Two_Heads;
    component.PBetSelected('Two Tails');
    expect(component.PChosenBet).toEqual(Bet.Two_Tails);
  });


  it('should change the users favorite colour when html binding is triggered', async () => {
    component.PUser = new user();
    component.PUser.username = 'testuser';
    component.playerIsLoggedin = true;

    let testValue = "#ff0000";
    fixture.detectChanges();

    console.log("CHECKING UI")
    let colourPickerDe: DebugElement = fixture.debugElement.query(By.css('.PlayerBGColour'));
    console.log("CHECKING DebugElement:" + colourPickerDe);

    let colourPickerEl: HTMLInputElement = colourPickerDe.nativeElement;
    console.log("CHECKING input element:" + colourPickerEl);

    colourPickerEl.value = testValue;
    colourPickerEl.dispatchEvent(new Event('input'));

    expect(component.PUser.favColourHex).toEqual("#ff0000");
  })
});
