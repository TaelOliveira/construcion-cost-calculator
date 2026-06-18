# Construction Cost Calculator

A premium, enterprise-grade **Construction Cost Calculator** for Australian investment properties. Built with React and Vite, it provides real-time indicative construction cost estimates with transparent step-by-step breakdowns, elemental cost visualisation, and a financial-services aesthetic suitable for professional publication.

Inspired by tools such as the [Duo Tax Construction Cost Calculator](https://duotax.com.au/construction-cost-calculator/), this application preserves the same input model and output intent while delivering a modern, accessible user experience.

---

## Features

### Calculator inputs

- **Property details:** Investment property type, construction completion year, state/territory, build type
- **Specifications:** Finish level, wall type, floor area (slider), bedrooms (slider), number of floors (slider)
- **Optional features:** Basement, elevator, mezzanine, ducted air-conditioning (toggle switches)

### Results (real-time)

- **Primary estimate** — total indicative construction cost
- **Low / high range** — ±12% variance band
- **Cost per m²** and gross floor area summary
- **Donut chart** — full elemental cost breakdown with hover tooltips
- **Share** and **print / save** actions

### UX & design

- Premium financial-services UI (institutional navy + teal brand palette)
- Sticky results panel while scrolling through the form (stops at the “How your estimate is calculated” section)
- Real-time calculation as soon as all required fields pass validation
- Form completion progress bar and section navigation
- Contextual help tooltips on complex fields
- Animated result transitions (Framer Motion)
- Mobile-first responsive layout

### Educational content

- **How your estimate is calculated** — step-by-step breakdown after inputs are complete
- FAQ accordion
- CTA section for detailed cost reports and consultation

---

## Getting started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

On Windows, if `npm install` fails with an SSL certificate error, use:

```powershell
$env:NODE_OPTIONS="--use-system-ca"
npm install
```

### Development

```bash
npm run dev
```

### Production build

```bash
npm run build
npm run preview
```

### Lint

```bash
npm run lint
```

---

## Project structure

```
src/
├── App.jsx                          # App shell, real-time calculation orchestration
├── App.css                          # Component styles
├── index.css                        # Design tokens and global styles
├── main.jsx
├── components/
│   ├── calculator/
│   │   └── CalculatorForm.jsx       # Form with RHF + Zod, sliders, switches
│   ├── layout/
│   │   └── HeroSection.jsx          # Hero + trust indicators
│   ├── results/
│   │   ├── ResultsPanel.jsx         # Sticky estimate panel
│   │   └── CostBreakdownChart.jsx   # Donut chart + legend (lazy-loaded)
│   ├── sections/
│   │   ├── HowItWorksSection.jsx    # Step breakdown + FAQ
│   │   └── CTASection.jsx
│   └── ui/
│       ├── Accordion.jsx            # Radix accordion
│       ├── FormSelect.jsx           # Radix select
│       ├── FormSlider.jsx           # Range sliders
│       ├── FormSwitch.jsx           # Radix switch toggles
│       └── Tooltip.jsx              # Radix tooltip
└── lib/
    ├── calculator.js                # Core calculation engine
    ├── constants.js                 # Rates, multipliers, options, FAQ
    ├── formatters.js                # AUD currency formatting (Intl)
    ├── schema.js                    # Zod validation schema + defaults
    └── utils.js
```

---

## Packages

### Production dependencies

| Package                       | Purpose                                               |
| ----------------------------- | ----------------------------------------------------- |
| **react** / **react-dom**     | UI framework                                          |
| **react-hook-form**           | Performant form state management                      |
| **@hookform/resolvers**       | Connects Zod schema to React Hook Form                |
| **zod**                       | Schema validation for all calculator inputs           |
| **@radix-ui/react-select**    | Accessible custom select dropdowns                    |
| **@radix-ui/react-switch**    | Accessible toggle switches                            |
| **@radix-ui/react-tooltip**   | Contextual help tooltips                              |
| **@radix-ui/react-accordion** | FAQ accordion                                         |
| **@radix-ui/react-progress**  | Form completion progress bar                          |
| **@radix-ui/react-label**     | Accessible form labels                                |
| **framer-motion**             | Result animations and breakdown step transitions      |
| **recharts**                  | Donut chart for elemental cost breakdown (code-split) |
| **lucide-react**              | Icons (hero, results, sections)                       |
| **clsx**                      | Conditional CSS class names                           |

### Dev dependencies

| Package                  | Purpose                   |
| ------------------------ | ------------------------- |
| **vite**                 | Build tool and dev server |
| **@vitejs/plugin-react** | React support for Vite    |
| **eslint** + plugins     | Linting                   |

### Considered alternatives

- **MUI / shadcn/ui** — heavier setup; custom CSS + Radix chosen for a distinct financial-brand look
- **react-number-format** — native `Intl.NumberFormat` used instead for AUD formatting
- **Nivo / Tremor** — Recharts sufficient for the donut chart

---

## How calculations work

All business logic lives in `src/lib/calculator.js`. Rate tables and multipliers are in `src/lib/constants.js` and can be updated without changing UI code.

> **Note:** Results are **indicative only**. They are based on published Australian market averages and quantity-surveying-style methodology — not proprietary Duo Tax rate tables. For accurate costing, engage a qualified quantity surveyor with architectural drawings.

### Overview

The engine computes an adjusted **cost per m²**, multiplies by **gross floor area**, adds **optional features**, and returns a total with low/high range and breakdowns.

```
Structural rate = Base rate × Finish × State × Year index × Build type × Wall × Floors × Bedrooms

Core cost       = Structural rate × Floor area

Feature total   = Sum of selected optional features

Total estimate  = Core cost + Feature total

Low estimate    = Total × 0.88
High estimate   = Total × 1.12
```

### Step-by-step (displayed in “How your estimate is calculated”)

1. **Base construction rate** — mid-rate for property type × finish multiplier
2. **Regional adjustment** — state/territory multiplier (NSW = 100% baseline)
3. **Completion year indexation** — historical cost index (2026 = 100%)
4. **Build type adjustment** — new build, renovation, extension, etc.
5. **Structural & complexity factors** — wall type × floor count × bedroom count
6. **Core construction cost** — adjusted rate × floor area (m²)
7. **Optional features** — basement, elevator, mezzanine, ducted AC (if selected)
8. **Estimated construction cost** — final total

### Base rates ($/m², Standard finish, NSW, 2026)

| Property type | Low   | Mid   | High  |
| ------------- | ----- | ----- | ----- |
| House         | 2,100 | 2,800 | 3,600 |
| Granny flat   | 1,800 | 2,400 | 3,000 |
| Townhouse     | 2,200 | 2,900 | 3,800 |
| Apartment     | 2,500 | 3,200 | 4,200 |
| Office        | 2,800 | 3,500 | 4,500 |
| Warehouse     | 1,500 | 2,000 | 2,800 |

### Multipliers

**Finish level**

| Level    | Multiplier |
| -------- | ---------- |
| Economy  | 0.75       |
| Standard | 1.00       |
| Premium  | 1.35       |
| Luxury   | 1.75       |

**State / territory** (relative to NSW)

| State | Multiplier |
| ----- | ---------- |
| NSW   | 1.00       |
| VIC   | 0.95       |
| QLD   | 0.88       |
| SA    | 0.85       |
| WA    | 0.90       |
| TAS   | 0.82       |
| ACT   | 1.05       |
| NT    | 1.10       |

**Build type**

| Type                             | Multiplier |
| -------------------------------- | ---------- |
| New build                        | 1.00       |
| Knock-down & rebuild             | 1.08       |
| Renovation – light (≤30%)        | 0.45       |
| Renovation – major (>30%)        | 0.72       |
| Extension / addition             | 0.85       |
| Granny flat / secondary dwelling | 0.95       |

**Wall type**

| Type                | Multiplier |
| ------------------- | ---------- |
| Brick veneer        | 1.00       |
| Double brick        | 1.12       |
| Reinforced concrete | 1.25       |

**Floors**

| Floors | Multiplier |
| ------ | ---------- |
| 1      | 1.00       |
| 2      | 1.08       |
| 3      | 1.15       |
| 4      | 1.22       |

**Bedrooms**

| Bedrooms | Multiplier |
| -------- | ---------- |
| 0–2      | 1.00       |
| 3–4      | 1.03       |
| 5+       | 1.06       |

**Completion year** — indexed from 2026 (1.00) back to pre-Sept 1987 (0.20). See `YEAR_INDEX` in `constants.js` for the full table.

### Optional features

| Feature                 | Cost rule         |
| ----------------------- | ----------------- |
| Basement                | +15% of core cost |
| Elevator                | +$85,000 fixed    |
| Mezzanine               | +8% of core cost  |
| Ducted air-conditioning | +$45 per m²       |

### Elemental cost breakdown (donut chart)

Core construction cost is allocated across standard QS elemental components:

| Component                  | Weight |
| -------------------------- | ------ |
| Structure & Framing        | 22%    |
| Foundation & Site Works    | 12%    |
| Roofing & External         | 11%    |
| Plumbing & Electrical      | 15%    |
| Internal Linings & Joinery | 14%    |
| Finishes & Fixtures        | 11%    |
| Preliminaries & Overheads  | 15%    |

Each optional feature is added as its own slice. Percentages are recalculated against the total estimate. Hovering a segment shows: `Component name : $amount`.

### Range variance

```
Low  = Total estimate × 0.88
High = Total estimate × 1.12
```

---

## Real-time calculation

There is no Calculate button. The form uses React Hook Form’s `watch` subscription to emit value changes to `App.jsx`. When `calculatorSchema.safeParse()` succeeds (all required fields valid), `calculateConstructionCost()` runs immediately and the results panel updates.

**Default slider values:** floor area 200 m², bedrooms 3, floors 1.

**Slider ranges (UI):**

| Field      | Min   | Max      | Step |
| ---------- | ----- | -------- | ---- |
| Floor area | 20 m² | 2,000 m² | 10   |
| Bedrooms   | 0     | 10       | 1    |
| Floors     | 1     | 4        | 1    |

Schema allows floor area up to 50,000 m² and bedrooms up to 20; adjust sliders in `CalculatorForm.jsx` if wider UI ranges are needed.

---

## Accessibility

- Skip link to calculator
- Semantic landmarks (`main`, `section`, `aside`)
- `aria-live` on results panel
- Radix UI primitives (keyboard navigation, focus management)
- Visible focus rings; `prefers-reduced-motion` respected
- Form errors exposed with `role="alert"`
- `lang="en-AU"` on the document

---

## Performance

- **Recharts** lazy-loaded via `React.lazy()` — donut chart in a separate chunk (~360 KB)
- CSS custom properties (no runtime CSS-in-JS)
- Duplicate state updates prevented with a JSON key ref in `handleValuesChange`

---

## Customisation

### Update rates or multipliers

Edit `src/lib/constants.js`:

- `PROPERTY_TYPE_RATES`
- `STATE_MULTIPLIERS`
- `FINISH_MULTIPLIERS`
- `BUILD_TYPE_MULTIPLIERS`
- `YEAR_INDEX`
- `FEATURE_COSTS`
- `ELEMENTAL_COMPONENTS`

### Update validation rules

Edit `src/lib/schema.js` (Zod schema and `defaultValues`).

### Update styling

Design tokens in `src/index.css`; component styles in `src/App.css`.

---

## What's excluded

The estimate covers **building and construction costs only**. It does **not** include:

- Land acquisition
- Site preparation and earthworks (beyond elemental allocation)
- Professional fees (architect, engineer, quantity surveyor)
- Council charges and approvals
- Landscaping

Add these separately for a complete project budget.

---

## Disclaimer

This calculator provides indicative estimates only and should not be relied upon for financial decisions, lending, or contract pricing. Market conditions, design complexity, and site-specific factors can materially affect final costs. Seek professional advice from a qualified quantity surveyor for accurate costing based on detailed plans.

---

## License

Private project — not for redistribution without permission.
