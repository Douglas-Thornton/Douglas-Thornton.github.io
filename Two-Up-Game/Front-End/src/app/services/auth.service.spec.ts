import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getPlayerDetails should return null when localStorage is empty', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    const result = service.getPlayerDetails();
    expect(result).toBeNull();
  });

  it('getPlayerDetails should return data when localStorage has data', () => {
    const testData = 'testData';
    spyOn(localStorage, 'getItem').and.returnValue(testData);
    const result = service.getPlayerDetails();
    expect(result).toEqual(testData);
  });

  it('setDataInLocalStorage should set item in localStorage', () => {
    const variableName = 'testVariable';
    const testData = 'testData';
    spyOn(localStorage, 'setItem');
    service.setDataInLocalStorage(variableName, testData);
    expect(localStorage.setItem).toHaveBeenCalledWith(variableName, testData);
  });

  it('getPlayerToken should return token from localStorage', () => {
    const testToken = 'testToken';
    spyOn(localStorage, 'getItem').and.returnValue(testToken);
    const result = service.getPlayerToken();
    expect(result).toEqual(testToken);
  });

  it('clearStorage should clear all items from localStorage', () => {
    spyOn(localStorage, 'clear');
    service.clearStorage();
    expect(localStorage.clear).toHaveBeenCalled();
  });

  it('logoutPlayer should remove playerData and playerToken from localStorage and set loggedIn to false', () => {
    spyOn(localStorage, 'removeItem').and.callThrough();
    spyOn(service, 'setLoggedIn');
    service.logoutPlayer();
    expect(localStorage.removeItem).toHaveBeenCalledWith('playerData');
    expect(localStorage.removeItem).toHaveBeenCalledWith('playerToken');
    expect(service.setLoggedIn).toHaveBeenCalledWith(false);
  });

  it('setLoggedIn should set loggedIn to the given value', (done: DoneFn) => {
    const testValue = true;
    service.setLoggedIn(testValue);
    service.getLoggedIn().subscribe((loggedInValue) => {
      expect(loggedInValue).toEqual(testValue);
      done();
    });
  });

  it('getLoggedIn should return an observable of loggedIn', () => {
    expect(service.getLoggedIn()).toEqual(jasmine.any(Object));
  });
});
