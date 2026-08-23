type SituationOverviewProps = {
  greeting: string
  attentionCount: number
}

function countLabel(count: number): string {
  if (count === 1) return '1 thing needs your attention.'
  return `${count} things need your attention.`
}

export function SituationOverview({
  greeting,
  attentionCount,
}: SituationOverviewProps) {
  return (
    <section className="situation" aria-label="Today">
      <p className="situation-greeting">{greeting}</p>
      <h1 className="situation-headline">{countLabel(attentionCount)}</h1>
      <p className="situation-support">
        Signal filtered the noise and surfaced what needs action.
      </p>
    </section>
  )
}
