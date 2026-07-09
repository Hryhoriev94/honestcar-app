import { render, screen } from '@testing-library/react'
import { HomeHeroSection } from '@/components/sections/home/HomeHeroSection'

describe('HomeHeroSection', () => {
  it('renders supplied content', () => {
    render(<HomeHeroSection highlights={[{ value: '24/7', label: 'Pomoc drogowa' }]} />)

    expect(screen.getByRole('heading', { level: 1, name: 'Serwis samochodowy, któremu możesz zaufać' })).toBeInTheDocument()
    expect(screen.getByText('24/7')).toBeInTheDocument()
    expect(screen.getByText('Pomoc drogowa')).toBeInTheDocument()
  })
})
