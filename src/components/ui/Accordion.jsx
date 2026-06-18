import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

export function AccordionRoot({ children, type = 'single', ...props }) {
  return (
    <Accordion.Root type={type} collapsible className='accordion' {...props}>
      {children}
    </Accordion.Root>
  );
}

export function AccordionItem({ value, title, children }) {
  return (
    <Accordion.Item value={value} className='accordion-item'>
      <Accordion.Header>
        <Accordion.Trigger className='accordion-trigger'>
          <span>{title}</span>
          <ChevronDown className='accordion-chevron' aria-hidden='true' />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className='accordion-content'>
        <div className='accordion-content-inner'>{children}</div>
      </Accordion.Content>
    </Accordion.Item>
  );
}
