import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { SharedLibreriasModule } from '../../shared/modules/shared.module';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateEditComponent } from '../../shared/components/dialogs/dialog-create-edit/dialog-create-edit.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogConfirmComponent } from '../../shared/components/dialogs/dialog-confirm/dialog-confirm.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotasService } from '../notas.service';


@Component({
  selector: 'app-notas',
  standalone: true,
  imports: [CommonModule, SharedLibreriasModule],
  templateUrl: './notas.component.html',
  styleUrl: './notas.component.scss'
})
export class NotasComponent {
  displayedColumns: string[] = ['no', 'id', 'estudiante', 'profesor','nombre', 'nota', 'op'];
  dataSource!: MatTableDataSource<any>;

  Notas: any[] = []; 

  @ViewChild('paginator', {read: MatPaginator}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private serviceNotas: NotasService, private _sb: MatSnackBar) {
    this.getNotas();
  }

  getNotas() {
    this.serviceNotas.getNotas().subscribe(rest => {
      this.dataSource = new MatTableDataSource(rest);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  

  openDialogCRUD(IsPost: boolean, data: any, model: string, title: string) {
    const dialogRef = this.dialog.open(DialogCreateEditComponent, {
      data: {IsPost, data, model, title},
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
        this.serviceNotas.deleteEstudiante(estudiante.id).subscribe(rest =>{
          this._sb.open('ELIMINADO CORRECTAMENTE!', '', {duration: 4000});
          this.getNotas();
        });
      }
    });
  }

  create() { 
    this.openDialogCRUD(true, undefined, 'notas', 'CREAR NOTA').afterClosed().subscribe(rest => {
      if(rest === true) {
        this._sb.open('CREADO CORRECTAMENTE!', '', {duration: 4000})
        this.getNotas();
      }
    });
  }

  update(estudiante:any) { 
    this.openDialogCRUD(false, estudiante, 'notas', 'ACTUALIZAR ESTUDIANTE').afterClosed().subscribe(rest => {
      if(rest === true) {
        this._sb.open('ACTUALIZADO CORRECTAMENTE!', '', {duration: 4000});
        this.getNotas();
      }
    });
  }
}
