import { Task as TaskInterface } from "../../types";
import { StatusTypes } from "../../constants";

import { DeleteButton } from "../Button";

import classes from "./index.module.css";

interface TaskProps {
  task: TaskInterface;
  onDeleteTask: (taskId: string) => void;
  onToggleTaskStatus: (taskId: string, status: string) => void;
}

export const Task = ({ task, onDeleteTask, onToggleTaskStatus }: TaskProps) => {
  const isTaskChecked = task.status === StatusTypes.COMPLETED;
  const toggleTaskStatus = isTaskChecked
    ? StatusTypes.PENDING
    : StatusTypes.COMPLETED;

  return (
    <div className={classes.task}>
      <div>
        <input
          type="checkbox"
          id={`taskCheckbox-${task.id}`}
          checked={isTaskChecked}
          onChange={() => onToggleTaskStatus(task.id, toggleTaskStatus)}
          className={`${classes.taskInput}`}
        />
        <label
          htmlFor={`taskCheckbox-${task.id}`}
          className={classes.taskCheckbox}
        />
        <p
          className={
            isTaskChecked
              ? classes.taskDescriptionDone
              : classes.taskDescription
          }
        >
          {task.description}
        </p>
      </div>

      <DeleteButton onClick={() => onDeleteTask(task.id)} />
    </div>
  );
};
