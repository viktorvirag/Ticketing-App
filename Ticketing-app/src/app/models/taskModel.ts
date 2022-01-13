import { ColumnModel } from "./columnModel";

export class TaskModel {

    id: number;
    columnId: number;
    title: string;
    description: string | null;
    difficulty: number | null;

    constructor(id: number, columnId: number, title: string, description: string | null = null, difficulty: number | null = null) {
        this.id = id;
        this.columnId = columnId;
        this.title = title;
        this.description = description;
        this.difficulty = difficulty;
    }
}
