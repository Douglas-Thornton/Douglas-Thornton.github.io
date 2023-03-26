import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ApiService } from './../../../services/api.service'
import { AuthService } from './../../../services/auth.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  playerIsLoggedin: boolean = false
  errorMessage: any
  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _router:Router
  ) { }
  ngOnInit() {
    this.isUsersLoggedIn();
  }

  /*
    Submits the form to the user API log in the user.
    If user API returns with success it will set the user into local storage.
    If user api returns with failure a error message will appear.
  */
  onSubmit(form: NgForm) {
    this.errorMessage = undefined;
    console.log('Your form data : ', form.value);
    this._api.postTypeRequest('user/login', form.value).subscribe((res: any) => {

      if (res.status)
      {
          this._auth.setDataInLocalStorage('playerData', JSON.stringify(res.data));
          this._auth.setDataInLocalStorage('playerToken', res.token);
          window.location.reload();
          this.isUsersLoggedIn();
      }
      else
      {
        this.errorMessage = res.data;
      }
    })
  }

  /*
    Checks if the is local data storage for a currently logged in user.
    If data is retrieved the player is logged in and will be redirected to the game.
  */
  isUsersLoggedIn(){
    if(this._auth.getPlayerDetails() != null)
    {
      this.playerIsLoggedin = true;
      this.redirectToGame();
    }
  }

  /*
    Logs out the current user by clearing out the local storage.
  */
  logout()
  {
    this._auth.logoutPlayer();
    this.playerIsLoggedin = false;
    window.location.reload();
   }

  /*
    Redirects current url the game window if the player is logged in.
  */
  redirectToGame()
  {
    if(this.playerIsLoggedin)
    {
      this._router.navigate(['gui']);
    }
  }
}
