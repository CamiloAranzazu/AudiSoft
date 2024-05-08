import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelesService {
  url:string = environment.url;

  constructor(private http: HttpClient) {}

  //GET Hoteles
  getHoteles(): Observable<any[]>{
    return this.http.get<any[]>(this.url+'api/Hotel');
  }

  //post estdiantes
  postHoteles(model:any): Observable<any[]>{
    return this.http.post<any[]>(this.url+'api/Hotel',model);
  }

  //put estdiantes
  putHoteles(id: any, model:any): Observable<any[]>{
    return this.http.put<any[]>(this.url+'api/Hotel/'+id, model);
  }

  //delete Hoteles
  deleteHotel(id:any): Observable<any[]>{
    return this.http.delete<any[]>(this.url+'api/Hotel/'+id);
  }

}
