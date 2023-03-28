import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { user } from '../shared/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit{

  constructor
  (
    private _api: ApiService
  ){ }

  topUsers: user[] = [];

  backroundExist: boolean = true;

  ngOnInit(): void {

    this._api.postTypeRequest('user/home','').subscribe((res: any) => {

      if (res.status) {
        //console.log(res.data)
        res.data.forEach((Object: any) =>
        {
          let tempUser:user = new user();
          tempUser.username = Object['username'];
          tempUser.favColourHex = Object['favColourHex'];
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
