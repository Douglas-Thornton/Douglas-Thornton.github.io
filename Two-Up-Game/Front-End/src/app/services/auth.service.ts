import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

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
  }
}
