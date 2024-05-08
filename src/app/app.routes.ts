import { Routes } from '@angular/router';

const defaultRedirect = '/reservas';

export const routes: Routes = [
    {
        path: 'reservas',
        loadChildren: () => import('./reservas/reservas.routes').then(m => m.RESERVAS_ROUTES)
    },
    {
        path: 'habitaciones',
        loadChildren: () => import('./habitaciones/habitaciones.routes').then(m => m.HABITACIONES_ROUTES)
    },
    {
        path: 'hoteles',
        loadChildren: () => import('./hotel/hoteles.routes').then(m => m.HOTELES_ROUTES)
    },
    { path: '**', redirectTo: defaultRedirect, pathMatch: 'full' },
]; 