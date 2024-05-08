import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  url:string = environment.url;

  constructor(private http: HttpClient) {}

  //GET Reservas
  getReservas(): Observable<any[]>{
    return this.http.get<any[]>(this.url+'api/Reserva');
  }

  //post estdiantes
  postReservas(model:any): Observable<any[]>{
    return this.http.post<any[]>(this.url+'api/Reserva',model);
  }

  //put estdiantes
  putReservas(id: any, model:any): Observable<any[]>{
    return this.http.put<any[]>(this.url+'api/Reserva/'+id, model);
  }

  //delete Reservas
  deleteReserva(id:any): Observable<any[]>{
    return this.http.delete<any[]>(this.url+'api/Reserva/'+id);
  }

}
