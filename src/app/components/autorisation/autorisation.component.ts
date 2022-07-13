import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/services/user.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-autorisation',
  templateUrl: './autorisation.component.html',
  styleUrls: ['./autorisation.component.scss']
})
export class AutorisationComponent implements OnInit {

  autorForm = {
    email: '',
    password: ''
  }

  registForm = {
    email: '',
    password: '',
    passwordAgain: ''
  }

  isRegister = false;

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
  }

  /** 
   *  Функция проверки корректности
   *  email
   */
  validateEmail = (email:string) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  /** 
   * Функция валидации формы
   */
  doValidation(userEamil:string, password: string): boolean {
    let isValid = false;
    if(this.validateEmail(userEamil) && (password.length > 3)) {
      return (isValid = true);
    }  else {
      return isValid;
    }
  }

  /** 
   *  Функция-обертка авторизации
   *  для проверки ввести в форму:
   *  email: eve.holt@reqres.in
   *  password: cityslicka
   */
  autorisation(): void {
    if(this.doValidation(this.autorForm.email, this.autorForm.password)) {
      this.comeIn();
    } else {
      alert(`Проверте введенные данные!`);
    }
  }

  /** 
   *  Функция обращающаяся к сервису
   *  для выполнения авторизации
   */
  comeIn(): void {
    this.userService.comeInUser(this.autorForm).subscribe(response => {
      console.log(response);
      if (response != undefined) {
        alert(`Вы вошли в систему`);
        localStorage.setItem('token', response.token);
        console.log(localStorage.getItem('token'));
        this.router.navigate(['users']);
      } else {
        alert('Вход не выполнен! Проверте введенные данные и попробйте снова!');
      }
    });
  }

  /** 
   *  Функция-обертка регистрации
   *  для проверки ввести в форму:
   *  email: eve.holt@reqres.in
   *  password: pistol
   *  passwordAgain: pistol
   */
  doRegistration(): void {
    if(this.doValidation(this.registForm.email, this.registForm.password)) {
      this.registration();
    } else {
      alert(`Проверте введенные данные!`);
    }
  }

  /** 
   *  Функция обращающаяся к сервису
   *  для выполнения регистрации
   */
  registration(): void {
    if(this.registForm.password == this.registForm.passwordAgain) {
      let newUser = {
        email: this.registForm.email,
        password: this.registForm.password
      }
      
      this.userService.registUser(newUser).subscribe(response => {
        console.log(response);
        if (response != undefined) {
          alert(`Вы зарегестрированы`);
          localStorage.setItem('token', response.token);
          console.log(localStorage.getItem('token'));
          this.router.navigate(['users']);
        } else {
          alert('Неудача! Проверте введенные данные и попробйте снова!');
        }
      });
    } else {
      alert('Пароли не совпадают!');
    }
  }

  /** 
   *  Функция для отображения форм
   *  регистрации и авторизации
   */
  showRegisterForm() {
    this.isRegister = !this.isRegister;
  }
}
