"use client"

import Button from "../Button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import FormError from "../FormError"
import { ListingType } from "@prisma/client"
import useListingFormData from "@/hooks/useListingFormData"
import CheckerInput from "./CheckerInput"
import NumberInput from "./NumberInput"

type Props = {
    label: string
}

const InfoForm = ({ label }: Props) => {
    const { formData, handleChange } = useListingFormData()
    
    return (
        <form className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-1 flex-col gap-4">
                <Input 
                    type="text" 
                    placeholder="Name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                />
                <Textarea 
                    placeholder="Description"
                    id="description"
                    required
                    value={formData.description}
                    onChange={handleChange}
                />
                <Input
                    type="text"
                    placeholder="Address"
                    id="address"
                    value={formData.address}
                    onChange={handleChange}
                />
                <div className="flex flex-wrap gap-6">
                    <CheckerInput
                        type="radio"
                        id={ListingType.SELL}
                        checked={formData.type == "SELL"}
                        handleChange={handleChange}
                        label="Sell"
                    />
                    <CheckerInput
                        type="radio"
                        id={ListingType.RENT}
                        checked={formData.type == "RENT"}
                        handleChange={handleChange}
                        label="Rent"
                    />
                    <CheckerInput
                        type="checkbox"
                        id="parking"
                        checked={formData.parking}
                        handleChange={handleChange}
                        label="Parking"
                    />
                    <CheckerInput
                        type="checkbox"
                        id="furnished"
                        checked={formData.furnished}
                        handleChange={handleChange}
                        label="Furnished"
                    />
                    <CheckerInput
                        type="checkbox"
                        id="offer"
                        checked={formData.offer}
                        handleChange={handleChange}
                        label="Offer"
                    />
                </div>
                <div className="flex flex-wrap gap-6">
                    <NumberInput
                        id="bedrooms"
                        value={formData.bedrooms}
                        handleChange={handleChange}
                    >
                        <p>Beds</p>
                    </NumberInput>
                    <NumberInput
                        id="bathrooms"
                        value={formData.bathrooms}
                        handleChange={handleChange}
                    >
                        <p>Baths</p>
                    </NumberInput>
                </div>
                <div className="flex flex-col gap-5">
                    <NumberInput
                        id="regularPrice"
                        handleChange={handleChange}
                        value={formData.regularPrice}
                        styles="max-w-52"
                    >
                        <div className="flex flex-col items-center">
                            <p>Regular Price</p>
                            {formData.type === "RENT" && <span className="text-xs">($ / month)</span>}
                        </div>
                    </NumberInput>
                    {formData.offer && (
                        <NumberInput
                        id="discountPrice"
                        handleChange={handleChange}
                        value={formData.discountPrice}
                        styles="max-w-52"
                    >
                        <div className="flex flex-col items-center">
                            <p>Discount Price</p>
                            {formData.type === "RENT" && <span className="text-xs">($ / month)</span>}
                        </div>
                    </NumberInput>
                    )}
                </div>
            </div>
            <div className="flex flex-col flex-1 gap-4">
                <p className="font-semibold">
                    Images:
                    <span className="font-normal text-gray-600 ml-2">
                        The First Image will be the cover (max 6)
                    </span>
                </p>
                <div className="flex gap-4">
                    <Input
                        type="file"
                        id="images"
                        accept="images/*"
                        multiple
                    />
                    <Button
                        label="Upload"
                        type="button"
                    />
                </div>
                <Button
                    label={label}
                    type="submit"
                />
            </div>
        </form>
    )
}

export default InfoForm