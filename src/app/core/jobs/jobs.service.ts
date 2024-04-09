import { Injectable, inject } from '@angular/core';

import { JobData } from './jobs.types';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  public jobs: Map<string, Job>;

  constructor() {
    this.jobs = new Map([]);
  }

  public add(job: Job): boolean {
    return !!this.jobs.set(job.code, job);
  }

  public remove(code: string): boolean {
    if (!code) return false;
    return this.jobs.delete(code.toUpperCase());
  }

  public get hasJobs(): boolean {
    return this.jobs !== null && this.jobs !== undefined ? this.jobs.size > 0 : false;
  }
}

export class Job implements JobData {
  public code: string = '';
  public title: string = '';
  public description: string = '';

  constructor(data: JobData) {
    data.code = data.code.toUpperCase();
    Object.assign(this, data);
  }
}
