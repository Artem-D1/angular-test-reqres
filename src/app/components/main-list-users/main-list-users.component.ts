import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/models/user';
import { Resource } from 'src/app/models/resource';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-main-list-users',
  templateUrl: './main-list-users.component.html',
  styleUrls: ['./main-list-users.component.scss']
})
export class MainListUsersComponent implements OnInit {

  users: User[] = [];
  resources: Resource[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
    this.getResources();
  }

  /** 
   * Функция обрабатывающая полученные данные с сервера, 
   * для формирования списка пользователей
  */
  getUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users.data;
    });
  }

  /** 
   * Функция обрабатывающая полученные данные с сервера, 
   * для формирования списка ресурсов
  */
  getResources(): void {
    this.userService.getResources().subscribe(resources => {
      this.resources = resources.data;
    });
  }

  /** 
   * Функция для удаления выбранного пользователя
  */
  delete(user: User): void {
    this.users = this.users.filter(u => u !== user);
    this.userService.deleteUser(user).subscribe((response) => {
      if(response.status == 204) {
        alert(`Пользователь удален! Код ответа сервера: ${response.status}`);
      } else {
        alert(`Что-то пошло не так! Попробуйте повторить действие позже`);
      }
    });
  }
}
