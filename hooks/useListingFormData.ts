import { IListingFormData } from "@/types/listing"
import { ListingType } from "@prisma/client"
import { useState } from "react"


const useListingFormData = () => {
    const [formData, setFormData] = useState<IListingFormData>({
        imageUrls: [],
        name: "",
        description: "",
        address: "",
        type: "RENT",
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 1,
        discountPrice: 1,
        offer: false,
        parking: false,
        furnished: false
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target.id in ListingType) {
            setFormData(prev => ({
                ...prev,
                type: e.target.id as ListingType
            }))
        } else if (e.target.type === "checkbox") {
            setFormData(prev => ({
                ...prev,
                [e.target.id]: (e.target as HTMLInputElement).checked
            }))
        } else {
            setFormData(prev => ({
                ...prev,
                [e.target.id]: e.target.value
            }))
        }
    }

    return { formData, handleChange }
}

export default useListingFormData