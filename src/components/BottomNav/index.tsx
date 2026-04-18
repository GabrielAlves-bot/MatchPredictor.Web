import { useLocation, useNavigate } from "react-router-dom";
import { menuData } from "./menuData";
import "./styles.css";
import type { IBottomMenuData } from "./types/BottomMenuData";

export function BottomNav() {

  const location = useLocation();
  const navigate = useNavigate();

  function isActive(item: IBottomMenuData) {
    return item.destinationPath === location.pathname;
  };

  function handleNavigate(path: string) {
    navigate(path);
  }

  return (
    <nav className="bottom-nav">
      {menuData.map((item) => (
        <div
          key={item.id}
          onClick={() => handleNavigate(item.destinationPath)}
          className={`bottom-nav__item${isActive(item) ? " bottom-nav__item--active" : ""}`}
        >
          <span
            className="material-symbols-outlined"
          >
            {item.icon}
          </span>
          <span className="bottom-nav__label">{item.label}</span>
        </div>
      ))}
    </nav>
  );
}