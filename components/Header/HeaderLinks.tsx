import { navLinksItems } from "@/utils/constants"
import NavItem from "./NavItem"
import { auth } from "@/auth"
import Link from "next/link"

const HeaderLinks = async () => {
  const user = await auth()
  let items = navLinksItems
  if (user) {
    items = navLinksItems.filter(n => n.path !== "/sign-in")
  }
  return (
    <ul className="flex gap-4 items-center">
        {items.map(item => <NavItem key={item.title} item={item} />)}
        {
          user && (
            <Link href="/profile">
              <img 
                src={user.user.avatar} 
                alt={user.user.name as string} 
                className="rounded-full h-7 w-7 object-cover"
              />
            </Link>
          )
        }
    </ul>
  )
}

export default HeaderLinks