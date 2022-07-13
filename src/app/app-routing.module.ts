import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainListUsersComponent } from './components/main-list-users/main-list-users.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { AutorisationComponent } from './components/autorisation/autorisation.component';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';

const routes: Routes = [
  {path: 'users', component: MainListUsersComponent},
  {path: '', component: AutorisationComponent},
  {path: 'user/:id', component: UserDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule implements OnInit {

  constructor() { }

  ngOnInit() { }


}
