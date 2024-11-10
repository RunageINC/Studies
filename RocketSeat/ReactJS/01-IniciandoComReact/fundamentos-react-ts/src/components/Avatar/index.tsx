import { ImgHTMLAttributes } from 'react';
import styles from './index.module.css';

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
    hasBorder: boolean;
}

export function Avatar({ hasBorder, ...props }: AvatarProps ) {
    const { avatar, avatarWithBorder } = styles;
    const avatarClass = hasBorder ? avatarWithBorder : avatar;

    return <img className={avatarClass} {...props} />
}