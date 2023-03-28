import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { ApiService } from './../../services/api.service'
import { AuthService } from './../../services/auth.service'
import { Serializer } from '@angular/compiler';
import { user } from 'src/app/shared/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gui',
  templateUrl: './gui.component.html',
  styleUrls: ['./gui.component.css']
})
export class GuiComponent implements OnInit {

  @HostListener('window:keydown.space', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if(event.key == " ")
    {
      this.reroll();
    }
  }

  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    public _router:Router
  ) { }

  playerIsLoggedin: boolean = false
  errorMessage: any

  // Coin states: TRUE = HEADS; FALSE = TAILS;
  coin_1:boolean = true;
  coin_2:boolean = true;

  PUser!:user;
  PUsername:string = "";
  PChosenBet:Bet = Bet.Two_Heads;
  PSessionScore:number = 0;
  Spinning:boolean = false;

  Result:Bet = Bet.Two_Heads;

  public BetTypes =
  [
    "Two Heads",
    "Two Tails",
    "Even"
  ]

  ngOnInit(): void {
    this._auth.getLoggedIn().subscribe(value => {
      this.playerIsLoggedin = value;
    });
    this.isUserLoggedIn();
    this.fakeReroll();
  }

  isUserLoggedIn()
  {
    if(this._auth.getPlayerDetails() != null)
    {
      var PDetails = this._auth.getPlayerDetails()
      if(PDetails != null)
      {
        this.PUser = new user().deserialize(JSON.parse(PDetails));
        this._auth.setLoggedIn(true);
      }

    }
    else
    {
      this._auth.logoutPlayer();
      this._router.navigate(['login']);
    }
  }

   // Randomly select the values of the two coins; displaying a loading "spin" for 2 secconds before completion.
   reroll() : void
   {
     // Start spinning.
     this.Spinning = true;

     // Determine the results of the 2 coins.
     this.coin_1 = Math.random() < 0.5;
     this.coin_2 = Math.random() < 0.5;

     // Wait 2 secconds then stop spinning.
     this.runAsync().then(() => {
       this.Spinning = false;
     });
   }

  // On page load complete a coin flip animation without attributing score.
   fakeReroll() : void
   {
     // Start spinning.
     this.Spinning = true;

     // Determine the results of the 2 coins.
     this.coin_1 = Math.random() < 0.5;
     this.coin_2 = Math.random() < 0.5;

     // Wait 2 secconds then stop spinning.
     this.fakeAsync().then(() => {
       this.Spinning = false;
     });
   }

   runAsync(): Promise<void> {
     return new Promise((resolve, reject) => {
       setTimeout(() => {
         this.calculateResult();
         resolve();
       }, 2000)
     });
   }
   PBetSelected (value:String): void {
    this.PChosenBet = value as Bet;
  }

  fakeAsync(): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 2000)
    });
  }

  calculateResult()
  {
    if(this.coin_1 === this.coin_2)
    {
      if(this.coin_1)
      {
        this.Result = Bet.Two_Heads;
      }
      else
      {
        this.Result = Bet.Two_Tails;
      }
    }
    else
    {
      this.Result = Bet.Even;
    }

    if(this.PChosenBet == this.Result)
    {
      this.PSessionScore++;
    }
  }

  submitScore()
  {
    if(this.PUser != null)
    {
      console.log("Adding " +this.PSessionScore+" to " + this.PUser.username + "'s existing score of " + this.PUser.score + " totalling: "+  (this.PUser.score + this.PSessionScore));
      this.PUser.score += this.PSessionScore;

      this._api.postTypeRequest('user/gui', this.PUser).subscribe((res: any) => {

        if (res.status) {
          this._auth.setDataInLocalStorage('playerData', JSON.stringify(res.data));
          this._auth.setDataInLocalStorage('playerToken', res.token);
        }
      })

      this.PSessionScore = 0;

    }
  }
}

export enum Bet {
  Two_Heads = "Two Heads",
  Two_Tails = "Two Tails",
  Even = "Even",
}




