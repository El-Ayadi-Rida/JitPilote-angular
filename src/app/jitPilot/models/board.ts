import { AccessLevel } from "./access-level";
import { Section } from "./section";

export interface Board {
    boardId: number;
    boardName: string;
    description: string;
    startDate: Date;
    fav:boolean;
    accessLevel:AccessLevel;
    sections:Section[];
}
