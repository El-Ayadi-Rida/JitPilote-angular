import { AccessLevel } from "./access-level";
import { Section } from "./section";
import { workspace } from "./workspace";

export interface Board {
    boardId: number;
    boardName: string;
    description: string;
    startDate: Date;
    fav:boolean;
    accessLevel:AccessLevel;
    sections:Section[];
    workspace:workspace
}
