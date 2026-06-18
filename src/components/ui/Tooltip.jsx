import * as TooltipPrimitive from '@radix-ui/react-tooltip';

export function TooltipProvider({ children }) {
  return (
    <TooltipPrimitive.Provider delayDuration={200}>
      {children}
    </TooltipPrimitive.Provider>
  );
}

export function HelpTooltip({ content, label = 'More information' }) {
  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>
        <button type='button' className='help-trigger' aria-label={label}>
          <svg
            width='16'
            height='16'
            viewBox='0 0 16 16'
            fill='none'
            aria-hidden='true'
          >
            <circle
              cx='8'
              cy='8'
              r='7'
              stroke='currentColor'
              strokeWidth='1.5'
            />
            <path
              d='M6.2 6.1c.2-1.1 1.1-1.8 2.3-1.8 1.4 0 2.3.8 2.3 2 0 1.4-1.5 1.7-1.8 2.7V9.5M8 12.2h.01'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
            />
          </svg>
        </button>
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content className='tooltip-content' sideOffset={6}>
          {content}
          <TooltipPrimitive.Arrow className='tooltip-arrow' />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}
