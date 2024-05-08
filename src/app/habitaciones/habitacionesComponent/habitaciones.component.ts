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
import { HabitacionesService } from '../habitaciones.service';


@Component({
  selector: 'app-habitaciones',
  standalone: true,
  imports: [SharedLibreriasModule, CommonModule],
  templateUrl: './habitaciones.component.html',
  styleUrl: './habitaciones.component.scss'
})
export class HabitacionesComponent {
  displayedColumns: string[] = ['no', 'id', 'idHotel', 'type', 'priceAlto', 'priceBajo', 'maximoP', 'op'];
  dataSource!: MatTableDataSource<any>;

  Habitaciones: any[] = []; 

  @ViewChild('paginator', {read: MatPaginator}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private serviceHabitaciones: HabitacionesService, private _sb: MatSnackBar) {
    this.getHabitaciones();
  }

  getHabitaciones() {
    this.serviceHabitaciones.getHabitaciones().subscribe(rest => {
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


  delete(profesor: any) { 
    this.openDialogDelete().afterClosed().subscribe(rest => {
      if(rest !== false) {
        this.serviceHabitaciones.deleteHabitacion(profesor.id).subscribe(rest =>{
          this._sb.open('ELIMINADO CORRECTAMENTE!', '', {duration: 4000});
          this.getHabitaciones();
        });
      }
    });
  }

  create() { 
    this.openDialogCRUD(true, undefined, 'Habitaciones', 'CREAR').afterClosed().subscribe(rest => {
      if(rest === true) {
        this._sb.open('CREADO CORRECTAMENTE!', '', {duration: 4000})
        this.getHabitaciones();
      }
    });
  }

  update(profesor:any) { 
    this.openDialogCRUD(false, profesor, 'Habitaciones', 'CREAR').afterClosed().subscribe(rest => {
      if(rest === true) {
        this._sb.open('ACTUALIZADO CORRECTAMENTE!', '', {duration: 4000});
        this.getHabitaciones();
      }
    });
  }
}
