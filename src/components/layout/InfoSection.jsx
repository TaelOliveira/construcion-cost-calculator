import { Shield, Award, Clock, BarChart3 } from 'lucide-react';

const TRUST_ITEMS = [
  {
    icon: Shield,
    label: 'Indicative estimates',
    detail: 'Based on Australian market data',
  },
  {
    icon: Award,
    label: 'QS methodology',
    detail: 'Aligned with quantity surveying standards',
  },
  {
    icon: Clock,
    label: 'Updated for 2026',
    detail: 'Current construction cost indices',
  },
  {
    icon: BarChart3,
    label: 'Transparent breakdown',
    detail: 'Step-by-step calculation shown',
  },
];

export function TrustBar() {
  return (
    <ul className='trust-bar' aria-label='Trust indicators'>
      {TRUST_ITEMS.map(({ icon: Icon, label, detail }) => (
        <li key={label} className='trust-item'>
          <span className='trust-icon' aria-hidden='true'>
            <Icon size={18} strokeWidth={1.75} />
          </span>
          <span className='trust-text'>
            <strong>{label}</strong>
            <span>{detail}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

export function InfoSection() {
  return (
    <header className='hero-section'>
      <div className='hero-badge'>Free Construction Cost Calculator</div>
      <h1 className='hero-title'>
        Estimate your construction costs with confidence
      </h1>
      <p className='hero-subtitle'>
        A professional-grade estimator for Australian investment properties.
        Enter your project details to receive an indicative construction cost
        range with a transparent, step-by-step breakdown.
      </p>
      <TrustBar />
    </header>
  );
}
