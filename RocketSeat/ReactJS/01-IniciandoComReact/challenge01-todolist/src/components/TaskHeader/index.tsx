import classes from "./index.module.css";

interface CreatedTaskProps {
  todo: number;
  done?: number | undefined;
}

const TasksCreatedCaption = ({ todo }: CreatedTaskProps) => (
  <span className={`${classes.todoCaption} ${classes.created}`}>
    Tarefas Criadas <span className={classes.captionNumber}>{todo}</span>
  </span>
);

const TasksDoneCaption = ({ todo, done }: CreatedTaskProps) => (
  <span className={`${classes.todoCaption} ${classes.createdAndDone}`}>
    Concluídas{" "}
    <span className={classes.captionNumber}>{`${done} de ${todo}`}</span>
  </span>
);

export const TasksCaption = (props: CreatedTaskProps) => {
  const isDoneComponent = props.done !== undefined;

  return isDoneComponent ? (
    <TasksDoneCaption {...props} />
  ) : (
    <TasksCreatedCaption {...props} />
  );
};
