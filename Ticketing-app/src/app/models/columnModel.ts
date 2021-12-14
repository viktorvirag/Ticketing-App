import { TaskModel } from "./taskModel";

export class ColumnModel {

    id: number;
    name: string;
    taskList: Array<TaskModel>;
    ableToModify: boolean;

    constructor() {}
}