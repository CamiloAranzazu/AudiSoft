import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//Materiales
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatBadgeModule} from '@angular/material/badge';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';
import {MatTreeModule} from '@angular/material/tree';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatNativeDateModule } from '@angular/material/core';


const MAT_IMPORTS = [
  MatCheckboxModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatTableModule,
  MatInputModule,
  MatTabsModule,
  MatButtonModule,
  MatIconModule,
  MatTooltipModule,
  MatBadgeModule,
  MatCardModule,
  MatDialogModule,
  MatSelectModule,
  MatProgressBarModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSnackBarModule,
  MatSortModule,
  MatSlideToggleModule,
  MatMenuModule,
  MatAutocompleteModule,
  MatChipsModule,
  MatTreeModule,
  MatButtonToggleModule
];

@NgModule({
  imports: [
    ...MAT_IMPORTS,
    CommonModule
  ],
  exports: [
    ...MAT_IMPORTS
  ]
})
export class SharedLibreriasModule { }
