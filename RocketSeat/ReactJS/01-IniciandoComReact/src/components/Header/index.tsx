import styles from './index.module.css';

export function Header() {
    const { header } = styles;

    return (
        <header className={header}>
            <strong>Ignite Feed</strong>
        </header>
    )
}