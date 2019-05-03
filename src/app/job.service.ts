@Injectable({
  providedIn: 'root',
})
export class JobService {

    jobs: Array<any> = new Array<any>();

  getJobsByFolderName(folderName):Observable<any>  {
    console.log('getJobsByFolderName start');
    return this.http.get('/api/folders/jobs/Functional-tests/' + folderName);
  }

  showJobsByFolderName(folderName) {
    console.log('showJobs start');
    this.getJobsByFolderName(folderName)
      .subscribe((data) => console.log(data));
  }

  constructor(private http: HttpClient) {
    console.log(this.showJobsByFolderName('Rally'));
  }
}
import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';


import {Observable} from 'rxjs';
