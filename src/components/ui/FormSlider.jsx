import { cn } from '../../lib/utils';
import { HelpTooltip } from './Tooltip';

export function FormSlider({
  id,
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  suffix,
  helpText,
  required,
  error,
  formatValue,
  wide = false,
}) {
  const numericValue = value === '' || value == null ? min : Number(value);
  const progress = ((numericValue - min) / (max - min)) * 100;
  const displayValue = formatValue
    ? formatValue(numericValue)
    : `${numericValue.toLocaleString('en-AU')}${suffix ? ` ${suffix}` : ''}`;

  return (
    <div
      className={cn(
        'field field--slider',
        wide && 'field--wide',
        error && 'field--error',
      )}
    >
      <div className='slider-header'>
        <div className='field-label-row'>
          <label htmlFor={id} className='field-label'>
            {label}
            {required && (
              <span className='field-required' aria-hidden='true'>
                {' '}
                *
              </span>
            )}
          </label>
          {helpText && (
            <HelpTooltip content={helpText} label={`Help: ${label}`} />
          )}
        </div>
        <output htmlFor={id} className='slider-value'>
          {displayValue}
        </output>
      </div>

      <input
        id={id}
        type='range'
        className='range-input'
        style={{ '--range-progress': `${progress}%` }}
        min={min}
        max={max}
        step={step}
        value={numericValue}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={numericValue}
        aria-valuetext={displayValue}
        aria-invalid={!!error}
      />

      <div className='slider-bounds' aria-hidden='true'>
        <span>
          {min.toLocaleString('en-AU')}
          {suffix ? ` ${suffix}` : ''}
        </span>
        <span>
          {max.toLocaleString('en-AU')}
          {suffix ? ` ${suffix}` : ''}
        </span>
      </div>

      {error && (
        <p className='field-error' role='alert'>
          {error}
        </p>
      )}
    </div>
  );
}
