import { cloneDeep, merge } from 'lodash';
import Race, { CharacterStats } from '../../interfaces/Race';
import { Spell } from '../../interfaces/Spells';
import { Atributo } from '../atributos';
import { spellsCircle1 } from '../magias/generalSpells';

function cheapenControlPlants(spells: Spell[], index: number) {
  let { manaExpense = 1 } = spells[index];
  if (manaExpense > 1) manaExpense -= 1;
  return spells.map((spell) => {
    if (spellsCircle1.controlarPlantas.nome === spell.nome) {
      return merge<Spell, Partial<Spell>>(spell, {
        manaExpense,
      });
    }

    return spell;
  });
}
function addOrCheapenControlPlants(
  stats: CharacterStats,
  spells: Spell[]
): Spell[] {
  const index = stats.spells.findIndex(
    (spell) => spellsCircle1.controlarPlantas.nome === spell.nome
  );

  if (index < 0) {
    return [...spells, spellsCircle1.controlarPlantas];
  }

  return cheapenControlPlants(spells, index);
}

const DAHLLAN: Race = {
  name: 'Dahllan',
  attributes: {
    attrs: [
      { attr: Atributo.SABEDORIA, mod: 4 },
      { attr: Atributo.DESTREZA, mod: 2 },
      { attr: Atributo.INTELIGENCIA, mod: -2 },
    ],
    texts: [
      'Você pode lançar a magia Controlar Plantas (atributo-chave Sabedoria). Caso aprenda novamente essa magia, seu custo diminui em –1 PM.',
      'Você pode gastar uma ação de movimento e 1 PM para transformar sua pele em casca de árvore, recebendo +2 na Defesa até o fim da cena.',
      'Você pode se comunicar com animais por meio de linguagem corporal e vocalizações. Você pode usar Adestramento para mudar atitude e pedir favores de animais (veja Diplomacia, na página 117). Caso receba esta habilidade novamente, recebe +2 em Adestramento.',
    ],
  },
  faithProbability: {
    AHARADAK: 1,
    ALLIHANNA: 1,
    LENA: 1,
    OCEANO: 1,
    THWOR: 1,
  },
  abilities: [
    {
      name: 'Amiga das Plantas',
      description:
        'Você pode lançar a magia Controlar Plantas (atributo-chave Sabedoria). Caso aprenda novamente essa magia, seu custo diminui em –1 PM.',
      action(stats: CharacterStats): CharacterStats {
        const statsClone = cloneDeep(stats);
        const spells = addOrCheapenControlPlants(stats, statsClone.spells);

        return merge<CharacterStats, Partial<CharacterStats>>(statsClone, {
          spells,
        });
      },
    },
  ],
};

export default DAHLLAN;
