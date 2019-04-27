import { Component, OnInit } from '@angular/core';
import { JobService } from '../job.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  constructor(private jobService: JobService) { }

  ngOnInit() {
  }

}
