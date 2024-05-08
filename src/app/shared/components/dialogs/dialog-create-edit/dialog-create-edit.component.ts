import { Component, Inject, OnInit } from '@angular/core';
import { SharedLibreriasModule } from '../../../modules/shared.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ReservasService } from '../../../../reservas/reservas.service';
import { HabitacionesService } from '../../../../habitaciones/habitaciones.service';
import { HotelesService } from '../../../../hotel/hoteles.service';

export interface DialogData {
  IsPost: boolean;
  data: any;
  model: string;
  title: string;
}

@Component({
  selector: 'app-dialog-create-edit',
  standalone: true,
  imports: [SharedLibreriasModule, CommonModule, ReactiveFormsModule],
  templateUrl: './dialog-create-edit.component.html',
  styleUrl: './dialog-create-edit.component.scss'
})
export class DialogCreateEditComponent implements OnInit {

  form: FormGroup;
  formReservas!: FormGroup;

  Habitaciones: any[] = []
  Hoteles: any[] = []

  constructor(public dialogRef: MatDialogRef<DialogCreateEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private serviceHabitaciones: HabitacionesService,
    private serviceHoteles: HotelesService,
    private serviceReservas: ReservasService) {
      console.log(data);
      this.form = this.fb.group({
        id: new FormControl(''),
        nombre: new FormControl('',Validators.required)
      });
      this.formReservas = this.fb.group({
        id: new FormControl(''),
        nombre: new FormControl('',Validators.required),
        IdEstudiante: new FormControl('',Validators.required),
        IdProfesor: new FormControl('',Validators.required),
        valor: new FormControl('',Validators.required)
      });

      if(this.data.IsPost === false && this.data.model === 'Hoteles') {
        console.log(this.data?.data?.hotel);
        this.form.get('id')?.setValue(this.data?.data?.hotel.id);
        this.form.get('nombre')?.setValue(this.data?.data?.hotel.nombre);
      }

      // if(this.data.IsPost === false && this.data.model !== 'Reservas') {
      //   this.form.get('id')?.setValue(this.data?.data?.id);
      //   this.form.get('nombre')?.setValue(this.data?.data?.nombre);
      // }
      if(this.data.IsPost === false && this.data.model === 'Reservas') {
        this.formReservas.get('id')?.setValue(this.data?.data?.id);
        this.formReservas.get('nombre')?.setValue(this.data?.data?.nombre);
        this.formReservas.get('IdProfesor')?.setValue(this.data?.data?.profesor?.id);
        this.formReservas.get('IdEstudiante')?.setValue(this.data?.data?.estudiante?.id);
        this.formReservas.get('valor')?.setValue(this.data?.data?.valor);
      }

      if(this.data.model === 'Reservas') {
        this.getServices();
      }


    }

  ngOnInit(): void {
    
  } 

  getServices() {
    this.serviceHabitaciones.getHabitaciones().subscribe(rest => {
      this.Habitaciones = rest;
    });
    this.serviceHoteles.getHoteles().subscribe(rest => {
      this.Hoteles = rest;
    });
  }

  save() {
    if(this.form.status === 'VALID') {
      if(this.data.model === 'Habitaciones') {
        if(this.data.IsPost === true) {
          let modelPost = {
            nombre: this.form.get('nombre')?.value
          }
          this.serviceHabitaciones.postHabitaciones(modelPost).subscribe(restCreate => {
            this.dialogRef.close(true);
          });
        } else {
          let modelPut = {
            id:this.form.get('id')?.value,
            nombre: this.form.get('nombre')?.value
          }
          this.serviceHabitaciones.putHabitaciones(this.form.get('id')?.value, modelPut).subscribe(restCreate => {
            this.dialogRef.close(true);
          });
        }
      } else if(this.data.model === 'Hoteles') {
        if(this.data.IsPost === true) {
          let modelPost = {
            nombre: this.form.get('nombre')?.value
          }
          this.serviceHoteles.postHoteles(modelPost).subscribe(restCreate => {
            this.dialogRef.close(true);
          });
        } else {
          let modelPut = {
            id:this.form.get('id')?.value,
            nombre: this.form.get('nombre')?.value
          }
          this.serviceHoteles.putHoteles(this.form.get('id')?.value, modelPut).subscribe(restCreate => {
            this.dialogRef.close(true);
          });
        } 
      } 
    } else {
      this.form.markAllAsTouched();
    }
  } 

  saveReservas() {
    if(this.formReservas.status === 'VALID') {
      if(this.data.IsPost === true) {
        let modelPost = {
          nombre: this.formReservas.get('nombre')?.value,
          IdEstudiante: this.formReservas.get('IdEstudiante')?.value,
          IdProfesor: this.formReservas.get('IdProfesor')?.value,
          valor: this.formReservas.get('valor')?.value
        }
        this.serviceReservas.postReservas(modelPost).subscribe(restCreate => {
          this.dialogRef.close(true);
        });
      } else {
        let modelPut = {
          id:this.formReservas.get('id')?.value,
          nombre: this.formReservas.get('nombre')?.value,
          IdEstudiante: this.formReservas.get('IdEstudiante')?.value,
          IdProfesor: this.formReservas.get('IdProfesor')?.value,
          valor: this.formReservas.get('valor')?.value
        }
        this.serviceReservas.putReservas(this.formReservas.get('id')?.value, modelPut).subscribe(restCreate => {
          this.dialogRef.close(true);
        });
      } 
    } else {
      this.formReservas.markAllAsTouched();
    }
  }

  close() {
    this.dialogRef.close(false);
  }
}
