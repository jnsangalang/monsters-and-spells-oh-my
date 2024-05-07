/* exported data */
interface Data {
  spellList: SpellInformation[];
  actualSpellList: SpellObj[];
  nextSpellId: number;
  spellEdit: null | SpellInformation;
}

let data: Data = {
  spellList: [],
  actualSpellList: [],
  nextSpellId: 1,
  spellEdit: null,
};

const $retrievedSpellList = document.querySelector('.retrieved-spell-list');
if (!$retrievedSpellList)
  throw new Error(`the $retrievedSpellList query failed`);

window.addEventListener('beforeunload', () => {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('Spell Data', dataJSON);
});

const previousDataJSON = localStorage.getItem('Spell Data');

if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}
