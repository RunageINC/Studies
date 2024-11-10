import { ClipboardText } from "phosphor-react";

import classes from "./index.module.css";

export const NoTaskFound = () => (
  <div className={classes.noTaskFound}>
    <ClipboardText size={56} color="#808080" />
    <span>Você ainda não tem tarefas cadastradas</span>
    <span>Crie tarefas e organize seus itens a fazer</span>
  </div>
);
