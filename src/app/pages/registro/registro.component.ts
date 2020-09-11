import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.models';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UserModel;

  constructor() { }

  ngOnInit() { 
    this.usuario = new UserModel();
  }

  onSubmit( form: NgForm ) {

    if ( form.invalid ) {
      return;
    }
    console.log('formulario enviado');
    console.log(this.usuario);
    console.log(form);
    
    
  }


}
