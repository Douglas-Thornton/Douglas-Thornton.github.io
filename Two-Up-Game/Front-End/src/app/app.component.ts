import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service'
import { ApiService } from './services/api.service'
import { Router, NavigationEnd } from '@angular/router';
import {FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Two-Up-Game';
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
  )
  {
    this._router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd)
      {
        this.isUsersLogin();
      }
    });
   }

   ngOnInit(): void {
    this._auth.getLoggedIn().subscribe(value => {
      this.playerLoggedin = value;
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
}
