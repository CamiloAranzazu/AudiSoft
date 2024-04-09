import { Component, Inject, OnInit } from '@angular/core';
import { SharedLibreriasModule } from '../../../modules/shared.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EstudiantesService } from '../../../../estudiantes/estudiantes.service';
import { ProfesoresService } from '../../../../profesores/profesores.service';
import { NotasService } from '../../../../notas/notas.service';

export interface DialogData {
  IsPost: boolean;
  data: any;
  model: string;
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
  formNotas!: FormGroup;

  estudiantes: any[] = []
  profesores: any[] = []

  constructor(public dialogRef: MatDialogRef<DialogCreateEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private serviceEstudiantes: EstudiantesService,
    private serviceProfesores: ProfesoresService,
    private serviceNotas: NotasService) {
      this.form = this.fb.group({
        id: new FormControl(''),
        nombre: new FormControl('',Validators.required)
      });
      this.formNotas = this.fb.group({
        id: new FormControl(''),
        nombre: new FormControl('',Validators.required),
        IdEstudiante: new FormControl('',Validators.required),
        IdProfesor: new FormControl('',Validators.required),
        valor: new FormControl('',Validators.required)
      });


      if(this.data.IsPost === false && this.data.model !== 'notas') {
        this.form.get('id')?.setValue(this.data?.data?.id);
        this.form.get('nombre')?.setValue(this.data?.data?.nombre);
      }
      if(this.data.IsPost === false && this.data.model === 'notas') {
        this.formNotas.get('id')?.setValue(this.data?.data?.id);
        this.formNotas.get('nombre')?.setValue(this.data?.data?.nombre);
        this.formNotas.get('IdProfesor')?.setValue(this.data?.data?.profesor?.id);
        this.formNotas.get('IdEstudiante')?.setValue(this.data?.data?.estudiante?.id);
        this.formNotas.get('valor')?.setValue(this.data?.data?.valor);
      }

      if(this.data.model === 'notas') {
        this.getServices();
      }


    }

  ngOnInit(): void {
    
  } 

  getServices() {
    this.serviceEstudiantes.getEstudiantes().subscribe(rest => {
      this.estudiantes = rest;
    });
    this.serviceProfesores.getProfesores().subscribe(rest => {
      this.profesores = rest;
    });
  }

  save() {
    if(this.form.status === 'VALID') {
      if(this.data.model === 'estudiantes') {
        if(this.data.IsPost === true) {
          let modelPost = {
            nombre: this.form.get('nombre')?.value
          }
          this.serviceEstudiantes.postEstudiantes(modelPost).subscribe(restCreate => {
            this.dialogRef.close(true);
          });
        } else {
          let modelPut = {
            id:this.form.get('id')?.value,
            nombre: this.form.get('nombre')?.value
          }
          this.serviceEstudiantes.putEstudiantes(this.form.get('id')?.value, modelPut).subscribe(restCreate => {
            this.dialogRef.close(true);
          });
        }
      } else if(this.data.model === 'profesores') {
        if(this.data.IsPost === true) {
          let modelPost = {
            nombre: this.form.get('nombre')?.value
          }
          this.serviceProfesores.postProfesores(modelPost).subscribe(restCreate => {
            this.dialogRef.close(true);
          });
        } else {
          let modelPut = {
            id:this.form.get('id')?.value,
            nombre: this.form.get('nombre')?.value
          }
          this.serviceProfesores.putProfesores(this.form.get('id')?.value, modelPut).subscribe(restCreate => {
            this.dialogRef.close(true);
          });
        } 
      } 
    }
  } 

  saveNotas() {
    if(this.formNotas.status === 'VALID') {
      if(this.data.IsPost === true) {
        let modelPost = {
          nombre: this.formNotas.get('nombre')?.value,
          IdEstudiante: this.formNotas.get('IdEstudiante')?.value,
          IdProfesor: this.formNotas.get('IdProfesor')?.value,
          valor: this.formNotas.get('valor')?.value
        }
        this.serviceNotas.postNotas(modelPost).subscribe(restCreate => {
          this.dialogRef.close(true);
        });
      } else {
        let modelPut = {
          id:this.formNotas.get('id')?.value,
          nombre: this.formNotas.get('nombre')?.value,
          IdEstudiante: this.formNotas.get('IdEstudiante')?.value,
          IdProfesor: this.formNotas.get('IdProfesor')?.value,
          valor: this.formNotas.get('valor')?.value
        }
        this.serviceNotas.putNotas(this.formNotas.get('id')?.value, modelPut).subscribe(restCreate => {
          this.dialogRef.close(true);
        });
      } 
    }
  }

  close() {
    this.dialogRef.close(false);
  }
}
