import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfesoresService {
  url:string = environment.url;

  constructor(private http: HttpClient) {}

  //GET Profesores
  getProfesores(): Observable<any[]>{
    return this.http.get<any[]>(this.url+'api/Profesores');
  }

  //post estdiantes
  postProfesores(model:any): Observable<any[]>{
    return this.http.post<any[]>(this.url+'api/Profesores',model);
  }

  //put estdiantes
  putProfesores(id: any, model:any): Observable<any[]>{
    return this.http.put<any[]>(this.url+'api/Profesores/'+id, model);
  }

  //delete Profesores
  deleteEstudiante(id:any): Observable<any[]>{
    return this.http.delete<any[]>(this.url+'api/Profesores/'+id);
  }

}
