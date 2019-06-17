import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.scss']
})
export class ReportDetailsComponent implements OnInit {

  users: any;
  reportTitle : string;
  constructor() { }

  ngOnInit() {
    this.reportTitle = "Report Title";
    this.users = [{id: 1, name : "A", value: 150}]
  }

}
