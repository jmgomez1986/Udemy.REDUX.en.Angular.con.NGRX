import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.scss']
})
export class IngresoEgresoComponent implements OnInit {
  ingresoForm: FormGroup;
  tipo = 'ingreso';

  constructor(
    private fb: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required],
    });
  }

  guardar() {
    if (this.ingresoForm.invalid) {
      return;
    }

    const {descripcion, monto} = this.ingresoForm.value;

    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);

    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
    .then(ref => {
      console.log('Exito: ', ref);
      this.ingresoForm.reset();
      Swal.fire('Registro creado', descripcion, 'success');
    })
    .catch(err => Swal.fire('Error: ', err.messege, 'error'));
  }

}
