import { Atributo } from '../data/atributos';
import { CharacterAttributes, CharacterReligion } from './Character';
import { ClassDescription } from './Class';
import { FaithProbability } from './Divindade';
import { Bag } from './Equipment';
import Origin from './Origin';
import { OriginPower, GeneralPower } from './Poderes';
import { skill } from './Skills';
import { Spell } from './Spells';

export interface RaceAttributeAbility {
  attr: Atributo | 'any';
  mod: number;
}

export type raceSize =
  | 'MINUSCULO'
  | 'PEQUENO'
  | 'MEDIO'
  | 'GRANDE'
  | 'ENORME'
  | 'COLOSSAL';

interface SizeModifiers {
  stealth: number;
  maneuver: number;
}
export interface RaceSize {
  naturalRange: number;
  modifiers: SizeModifiers;
  name: string;
}

export interface CharacterStats {
  level: number;
  attributes: CharacterAttributes;
  classDescription: ClassDescription;
  pv: number;
  pm: number;
  defense: number;
  bag: Bag;
  devote?: CharacterReligion;
  origin: Origin;
  spells: Spell[];
  displacement: number;
  size: RaceSize;
  maxWeight: number;
  skills: skill[];
  powers: {
    general: GeneralPower[];
    origin: OriginPower[];
  };
}

export interface RaceAbility {
  name: string;
  description: string;
  action: (stats: CharacterStats) => CharacterStats;
}

export default interface Race {
  name: string;
  attributes: {
    attrs: RaceAttributeAbility[];
    texts: string[];
  };
  abilities: Record<string, RaceAbility>;
  oldRace?: Race;
  setup?: (race: Race, allRaces: Race[]) => Race;
  getSize?: (race: Race) => RaceSize;
  getDisplacement?: (race: Race) => number;
  faithProbability?: FaithProbability;
  size?: RaceSize;
}
