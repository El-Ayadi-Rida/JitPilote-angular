import { AccessLevel } from "./access-level";

export interface Board {
    boardId: number;
    boardName: string;
    description: string;
    startDate: Date;
    fav:boolean;
    accessLevel:AccessLevel;
}
