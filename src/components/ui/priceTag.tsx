
interface PriceTagProps {
    id: string,
    label: string,
    value: string,
    className?: string
}

function PriceTag({id, label, value, className}: PriceTagProps) {
  return (
    <span className={className}>
        <label htmlFor={id} className="font-semibold">{label}</label>
        <p id={id}>{value}</p>
    </span>
  )
}

export default PriceTag;