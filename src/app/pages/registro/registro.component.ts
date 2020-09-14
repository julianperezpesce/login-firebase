import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.models';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UserModel;
  rememberMe = false;

  constructor( private auth: AuthService,
               private router: Router ) { }

  ngOnInit() { 
    this.usuario = new UserModel();
  }

  onSubmit( form: NgForm ) {

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

    this.auth.registerNewUser( this.usuario )
      .subscribe( resp => {
        console.log(resp);
        Swal.close();

        if (this.rememberMe) {
          localStorage.setItem('email', this.usuario.email)
          this.rememberMe = true;
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
