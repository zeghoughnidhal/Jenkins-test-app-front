import { Component, OnInit } from '@angular/core';
import {JobService} from '../services/job.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {


  tableData: Array<any> = new Array<any>();
  // tableData: <any>() = [

  //];
  private sorted = false;

  constructor(private jobService: JobService) {
  }

  // ngOnInit() {
  // this.tableData = this.jobService.getJobsByFolderName('Rally').subscribe();
  //}


  ngOnInit() {
    this.jobService.getJobsByFolderPath('/Tempest/ScheduleTempest').subscribe(
      values => {
        console.log('values', values);
        this.tableData = values;
      }
    );
  }

  sortBy(by: string | any): void {

    this.tableData.sort((a: any, b: any) => {
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
}
