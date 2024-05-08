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
import { ReservasService } from '../reservas.service';


@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [CommonModule, SharedLibreriasModule],
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.scss'
})
export class ReservasComponent {
  displayedColumns: string[] = ['no', 'id', 'nombre', 'ciudad','hotel', 'precio', 'op'];
  dataSource!: MatTableDataSource<any>;

  Reservas: any[] = []; 

  @ViewChild('paginator', {read: MatPaginator}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private serviceReservas: ReservasService, private _sb: MatSnackBar) {
    this.getReservas();
  }

  getReservas() {
    this.serviceReservas.getReservas().subscribe(rest => {
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
        this.serviceReservas.deleteReserva(estudiante.id).subscribe(rest =>{
          this._sb.open('ELIMINADO CORRECTAMENTE!', '', {duration: 4000});
          this.getReservas();
        });
      }
    });
  }

  create() { 
    this.openDialogCRUD(true, undefined, 'Reservas', 'CREAR NOTA').afterClosed().subscribe(rest => {
      if(rest === true) {
        this._sb.open('CREADO CORRECTAMENTE!', '', {duration: 4000})
        this.getReservas();
      }
    });
  }

  update(estudiante:any) { 
    this.openDialogCRUD(false, estudiante, 'Reservas', 'ACTUALIZAR ESTUDIANTE').afterClosed().subscribe(rest => {
      if(rest === true) {
        this._sb.open('ACTUALIZADO CORRECTAMENTE!', '', {duration: 4000});
        this.getReservas();
      }
    });
  }
}
