import { Phone, Calendar, FileText } from 'lucide-react';

export function CTASection() {
  return (
    <section className='cta-section' aria-labelledby='cta-heading'>
      <div className='cta-inner'>
        <div className='cta-content'>
          <h2 id='cta-heading' className='cta-title'>
            Need a detailed cost breakdown?
          </h2>
          <p className='cta-desc'>
            For accurate construction costing based on architectural drawings,
            speak with a qualified quantity surveyor. Get a comprehensive
            Initial Cost Report tailored to your project.
          </p>
        </div>
        <div className='cta-actions'>
          <a href='#contact' className='btn btn--primary'>
            <FileText size={18} aria-hidden='true' />
            Order Initial Cost Report
          </a>
          <a href='tel:1300185498' className='btn btn--secondary'>
            <Phone size={18} aria-hidden='true' />
            1300 185 498
          </a>
          <a href='#consultation' className='btn btn--ghost'>
            <Calendar size={18} aria-hidden='true' />
            Book consultation
          </a>
        </div>
      </div>
    </section>
  );
}
