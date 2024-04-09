import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobsService, Job } from '../jobs/jobs.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingInterceptorService implements HttpInterceptor {

  constructor(
    private jobs: JobsService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const job = new Job({
        code: `List`,
        title: `CARGANDO`
    });
    this.jobs.add(job);
    return this.handler(next, req, job);
  }

  handler(next: any, req: any, job: any) {
    return next.handle(req)
      .pipe(tap(
        (event) => {
          if(event instanceof HttpResponse) {
            this.jobs.remove(job.code);
          }
        },
        error =>  {
          this.jobs.remove(job.code)
          // console.log("INTERCEPTOR_ERROR_FRONTEND", error);
        }
      ));
  }

}