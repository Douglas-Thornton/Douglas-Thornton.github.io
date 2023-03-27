import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../../services/api.service'
import { AuthService } from './../../../services/auth.service'
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
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
    Submits the form to register a new user.
    If user API returns with success it will add a new user to the database
    and set the user into local storage logging them in.
    If user api returns with failure a error message will appear.
    Either username in use or invalid email.
  */
  onSubmit(form: NgForm){
    this.errorMessage = undefined;
    this._api.postTypeRequest('user/register', form.value).subscribe((res: any) => {
      if (res.status)
      {
          console.log("register data:" + res.data);
          this._auth.setDataInLocalStorage('playerData', JSON.stringify(res.data));
          this._auth.setDataInLocalStorage('playerToken', res.token);
          this.isUsersLoggedIn();

      } else {
        this.errorMessage = res.data;
      }
    });
  }

  /*
    Checks if the is local data storage for a currently logged in user.
    If data is retrieved the player is logged in and will be redirected to the game.
  */
    isUsersLoggedIn(){
      if(this._auth.getPlayerDetails() != null)
      {
        this.playerIsLoggedin = true;
      }
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
