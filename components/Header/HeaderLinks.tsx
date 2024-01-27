import { navLinksItems } from "@/utils/constants"
import NavItem from "./NavItem"


const HeaderLinks = () => {
  return (
    <ul className="flex gap-4">
        {navLinksItems.map(item => <NavItem key={item.title} item={item} />)}
    </ul>
  )
}

export default HeaderLinks