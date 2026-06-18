import * as Switch from '@radix-ui/react-switch';
import { Check } from 'lucide-react';
import { HelpTooltip } from './Tooltip';

export function FormSwitch({ id, label, checked, onChange, helpText }) {
  return (
    <div className='switch-field'>
      <div className='switch-header'>
        <label htmlFor={id} className='switch-label'>
          {label}
        </label>
        {helpText && (
          <HelpTooltip content={helpText} label={`Help: ${label}`} />
        )}
      </div>
      <div className='switch-control'>
        <Switch.Root
          id={id}
          className='switch-root'
          checked={checked}
          onCheckedChange={onChange}
        >
          <Switch.Thumb className='switch-thumb' />
        </Switch.Root>
        <span
          className={`switch-status${checked ? ' switch-status--yes' : ' switch-status--no'}`}
          aria-hidden='true'
        >
          {checked && (
            <Check className='switch-status-icon' size={13} strokeWidth={2.5} />
          )}
          {checked ? 'Yes' : 'No'}
        </span>
      </div>
    </div>
  );
}
