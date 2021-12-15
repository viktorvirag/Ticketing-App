import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BoardsStateService } from '../../boards-screen/boards-state.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  boardId: number | null = null; 

  constructor(
    public boardsStateService: BoardsStateService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let paramString = params.get('id');
      if(paramString) {
        //this.boardId = parseInt(paramString)
        console.log(parseInt(paramString))
        this.boardsStateService.getBoardById(parseInt(paramString));
      } 
      //his.getBoardFromService()
     
  });

  }
  get selectedBoardFromService$() {
    return this.boardsStateService.selectedBoard$
  }


}
