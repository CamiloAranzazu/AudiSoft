import { Component, ElementRef, HostBinding, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { JobsService } from '../../../core/jobs/jobs.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jobs-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jobs-view.component.html',
  styleUrl: './jobs-view.component.scss'
})
export class JobsViewComponent implements OnInit {
  public animation = 'loading';

  constructor(
    public service: JobsService,
    public element: ElementRef,
    public sanitizer: DomSanitizer
  ) {
  }

  ngOnInit() {}

  @HostBinding('style') get styles() {
    const display = this.service.hasJobs ? 'flex' : 'none';
    return this.sanitizer.bypassSecurityTrustStyle(`display: ${display}`);
  }
  
}
