import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';
import { ActivatedRoute } from '@angular/router';
import {routerTransition} from '../../router.animations';

@Component({
  selector: 'app-metric',
  templateUrl: './metric.component.html',
  styleUrls: ['./metric.component.scss'],
  animations: [routerTransition()]
})

export class MetricComponent implements OnInit {

  // variables
  jobs: any;
  pathFull: string;
  envs: [];

  private refreshFolder() {
    this.jobService.getJobsForMetricsView(this.pathFull).subscribe(
      value => {
        console.log('getJobsForMetricsView : values', value);
        this.envs = value.envs;
        this.jobs = value.jobs;
      }
    );
  }

  // constructor
  constructor(private jobService: JobService) {
  }

  // init
  ngOnInit() {
    this.pathFull = 'Functional-tests/Tempest/ScheduleTempest';
    this.refreshFolder();
  }
}
