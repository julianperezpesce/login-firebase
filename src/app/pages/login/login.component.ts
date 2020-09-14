import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.models';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UserModel = new UserModel();
  rememberMe = false;

  constructor( private auth: AuthService,
               private router: Router ) { }

  ngOnInit() {

    if (localStorage.getItem('email')) {
      this.user.email = localStorage.getItem('email');
      this.rememberMe = true;
    }
  }

  login( form: NgForm ) {

    if ( form.invalid ) {
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      title: 'Info',
      text: 'Procesando...',
      icon: 'info'
    });
    Swal.showLoading(); 
    
    this.auth.login( this.user )
      .subscribe(res => {
        console.log(res);
        Swal.close();

        if ( this.rememberMe ) {
          localStorage.setItem('email', this.user.email);
        }

        this.router.navigateByUrl('/home');
        
      }, (err) => {
        console.log(err.error.error.message);
        Swal.fire({
          title: 'Error',
          text: err.error.error.message,
          icon: 'error'
        });
        
      })
    
  }

}
