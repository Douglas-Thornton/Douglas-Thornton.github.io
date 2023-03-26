import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ApiService } from './../../services/api.service'
import { AuthService } from './../../services/auth.service'
import { Serializer } from '@angular/compiler';
import { user } from 'src/app/shared/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit{

  constructor
  (
    private _api: ApiService
  ){ }

  topUsers: user[] = [];

  backroundExist: boolean = true;

  ngOnInit(): void {

    this._api.postTypeRequest('user/leaderboard','').subscribe((res: any) => {

      if (res.status) {
        //console.log(res.data)
        res.data.forEach((Object: any) =>
        {
          let tempUser:user = new user();
          tempUser.username = Object['username'];
          tempUser.favColorHex = Object['favColorHex'];
          tempUser.score = Object['score'];
          this.topUsers?.push(tempUser);
        });

        this.topUsers.forEach(user => {
          console.log(user);
        });
      }
    })

  }

}
