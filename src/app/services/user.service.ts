import { Injectable } from '@angular/core';

import { User } from '../models/user';
import { UsersJson } from '../models/users-json';
import { UserJson } from '../models/user-json';
import { ResourcesJson } from '../models/resourses-json';

import { Observable, ObservableInput } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs';

const httpOption = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = 'https://reqres.in/api/users?page=2'  

  constructor(private http: HttpClient) { }

  /** функция отлова ошибок при запросе к серверу */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} faild: ${error.message}`);
      return of(result as T);
    };
  }

  /** GET запрос для получения списка всех пользователей */
  getUsers(): Observable<UsersJson> {
    return this.http.get<UsersJson>(this.usersUrl).pipe(
      tap(() => console.log('fetched users')),
      catchError(this.handleError<UsersJson>('getUsers'))
    );
  }

  /** GET запрос для получения списка всех ресурсов */
  getResources(): Observable<ResourcesJson> {
    let url = 'https://reqres.in/api/unknown'
    return this.http.get<ResourcesJson>(url).pipe(
      tap(() => console.log('fetched resources')),
      catchError(this.handleError<UsersJson>('getResources'))
    );
  }

  /** GET запрос для получения конкретного пользователя по id*/
  getUser(id:number): Observable<UserJson> {
    const url = `https://reqres.in/api/users/${id}`;

    return this.http.get<UserJson>(url).pipe(
      tap(() => {
        console.log(`fetched user id=${id}`)}),
      catchError(this.handleError<UserJson>(`getUser id=${id}`))
    );
  }

  /** PUT запрос для обновления данных пользователя */
  updateUser(id:number,userJson:UserJson): Observable<any> {
    const url = `https://reqres.in/api/users/${id}`;
    return this.http.put(url, JSON.stringify(userJson), {observe: 'response'}).pipe(
      tap(() => {
        console.log(`update user id=${id}`)}),
      catchError(this.handleError<UserJson>(`uptadeUser id=${id}`))
    );
  }

  /** DELETE запрос для удаления конкретного пользователя */
  deleteUser(user: User | number): Observable<any> {
    const id = typeof user === 'number' ? user : user.id;
    const url = `https://reqres.in/api/users/${id}`;

    return this.http.delete<User>(url, {observe: 'response'}).pipe(
      tap(() => {
        console.log(`delete user id=${id}`)}),
      catchError(this.handleError<User>(`deleteUser id=${id}`))
    );
  }

  /** POST запрос для авторизации пользователя
   *  для проверки ввести в форму:
   *  email: eve.holt@reqres.in
   *  password: cityslicka
   */
  comeInUser(autorForm: object): Observable<any> {
    const url = `https://reqres.in/api/login`;

    return this.http.post(url, autorForm, httpOption).pipe(
      tap(() => {
        console.log(`Your login`)}),
      catchError(this.handleError(`comeInuser`))
    );
  }

  /** POST запрос для регитсрации пользователя
   *  для проверки ввести в форму:
   *  email: eve.holt@reqres.in
   *  password: pistol
   *  passwordAgain: pistol
   */
  registUser(newUser: object): Observable<any> {
    const url = `https://reqres.in/api/register`;
    return this.http.post(url, newUser, httpOption).pipe(
      tap(() => {
        console.log(`Success autorisation`)}),
      catchError(this.handleError(`comeInuser`))
    );

  }
}
