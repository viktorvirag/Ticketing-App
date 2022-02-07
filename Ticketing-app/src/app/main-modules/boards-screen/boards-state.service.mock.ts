import { BehaviorSubject } from "rxjs";
import { BoardModel } from "src/app/models/boardModel";
import { ColumnModel } from "src/app/models/columnModel";

export class BoardsStateStubService {
    private readonly _boards = new BehaviorSubject<BoardModel[]>([
        new BoardModel(-1, 'Mock board 1', '', []),
        new BoardModel(-2, 'Mock board 2', '', [])
    ]);
    boards$ = this._boards.asObservable();

    deleteBoard(boardToDelete: BoardModel) {
        console.log("hi", boardToDelete);
    }
    createBorad(newBoard: BoardModel) {
        console.log("ö", newBoard);
    }
    addColumnToSelectedBoard(columnToCreate: ColumnModel) {
        console.log("ö", columnToCreate);
    }
}