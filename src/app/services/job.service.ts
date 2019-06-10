import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobService {

  constructor(private httpClient: HttpClient) {
  }

  jobs: Array<any> = new Array<any>();

  static getFolderPath(...paths): string {
    return paths.filter(p => p !== null && p !== '').join('/');
  }

  getJobs(folderPath, recursive = false): Observable<any> {
    return this.httpClient.get('/api/jobs/' + folderPath,
      { params: new HttpParams().set('recursive', '' + recursive) });
  }

  getJobsForMetricsView(folderPath,  recursive = false): Observable<any> {
    return this.httpClient.get('/api/metrics/' + folderPath,
      { params: new HttpParams().set('recursive', '' + recursive) });
  }

  getSubfolders(folderPath): Observable<any> {
    return this.httpClient.get('/api/subfolders/' + folderPath);
  }

  getBuildErrorTests(jobFullPath, buildId): Observable<any> {
    const url = '/api/results/' + jobFullPath + '/' + buildId;
    return this.httpClient.get(url);
  }

}
