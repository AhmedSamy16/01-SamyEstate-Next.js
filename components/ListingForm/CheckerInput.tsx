import { Input } from "../ui/input"

type Props = {
    type: "radio" | "checkbox",
    label: string,
    id: string,
    checked: boolean,
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const CheckerInput = ({ type, label, id, checked, handleChange }: Props) => {
    return (
        <div className="flex gap-2">
            <Input
                type={type}
                id={id}
                checked={checked}
                onChange={handleChange}
                className="w-5"
            />
            <span>{label}</span>
        </div>
    )
}

export default CheckerInput