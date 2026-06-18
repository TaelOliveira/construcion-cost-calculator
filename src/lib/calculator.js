import {
  BUILD_TYPE_MULTIPLIERS,
  BUILD_TYPES,
  COMPLETION_YEARS,
  FEATURE_COSTS,
  FINISH_LEVELS,
  FINISH_MULTIPLIERS,
  FLOOR_MULTIPLIERS,
  PROPERTY_TYPE_RATES,
  PROPERTY_TYPES,
  RANGE_VARIANCE,
  STATES,
  STATE_MULTIPLIERS,
  WALL_TYPE_MULTIPLIERS,
  WALL_TYPES,
  YEAR_INDEX,
  ELEMENTAL_COMPONENTS,
  FEATURE_SLICE_COLORS,
} from './constants';

function labelFor(options, value) {
  return options.find((o) => o.value === value)?.label ?? value;
}

function bedroomMultiplier(bedrooms) {
  if (bedrooms <= 2) return 1.0;
  if (bedrooms <= 4) return 1.03;
  return 1.06;
}

function buildCostBreakdown(coreCost, features, totalEstimate) {
  const slices = ELEMENTAL_COMPONENTS.map((component) => ({
    name: component.name,
    value: Math.round(coreCost * component.weight),
    color: component.color,
  }));

  const featureKeys = {
    Basement: 'basement',
    Elevator: 'elevator',
    Mezzanine: 'mezzanine',
    'Ducted air-conditioning': 'ductedAC',
  };

  features.forEach((feature) => {
    const key = featureKeys[feature.label];
    slices.push({
      name: feature.label,
      value: Math.round(feature.value),
      color: FEATURE_SLICE_COLORS[key] ?? '#94a3b8',
    });
  });

  const sum = slices.reduce((acc, slice) => acc + slice.value, 0);
  const diff = Math.round(totalEstimate) - sum;
  if (diff !== 0 && slices.length > 0) {
    slices[0].value += diff;
  }

  return slices
    .map((slice) => ({
      ...slice,
      percent: (slice.value / totalEstimate) * 100,
    }))
    .sort((a, b) => b.value - a.value);
}

/**
 * Core construction cost engine.
 * Returns primary estimate, low/high range, and step-by-step breakdown.
 */
export function calculateConstructionCost(input) {
  const {
    propertyType,
    completionYear,
    state,
    buildType,
    finishLevel,
    floorArea,
    bedrooms,
    floors,
    wallType,
    basement,
    elevator,
    mezzanine,
    ductedAC,
  } = input;

  const rates = PROPERTY_TYPE_RATES[propertyType];
  const finishMult = FINISH_MULTIPLIERS[finishLevel];
  const stateMult = STATE_MULTIPLIERS[state];
  const yearIndex = YEAR_INDEX[completionYear] ?? 1;
  const buildMult = BUILD_TYPE_MULTIPLIERS[buildType];
  const wallMult = WALL_TYPE_MULTIPLIERS[wallType];
  const floorMult = FLOOR_MULTIPLIERS[Math.min(floors, 4)] ?? 1.22;
  const bedroomMult = bedroomMultiplier(bedrooms);

  const baseRateMid = rates.mid;
  const finishAdjustedRate = baseRateMid * finishMult;

  const steps = [];

  steps.push({
    id: 'base-rate',
    label: 'Base construction rate',
    description: `${labelFor(PROPERTY_TYPES, propertyType)} · ${labelFor(FINISH_LEVELS, finishLevel)} finish`,
    value: finishAdjustedRate,
    unit: 'per m²',
    type: 'rate',
  });

  const regionalRate = finishAdjustedRate * stateMult;
  steps.push({
    id: 'regional',
    label: 'Regional adjustment',
    description: `${labelFor(STATES, state)} (${Math.round(stateMult * 100)}% of NSW baseline)`,
    value: regionalRate,
    unit: 'per m²',
    type: 'rate',
    multiplier: stateMult,
  });

  const indexedRate = regionalRate * yearIndex;
  steps.push({
    id: 'year-index',
    label: 'Completion year indexation',
    description: `${labelFor(COMPLETION_YEARS, completionYear)} (${Math.round(yearIndex * 100)}% index)`,
    value: indexedRate,
    unit: 'per m²',
    type: 'rate',
    multiplier: yearIndex,
  });

  const buildAdjustedRate = indexedRate * buildMult;
  steps.push({
    id: 'build-type',
    label: 'Build type adjustment',
    description: labelFor(BUILD_TYPES, buildType),
    value: buildAdjustedRate,
    unit: 'per m²',
    type: 'rate',
    multiplier: buildMult,
  });

  const structuralRate = buildAdjustedRate * wallMult * floorMult * bedroomMult;
  steps.push({
    id: 'structural',
    label: 'Structural & complexity factors',
    description: `${labelFor(WALL_TYPES, wallType)} · ${floors} floor${floors > 1 ? 's' : ''} · ${bedrooms} bed`,
    value: structuralRate,
    unit: 'per m²',
    type: 'rate',
    multiplier: wallMult * floorMult * bedroomMult,
  });

  const coreCost = structuralRate * floorArea;
  steps.push({
    id: 'core-cost',
    label: 'Core construction cost',
    description: `${floorArea.toLocaleString('en-AU')} m² × ${Math.round(structuralRate).toLocaleString('en-AU')} per m²`,
    value: coreCost,
    type: 'currency',
  });

  let featureTotal = 0;
  const features = [];

  if (basement) {
    const cost = coreCost * FEATURE_COSTS.basement.value;
    featureTotal += cost;
    features.push({ label: 'Basement', value: cost });
  }
  if (elevator) {
    const cost = FEATURE_COSTS.elevator.value;
    featureTotal += cost;
    features.push({ label: 'Elevator', value: cost });
  }
  if (mezzanine) {
    const cost = coreCost * FEATURE_COSTS.mezzanine.value;
    featureTotal += cost;
    features.push({ label: 'Mezzanine', value: cost });
  }
  if (ductedAC) {
    const cost = floorArea * FEATURE_COSTS.ductedAC.value;
    featureTotal += cost;
    features.push({ label: 'Ducted air-conditioning', value: cost });
  }

  if (features.length > 0) {
    steps.push({
      id: 'features',
      label: 'Optional features',
      description: features.map((f) => f.label).join(', '),
      value: featureTotal,
      type: 'currency',
      breakdown: features,
    });
  }

  const totalEstimate = coreCost + featureTotal;

  steps.push({
    id: 'total',
    label: 'Estimated construction cost',
    description: 'Finish level selected — indicative total',
    value: totalEstimate,
    type: 'currency',
    highlight: true,
  });

  const lowEstimate = totalEstimate * RANGE_VARIANCE.low;
  const highEstimate = totalEstimate * RANGE_VARIANCE.high;

  const finishLow =
    rates.low *
    finishMult *
    stateMult *
    yearIndex *
    buildMult *
    wallMult *
    floorMult *
    bedroomMult *
    floorArea;
  const finishHigh =
    rates.high *
      finishMult *
      stateMult *
      yearIndex *
      buildMult *
      wallMult *
      floorMult *
      bedroomMult *
      floorArea +
    featureTotal;

  const breakdownChart = [
    { name: 'Core build', value: coreCost, color: 'var(--chart-1)' },
    ...(featureTotal > 0
      ? [{ name: 'Features', value: featureTotal, color: 'var(--chart-2)' }]
      : []),
  ];

  const costBreakdown = buildCostBreakdown(coreCost, features, totalEstimate);

  const rateComparison = [
    { name: 'Economy', rate: rates.low * stateMult * yearIndex * buildMult },
    { name: 'Standard', rate: rates.mid * stateMult * yearIndex * buildMult },
    {
      name: 'Premium',
      rate: rates.mid * 1.35 * stateMult * yearIndex * buildMult,
    },
    { name: 'Luxury', rate: rates.high * stateMult * yearIndex * buildMult },
  ];

  return {
    totalEstimate,
    lowEstimate,
    highEstimate,
    finishLow: finishLow + featureTotal * RANGE_VARIANCE.low,
    finishHigh: finishHigh,
    costPerSqm: totalEstimate / floorArea,
    steps,
    breakdownChart,
    costBreakdown,
    rateComparison,
    assumptions: {
      propertyType: labelFor(PROPERTY_TYPES, propertyType),
      state: labelFor(STATES, state),
      finishLevel: labelFor(FINISH_LEVELS, finishLevel),
      buildType: labelFor(BUILD_TYPES, buildType),
      floorArea,
      completionYear: labelFor(COMPLETION_YEARS, completionYear),
    },
  };
}

export function isFormComplete(values) {
  return (
    values.propertyType &&
    values.completionYear &&
    values.state &&
    values.buildType &&
    values.finishLevel &&
    values.wallType &&
    values.floorArea > 0 &&
    values.bedrooms >= 0 &&
    values.floors >= 1
  );
}
