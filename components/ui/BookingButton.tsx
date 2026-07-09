import type { BookingButtonProps } from '@/interfaces/ComponentProps'
import { Button } from '@/components/ui/Button'

export function BookingButton({ children, className, variant }: BookingButtonProps) {
  return (
    <Button className={className} onClickClassName="js-open-booking" variant={variant}>
      {children}
    </Button>
  )
}
