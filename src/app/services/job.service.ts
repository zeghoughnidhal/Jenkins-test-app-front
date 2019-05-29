import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse} from '@angular/common/http';
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

  getJobsByFolderPath(folderPath): Observable<any> {
    return this.httpClient.get('/api/jobs/' + folderPath);
  }

  getJobsForView(folderPath): Observable<any> {
    return this.httpClient.get('/api/forView/folders/' + folderPath);
  }

  getJobsForMetricsView(folderPath): Observable<any> {
    return this.httpClient.get('/api/forView/metrics/' + folderPath);
  }

  getBuildErrorTests(jobFullPath, buildId): Observable<any> {
    const url = '/api/results/' + jobFullPath + '/' + buildId;
    return this.httpClient.get(url);
  }
}
