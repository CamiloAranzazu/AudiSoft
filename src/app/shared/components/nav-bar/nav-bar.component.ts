import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SharedLibreriasModule } from '../../modules/shared.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, SharedLibreriasModule, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {
    
  // lista de estudiantes
    menu: any[] = [
      {id: 1, name: 'NOTAS', active: true, ruta: '/notas' },
      {id: 2, name: 'PROFESORES', active: false, ruta: '/profesores' },
      {id: 3, name: 'ESTUDIANTES', active: false, ruta: '/estudiantes' },
    ];

    constructor(private router: Router) {
    }

    ngOnInit(): void {
    }

    // para activar el menu
    active(menu: any) {
      this.menu.forEach((me: any) => {
        me.id === menu.id ? me.active = true: me.active = false;
      });
      this.router.navigate([menu.ruta]);
    }


    
}
