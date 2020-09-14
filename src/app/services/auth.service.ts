import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.models';
import { map } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey = 'AIzaSyDfQr1xSXEGnQRrsiNS_KxJhloC6mMrk_I';

  userToken: string;

  //Create new users
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  //login 
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor(private http: HttpClient) {
    this.leerToken();
  }

  logout() {
    localStorage.removeItem('token');
  }

  login( usuario: UserModel) {
    
    const authData = {      
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${ this.url }signInWithPassword?key=${ this.apiKey }`,
      authData
    ).pipe(
      map( resp => {
      
        this.saveToken( resp['idToken'] );
        return resp;
      })
    );

  }

  registerNewUser( usuario: UserModel ) {

    const authData = {
      //email: usuario.email,
      //password: usuario.password,
      ...usuario, //Igual que hacer lo comentado arriba linea 30 y 31
      returnSecureToken: true
    };

    return this.http.post(
      `${ this.url }signUp?key=${ this.apiKey }`,
      authData
    ).pipe(
      map( resp => {
      
        this.saveToken( resp['idToken'] );
        return resp;
      })
    );
  }

  private saveToken ( idToken: string ) {

    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }

  leerToken() {

    if ( localStorage.getItem('token') ) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;
  }


  isAuthenticated(): boolean {

    return this.userToken.length > 2;

  } 

}
