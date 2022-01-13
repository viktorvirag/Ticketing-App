import { ColumnModel } from "./columnModel";

export class BoardModel {
    
    id: number;
    name: string;
    description: string;
    columnList: Array<ColumnModel>;

    // constructor() {}

    constructor(id: number, name: string, description: string, columnList: Array<ColumnModel>) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.columnList = columnList;
    }
}