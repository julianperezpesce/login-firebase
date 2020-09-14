import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  constructor( private auth: AuthService ) { }

  ngOnInit() {
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
