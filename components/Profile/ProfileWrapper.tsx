import ProfileActions from "./ProfileActions"
import ProfileForm from "./ProfileForm"
import FormWrapper from "../FormWrapper"

const ProfileWrapper = () => {
  
  return (
    <FormWrapper label="Profile">
      <ProfileForm />
      <ProfileActions />
    </FormWrapper>
  )
}

export default ProfileWrapper