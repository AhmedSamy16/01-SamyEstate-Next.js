import { Input } from "../ui/input"

type Props = {
    id: string,
    value: number,
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    styles?: string,
    children?: React.ReactNode
}

const NumberInput = ({ id, value, handleChange, children, styles }: Props) => {
    return (
        <div className="flex items-center gap-2">
            <Input
                type="number"
                id={id}
                min={1}
                max={20}
                required
                value={value}
                onChange={handleChange}
                className={styles}
            />
            {children}
        </div>
    )
}

export default NumberInput