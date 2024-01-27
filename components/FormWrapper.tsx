
type Props = {
    children: React.ReactNode,
    label: string
}

const FormWrapper = ({ children, label }: Props) => {
  return (
    <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">
            {label}
        </h1>
        {children}
    </div>
  )
}

export default FormWrapper