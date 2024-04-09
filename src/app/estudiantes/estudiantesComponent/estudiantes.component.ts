import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { SharedLibreriasModule } from '../../shared/modules/shared.module';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateEditComponent } from '../../shared/components/dialogs/dialog-create-edit/dialog-create-edit.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogConfirmComponent } from '../../shared/components/dialogs/dialog-confirm/dialog-confirm.component';
import { EstudiantesService } from '../estudiantes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-estudiantes',
  standalone: true,
  imports: [SharedLibreriasModule, CommonModule],
  templateUrl: './estudiantes.component.html',
  styleUrl: './estudiantes.component.scss'
})
export class EstudiantesComponent {
  displayedColumns: string[] = ['no', 'id', 'estudiante', 'op'];
  dataSource!: MatTableDataSource<any>;

  estudiantes: any[] = []; 

  @ViewChild('paginator', {read: MatPaginator}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private serviceEstudiantes: EstudiantesService, private _sb: MatSnackBar) {
    this.getEstudiantes();
  }

  getEstudiantes() {
    this.serviceEstudiantes.getEstudiantes().subscribe(rest => {
      this.dataSource = new MatTableDataSource(rest);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  

  openDialogCRUD(IsPost: boolean, data: any, model: string) {
    const dialogRef = this.dialog.open(DialogCreateEditComponent, {
      data: {IsPost, data, model},
      width: '500px',
      disableClose: true,
      panelClass: 'custom-dialog-transparent'
    });
    return dialogRef;
  }


  openDialogDelete() {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '250px',
      disableClose: true,
      panelClass: 'custom-dialog-transparent'
    });
    return dialogRef;
  }


  delete(estudiante: any) { 
    this.openDialogDelete().afterClosed().subscribe(rest => {
      if(rest !== false) {
        this.serviceEstudiantes.deleteEstudiante(estudiante.id).subscribe(rest =>{
          this._sb.open('ELIMINADO CORRECTAMENTE!', '', {duration: 4000});
          this.getEstudiantes();
        });
      }
    });
  }

  create() { 
    this.openDialogCRUD(true, undefined, 'estudiantes').afterClosed().subscribe(rest => {
      if(rest === true) {
        this._sb.open('CREADO CORRECTAMENTE!', '', {duration: 4000})
        this.getEstudiantes();
      }
    });
  }

  update(estudiante:any) { 
    this.openDialogCRUD(false, estudiante, 'estudiantes').afterClosed().subscribe(rest => {
      if(rest === true) {
        this._sb.open('ACTUALIZADO CORRECTAMENTE!', '', {duration: 4000});
        this.getEstudiantes();
      }
    });
  }

  
}

