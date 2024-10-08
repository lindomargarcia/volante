import React, { useState, InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement>{
    onChange: (value: any) => void
}

const CurrencyInput = ({
  value = "",
  onChange = () => {},
  placeholder,
  className,
}: IProps) => {
  const [displayValue, setDisplayValue] = useState(value);

  const moneyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  function handleChange(ev: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = ev.target.value;
    const digits = inputValue.replace(/\D/g, "");
    const realValue = Number(digits) / 100;

    setDisplayValue(moneyFormatter.format(realValue));
    onChange(realValue);
  }

  return (
    <input
      placeholder={placeholder}
      type="text"
      onChange={handleChange}
      className={className}
      value={Number(displayValue).toFixed(2) || ""}
    />
  );
};

export default CurrencyInput;
