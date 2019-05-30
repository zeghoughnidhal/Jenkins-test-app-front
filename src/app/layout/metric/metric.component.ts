import {Component, Input, Output, OnInit, EventEmitter, Directive, ViewChildren, QueryList} from '@angular/core';
import { routerTransition } from '../../router.animations';
import { JobService } from '../../services/job.service';
import { ActivatedRoute } from '@angular/router';

// sort methods for Test Results
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { asc: 'desc', desc: '', '': 'asc' };
export const compare = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: string;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})

// tslint:disable-next-line:directive-class-suffix
export class NgbdSortableHeader {

  @Input() sortable: string;
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}

@Component({
  selector: 'app-metric',
  templateUrl: './metric.component.html',
  styleUrls: ['./metric.component.scss'],
  animations: [routerTransition()]
})
export class MetricComponent implements OnInit {

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  // variables
  envs: [];
  jobs: any;
  @Input() pathFull = {
    text: 'Functional-tests/Tempest/ScheduleTempest'
  };
  // @Input() displayJobLink = false;
  @Output() sort = new EventEmitter<SortEvent>();
  buildErrors = {};
  currentBuildErrors = [];

  /// variables for browser
  private subRoute: any;
  selectedJob: string;
  pathLevel1: string;
  pathLevel2: string;
  pathLevel3: string;
  pathFullLevels: string;
  subFolders = [];

  onSort({column, direction}: SortEvent) {

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting countries
    this.currentBuildErrors = this.currentBuildErrors.sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
  }

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

  getLastBuilds(job) {
    const builds = [];
    for (let i = 0; i < 5; i++) {
      builds.push(job.builds[i]);
    }
    return builds;
  }

  parseRoute() {
    console.log('START parseRoute');
    this.subRoute = this.route.params.subscribe(params => {
      this.pathLevel1 = params.pathLevel1 || null;
      this.pathLevel2 = params.pathLevel2 || null;
      this.pathLevel3 = params.pathLevel3 || null;
      this.pathFullLevels = JobService.getFolderPath(this.pathLevel1, this.pathLevel2, this.pathLevel3);
    });
  }

  getBuildErrorTests(jobFullPath, buildId) {
    this.jobService.getBuildErrorTests(jobFullPath, buildId).subscribe(
      value => {
        if (this.buildErrors[jobFullPath] === undefined) {
          this.buildErrors[jobFullPath] = {};
        }
        this.buildErrors[jobFullPath][buildId] = value;
        this.currentBuildErrors = this.buildErrors[jobFullPath][buildId];
      });
  }

  // constructor
  constructor(private jobService: JobService, private route: ActivatedRoute) {
  }

  // init
  ngOnInit() {
    this.subRoute = this.route.params.subscribe(params => {
      this.pathLevel1 = params.pathLevel1 || null;
      this.pathLevel2 = params.pathLevel2 || null;
      this.pathLevel3 = params.pathLevel3 || null;
      this.pathFullLevels = JobService.getFolderPath(this.pathLevel1, this.pathLevel2, this.pathLevel3);

      this.jobService.getSubfolders(this.pathFullLevels).subscribe(
        subFolders => {
            this.subFolders = subFolders;
        }
      );

      this.refreshFolder(this.pathFullLevels);
    });
  }

  ngOnDestroy() {
    this.subRoute.unsubscribe();
  }

}
