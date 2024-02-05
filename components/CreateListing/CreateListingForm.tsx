import FormWrapper from "../FormWrapper"
import InfoForm from "../ListingForm/InfoForm"

const CreateListingForm = () => {
    return (
        <FormWrapper label="Create Listing" styles="max-w-4xl">
            <InfoForm label="Create Listing" />
        </FormWrapper>
    )
}

export default CreateListingForm