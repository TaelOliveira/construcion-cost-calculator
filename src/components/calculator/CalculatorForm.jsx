import { useEffect } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Progress from '@radix-ui/react-progress';
import { Building2, Ruler, Sparkles } from 'lucide-react';
import {
  PROPERTY_TYPES,
  COMPLETION_YEARS,
  STATES,
  BUILD_TYPES,
  FINISH_LEVELS,
  WALL_TYPES,
  FIELD_HELP,
} from '../../lib/constants';
import { calculatorSchema, defaultValues } from '../../lib/schema';
import { FormSelect } from '../ui/FormSelect';
import { FormSlider } from '../ui/FormSlider';
import { FormSwitch } from '../ui/FormSwitch';

const SECTIONS = [
  { id: 'property', label: 'Property', icon: Building2 },
  { id: 'specs', label: 'Specifications', icon: Ruler },
  { id: 'features', label: 'Features', icon: Sparkles },
];

function getProgress(values) {
  const required = [
    'propertyType',
    'completionYear',
    'state',
    'buildType',
    'finishLevel',
    'floorArea',
    'bedrooms',
    'floors',
    'wallType',
  ];
  const filled = required.filter((key) => {
    const val = values[key];
    return val !== '' && val != null && val !== undefined;
  });
  return Math.round((filled.length / required.length) * 100);
}

export function CalculatorForm({ onValuesChange }) {
  const {
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(calculatorSchema),
    defaultValues,
    mode: 'onChange',
  });

  const values = useWatch({ control }) ?? defaultValues;
  const progress = getProgress(values);
  const valuesKey = JSON.stringify(values);

  useEffect(() => {
    onValuesChange(values);
  }, [valuesKey, onValuesChange, values]);

  return (
    <div className='calculator-form'>
      <div className='form-progress'>
        <div className='form-progress-header'>
          <span className='form-progress-label'>Form completion</span>
          <span className='form-progress-value'>{progress}%</span>
        </div>
        <Progress.Root className='progress-root' value={progress}>
          <Progress.Indicator
            className='progress-indicator'
            style={{ transform: `translateX(-${100 - progress}%)` }}
          />
        </Progress.Root>
        <nav className='section-nav' aria-label='Calculator sections'>
          {SECTIONS.map(({ id, label, icon: Icon }) => (
            <a key={id} href={`#section-${id}`} className='section-nav-link'>
              <Icon size={14} aria-hidden='true' />
              {label}
            </a>
          ))}
        </nav>
      </div>

      <section
        id='section-property'
        className='form-section'
        aria-labelledby='property-heading'
      >
        <h2 id='property-heading' className='form-section-title'>
          <Building2 size={20} aria-hidden='true' />
          Property details
        </h2>
        <p className='form-section-desc'>
          Tell us about the investment property and its location.
        </p>
        <div className='form-grid'>
          <Controller
            name='propertyType'
            control={control}
            render={({ field }) => (
              <FormSelect
                id='propertyType'
                label='Investment property type'
                options={PROPERTY_TYPES}
                helpText={FIELD_HELP.propertyType}
                required
                {...field}
                error={errors.propertyType?.message}
              />
            )}
          />
          <Controller
            name='completionYear'
            control={control}
            render={({ field }) => (
              <FormSelect
                id='completionYear'
                label='Construction completion year'
                options={COMPLETION_YEARS}
                helpText={FIELD_HELP.completionYear}
                required
                {...field}
                error={errors.completionYear?.message}
              />
            )}
          />
          <Controller
            name='state'
            control={control}
            render={({ field }) => (
              <FormSelect
                id='state'
                label='Investment property state'
                options={STATES}
                helpText={FIELD_HELP.state}
                required
                {...field}
                error={errors.state?.message}
              />
            )}
          />
          <Controller
            name='buildType'
            control={control}
            render={({ field }) => (
              <FormSelect
                id='buildType'
                label='Build type'
                options={BUILD_TYPES}
                helpText={FIELD_HELP.buildType}
                required
                {...field}
                error={errors.buildType?.message}
              />
            )}
          />
        </div>
      </section>

      <section
        id='section-specs'
        className='form-section'
        aria-labelledby='specs-heading'
      >
        <h2 id='specs-heading' className='form-section-title'>
          <Ruler size={20} aria-hidden='true' />
          Specifications
        </h2>
        <p className='form-section-desc'>
          Define the size, finish quality, and structural characteristics.
        </p>
        <div className='form-grid'>
          <Controller
            name='finishLevel'
            control={control}
            render={({ field }) => (
              <FormSelect
                id='finishLevel'
                label='Spec / finish level'
                options={FINISH_LEVELS}
                helpText={FIELD_HELP.finishLevel}
                required
                {...field}
                error={errors.finishLevel?.message}
              />
            )}
          />
          <Controller
            name='wallType'
            control={control}
            render={({ field }) => (
              <FormSelect
                id='wallType'
                label='Wall type'
                options={WALL_TYPES}
                helpText={FIELD_HELP.wallType}
                required
                {...field}
                error={errors.wallType?.message}
              />
            )}
          />
        </div>

        <div className='slider-grid'>
          <Controller
            name='floorArea'
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormSlider
                id='floorArea'
                label='Floor area'
                suffix='m²'
                min={20}
                max={2000}
                step={10}
                value={value}
                onChange={onChange}
                helpText={FIELD_HELP.floorArea}
                required
                wide
                error={errors.floorArea?.message}
              />
            )}
          />
          <Controller
            name='bedrooms'
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormSlider
                id='bedrooms'
                label='How many bedrooms?'
                min={0}
                max={10}
                step={1}
                value={value}
                onChange={onChange}
                helpText={FIELD_HELP.bedrooms}
                required
                error={errors.bedrooms?.message}
              />
            )}
          />
          <Controller
            name='floors'
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormSlider
                id='floors'
                label='Number of floors'
                min={1}
                max={4}
                step={1}
                value={value}
                onChange={onChange}
                helpText={FIELD_HELP.floors}
                required
                error={errors.floors?.message}
              />
            )}
          />
        </div>
      </section>

      <section
        id='section-features'
        className='form-section'
        aria-labelledby='features-heading'
      >
        <h2 id='features-heading' className='form-section-title'>
          <Sparkles size={20} aria-hidden='true' />
          Optional features
        </h2>
        <p className='form-section-desc'>
          Select any additional building features that apply to your project.
        </p>
        <div className='switch-grid'>
          <Controller
            name='basement'
            control={control}
            render={({ field: { value, onChange } }) => (
              <FormSwitch
                id='basement'
                label='Basement'
                helpText={FIELD_HELP.basement}
                checked={value}
                onChange={onChange}
              />
            )}
          />
          <Controller
            name='elevator'
            control={control}
            render={({ field: { value, onChange } }) => (
              <FormSwitch
                id='elevator'
                label='Elevator'
                helpText={FIELD_HELP.elevator}
                checked={value}
                onChange={onChange}
              />
            )}
          />
          <Controller
            name='mezzanine'
            control={control}
            render={({ field: { value, onChange } }) => (
              <FormSwitch
                id='mezzanine'
                label='Mezzanine'
                helpText={FIELD_HELP.mezzanine}
                checked={value}
                onChange={onChange}
              />
            )}
          />
          <Controller
            name='ductedAC'
            control={control}
            render={({ field: { value, onChange } }) => (
              <FormSwitch
                id='ductedAC'
                label='Ducted air-conditioning'
                helpText={FIELD_HELP.ductedAC}
                checked={value}
                onChange={onChange}
              />
            )}
          />
        </div>
      </section>
    </div>
  );
}
