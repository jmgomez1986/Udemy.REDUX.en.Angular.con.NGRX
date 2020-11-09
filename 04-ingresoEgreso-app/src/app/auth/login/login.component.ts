import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    const {correo, password} = this.loginForm.value;

    Swal.fire({
      title: 'Espere por favor',
      willOpen: () => {
        Swal.showLoading();
      }
    });

    this.authService.loginUsuario(correo, password)
      .then(credentials => {
        console.log(credentials);
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
