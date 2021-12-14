import { ColumnModel } from "./columnModel";

export class BoardModel {
    
    id: number;
    name: string;
    description: string;
    columnList: Array<ColumnModel>;

    constructor() {}
}