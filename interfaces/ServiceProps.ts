export interface PriceItem {
  name: string
  price: string
}

export interface PriceRowProps {
  item: PriceItem
}

export interface ServiceBenefitCardProps {
  item: NonNullable<ServiceBenefitsBlock['items']>[number]
}

export interface ServiceBenefitsSectionProps {
  block: ServiceBenefitsBlock
}

export interface PriceTableSectionProps {
  block: PriceTableBlock
}

export interface ServiceFaqSectionProps {
  block: ServiceFaqBlock
}

export interface ServiceBlockRendererProps {
  layout: NonNullable<Service['layout']>
}
import type { PriceTableBlock, Service, ServiceBenefitsBlock, ServiceFaqBlock } from '@/payload-types'
