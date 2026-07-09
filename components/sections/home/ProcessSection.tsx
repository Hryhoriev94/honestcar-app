import type { ProcessSectionProps } from '@/interfaces/ComponentProps'
import { ProcessStepCard } from '@/components/cards/ProcessStepCard'
import { Button } from '@/components/ui/Button'

export function ProcessSection({ steps }: ProcessSectionProps) {
  return (
    <section className="process" id="process" data-step="form">
      <div className="process__inner">
        <div className="head-section">
          <div>
            <span className="eyebrow">Jak pracujemy</span>
            <h2 className="title-h2">Jak korzystać z naszych usług?</h2>
          </div>
          <div>
            <p>Prosty proces, pełna opieka i najwyższa jakość na każdym etapie.</p>
            <Button className="d-xl-block" onClickClassName="js-open-booking" variant="outline">
              Umów wizytę
            </Button>
          </div>
        </div>

        <div className="process__grid">
          <div className="process__visual">
            <div className="process__image">
              <img src="/images/process/process-car.png" alt="Car in premium garage" />
              <div className="process__overlay process__overlay--form">
                <span>Formularz</span>
                <div />
                <div />
                <button type="button">Wyślij</button>
              </div>
              <div className="process__overlay process__overlay--diagnostics">
                <span>System diagnostyczny</span>
                <p>Skanowanie w toku...</p>
                <ul>
                  <li>Silnik — OK</li>
                  <li>Hamulce — OK</li>
                  <li>Zawieszenie — Sprawdzać</li>
                </ul>
              </div>
              <div className="process__overlay process__overlay--repair">
                <span>Tryb serwisowy</span>
                <p>Trwa naprawa</p>
              </div>
              <div className="process__scan process__scan--vertical" />
              <div className="process__headlights" />
            </div>
            <div className="process-mobile-info">
              <h3 className="process-mobile-info__title">{steps[0]?.title}</h3>
              <p className="process-mobile-info__text">{steps[0]?.text}</p>
            </div>
          </div>
          <div className="process__content">
            <div className="process__timeline">
              {steps.map((step, index) => (
                <ProcessStepCard isActive={index === 0} key={step.id} step={step} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
