import Link from "next/link"

type Props = {
    item: NavLink
}

const NavItem = ({ item }: Props) => {
    return (
        <Link href={item.path}>
            <li 
                className={`${item.isHiddenOnSmallDevices && "hidden"} sm:inline text-slate-700 hover:underline cursor-pointer`}
            >
                {item.title}
            </li>
        </Link>
    )
}

export default NavItem