import * as Select from '@radix-ui/react-select';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '../../lib/utils';
import { HelpTooltip } from './Tooltip';

export function FormSelect({
  id,
  label,
  placeholder = 'Select...',
  options,
  value,
  onChange,
  error,
  helpText,
  required,
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
      <Select.Root value={value || undefined} onValueChange={onChange}>
        <Select.Trigger
          id={id}
          className='select-trigger'
          aria-invalid={!!error}
        >
          <Select.Value placeholder={placeholder} />
          <Select.Icon className='select-icon'>
            <ChevronDown size={16} />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            className='select-content'
            position='popper'
            sideOffset={4}
          >
            <Select.Viewport className='select-viewport'>
              {options.map((option) => (
                <Select.Item
                  key={option.value}
                  value={option.value}
                  className='select-item'
                >
                  <Select.ItemIndicator className='select-item-indicator'>
                    <Check size={14} />
                  </Select.ItemIndicator>
                  <Select.ItemText>{option.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
      {error && (
        <p className='field-error' role='alert'>
          {error}
        </p>
      )}
    </div>
  );
}
