import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service'
import { ApiService } from './services/api.service'

import { Router, NavigationEnd } from '@angular/router';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'Two-Up-Game';
  playerLoggedin: boolean = false
  errorMessage: any
  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _router:Router
  )
  {
    this._router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd)
      {
        this.isUsersLogin();
      }
    });
   }


  isUsersLogin()
  {
    if(this._auth.getPlayerDetails() != null)
    {
      this.playerLoggedin = true;
    }
    else
    {
      this.playerLoggedin = false;
    }
  }

  logout(){
    this._auth.clearStorage()
    this._router.navigate(['']);
    window.location.reload();
  }

  onSubmit(form: NgForm) {
    console.log('Your form data : ', form.value);
    this._api.postTypeRequest('user/app', form.value).subscribe((res: any) => {

      if (res.status) {
          this._auth.setDataInLocalStorage('playerData', JSON.stringify(res.data));
          this._auth.setDataInLocalStorage('playerToken', res.token);
      }
    window.location.reload();
    this.isUsersLogin();
    })
  }
}
