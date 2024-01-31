import useCurrentUser from "./useCurrentUser"


const useCurrentRole = () => {
    const user = useCurrentUser()

    return user?.role
}

export default useCurrentRole