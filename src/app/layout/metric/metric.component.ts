import {Component, Input, OnInit} from '@angular/core';
import { JobService } from '../../services/job.service';
import {routerTransition} from '../../router.animations';

@Component({
  selector: 'app-metric',
  templateUrl: './metric.component.html',
  styleUrls: ['./metric.component.scss'],
  animations: [routerTransition()]
})

export class MetricComponent implements OnInit {

  // variables
  envs: [];
  jobs: any;
  @Input() pathFull = {
    text: 'Functional-tests/Tempest/ScheduleTempest'
  };
  // @Input() displayJobLink = false;
  selectedJob: any;

  refreshFolder(path) {
    console.log('getJobsForMetricsView : path', path);
    this.jobService.getJobsForMetricsView(path).subscribe(
      value => {
        console.log('getJobsForMetricsView : values', value);
        this.envs = value.envs;
        this.jobs = value.jobs;
      }
    );
  }

  selectJobInfo(job) {
    this.selectedJob = job;
  }

  getLastThreeBuilds(job) {
    const builds = [];
    for (let i = 0; i < 3; i++) {
      builds.push(job.builds[i]);
    }
    return builds;
  }

  // constructor
  constructor(private jobService: JobService) {
  }

  // init
  ngOnInit() {
    this.refreshFolder(this.pathFull.text);
  }

}
