import { PatternFormat } from 'react-number-format';
import { Label } from '../ui/label';
import { forwardRef } from 'react';

const MaskedInput = forwardRef(({mask, maskChar = "_", label, disabled, ...props}: any, ref: any) => {
  return (
    <span className='flex flex-col flex-1'>
    {label && <Label className={`text-sm mb-1 ${disabled && 'text-muted-foreground'}`}>{label}</Label>}
    <PatternFormat
      className='flex h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
      format={mask}
      disabled={disabled}
      ref={ref}
      {...props}
      mask={maskChar}
    />
    </span>
  )
})

export default MaskedInput