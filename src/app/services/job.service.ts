import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobService {

  constructor(private http: HttpClient) {
  }

  jobs: Array<any> = new Array<any>();

  static getFolderPath(...paths): string {
    return paths.filter(p => p !== null && p !== '').join('/');
  }

  getJobsByFolderPath(folderPath): Observable<any>  {
    return this.http.get('/api/jobs/' + folderPath);
  }

  getJobsForView(folderPath): Observable<any>  {
    return this.http.get('/api/forView/folders/' + folderPath);
  }

  getJobsForMetricsView(folderPath): Observable<any>  {
    return this.http.get('/api/forView/metrics/' + folderPath);
  }
}
