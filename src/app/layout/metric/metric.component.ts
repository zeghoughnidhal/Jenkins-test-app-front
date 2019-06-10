import {Component, Input, Output, OnInit, EventEmitter, Directive, ViewChildren, QueryList} from '@angular/core';
import { routerTransition } from '../../router.animations';
import { JobService } from '../../services/job.service';
import { ActivatedRoute } from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';

// sort methods for Test Results
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { asc: 'desc', desc: '', '': 'asc' };
export const compare = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: string;
  direction: SortDirection;
}

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

  // variables
  envs: [];
  jobs: any;
  buildErrors = {};
  currentBuildErrors = [];
  currentBuildErrorsSorted = false;
  currentBuildStatistics = {
    nbPassed: 0,
    nbFixed: 0,
    nbRegression: 0,
    nbFailed: 0,
    nbSkipped: 0,
    nbTotal: 0
  };

  /// variables for browser
  private subRoute: any;
  selectedJob: any;
  selectedBuild: any;
  selectedJobStatistics = {
    nbErrors: 0,
    nbSuccess: 0,
    nbTotal: 0
  };
  pathLevel1: string;
  pathLevel2: string;
  pathLevel3: string;
  pathFullLevels: string;
  subFolders = [];

  // bar chart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['Success', 'Error'];
  public barChartType: string;
  public barChartLegend: boolean;
  public barChartData: any[] = [];

  // Olar (for test report statistics)
  public polarAreaChartLabels: string[] = ['nbPassed', 'nbFixed',
    'nbFailed', 'nbRegression', 'nbSkipped'];
  public polarAreaChartData: number[] = [0, 0, 0, 0, 0];
  public polarAreaLegend: boolean;
  public polarAreaChartType: string;
  mouseHoverJob: boolean;

  // events
  public chartClicked(e: any): void {
    // get index from event
    if (e.active.length === 0) {
      return;
    }
    const barIndex = e.active[0]._index;
    this.selectedBuild = this.selectedJob.builds[barIndex];
    this.currentBuildErrors = [];
    this.refreshBuildErrors(this.selectedJob.fullName, this.selectedBuild.id);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }

  refreshSelectedJobStatistics() {

    // job statistics
    let nbBuildErrors = 0;
    let nbBuildSuccess = 0;
    // job bar chart (builds status : success / error)
    const chartDataErrors = [];
    const chartDataSuccess = [];
    const chartLabels = [];

    // loop on builds to generate bar chart
    this.selectedJob.builds.forEach(build => {
      const isBuildOnFailure = build.result === 'FAILURE';
      /// job statistics
      nbBuildErrors += isBuildOnFailure ? 1 : 0;
      nbBuildSuccess += isBuildOnFailure ? 0 : 1;
      /// job charts
      chartDataErrors.push(isBuildOnFailure ? '1' : '0');
      chartDataSuccess.push(isBuildOnFailure ? '0' : '1');
      chartLabels.push(build.id);
    });

    // affect new values to refresh view
    /// job statistics
    this.selectedJobStatistics.nbErrors = nbBuildErrors;
    this.selectedJobStatistics.nbSuccess = nbBuildSuccess;
    this.selectedJobStatistics.nbTotal = nbBuildErrors + nbBuildSuccess;
    /// job charts
    this.barChartData = [
      { data: chartDataErrors, label: 'Errors'},
      { data: chartDataSuccess, label: 'Success'}
    ];
    this.barChartLabels = chartLabels;
  }

  sortBy(by: string | any): void {
    this.currentBuildErrors.sort((a: any, b: any) => {
      if (a[by] < b[by]) {
        return this.currentBuildErrorsSorted ? 1 : -1;
      }
      if (a[by] > b[by]) {
        return this.currentBuildErrorsSorted ? -1 : 1;
      }
      return 0;
    });
    this.currentBuildErrorsSorted = !this.currentBuildErrorsSorted;
  }

  refreshFolderRecursive(path) {
    console.log('refreshFolderRecursive : path', path);
    this.jobService.getJobsForMetricsView(path, true).subscribe(
      value => {
        this.envs = value.envs;
        this.jobs = value.jobs;
      }
    );
  }

  refreshFolder(path) {
    console.log('refreshFolder : path', path);
    this.jobService.getJobsForMetricsView(path).subscribe(
      value => {
        this.envs = value.envs;
        this.jobs = value.jobs;
      }
    );
  }

  selectJobInfo(job) {
    this.selectedJob = job;
    this.selectedBuild = null;
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

  refreshBuildErrors(jobFullPath, buildId) {
    this.spinner.show();
    this.jobService.getBuildErrorTests(jobFullPath, buildId).subscribe(
      value => {
        if (this.buildErrors[jobFullPath] === undefined) {
          this.buildErrors[jobFullPath] = {};
        }
        // get cases from result
        this.currentBuildErrors = value.cases;
        // get cases statistics from result
        this.currentBuildStatistics.nbPassed = value.nbPassed;
        this.currentBuildStatistics.nbFixed = value.nbFixed;
        this.currentBuildStatistics.nbFailed = value.nbFailed;
        this.currentBuildStatistics.nbRegression = value.nbRegression;
        this.currentBuildStatistics.nbSkipped = value.nbSkipped;
        this.currentBuildStatistics.nbTotal = value.nbTotal;

        this.spinner.hide();
      });
  }

  // constructor
  constructor(private jobService: JobService, private route: ActivatedRoute, private spinner: NgxSpinnerService) {
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
      this.barChartType = 'bar';
      this.barChartLegend = true;
      this.polarAreaLegend = true;
      this.polarAreaChartType = 'polarArea';
    });
  }

  ngOnDestroy() {
    this.subRoute.unsubscribe();
  }

}
