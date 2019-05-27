import { Component, Input, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { JobService } from '../../services/job.service';
import { ActivatedRoute } from '@angular/router';

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

  /// variables for browser
  private subRoute: any;
  selectedJob: string;
  pathLevel1: string;
  pathLevel2: string;
  pathLevel3: string;
  pathFullLevels: string;
  subFolders = ['sub1', 'sub2', 'sub3'];


  refreshFolder(path) {
    console.log('getJobsForMetricsView : path', path);
    this.jobService.getJobsForMetricsView(path).subscribe(
      value => {
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

  parseRoute() {
    console.log('START parseRoute');
    this.subRoute = this.route.params.subscribe(params => {
      this.pathLevel1 = params['pathLevel1'] || null;
      this.pathLevel2 = params['pathLevel2'] || null;
      this.pathLevel3 = params['pathLevel3'] || null;
      this.pathFullLevels = JobService.getFolderPath(this.pathLevel1, this.pathLevel2, this.pathLevel3);
    });
  }

  // constructor
  constructor(private jobService: JobService, private route: ActivatedRoute) {
  }

  // init
  ngOnInit() {
    this.parseRoute();
    this.refreshFolder(this.pathFull.text);
  }

  ngOnDestroy() {
    this.subRoute.unsubscribe();
  }

}
