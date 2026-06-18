import { z } from 'zod';

export const calculatorSchema = z.object({
  propertyType: z.string().min(1, 'Select a property type'),
  completionYear: z.string().min(1, 'Select a completion year'),
  state: z.string().min(1, 'Select a state or territory'),
  buildType: z.string().min(1, 'Select a build type'),
  finishLevel: z.string().min(1, 'Select a finish level'),
  floorArea: z.coerce
    .number({ invalid_type_error: 'Enter a valid floor area' })
    .min(20, 'Minimum floor area is 20 m²')
    .max(50000, 'Maximum floor area is 50,000 m²'),
  bedrooms: z.coerce
    .number({ invalid_type_error: 'Enter number of bedrooms' })
    .min(0, 'Minimum 0 bedrooms')
    .max(20, 'Maximum 20 bedrooms'),
  floors: z.coerce
    .number({ invalid_type_error: 'Enter number of floors' })
    .min(1, 'Minimum 1 floor')
    .max(4, 'Maximum 4 floors'),
  wallType: z.string().min(1, 'Select a wall type'),
  basement: z.boolean(),
  elevator: z.boolean(),
  mezzanine: z.boolean(),
  ductedAC: z.boolean(),
});

export const defaultValues = {
  propertyType: '',
  completionYear: '',
  state: '',
  buildType: '',
  finishLevel: '',
  floorArea: 200,
  bedrooms: 3,
  floors: 1,
  wallType: '',
  basement: false,
  elevator: false,
  mezzanine: false,
  ductedAC: false,
};
