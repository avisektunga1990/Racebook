export type CategoryType = 'all' | '50k' | '75k' | '100k';

export interface SectionItem {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  categoryTag?: 'heritage' | 'logistics' | 'safety' | 'operational' | 'inspiration';
}

export interface RunnerAccessDetail {
  category: '50k' | '75k' | '100k';
  categoryLabel: string;
  times: 1 | 2;
  legs: string;
}

export interface AidStation {
  id: string;
  km: number;
  name: string;
  googleMapsUrl: string;
  turnaroundFor?: '50K' | '75K' | '100K';
  isMajorNutrition?: boolean;
  isTimeCheckPoint?: boolean;
  accessCountSummary: string;
  runnerAccess: RunnerAccessDetail[];
  supplies: {
    name: string;
    category: 'hydration' | 'carb' | 'electrolyte' | 'solid-meal' | 'snack';
  }[];
  description?: string;
}

export interface IntermediateCutoff {
  km: number;
  location: string;
  cutoffHours: number;
  timeOfDay: string;
  description?: string;
}

export interface RaceCategory {
  name: string;
  tag: string;
  distanceKm: number;
  cutoffHours: number;
  cutoffDisplay: string;
  startTime: string;
  reportingTime: string;
  turnaroundKm: number;
  turnaroundLocation: string;
  motto: string;
  intermediateCutoffs: IntermediateCutoff[];
}

export interface GearItem {
  id: string;
  name: string;
  isMandatory: boolean;
  mandatoryCategories?: ('50k' | '75k' | '100k')[];
  notes?: string;
  iconName: string;
}

export interface HistoricalEra {
  era: string;
  title: string;
  subtitle: string;
  description: string;
  keyArtifacts: string[];
  connectionToRace: string;
}
