import rocket from '../../assets/rocket.svg';

import classes from  './index.module.css';

export const Header = () => (
    <div className={classes.todoHeader}>
        <img src={rocket} alt="Rocket logo" width={22} height={36}/>
        <span>to</span>
        <span>do</span>
    </div>
)