import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxElectronModule } from 'ngx-electron';

import { AppRoutingModule } from './app-routing.module';
import { GameComponent } from './game/game.component';
import { StartComponent } from './start/start.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    StartComponent
  ],
  imports: [
    BrowserModule,
    NgxElectronModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
