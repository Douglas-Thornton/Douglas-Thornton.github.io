import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import { ApiService } from './../../../services/api.service'
import { AuthService } from './../../../services/auth.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  playerLoggedin: boolean = false
  errorMessage: any
  myForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });
  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _router:Router
  ) { }

   ngOnInit(): void {
    this._auth.getLoggedIn().subscribe(value => {
      this.playerLoggedin = value;
    });
   }

  /*
    Submits the form to the user API log in the user.
    If user API returns with success it will set the user into local storage.
    If user api returns with failure a error message will appear.
  */
  onSubmit(form: FormGroup) {
    if (this.myForm.valid) {
    this.errorMessage = undefined;
    console.log('Your form data : ', form.value);
    this._api.postTypeRequest('user/login', form.value).subscribe((res: any) => {

      if (res.status)
      {
          this._auth.setDataInLocalStorage('playerData', JSON.stringify(res.data));
          this._auth.setDataInLocalStorage('playerToken', res.token);
          this._auth.setLoggedIn(true);
      }
      else
      {
        this.errorMessage = res.data;
      }
    })
   }
  }

  /*
    Logs out the current user by clearing out the local storage.
  */
  logout()
  {
    this._auth.logoutPlayer();
  }

  /*
    Redirects current url the game window if the player is logged in.
  */
  redirectToGame()
  {
    if(this._auth.getLoggedIn())
    {
      this._router.navigate(['gui']);
    }
  }
}
