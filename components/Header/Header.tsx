import Link from "next/link"
import { FaSearch } from "react-icons/fa"
import HeaderLinks from "./HeaderLinks"

const Header = () => {
    return (
        <header className="bg-slate-200 shadow-md">
            <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
                <Link href="/">
                    <h1 className="font-bold text-base sm:text-2xl flex flex-wrap">
                        <span className="text-slate-500">Samy</span>
                        <span className="text-slate-700">State</span>
                    </h1>
                </Link>
                <form className="bg-slate-100 p-3 rounded-lg flex items-center">
                    <input 
                        type="text" 
                        placeholder="Search..."
                        className="bg-transparent focus:outline-none w-24 sm:w-64 text-black"
                    />
                    <button type="submit">
                        <FaSearch className="text-slate-600" />
                    </button>
                </form>
                <HeaderLinks />
            </div>
        </header>
    )
}

export default Header