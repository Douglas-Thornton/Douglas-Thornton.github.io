import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { GuiComponent } from './game/gui/gui.component';
import { CoinSpinComponent } from './game/coin-spin/coin-spin.component';
import { FormsModule } from '@angular/forms';
import { LeaderboardComponent } from './game/leaderboard/leaderboard.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    GuiComponent,
    CoinSpinComponent,
    LeaderboardComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    AuthModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
