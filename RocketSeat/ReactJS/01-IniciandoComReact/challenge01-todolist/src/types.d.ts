import { StatusTypes } from "./constants";

export interface Task {
    id: string;
    description: string;
    status: StatusTypes;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    dueDate?: Date;
}