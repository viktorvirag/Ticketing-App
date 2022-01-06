import { TaskModel } from "./taskModel";

export class ColumnModel {

    id: number;
    boardId: number;
    name: string;
    taskList: Array<TaskModel>;
    ableToModify: boolean;

    constructor() {}
}