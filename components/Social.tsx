
import { FcGoogle } from "react-icons/fc"

const Social = () => {
    return (
        <button type="button" className="bg-red-700 flex gap-2 justify-center items-center text-white p-3 rounded-lg uppercase hover:opacity-95">
            <FcGoogle className="h-5 w-5" />
            Continue With Google
        </button>
    )
}

export default Social