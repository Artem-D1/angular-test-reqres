import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { MainListUsersComponent } from './components/main-list-users/main-list-users.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';

import { UserService } from './services/user.service';
import { AutorisationComponent } from './components/autorisation/autorisation.component';



@NgModule({
  declarations: [
    AppComponent,
    MainListUsersComponent,
    UserDetailsComponent,
    AutorisationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
