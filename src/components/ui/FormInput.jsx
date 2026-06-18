import { cn } from '../../lib/utils';
import { HelpTooltip } from './Tooltip';

export function FormInput({
  id,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  suffix,
  error,
  helpText,
  required,
  min,
  max,
  inputMode,
}) {
  return (
    <div className={cn('field', error && 'field--error')}>
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
      <div className='input-wrapper'>
        <input
          id={id}
          type={type}
          className='text-input'
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          aria-invalid={!!error}
          min={min}
          max={max}
          inputMode={inputMode}
        />
        {suffix && <span className='input-suffix'>{suffix}</span>}
      </div>
      {error && (
        <p className='field-error' role='alert'>
          {error}
        </p>
      )}
    </div>
  );
}
