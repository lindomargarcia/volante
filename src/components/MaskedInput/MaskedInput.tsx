import { PatternFormat } from 'react-number-format';

export default function MaskedInput({mask, maskChar = "_", label, ...props}: any) {
  return (
    <PatternFormat
      className='flex h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
      format={mask}
      {...props}
      mask={maskChar}
    />
  )
}