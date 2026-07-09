import type { FormFieldProps, RadioOptionProps, TextareaFieldProps } from '@/interfaces/ComponentProps'

export function FormField({ className, name, placeholder, required, type = 'text' }: FormFieldProps) {
  return <input className={className} name={name} placeholder={placeholder} required={required} type={type} />
}

export function TextareaField({ placeholder }: TextareaFieldProps) {
  return <textarea placeholder={placeholder} />
}

export function RadioOption({ checked, label, name, value }: RadioOptionProps) {
  return (
    <label>
      <input type="radio" name={name} value={value} defaultChecked={checked} />
      <span>{label}</span>
    </label>
  )
}
