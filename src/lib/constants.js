export const PROPERTY_TYPES = [
  { value: 'house', label: 'House' },
  { value: 'grannyFlat', label: 'Granny Flat' },
  { value: 'townhouse', label: 'Townhouse' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'office', label: 'Office' },
  { value: 'warehouse', label: 'Warehouse' },
];

export const COMPLETION_YEARS = [
  '2026',
  '2025',
  '2024',
  '2023',
  '2022',
  '2021',
  '2020',
  '2019',
  '2018',
  '2017',
  '2016',
  '2015',
  '2014',
  '2013',
  '2012',
  '2011',
  '2010',
  '2009',
  '2008',
  '2007',
  '2006',
  '2005',
  '2004',
  '2003',
  '2002',
  '2001',
  '2000',
  '1999',
  '1998',
  '1997',
  '1996',
  '1995',
  '1994',
  '1993',
  '1992',
  '1991',
  '1990',
  '1989',
  '1988',
  'sept1987',
  'preSept1987',
].map((year) => ({
  value: year,
  label:
    year === 'sept1987'
      ? 'Sept 1987'
      : year === 'preSept1987'
        ? '< Sept 1987'
        : year,
}));

export const STATES = [
  { value: 'NSW', label: 'New South Wales' },
  { value: 'VIC', label: 'Victoria' },
  { value: 'QLD', label: 'Queensland' },
  { value: 'SA', label: 'South Australia' },
  { value: 'WA', label: 'Western Australia' },
  { value: 'TAS', label: 'Tasmania' },
  { value: 'ACT', label: 'Australian Capital Territory' },
  { value: 'NT', label: 'Northern Territory' },
];

export const BUILD_TYPES = [
  { value: 'newBuild', label: 'New build' },
  { value: 'knockdownRebuild', label: 'Knock-down & rebuild' },
  { value: 'renovationLight', label: 'Renovation – light (≤30% area)' },
  { value: 'renovationMajor', label: 'Renovation – major (>30% area)' },
  { value: 'extension', label: 'Extension / addition' },
  { value: 'grannyFlatSecondary', label: 'Granny flat / secondary dwelling' },
];

export const FINISH_LEVELS = [
  { value: 'economy', label: 'Economy' },
  { value: 'standard', label: 'Standard' },
  { value: 'premium', label: 'Premium' },
  { value: 'luxury', label: 'Luxury' },
];

export const WALL_TYPES = [
  { value: 'brickVeneer', label: 'Brick veneer' },
  { value: 'doubleBrick', label: 'Double brick' },
  { value: 'reinforcedConcrete', label: 'Reinforced concrete' },
];

/** Base $/m² rates by property type (Standard finish, NSW baseline, 2026) */
export const PROPERTY_TYPE_RATES = {
  house: { low: 2100, mid: 2800, high: 3600 },
  grannyFlat: { low: 1800, mid: 2400, high: 3000 },
  townhouse: { low: 2200, mid: 2900, high: 3800 },
  apartment: { low: 2500, mid: 3200, high: 4200 },
  office: { low: 2800, mid: 3500, high: 4500 },
  warehouse: { low: 1500, mid: 2000, high: 2800 },
};

/** Regional cost index relative to NSW (1.0) */
export const STATE_MULTIPLIERS = {
  NSW: 1.0,
  VIC: 0.95,
  QLD: 0.88,
  SA: 0.85,
  WA: 0.9,
  TAS: 0.82,
  ACT: 1.05,
  NT: 1.1,
};

export const FINISH_MULTIPLIERS = {
  economy: 0.75,
  standard: 1.0,
  premium: 1.35,
  luxury: 1.75,
};

export const BUILD_TYPE_MULTIPLIERS = {
  newBuild: 1.0,
  knockdownRebuild: 1.08,
  renovationLight: 0.45,
  renovationMajor: 0.72,
  extension: 0.85,
  grannyFlatSecondary: 0.95,
};

export const WALL_TYPE_MULTIPLIERS = {
  brickVeneer: 1.0,
  doubleBrick: 1.12,
  reinforcedConcrete: 1.25,
};

/** Construction cost index by completion year (2026 = 1.0) */
export const YEAR_INDEX = {
  2026: 1.0,
  2025: 0.97,
  2024: 0.94,
  2023: 0.91,
  2022: 0.88,
  2021: 0.85,
  2020: 0.82,
  2019: 0.79,
  2018: 0.76,
  2017: 0.74,
  2016: 0.72,
  2015: 0.7,
  2014: 0.68,
  2013: 0.66,
  2012: 0.64,
  2011: 0.62,
  2010: 0.6,
  2009: 0.58,
  2008: 0.56,
  2007: 0.54,
  2006: 0.52,
  2005: 0.5,
  2004: 0.48,
  2003: 0.46,
  2002: 0.44,
  2001: 0.42,
  2000: 0.4,
  1999: 0.38,
  1998: 0.36,
  1997: 0.34,
  1996: 0.32,
  1995: 0.3,
  1994: 0.28,
  1993: 0.27,
  1992: 0.26,
  1991: 0.25,
  1990: 0.24,
  1989: 0.23,
  1988: 0.22,
  sept1987: 0.21,
  preSept1987: 0.2,
};

export const FLOOR_MULTIPLIERS = {
  1: 1.0,
  2: 1.08,
  3: 1.15,
  4: 1.22,
};

export const FEATURE_COSTS = {
  basement: { type: 'percent', value: 0.15 },
  elevator: { type: 'fixed', value: 85000 },
  mezzanine: { type: 'percent', value: 0.08 },
  ductedAC: { type: 'perSqm', value: 45 },
};

export const RANGE_VARIANCE = { low: 0.88, high: 1.12 };

/** Elemental cost-plan weights for core construction (sum = 1.0) */
export const ELEMENTAL_COMPONENTS = [
  {
    id: 'structure',
    name: 'Structure & Framing',
    weight: 0.22,
    color: '#1e3a5f',
  },
  {
    id: 'foundation',
    name: 'Foundation & Site Works',
    weight: 0.12,
    color: '#c9a227',
  },
  { id: 'roofing', name: 'Roofing & External', weight: 0.11, color: '#4a90a4' },
  {
    id: 'services',
    name: 'Plumbing & Electrical',
    weight: 0.15,
    color: '#0f766e',
  },
  {
    id: 'linings',
    name: 'Internal Linings & Joinery',
    weight: 0.14,
    color: '#b45309',
  },
  {
    id: 'finishes',
    name: 'Finishes & Fixtures',
    weight: 0.11,
    color: '#64748b',
  },
  {
    id: 'preliminaries',
    name: 'Preliminaries & Overheads',
    weight: 0.15,
    color: '#475569',
  },
];

export const FEATURE_SLICE_COLORS = {
  basement: '#6b7280',
  elevator: '#8b5cf6',
  mezzanine: '#0891b2',
  ductedAC: '#059669',
};

export const FIELD_HELP = {
  propertyType: 'The type of investment property being constructed or valued.',
  completionYear:
    'The year construction was or will be completed. Affects cost indexation.',
  state:
    'State and territory location influences labour rates and material availability.',
  buildType:
    'New builds cost more per area than partial renovations or extensions.',
  finishLevel:
    'Economy through luxury — finish quality significantly affects cost per m².',
  floorArea:
    'Gross floor area (GFA): total fully enclosed floor space measured externally.',
  bedrooms: 'Number of bedrooms affects internal complexity and fit-out costs.',
  floors: 'Multi-storey builds incur structural and services premiums.',
  wallType:
    'Structural wall construction method affects material and labour costs.',
  basement:
    'Below-ground construction adds significant excavation and waterproofing costs.',
  elevator: 'Passenger or goods lift installation and compliance.',
  mezzanine: 'Intermediate floor level within a high-ceiling space.',
  ductedAC: 'Central ducted air-conditioning throughout the property.',
};

export const FAQ_ITEMS = [
  {
    question: 'What is the Construction Cost Calculator?',
    answer:
      'This calculator estimates expected construction costs for Australian investment properties based on gross floor area, location, finish level, and build specifications. Results are indicative only.',
  },
  {
    question: 'How is gross floor area measured?',
    answer:
      'Gross floor area is the total fully enclosed floor space across all levels, measured externally to include wall thickness. It includes staircases, garages, attics, basements, and lift shafts.',
  },
  {
    question: 'What is excluded from the estimate?',
    answer:
      'Land acquisition, site preparation, professional fees, council charges, and landscaping are not included. Add these separately for a complete project budget.',
  },
  {
    question: 'How accurate is this estimate?',
    answer:
      'Calculators provide indicative ranges based on market averages. For accurate costing, engage a qualified quantity surveyor with detailed architectural drawings.',
  },
];
