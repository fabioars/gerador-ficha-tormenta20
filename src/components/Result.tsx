import React from 'react';
import CharacterSheet from '../interfaces/CharacterSheet';

interface ResultProps {
  sheet: CharacterSheet;
}

const Result: React.FC<ResultProps> = (props) => {
  const { sheet } = props;

  const {
    nome,
    sexo,
    nivel,
    atributos,
    raca,
    classe,
    pericias,
    pv,
    pm,
    defesa,
  } = sheet;

  const styles = {
    mainDiv: {
      width: '60vw',
      padding: '5px 30px 30px 30px',
    },
    row: {
      display: 'flex',
      borderTop: '1px solid black',
      padding: '5px 0',
    },
    item: {
      marginRight: '10px',
    },
  };

  const atributosDiv = atributos.map((atributo) => (
    <span key={atributo.name} style={styles.item}>
      <strong>{atributo.name}</strong> {atributo.value} (
      {atributo.mod > 0 ? '+' : ''}
      {atributo.mod})
    </span>
  ));

  const periciasSorted = pericias.sort();
  const periciasDiv = periciasSorted.map((pericia) => (
    <li key={pericia}>{pericia}</li>
  ));
  const habilidadesRacaDiv = raca.habilites.texts.map((hab) => (
    <li key={hab}>{hab}</li>
  ));
  const habilidadesClasseDiv = classe.habilities.map((hab) => (
    <li key={hab.name}>
      <strong>{hab.name}:</strong> {hab.text}
    </li>
  ));
  const proeficienciasDiv = classe.proeficiencias.map((proe) => (
    <li key={proe}>{proe}</li>
  ));

  return (
    <div style={styles.mainDiv}>
      <div style={styles.row}>
        <span style={styles.item}>
          <strong>Nome</strong> {nome}
        </span>
        <span style={styles.item}>
          <strong>Classe</strong> {classe.name}
        </span>
        <span style={styles.item}>
          <strong>Raça</strong> {raca.name}
        </span>
        <span style={styles.item}>
          <strong>Nível</strong> {nivel}
        </span>
        <span>
          <strong>Sexo</strong> {sexo}
        </span>
      </div>

      <div style={styles.row}>{atributosDiv}</div>

      <div style={styles.row}>
        <span style={styles.item}>
          <strong>PV</strong> {pv}
        </span>
        <span style={styles.item}>
          <strong>PM</strong> {pm}
        </span>
        <span style={styles.item}>
          <strong>Defesa</strong> {defesa}
        </span>
      </div>

      <div style={styles.row}>
        <div>
          <strong>Perícias Treinadas:</strong>
          <ul>{periciasDiv}</ul>
        </div>
      </div>

      <div style={styles.row}>
        <div>
          <strong>Proeficiências</strong>
          <ul>{proeficienciasDiv}</ul>
        </div>
      </div>

      <div style={styles.row}>
        <div>
          <strong>Equipamento Inicial</strong>
          <ul>
            <li>A FAZER</li>
          </ul>
        </div>
      </div>

      <div style={styles.row}>
        <div>
          <strong>Habilidades de Raça</strong>
          <ul>{habilidadesRacaDiv}</ul>
        </div>
      </div>

      <div style={styles.row}>
        <div>
          <strong>Habilidades de Classe</strong>
          <ul>{habilidadesClasseDiv}</ul>
        </div>
      </div>

      <div style={styles.row}>
        <div>
          <strong>Magias</strong>
          {classe.magics.length === 0 && (
            <ul>
              <li>Não possui.</li>
            </ul>
          )}
        </div>
      </div>

      <div style={styles.row} />
    </div>
  );
};

export default Result;