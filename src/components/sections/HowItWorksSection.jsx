import { AccordionRoot, AccordionItem } from '../ui/Accordion';
import { BreakdownSteps } from '../results/ResultsPanel';
import { FAQ_ITEMS } from '../../lib/constants';

export function HowItWorksSection({ steps, hasCalculated }) {
  return (
    <section className='how-section' aria-labelledby='how-heading'>
      <div className='how-section-inner'>
        <h2 id='how-heading' className='section-title'>
          How your estimate is calculated
        </h2>
        <p className='section-desc'>
          {hasCalculated
            ? 'Your estimate updates automatically as you adjust inputs. It is built from base construction rates, adjusted for location, year, build type, and project specifications.'
            : 'Enter your details above to see a step-by-step calculation breakdown.'}
        </p>

        {hasCalculated && steps?.length > 0 ? (
          <BreakdownSteps steps={steps} />
        ) : (
          <div className='how-placeholder'>
            <ol className='how-steps-preview'>
              <li>Base construction rate by property type and finish level</li>
              <li>Regional adjustment for your state or territory</li>
              <li>Completion year cost indexation</li>
              <li>Build type and structural complexity factors</li>
              <li>Gross floor area applied to adjusted rate</li>
              <li>Optional feature premiums added</li>
            </ol>
          </div>
        )}

        <div className='faq-section'>
          <h3 className='faq-title'>Frequently asked questions</h3>
          <AccordionRoot type='single' defaultValue='faq-0'>
            {FAQ_ITEMS.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`faq-${index}`}
                title={item.question}
              >
                <p>{item.answer}</p>
              </AccordionItem>
            ))}
          </AccordionRoot>
        </div>
      </div>
    </section>
  );
}
