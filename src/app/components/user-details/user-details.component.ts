import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/models/user';
import { UserJson } from 'src/app/models/user-json';

import { UserService } from 'src/app/services/user.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  user!: User;
  userJson!: UserJson;
  isEdit = false;

  constructor(private activatedRoute: ActivatedRoute, 
              private location: Location, 
              private userService: UserService) { 
                
              }

  ngOnInit(): void {
    this.getUser();
  }

  /** 
   *  Функция обрабатывающая полученные данные с сервера, 
   *  для формирования конкретного пользователя
   */
  getUser(): void {
    const id = +this.activatedRoute.snapshot.params['id'];
    this.userService.getUser(id).subscribe(user => {
      if (user != undefined) {
        this.user = user.data;
        this.userJson = user;
      }
    });
  }

  /** 
   *  Функция для открытия и закрытия
   *  формы редактирования пользователя
   */
  showEdit() {
    this.isEdit = !this.isEdit;
  }

  goBack(): void {
    this.location.back();
  }

  /** 
   *  Функция для сохранения измененных данных
   */
  save(): void {
    this.userJson.data = this.user;
    const id = +this.activatedRoute.snapshot.params['id'];
    this.userService.updateUser(id, this.userJson).subscribe((response) => {
      if(response.status == 200) {
        alert(`Данные пользователя обновлены! Код ответа сервера: ${response.status}`);
      } else {
        alert(`Что-то пошло не так! Попробуйте повторить действие позже`);
      }
      this.showEdit()});
  }

}
