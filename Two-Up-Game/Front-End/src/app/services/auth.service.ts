import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }
  private loggedIn = new BehaviorSubject<boolean>(false);


  /*
    Check local storage for player data and if data is found; return it.
  */
   getPlayerDetails() {
    if(localStorage.getItem('playerData')){
      return localStorage.getItem('playerData')
    }else{
      return null
    }
  }

  /*
    Add a item to local storage.
  */
  setDataInLocalStorage(variableName: any, data: any) {
      localStorage.setItem(variableName, data);
  }

  /*
    Check local storage for player token and if token is found; return it.
  */
  getPlayerToken() {
      return localStorage.getItem('playerToken');
  }

  /*
    Clear local storage logging out any user connected.
  */
  clearStorage() {
      localStorage.clear();
  }

  /*
    Clear local storage logging out any user connected.
  */
  logoutPlayer() {
    localStorage.removeItem('playerData');
    localStorage.removeItem('playerToken');
    this.setLoggedIn(false);
  }

  setLoggedIn(value: boolean) {
    this.loggedIn.next(value);
  }

  getLoggedIn() {
    return this.loggedIn.asObservable();
  }
}
