"use client"

import useCurrentUser from "@/hooks/useCurrentUser"
import app from "@/utils/firebase"
import { LegacyRef, useEffect, useRef, useState } from "react"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import updateUser from "@/actions/updateUser"

const ProfileImage = () => {
    const imageRef: LegacyRef<HTMLInputElement> = useRef(null)
    const userData = useCurrentUser()
    const [isUploading, setIsUploading] = useState(false)
    const [fileUploadError, setFileUploadError] = useState(false)
    const [fileUploadSuccess, setFileUploadSuccess] = useState(false)

    const handleImageUpload = (image: File) => {
        setFileUploadError(false)
        setFileUploadSuccess(false)
        setIsUploading(true)
        const storage = getStorage(app)
        const fileName = new Date().getTime() + image.name
        const storageRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storageRef, image)

        uploadTask.on("state_changed",
            () => {},
            () => {
                setFileUploadError(true)
                setIsUploading(false)
            },
            async () => {
                const url = await getDownloadURL(uploadTask.snapshot.ref)
                const data = await updateUser(userData?.id as string, { avatar: url })
                if (data.error) {
                    setFileUploadError(true)
                } else {
                    setFileUploadSuccess(true)
                }
                setIsUploading(false)
            }
        )
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setFileUploadError(false)
            setFileUploadSuccess(false)
        }, 3000)
        return () => {
            clearTimeout(timer)
        }
    }, [fileUploadError, fileUploadSuccess])

    return (
        <>
            <input 
                type="file"
                hidden
                accept="image/*"
                ref={imageRef}
                onChange={e => e.target.files && handleImageUpload(e.target.files[0])}
            />
            <img 
                src={userData?.avatar} 
                alt={userData?.name as string}
                className="rounded-full h-24 w-24 object-cover cursor-pointer self-center" 
                onClick={() => imageRef.current?.click()}
            />
            <p className="text-sm self-center">
                {fileUploadError && (
                    <span className="text-red-700">
                        Error while uploading the image (Image must be less than 2mb)
                    </span>
                )}
                {fileUploadSuccess && (
                    <span className="text-green-700">
                        Successfully Changed
                    </span>
                )}
                {isUploading && (
                    <span className="text-slate-700">
                        Image Uploading....
                    </span>
                )}
            </p>
        </>
    )
}

export default ProfileImage