import { ListingType } from "@prisma/client"

type IListingFormData = {
    imageUrls: string[],
    name: string,
    description: string,
    address: string,
    type: ListingType,
    bedrooms: number,
    bathrooms: number,
    regularPrice: number,
    discountPrice: number,
    offer: boolean,
    parking: boolean,
    furnished: boolean
}

type IListing = IListingFormData & {
    id: string
}