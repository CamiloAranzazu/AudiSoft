import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HabitacionesService {
  url:string = environment.url;

  constructor(private http: HttpClient) {}

  //GET Habitaciones
  getHabitaciones(): Observable<any[]>{
    return this.http.get<any[]>(this.url+'api/Habitaciones');
  }

  //post estdiantes
  postHabitaciones(model:any): Observable<any[]>{
    return this.http.post<any[]>(this.url+'api/Habitaciones',model);
  }

  //put estdiantes
  putHabitaciones(id: any, model:any): Observable<any[]>{
    return this.http.put<any[]>(this.url+'api/Habitaciones/'+id, model);
  }

  //delete Habitaciones
  deleteHabitacion(id:any): Observable<any[]>{
    return this.http.delete<any[]>(this.url+'api/Habitaciones/'+id);
  }

}
