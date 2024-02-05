"use client"

import logOut from "@/actions/logOut"

const ProfileActions = () => {
  return (
    <div className="flex justify-between items-center mt-5">
        <span className="text-red-700 cursor-pointer">
          Delete Account
        </span>
        <span className="text-red-700 cursor-pointer" onClick={() => logOut()}>
          Sign Out
        </span>
    </div>
  )
}

export default ProfileActions