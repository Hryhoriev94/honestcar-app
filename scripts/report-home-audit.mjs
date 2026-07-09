import fs from 'node:fs'

const rawAudit = fs.readFileSync('.audit/home-audit.json')
const text = rawAudit[0] === 0xff && rawAudit[1] === 0xfe ? rawAudit.toString('utf16le') : rawAudit.toString('utf8')
const audit = JSON.parse(text.replace(/^\uFEFF/, ''))

for (let index = 0; index < audit.sourceDomSections.length; index += 1) {
  const source = audit.sourceDomSections[index]
  const next = audit.nextSections[index]
  const sameText = source.text === next.text

  console.log(
    `${index + 1}. ${source.className} | source h=${source.height}, next h=${next.height}, diff=${
      next.height - source.height
    }, text=${sameText ? 'same' : 'diff'}`,
  )

  if (!sameText) {
    console.log(`  S: ${source.text}`)
    console.log(`  N: ${next.text}`)
  }
}
