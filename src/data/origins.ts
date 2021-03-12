import _ from 'lodash';
import Origin, { OriginBenefits } from '../interfaces/Origin';
import {
  getNotRepeatedRandomSkill,
  getNotUsedSkillsFromAllowed,
} from './pericias';
import originPowers, { ORIGIN_POWER_TYPE } from './powers/originPowers';
import { DestinyPowers } from './powers/destinyPowers';
import {
  getRandomItemFromArray,
  pickFromArray,
} from '../functions/randomUtils';
import { OriginPower, GeneralPower } from '../interfaces/Poderes';
import generalPowers from './poderes';
import Skill from '../interfaces/Skills';

export type origins =
  | 'Acólito'
  | 'Amigo dos Animais'
  | 'Amnésico'
  | 'Aristocrata'
  | 'Artesão'
  | 'Artista'
  | 'Assistente de Laboratório'
  | 'Batedor'
  | 'Capanga'
  | 'Charlatão'
  | 'Circense'
  | 'Criminoso'
  | 'Curandeiro'
  | 'Eremita'
  | 'Escravo'
  | 'Estudioso'
  | 'Fazendeiro'
  | 'Forasteiro'
  | 'Gladiador'
  | 'Guarda'
  | 'Herdeiro'
  | 'Herói Camponês'
  | 'Marujo'
  | 'Mateiro'
  | 'Membro de Guilda'
  | 'Mercador'
  | 'Minerador'
  | 'Nômade'
  | 'Pivete'
  | 'Refugiado'
  | 'Seguidor'
  | 'Selvagem'
  | 'Soldado'
  | 'Taverneiro'
  | 'Trabalhador';

export const ORIGINS: Record<origins, Origin> = {
  Acólito: {
    name: 'Acólito',
    itens: [],
    pericias: [Skill.CURA, Skill.RELIGIAO, Skill.VONTADE],
    poderes: [originPowers.MEMBRO_DA_IGREJA], // TODO: Adicionar Medicina, Vontade de Ferro
  },
  'Amigo dos Animais': {
    name: 'Amigo dos Animais',
    itens: [],
    pericias: [Skill.ADESTRAMENTO, Skill.CAVALGAR],
    poderes: [originPowers.AMIGO_ESPECIAL],
  },
  Amnésico: {
    name: 'Amnésico',
    itens: [],
    pericias: [],
    poderes: [originPowers.LEMBRANCAS_GRADUAIS],
  },
  Aristocrata: {
    name: 'Aristocrata',
    itens: [],
    pericias: [Skill.DIPLOMACIA, Skill.ENGANACAO, Skill.NOBREZA],
    poderes: [originPowers.SANGUE_AZUL],
  },
  Artesão: {
    name: 'Artesão',
    itens: [],
    pericias: [Skill.OFICIO, Skill.VONTADE],
    poderes: [originPowers.FRUDOS_DO_TRABALHO],
  },
  Artista: {
    name: 'Artista',
    itens: [],
    pericias: [Skill.ATUACAO, Skill.ENGANACAO],
    poderes: [originPowers.DOM_ARTISTICO],
  },
  'Assistente de Laboratório': {
    name: 'Assistente de Laboratório',
    itens: [],
    pericias: [Skill.OFICIO],
    poderes: [originPowers.ESSE_CHEIRO],
  },
  Batedor: {
    name: 'Batedor',
    itens: [],
    pericias: [Skill.PERCEPCAO, Skill.SOBREVIVENCIA],
    poderes: [originPowers.PROVA_DE_TUDO],
  },
  Capanga: {
    name: 'Capanga',
    itens: [],
    pericias: [Skill.LUTA, Skill.INTIMIDACAO],
    poderes: [originPowers.CONFISSAO],
  },
  Charlatão: {
    name: 'Charlatão',
    itens: [],
    pericias: [Skill.ENGANACAO, Skill.JOGATINA],
    poderes: [
      originPowers.ALPINISTA_SOCIAL,
      DestinyPowers.APARENCIA_INOFENSIVA,
      DestinyPowers.SORTUDO,
    ],
  },
  Circense: {
    name: 'Circense',
    itens: [],
    pericias: [Skill.ACROBACIA, Skill.ATUACAO, Skill.REFLEXOS],
    poderes: [originPowers.TRUQUE_DE_MAGICA],
  },
  Criminoso: {
    name: 'Criminoso',
    itens: [],
    pericias: [Skill.ENGANACAO, Skill.FURTIVIDADE, Skill.LADINAGEM],
    poderes: [originPowers.PUNGUISTA], // TODO: Adicionar Venefício
  },
  Curandeiro: {
    name: 'Curandeiro',
    itens: [],
    pericias: [Skill.CURA, Skill.VONTADE],
    poderes: [originPowers.MEDICO_DE_CAMPO], // TODO: Adicionar Medicina e Venfício
  },
  Eremita: {
    name: 'Eremita',
    itens: [],
    pericias: [Skill.MISTICISMO, Skill.RELIGIAO, Skill.SOBREVIVENCIA],
    poderes: [originPowers.BUSCA_INTERIOR], // TODO: Adicionar Lobo Solitário
  },
  Escravo: {
    name: 'Escravo',
    itens: [],
    pericias: [Skill.ATLETISMO, Skill.FORTITUDE, Skill.FURTIVIDADE],
    poderes: [originPowers.DESEJO_DE_LIBERDADE], // TODO: Adicionar Vitalidade
  },
  Estudioso: {
    name: 'Estudioso',
    itens: [],
    pericias: [Skill.CONHECIMENTO, Skill.GUERRA, Skill.MISTICISMO],
    poderes: [
      originPowers.PALPITE_FUNDAMENTADO,
      DestinyPowers.APARENCIA_INOFENSIVA,
    ],
  },
  Fazendeiro: {
    name: 'Fazendeiro',
    itens: [],
    pericias: [Skill.ADESTRAMENTO, Skill.CAVALGAR, Skill.OFICIO],
    poderes: [originPowers.AGUA_NO_FEIJAO],
  },
  Forasteiro: {
    name: 'Forasteiro',
    itens: [],
    pericias: [Skill.CAVALGAR, Skill.PILOTAGEM, Skill.SOBREVIVENCIA],
    poderes: [originPowers.CULTURA_EXOTICA], // TODO: Adicionar Lobo Solitário
  },
  Gladiador: {
    name: 'Gladiador',
    itens: [],
    pericias: [Skill.ATUACAO, Skill.LUTA],
    poderes: [originPowers.PAO_E_CIRCO], // TODO: Adicionar Atraente, Torcida e um poder de combate Random
  },
  Guarda: {
    name: 'Guarda',
    itens: [],
    pericias: [Skill.INVESTIGACAO, Skill.LUTA, Skill.PERCEPCAO],
    poderes: [originPowers.DETETIVE], // TODO: Adicionar Investigador e um poder de combate random
  },
  Herdeiro: {
    name: 'Herdeiro',
    itens: [],
    pericias: [Skill.MISTICISMO, Skill.NOBREZA, Skill.OFICIO],
    poderes: [originPowers.HERANCA, originPowers.HERANCA], // TODO: Adicionar Comandar
  },
  'Herói Camponês': {
    name: 'Herói Camponês',
    itens: [],
    pericias: [Skill.ADESTRAMENTO, Skill.OFICIO],
    poderes: [originPowers.AMIGO_DOS_PLEBEUS], // TODO: Adicionar Sortudo, Surto Heróico, Torcida
  },
  Marujo: {
    name: 'Marujo',
    itens: [],
    pericias: [Skill.ATLETISMO, Skill.JOGATINA, Skill.PILOTAGEM],
    poderes: [originPowers.PASSAGEM_DE_NAVIO], // TODO: Adicionar Acróbatico
  },
  Mateiro: {
    name: 'Mateiro',
    itens: [],
    pericias: [Skill.ATLETISMO, Skill.FURTIVIDADE, Skill.SOBREVIVENCIA],
    poderes: [originPowers.VENDEDOR_DE_CARCACAS], // TODO: Adicionar Lobo Solitário, Sentidos Aguçados
  },
  'Membro de Guilda': {
    name: 'Membro de Guilda',
    itens: [],
    pericias: [
      Skill.DIPLOMACIA,
      Skill.ENGANACAO,
      Skill.MISTICISMO,
      Skill.OFICIO,
    ],
    poderes: [originPowers.REDE_DE_CONTATOS], // TODO: Adicionar Foco em Perícia
  },
  Mercador: {
    name: 'Mercador',
    itens: [],
    pericias: [Skill.DIPLOMACIA, Skill.INTUICAO, Skill.OFICIO],
    poderes: [originPowers.NEGOCIACAO], // TODO: PROFICIENCIA, SORTUDO
  },
  Minerador: {
    name: 'Minerador',
    itens: [],
    pericias: [Skill.ATLETISMO, Skill.FORTITUDE, Skill.OFICIO],
    poderes: [originPowers.ESCAVADOR], // TODO: Ataque Poderoso, Sentidos Aguçados
  },
  Nômade: {
    name: 'Nômade',
    itens: [],
    pericias: [Skill.CAVALGAR, Skill.PILOTAGEM, Skill.SOBREVIVENCIA],
    poderes: [originPowers.MOCHILEIRO], // Todo: Sentidos Aguçados
  },
  Pivete: {
    name: 'Pivete',
    itens: [],
    pericias: [Skill.FURTIVIDADE, Skill.INICIATIVA, Skill.LADINAGEM],
    poderes: [originPowers.QUEBRA_GALHO, DestinyPowers.APARENCIA_INOFENSIVA], // TODO: Adicionar Acrobático
  },
  Refugiado: {
    name: 'Refugiado',
    itens: [],
    pericias: [Skill.FORTITUDE, Skill.REFLEXOS, Skill.VONTADE],
    poderes: [originPowers.ESTOICO], // TODO: Vontade de Ferro
  },
  Seguidor: {
    name: 'Seguidor',
    itens: [],
    pericias: [Skill.ADESTRAMENTO, Skill.OFICIO],
    poderes: [originPowers.ANTIGO_MESTRE], // TODO: Proficiencia, Surto Heróico
  },
  Selvagem: {
    name: 'Selvagem',
    itens: [],
    pericias: [Skill.PERCEPCAO, Skill.REFLEXOS, Skill.SOBREVIVENCIA],
    poderes: [originPowers.VIDA_RUSTICA], // TODO: Lobo solitário, Vitalidade
  },
  Soldado: {
    name: 'Soldado',
    itens: [],
    pericias: [Skill.FORTITUDE, Skill.GUERRA, Skill.LUTA, Skill.PONTARIA],
    poderes: [originPowers.INFLUENCIA_MILITAR], // TODO: Um poder de combate random
  },
  Taverneiro: {
    name: 'Taverneiro',
    itens: [],
    pericias: [Skill.DIPLOMACIA, Skill.JOGATINA, Skill.OFICIO],
    poderes: [originPowers.GOROROBA], // TODO: Proficiência, Vitalidade
  },
  Trabalhador: {
    name: 'Trabalhador',
    itens: [],
    pericias: [Skill.ATLETISMO, Skill.FORTITUDE],
    poderes: [originPowers.ESFORCADO], // TODO: Atlético
  },
};

const benefitsStrategies = {
  string: (benefit: string, benefits: OriginBenefits): OriginBenefits =>
    _.merge(benefits, {
      skills: [...benefits.skills, benefit],
    }),
  OriginPower: (
    benefit: OriginPower,
    benefits: OriginBenefits
  ): OriginBenefits =>
    _.merge(benefits, {
      powers: {
        origin: [...benefits.powers.origin, benefit],
      },
    }),
  GeneralPower: (
    benefit: OriginPower,
    benefits: OriginBenefits
  ): OriginBenefits =>
    _.merge(benefits, {
      powers: {
        origin: [...benefits.powers.origin, benefit],
      },
    }),
};

function getBenefits(benefits: (string | OriginPower | GeneralPower)[]) {
  return benefits.reduce<OriginBenefits>(
    (acc, benefit) => {
      if (typeof benefit === 'string') {
        return benefitsStrategies.string(benefit, acc);
      }

      if (benefit.type === ORIGIN_POWER_TYPE) {
        return benefitsStrategies.OriginPower(benefit, acc);
      }

      return benefitsStrategies.GeneralPower(benefit, acc);
    },
    {
      skills: [],
      powers: {
        origin: [],
        general: [],
      },
    }
  );
}

function sortOriginBenefits(origin: Origin, usedSkills: Skill[]) {
  const notRepeatedSkills = getNotUsedSkillsFromAllowed(
    usedSkills,
    origin.pericias
  );

  const sortedBenefits = pickFromArray<Skill | OriginPower | GeneralPower>(
    [...notRepeatedSkills, ...origin.poderes],
    2
  );

  return getBenefits(sortedBenefits);
}

function sortAmnesicBenefits(skills: Skill[]): OriginBenefits {
  const powers: (OriginPower | GeneralPower)[] = [];

  const newSkill = getNotRepeatedRandomSkill(skills);
  powers.push(originPowers.LEMBRANCAS_GRADUAIS);

  return {
    skills: [newSkill],
    powers: {
      general: [getRandomItemFromArray(Object.values(generalPowers).flat())],
      origin: [originPowers.LEMBRANCAS_GRADUAIS],
    },
  };
}

// TODO: EVITAR PODER REPETIDO
export function getOriginBenefits(
  origin: Origin,
  skills: Skill[]
): OriginBenefits {
  if (origin.name === ORIGINS.Amnésico.name) {
    return sortAmnesicBenefits(skills);
  }

  return sortOriginBenefits(origin, skills);
}

export default ORIGINS;
