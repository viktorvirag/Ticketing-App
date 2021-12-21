import { Component, Input, OnInit } from '@angular/core';
import { TaskModel } from 'src/app/models/taskModel';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
  
  @Input() ticketFromParent: TaskModel;

  constructor() { }

  ngOnInit(): void {
  }

}
