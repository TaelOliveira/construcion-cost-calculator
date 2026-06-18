import { useMemo, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Share2, TrendingUp, ArrowDown, ArrowUp } from 'lucide-react';
import { formatCurrency, formatRate } from '../../lib/formatters';

const CostBreakdownChart = lazy(() =>
  import('./CostBreakdownChart').then((m) => ({
    default: m.CostBreakdownChart,
  })),
);

function AnimatedValue({ value, className }) {
  return (
    <motion.span
      key={value}
      className={className}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {formatCurrency(value)}
    </motion.span>
  );
}

export function ResultsPanel({ results, finishLevel, hasCalculated }) {
  const breakdownData = useMemo(() => results?.costBreakdown ?? [], [results]);

  const handleShare = async () => {
    if (!results) return;
    const text = `Construction cost estimate: ${formatCurrency(results.totalEstimate)} (${formatCurrency(results.lowEstimate)} – ${formatCurrency(results.highEstimate)})`;
    if (navigator.share) {
      await navigator.share({ title: 'Construction Cost Estimate', text });
    } else {
      await navigator.clipboard.writeText(text);
    }
  };

  if (!hasCalculated) {
    return (
      <aside className='results-panel results-panel--empty' aria-live='polite'>
        <div className='results-empty'>
          <div className='results-empty-icon' aria-hidden='true'>
            <TrendingUp size={32} strokeWidth={1.5} />
          </div>
          <h2 className='results-empty-title'>
            Your estimate will appear here
          </h2>
          <p className='results-empty-text'>
            Fill in the required fields to see your construction cost estimate,
            range, and breakdown update in real time.
          </p>
        </div>
      </aside>
    );
  }

  return (
    <aside className='results-panel' aria-live='polite' aria-atomic='true'>
      <AnimatePresence mode='wait'>
        <motion.div
          key={results.totalEstimate}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className='results-header'>
            <span className='results-label'>Estimated construction cost</span>
            <AnimatedValue
              value={results.totalEstimate}
              className='results-primary'
            />
            <p className='results-finish'>
              Finish: <strong>{finishLevel}</strong>
            </p>
          </div>

          <div className='results-range-cards'>
            <div className='range-card range-card--low'>
              <span className='range-card-label'>
                <ArrowDown size={14} aria-hidden='true' />
                Low estimate
              </span>
              <AnimatedValue
                value={results.lowEstimate}
                className='range-card-value'
              />
            </div>
            <div className='range-card range-card--high'>
              <span className='range-card-label'>
                <ArrowUp size={14} aria-hidden='true' />
                High estimate
              </span>
              <AnimatedValue
                value={results.highEstimate}
                className='range-card-value'
              />
            </div>
          </div>

          <div className='results-meta'>
            <div className='results-meta-item'>
              <span>Cost per m²</span>
              <strong>{formatRate(results.costPerSqm)}</strong>
            </div>
            <div className='results-meta-item'>
              <span>Gross floor area</span>
              <strong>
                {results.assumptions.floorArea.toLocaleString('en-AU')} m²
              </strong>
            </div>
          </div>

          {breakdownData.length > 0 && (
            <Suspense
              fallback={<div className='cost-breakdown' aria-hidden='true' />}
            >
              <CostBreakdownChart data={breakdownData} />
            </Suspense>
          )}

          <div className='results-actions'>
            <button
              type='button'
              className='btn btn--ghost btn--sm'
              onClick={handleShare}
            >
              <Share2 size={16} aria-hidden='true' />
              Share estimate
            </button>
            <button
              type='button'
              className='btn btn--ghost btn--sm'
              onClick={() => window.print()}
            >
              <Download size={16} aria-hidden='true' />
              Print / save
            </button>
          </div>

          <p className='results-disclaimer'>
            Indicative estimate only. Does not include land, site works, or
            professional fees.
          </p>
        </motion.div>
      </AnimatePresence>
    </aside>
  );
}

export function BreakdownSteps({ steps }) {
  if (!steps?.length) return null;

  return (
    <ol className='breakdown-steps'>
      {steps.map((step, index) => (
        <motion.li
          key={step.id}
          className={`breakdown-step${step.highlight ? ' breakdown-step--highlight' : ''}`}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05, duration: 0.3 }}
        >
          <div className='breakdown-step-header'>
            <span className='breakdown-step-number'>{index + 1}</span>
            <div className='breakdown-step-info'>
              <strong>{step.label}</strong>
              <span>{step.description}</span>
            </div>
            <span className='breakdown-step-value'>
              {step.type === 'rate'
                ? formatRate(step.value)
                : formatCurrency(step.value)}
            </span>
          </div>
          {step.breakdown && (
            <ul className='breakdown-step-features'>
              {step.breakdown.map((item) => (
                <li key={item.label}>
                  <span>{item.label}</span>
                  <span>{formatCurrency(item.value)}</span>
                </li>
              ))}
            </ul>
          )}
        </motion.li>
      ))}
    </ol>
  );
}
