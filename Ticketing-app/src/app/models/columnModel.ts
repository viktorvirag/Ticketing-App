import { TaskModel } from "./taskModel";

export class ColumnModel {

    id: number;
    boardId: number;
    name: string;
    taskList: Array<TaskModel>;
    ableToModify: boolean;

    constructor(id: number, boardId: number, name: string, taskList: Array<TaskModel>, ableToModify: boolean) {
        this.id = id;
        this.boardId = boardId;
        this.name = name;
        this.taskList = taskList;
        this.ableToModify = ableToModify;
    }
}