import { MenuData } from "@/types/Menu/Menu"
import MenuList from "./MenuList"
import MenuSubList from "./MenuSubList"

const Menu = (props: MenuData) => {
  return (
    <div className={`${props.className}`}>
      { props.children }
    </div>
  )
}

Menu.List = MenuList;
Menu.SubList = MenuSubList;

export default Menu;
