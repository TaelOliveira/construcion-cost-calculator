import { useState } from 'react';
import { cn } from '../../lib/utils';
import { HelpTooltip } from './Tooltip';

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

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
  const [draft, setDraft] = useState(null);

  const numericValue = value === '' || value == null ? min : Number(value);
  const progress = ((numericValue - min) / (max - min)) * 100;
  const displayValue = formatValue
    ? formatValue(numericValue)
    : `${numericValue.toLocaleString('en-AU')}${suffix ? ` ${suffix}` : ''}`;

  const commitValue = (raw) => {
    if (raw === '' || raw == null) {
      setDraft(null);
      return;
    }

    const parsed = Number(raw);
    if (Number.isNaN(parsed)) {
      setDraft(null);
      return;
    }

    onChange(clamp(parsed, min, max));
    setDraft(null);
  };

  const handleInputChange = (event) => {
    const raw = event.target.value;
    setDraft(raw);

    if (raw === '' || raw === '-') return;

    const parsed = Number(raw);
    if (!Number.isNaN(parsed)) {
      onChange(clamp(parsed, min, max));
    }
  };

  const handleInputBlur = () => {
    commitValue(draft);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      commitValue(draft);
      event.currentTarget.blur();
    }
  };

  const inputValue = draft !== null ? draft : String(numericValue);

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
          <label htmlFor={`${id}-input`} className='field-label'>
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
        <div className='slider-input-group'>
          <input
            id={`${id}-input`}
            type='number'
            className='slider-input text-input'
            value={inputValue}
            min={min}
            max={max}
            step={step}
            inputMode='numeric'
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyDown}
            aria-invalid={!!error}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={numericValue}
            aria-valuetext={displayValue}
          />
          {suffix && (
            <span className='slider-input-suffix' aria-hidden='true'>
              {suffix}
            </span>
          )}
        </div>
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
        onChange={(event) => {
          setDraft(null);
          onChange(Number(event.target.value));
        }}
        aria-label={label}
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
