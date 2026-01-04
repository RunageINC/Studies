import { Avatar } from "./Avatar";
import { sidebar, profile, cover } from "./Sidebar.module.css";
import { PencilLine } from "phosphor-react";

export function Sidebar() {
  return (
    <aside className={sidebar}>
      <img
        className={cover}
        src="https://as1.ftcdn.net/v2/jpg/05/36/04/58/1000_F_536045891_P4BJsCgHaxtktOFJkdSBkazAQZeApb3V.jpg"
        alt=""
      />

      <div className={profile}>
        <Avatar hasBorder />
        <strong>Usuario</strong>
        <span>Web Developer</span>
      </div>

      <footer>
        <a href="#">
          <PencilLine size={20} />
          Editar seu perfil
        </a>
      </footer>
    </aside>
  );
}
