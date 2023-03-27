import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../../services/api.service'
import { AuthService } from './../../../services/auth.service'
import {FormGroup, ReactiveFormsModule, Validators, NgForm, FormControl} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  playerLoggedin: boolean = false
  errorMessage: any
  myForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _router:Router,
  ) { }

  ngOnInit(): void {
    this._auth.getLoggedIn().subscribe(value => {
      this.playerLoggedin = value;
    });
   }

    /*
    Submits the form to register a new user.
    If user API returns with success it will add a new user to the database
    and set the user into local storage logging them in.
    If user api returns with failure a error message will appear.
    Either username in use or invalid email.
  */
  onSubmit(form: FormGroup){

    if (this.myForm.valid) {
      this.errorMessage = undefined;
      this._api.postTypeRequest('user/register', form.value).subscribe((res: any) => {
        if (res.status)
        {
            console.log("register data:" + res.data);
            this._auth.setDataInLocalStorage('playerData', JSON.stringify(res.data));
            this._auth.setDataInLocalStorage('playerToken', res.token);
            this._auth.setLoggedIn(true);
        } else {
          this.errorMessage = res.data;
        }
      });
    }
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
