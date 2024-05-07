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

  for (let i = 0; i < data.actualSpellList.length; i++) {
    const $spellMainDivContainer = document.createElement('div');
    $spellMainDivContainer.classList.add('spell-list-container');
    $retrievedSpellList?.append($spellMainDivContainer);

    const $spellContainerRow = document.createElement('div');
    $spellContainerRow.classList.add('row');
    $spellMainDivContainer.append($spellContainerRow);

    const $spellContainer = document.createElement('div');
    $spellContainer.classList.add('column-full');
    $spellContainerRow.append($spellContainer);

    const $spellName = document.createElement('h1');
    $spellName.textContent = data.actualSpellList[i].name;
    $spellName.classList.add('spell-list-information');
    $spellContainer.append($spellName);
    $spellContainer?.append($spellName);

    const $spellLevel = document.createElement('p');
    $spellLevel.textContent =
      'Level: ' + data.actualSpellList[i].level.toString();
    $spellLevel.classList.add('spell-list-information');
    $spellContainer.append($spellLevel);

    const $spellRange = document.createElement('p');
    $spellRange.textContent = 'Range:' + data.actualSpellList[i].range;
    $spellRange.classList.add('spell-list-information');
    $spellContainer.append($spellRange);

    const $spellDuration = document.createElement('p');
    $spellDuration.textContent =
      'Duration: ' + data.actualSpellList[i].duration;
    $spellDuration.classList.add('spell-list-information');
    $spellContainer.append($spellDuration);

    const $spellDescription = document.createElement('p');
    $spellDescription.textContent = data.actualSpellList[i].desc.toString();
    $spellDescription.classList.add('spell-list-information');
    $spellContainer.append($spellDescription);
  }
}
