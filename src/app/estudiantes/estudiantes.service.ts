import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {
  url:string = environment.url;

  constructor(private http: HttpClient) {}

  //GET estudiantes
  getEstudiantes(): Observable<any[]>{
    return this.http.get<any[]>(this.url+'api/Estudiantes');
  }

  //post estdiantes
  postEstudiantes(model:any): Observable<any[]>{
    return this.http.post<any[]>(this.url+'api/Estudiantes',model);
  }

  //put estdiantes
  putEstudiantes(id: any, model:any): Observable<any[]>{
    return this.http.put<any[]>(this.url+'api/Estudiantes/'+id, model);
  }

  //delete estudiantes
  deleteEstudiante(id:any): Observable<any[]>{
    return this.http.delete<any[]>(this.url+'api/Estudiantes/'+id);
  }

}
