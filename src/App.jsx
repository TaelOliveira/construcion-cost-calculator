import { useState, useCallback, useRef } from 'react';
import { TooltipProvider } from './components/ui/Tooltip';
import { InfoSection } from './components/layout/InfoSection';
import { CalculatorForm } from './components/calculator/CalculatorForm';
import { ResultsPanel } from './components/results/ResultsPanel';
import { HowItWorksSection } from './components/sections/HowItWorksSection';
import { CTASection } from './components/sections/CTASection';
import { calculateConstructionCost } from './lib/calculator';
import { FINISH_LEVELS } from './lib/constants';
import { calculatorSchema } from './lib/schema';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import './App.css';

function App() {
  const [results, setResults] = useState(null);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [finishLabel, setFinishLabel] = useState('');

  const lastKeyRef = useRef('');

  const handleValuesChange = useCallback((values) => {
    const key = JSON.stringify(values);
    if (key === lastKeyRef.current) return;
    lastKeyRef.current = key;

    const parsed = calculatorSchema.safeParse(values);
    if (parsed.success) {
      const computed = calculateConstructionCost(parsed.data);
      const finish =
        FINISH_LEVELS.find((f) => f.value === parsed.data.finishLevel)?.label ??
        '';
      setResults(computed);
      setFinishLabel(finish);
      setHasCalculated(true);
    } else {
      setResults(null);
      setFinishLabel('');
      setHasCalculated(false);
    }
  }, []);

  return (
    <TooltipProvider>
      <SpeedInsights />
      <Analytics />
      <div className='app'>
        <a href='#calculator' className='skip-link'>
          Skip to calculator
        </a>

        <InfoSection />

        <main id='calculator' className='calculator-layout'>
          <div className='calculator-card'>
            <CalculatorForm onValuesChange={handleValuesChange} />
          </div>

          <div className='results-sticky-column'>
            <ResultsPanel
              results={results}
              finishLevel={finishLabel}
              hasCalculated={hasCalculated}
            />
          </div>
        </main>

        <HowItWorksSection
          steps={results?.steps}
          hasCalculated={hasCalculated}
        />

        <CTASection />

        <footer className='app-footer'>
          <p>
            Disclaimer: This calculator provides indicative estimates only and
            should not be relied upon for financial decisions. Seek professional
            advice from a qualified quantity surveyor for accurate costing.
          </p>
        </footer>
      </div>
    </TooltipProvider>
  );
}

export default App;
