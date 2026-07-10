import type { PortfolioItem } from '@/payload-types'

interface PortfolioDetailsProps {
  facts: PortfolioItem['facts']
  sidebar: PortfolioItem['sidebar']
  story: PortfolioItem['story']
}

export function PortfolioDetails({ facts, sidebar, story }: PortfolioDetailsProps) {
  if (!(facts?.length || sidebar?.length || story?.length)) return null

  return <section className="section portfolio-single"><div className="container portfolio-single__layout">
    <aside className="portfolio-single__meta">{facts?.map((fact) => <div key={fact.id}><span>{fact.label}</span><strong>{fact.value}</strong></div>)}</aside>
    <div className="portfolio-single__story">{story?.map((item) => <article key={item.id}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
    <aside className="portfolio-single__sidebar">{sidebar?.map((item) => <article className="card" key={item.id}><h3>{item.title}</h3>{item.text ? <p>{item.text}</p> : null}{item.itemsText ? <p>{item.itemsText}</p> : null}</article>)}</aside>
  </div></section>
}
