interface InputTaskProps {
    value: string;
    setValue: (value: string) => void;
}

import classes from './index.module.css';

export const InputTask = ({ value, setValue }: InputTaskProps) => {
    const handleOnChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    return <input type="text" value={value} onChange={handleOnChangeValue} className={classes.inputText}
    placeholder='Adicione uma nova tarefa'/>
}