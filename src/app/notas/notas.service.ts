import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotasService {
  url:string = environment.url;

  constructor(private http: HttpClient) {}

  //GET Notas
  getNotas(): Observable<any[]>{
    return this.http.get<any[]>(this.url+'api/Notas');
  }

  //post estdiantes
  postNotas(model:any): Observable<any[]>{
    return this.http.post<any[]>(this.url+'api/Notas',model);
  }

  //put estdiantes
  putNotas(id: any, model:any): Observable<any[]>{
    return this.http.put<any[]>(this.url+'api/Notas/'+id, model);
  }

  //delete Notas
  deleteEstudiante(id:any): Observable<any[]>{
    return this.http.delete<any[]>(this.url+'api/Notas/'+id);
  }

}
