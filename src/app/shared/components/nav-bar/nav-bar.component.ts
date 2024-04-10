import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent, RouterLink } from '@angular/router';
import { SharedLibreriasModule } from '../../modules/shared.module';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, SharedLibreriasModule, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {
    
  url: any = '';
  // lista de estudiantes
    menu: any[] = [
      {id: 1, name: 'NOTAS', active: true, ruta: '/notas' },
      {id: 2, name: 'PROFESORES', active: false, ruta: '/profesores' },
      {id: 3, name: 'ESTUDIANTES', active: false, ruta: '/estudiantes' },
    ];

    constructor(private router: Router, private ar: ActivatedRoute,) {
      this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((ev: NavigationEnd) => {
        this.setActiveStyleMenuNavBar(ev.url);
      });
    }

    ngOnInit(): void {}

    // para activar el menu
    active(menu: any) {
      this.router.navigate([menu.ruta]);
    }

    setActiveStyleMenuNavBar(url: string) {
      this.menu.forEach((item: any) => {
        url === item.ruta ? item.active = true: item.active = false;
      });
    }


    
}
