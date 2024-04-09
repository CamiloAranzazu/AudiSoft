import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'notas',
        loadChildren: () => import('./notas/notas.routes').then(m => m.NOTAS_ROUTES)
    },
    {
        path: 'profesores',
        loadChildren: () => import('./profesores/profesores.routes').then(m => m.PROFESORES_ROUTES)
    },
    {
        path: 'estudiantes',
        loadChildren: () => import('./estudiantes/estudiantes.routes').then(m => m.ESTUDIANTES_ROUTES)
    }
]; 