
type Props = {
    disabled?: boolean,
    label: string,
    type: "submit" | "button",
    styles?: string
}

const Button = ({ disabled, label, type, styles }: Props) => {
  return (
    <button 
        className={"bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 " + styles}
        disabled={disabled}
        type={type}
    >
        {disabled ? "Loading..." : label}
    </button>
  )
}

export default Button