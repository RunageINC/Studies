import { PlusCircle, Trash } from "phosphor-react";

import classes from "./index.module.css";

interface ButtonProps {
  onClick: (content: never) => void;
}

export const DeleteButton = ({ onClick }: ButtonProps) => (
  <button className={`${classes.button} ${classes.deleteButton}`} onClick={onClick}>
    <Trash size={24} />
  </button>
);

export const CreateButton = ({ onClick }: ButtonProps) => (
  <button className={`${classes.button} ${classes.createButton}`} onClick={onClick}>
    Criar <PlusCircle weight="bold" />
  </button>
);
