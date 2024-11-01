import { avatar, avatarWithBorder } from "./Avatar.module.css";

const GITHUB_AVATAR = "https://github.com/runageinc.png";

export function Avatar({ hasBorder, imgUrl = GITHUB_AVATAR }) {
  const avatarClass = hasBorder ? avatarWithBorder : avatar;
  return <img className={avatarClass} src={imgUrl} alt="" />;
}
