import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  crearUsuario() {

    if (this.registerForm.invalid) {
      return;
    }

    const {nombre, correo, password} = this.registerForm.value;

    Swal.fire({
      title: 'Espere por favor',
      willOpen: () => {
        Swal.showLoading();
      }
    });

    this.authService.crearUsuario(nombre, correo, password)
     .then( credenciales => {
       console.log(credenciales);
       Swal.close();
       this.router.navigate(['/']);
     })
     .catch(err => {
       console.log(err);
       Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message
      });
     });

  }

}
