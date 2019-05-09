import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { JobService } from '../../services/job.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss'],
    animations: [routerTransition()]
})
export class TablesComponent implements OnInit {

  // variables
  private subRoute: any;
  sorted = false;
  jobs: Array<any> = new Array<any>();
  pathFolder1: string;
  pathFolder2: string;
  pathFolder3: string;
  pathFull: string;
  current_folder = {
    'sub_folders': [],
    'jobs': []
  };

  // functions
  sortBy(by: string | any): void {
    this.current_folder.jobs.sort((a: any, b: any) => {
      if (a[by] < b[by]) {
        return this.sorted ? 1 : -1;
      }
      if (a[by] > b[by]) {
        return this.sorted ? -1 : 1;
      }
      return 0;
    });
    this.sorted = !this.sorted;
  }

  private refreshFolder() {
    this.jobService.getJobsForView(this.pathFull).subscribe(
      value => {
        console.log('refreshFolder : values', value);
        this.current_folder.sub_folders = value.sub_folders;
        this.current_folder.jobs = value.jobs;
      }
    );
  }

  scanJobsRecursive() {
    this.jobService.getJobsByFolderPath(this.pathFull).subscribe(
      value => {
        console.log('scanJobsRecursive : values', value);
        this.current_folder.jobs = value;
      }
    );
  }
  private parseRoute() {
    this.subRoute = this.route.params.subscribe(params => {
      this.pathFolder1 = params['pathFolder1'] || null;
      this.pathFolder2 = params['pathFolder2'] || null;
      this.pathFolder3 = params['pathFolder3'] || null;
      this.pathFull = JobService.getFolderPath(this.pathFolder1, this.pathFolder2, this.pathFolder3);
    });
  }

  // constructor
  constructor(private jobService: JobService, private route: ActivatedRoute) {
  }

  // init
  ngOnInit() {
    this.parseRoute();
    this.refreshFolder();
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    this.subRoute.unsubscribe();
  }
}
