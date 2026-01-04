import { useState } from "react";

import { Task as TaskInterface } from "./types";
import { StatusTypes } from "./constants";

import { v4 as uuidv4 } from "uuid";

import { Header } from "./components/Header";
import { InputTask } from "./components/InputTask";
import { CreateButton } from "./components/Button";
import { NoTaskFound } from "./components/NoTaskFound";
import { Task } from "./components/Task";
import { TasksCaption } from "./components/TaskHeader";

import classes from "./App.module.css";

function App() {
  const [task, setTask] = useState<string>("");
  const [taskList, setTaskList] = useState<TaskInterface[]>([]);

  const todoHeaderCaptions = taskList.reduce(
    (acc, curr) => {
      acc.todo++;

      if (curr.status === StatusTypes.COMPLETED) {
        acc.done++;
      }

      return acc;
    },
    { todo: 0, done: 0 }
  );

  const addTask = () => {
    const newTask = {
      id: uuidv4(),
      description: task,
      status: StatusTypes.PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: undefined,
      dueDate: undefined,
    };

    setTaskList((prev) => [...prev, newTask]);
    setTask("");
  };

  const updateTaskStatus = (taskId: string, taskNewStatus: string) => {
    const updatedList = taskList.map((task) =>
      task.id === taskId ? { ...task, status: taskNewStatus } : task
    );

    setTaskList(updatedList);
  };

  const removeTask = (taskId: string) => {
    const newList = taskList.filter((task) => task.id !== taskId);

    setTaskList(newList);
  };

  return (
    <>
      <Header />
      <div className={classes.todoBody}>
        <main className={classes.mainContent}>
          <div className={classes.taskForm}>
            <InputTask value={task} setValue={setTask} />
            <CreateButton onClick={addTask} />
          </div>

          <div className={classes.todoList}>
            <div className={classes.todoListCaptions}>
              <TasksCaption todo={taskList.length} />
              <TasksCaption
                todo={todoHeaderCaptions.todo}
                done={todoHeaderCaptions.done}
              />
            </div>
            <div className={classes.todoListBody}>
              {taskList.length === 0 && <NoTaskFound />}
              {taskList.map((task) => (
                <Task
                  key={task.id}
                  task={task}
                  onToggleTaskStatus={updateTaskStatus}
                  onDeleteTask={removeTask}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
