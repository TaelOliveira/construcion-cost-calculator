import { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { formatCurrency } from '../../lib/formatters';

const INNER_RADIUS = 36;
const OUTER_RADIUS = 52;

function BreakdownTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0].payload;
  return (
    <div className='breakdown-tooltip'>
      {name} : {formatCurrency(value)}
    </div>
  );
}

export function CostBreakdownChart({ data }) {
  const [activeIndex, setActiveIndex] = useState(null);

  if (!data?.length) return null;

  return (
    <div className='cost-breakdown'>
      <div className='cost-breakdown-header'>
        <span className='cost-breakdown-title'>Cost breakdown</span>
        <TrendingUp
          size={16}
          className='cost-breakdown-icon'
          aria-hidden='true'
        />
      </div>

      <div className='cost-breakdown-body'>
        <div className='cost-breakdown-chart'>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                dataKey='value'
                nameKey='name'
                cx='50%'
                cy='50%'
                innerRadius={INNER_RADIUS}
                outerRadius={OUTER_RADIUS}
                paddingAngle={2}
                stroke='#fff'
                strokeWidth={1.5}
                activeIndex={activeIndex}
                activeShape={{
                  outerRadius: OUTER_RADIUS + 4,
                  strokeWidth: 1.5,
                }}
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<BreakdownTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <ul
          className='cost-breakdown-legend'
          aria-label='Cost breakdown components'
        >
          {data.map((item) => (
            <li key={item.name} className='legend-item'>
              <span
                className='legend-dot'
                style={{ backgroundColor: item.color }}
                aria-hidden='true'
              />
              <span className='legend-name'>{item.name}</span>
              <span className='legend-pct'>{Math.round(item.percent)}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
