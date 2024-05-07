interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
}

interface SpellFormElements extends HTMLFormControlsCollection {
  spellName: HTMLInputElement;
}

interface MonsterName {
  name: string;
}

interface MonsterInformation {
  actions: [{ name: string; desc: string }];
  type: string;
  armor_class: [];
  special_abilities: [{ name: string; desc: string }];
  image: string;
  strength: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  dexterity: number;
  constitution: number;
  name: string;
}

interface SpellName {
  name: string;
  spellId: number;
}

interface SpellObj {
  name: string;
  level: number;
  range: string;
  duration: string;
  desc: [];
}
interface SpellInformation {
  name: string;
  range: string;
  school: { name: string };
  concentration: boolean;
  casting_time: string;
  duration: string;
  level: number;
  desc: [];
  damage?: {
    damage_at_slot_level: {
      1?: string;
      2?: string;
      3?: string;
      4?: string;
      5?: string;
      6?: string;
      7?: string;
      8?: string;
      9?: string;
    };
  };
  heal_at_slot_level: {
    1?: string;
    2?: string;
    3?: string;
    4?: string;
    5?: string;
    6?: string;
    7?: string;
    8?: string;
    9?: string;
  };
  spellId: number;
}
const $formInput = document.querySelector('#form-input') as HTMLFormElement;
const $monsterInput = document.querySelector(
  '.monster-input',
) as HTMLInputElement;
const $monsterSearchButton = document.querySelector('.monster-search-button');
const $view = document.querySelectorAll('.view');
const $homeButton = document.querySelector('.home-button');
const $monsterInformation = document.querySelector(
  '.monster-information',
) as HTMLDivElement;
const $submitMonsterButton = document.querySelector('.submit-monster-button');
const $divMonster = document.querySelector(
  '#monster-information',
) as HTMLDivElement;
const $spellSearchButton = document.querySelector('.spell-search-button');
const $spellInformation = document.querySelector(
  '.spell-information',
) as HTMLDivElement;
const $submitSpellButton = document.querySelector('.submit-spell-button');
const $spellFormInput = document.querySelector(
  '#spell-form-input',
) as HTMLFormElement;
const $divSpell = document.querySelector(
  '#spell-information',
) as HTMLDivElement;
const $spellListButton = document.querySelector('.spell-list-button');
const $monsterSearchButton2 = document.querySelector(
  '.monster-search-button-2',
);
const $spellSearchButton2 = document.querySelector('.spell-search-button-2');
const $spellList = document.querySelector('.spell-list');

const domQueries: Record<string, any> = {
  $formInput,
  $monsterInput,
  $monsterSearchButton,
  $view,
  $homeButton,
  $monsterInformation,
  $submitMonsterButton,
  $divMonster,
  $spellSearchButton,
  $spellInformation,
  $submitSpellButton,
  $spellFormInput,
  $spellListButton,
  $monsterSearchButton2,
  $spellSearchButton2,
  $spellList,
};

for (const key in domQueries) {
  if (!domQueries[key]) throw new Error(`The ${key} dom query failed `);
}

$monsterSearchButton?.addEventListener('click', () => {
  viewSwap('monster-view');
});

$monsterSearchButton2?.addEventListener('click', () => {
  viewSwap('monster-view');
});

$homeButton?.addEventListener('click', () => {
  viewSwap('home-view');
});

$spellSearchButton?.addEventListener('click', () => {
  viewSwap('spell-view');
});

$spellSearchButton2?.addEventListener('click', () => {
  viewSwap('spell-view');
});

$spellListButton?.addEventListener('click', () => {
  viewSwap('spell-list-view');
});

$submitMonsterButton?.addEventListener('click', (event: Event) => {
  event.preventDefault();
  const $formElement = $formInput.elements as FormElements;

  const monsterName: MonsterName = {
    name: $formElement.name.value,
  };

  if (monsterName.name) {
    retrieveMonsterInformation(monsterName.name);
  } else {
    $monsterInformation.textContent = 'Please use a monster name';
  }
});

function viewSwap(string: string): void {
  for (let i = 0; i < $view.length; i++) {
    const dataView = $view[i].getAttribute('data-view');
    if (dataView === string) {
      $view[i].classList.remove('hidden');
    } else {
      $view[i].classList.add('hidden');
    }
  }
}
// async to get monster information from API
async function retrieveMonsterInformation(monsterName: string): Promise<void> {
  try {
    const response = await fetch('https://www.dnd5eapi.co/api/monsters');

    $monsterInformation.textContent = 'Looking up...';
    const responseMonsters = await response.json();
    const monstersInfo = responseMonsters.results;
    if (!response.ok) {
      const message = `Failed to get monsters, Error ${response.status}`;
      $monsterInformation.textContent = 'Error retrieving monster data';
      throw new Error(message);
    }

    for (let i = 0; i < monstersInfo.length; i++) {
      if (monstersInfo[i].name.toLowerCase() === monsterName.toLowerCase()) {
        const response = await fetch(
          `https://www.dnd5eapi.co${monstersInfo[i].url}`,
        );

        const matchMonsterResponse = await response.json();
        const monsterData = matchMonsterResponse;

        $monsterInformation.textContent = '';
        renderMonster(monsterData);
        return;
      } else if (
        monstersInfo[i].name.toLowerCase() !== monsterName.toLowerCase()
      ) {
        $monsterInformation.textContent = 'Monster not found';
      }
    }
  } catch (error) {
    $monsterInformation.textContent = 'Error retrieving monster data';
  }
}

function renderMonster(monsterData: MonsterInformation): HTMLDivElement {
  const $monsterTitle = document.createElement('h1');
  $monsterTitle.classList.add('title-name');
  $monsterTitle.textContent = monsterData.name;

  $divMonster?.append($monsterTitle);

  const $monsterImageCase = document.createElement('h2');
  $monsterImageCase.classList.add('row-monster');
  $divMonster?.append($monsterImageCase);

  const $monsterImage = document.createElement('img');
  $monsterImage.classList.add('monster-image');
  $monsterImage.setAttribute(
    'src',
    `https://www.dnd5eapi.co${monsterData.image}`,
  );
  $monsterImage.setAttribute('alt', monsterData.name);
  $monsterImageCase.append($monsterImage);

  const $monsterStats = document.createElement('h2');
  $monsterStats.textContent = 'Stats';

  $divMonster?.append($monsterStats);

  const $monsterActionsHeader = document.createElement('h2');
  $monsterActionsHeader.textContent = 'Actions';

  $divMonster?.append($monsterActionsHeader);

  const $monsterSpecialAbilitiesHeader = document.createElement('h2');
  $monsterSpecialAbilitiesHeader.textContent = 'Special Abilities';

  $divMonster?.append($monsterSpecialAbilitiesHeader);

  const monsterInformation: any = {};
  // Strength Stat
  const $monsterStrength = document.createElement('p');
  $monsterStrength.classList.add('monster-text-information');

  let currentMonsterInformation = monsterData.strength;

  const strength = currentMonsterInformation;
  monsterInformation.strength = strength;
  $monsterStrength.textContent =
    'Strength: ' + monsterInformation.strength.toString();
  $monsterStats.append($monsterStrength);

  // Dexterity Stat
  const $monsterDexterity = document.createElement('p');
  $monsterDexterity.classList.add('monster-text-information');

  currentMonsterInformation = monsterData.dexterity;

  const dexterity = currentMonsterInformation;
  monsterInformation.dexterity = dexterity;
  $monsterDexterity.textContent =
    'Dexterity: ' + monsterInformation.dexterity.toString();
  $monsterStats.append($monsterDexterity);

  // Constitution Stat
  const $monsterConstitution = document.createElement('p');
  $monsterConstitution.classList.add('monster-text-information');

  currentMonsterInformation = monsterData.constitution;

  const constitution = currentMonsterInformation;
  monsterInformation.constitution = constitution;
  $monsterConstitution.textContent =
    'Constitution: ' + monsterInformation.constitution.toString();
  $monsterStats.append($monsterConstitution);

  // Interlligence Stat
  const $monsterIntelligence = document.createElement('p');
  $monsterIntelligence.classList.add('monster-text-information');

  currentMonsterInformation = monsterData.intelligence;

  const intelligence = currentMonsterInformation;
  monsterInformation.intelligence = intelligence;
  $monsterIntelligence.textContent =
    'Intelligence: ' + monsterInformation.constitution.toString();
  $monsterStats.append($monsterIntelligence);

  // Wisdom Stat
  const $monsterWisdom = document.createElement('p');
  $monsterWisdom.classList.add('monster-text-information');

  currentMonsterInformation = monsterData.wisdom;

  const wisdom = currentMonsterInformation;
  monsterInformation.wisdom = wisdom;
  $monsterWisdom.textContent =
    'Wisdom: ' + monsterInformation.wisdom.toString();
  $monsterStats.append($monsterWisdom);
  // Charisma Stat
  const $monsterCharisma = document.createElement('p');
  $monsterCharisma.classList.add('monster-text-information');

  currentMonsterInformation = monsterData.charisma;

  const charisma = currentMonsterInformation;
  monsterInformation.charisma = charisma;
  $monsterCharisma.textContent =
    'Charisma: ' + monsterInformation.charisma.toString();
  $monsterStats.append($monsterCharisma);

  // Type of Creature
  const $monsterType = document.createElement('p');
  $monsterType.classList.add('monster-text-information');

  const currentMonsterInformationString = monsterData.type;

  const type = currentMonsterInformationString;
  monsterInformation.type = type;
  $monsterType.textContent = 'Type: ' + monsterInformation.type.toString();
  $monsterStats.append($monsterType);

  for (let i = 0; i < monsterData.armor_class.length; i++) {
    const $monsterParagraph = document.createElement('p');
    $monsterParagraph.classList.add('monster-text-information');

    const currentMonsterInformation = monsterData.armor_class[i];

    const armorClass = currentMonsterInformation;
    monsterInformation.armorClass = armorClass;
    $monsterParagraph.textContent =
      'Armor Class: ' + monsterInformation.armorClass.value;
    $monsterStats.append($monsterParagraph);
  }

  for (let i = 0; i < monsterData.actions.length; i++) {
    const $monsterParagraph = document.createElement('p');
    $monsterParagraph.classList.add('monster-text-information');

    const currentMonsterInformation = monsterData.actions[i];

    const actions =
      currentMonsterInformation.name + ':' + currentMonsterInformation.desc;
    monsterInformation.actions = actions;
    $monsterParagraph.textContent = monsterInformation.actions;
    $monsterActionsHeader.append($monsterParagraph);
  }

  for (let i = 0; i < monsterData.special_abilities.length; i++) {
    const $monsterParagraph = document.createElement('p');
    $monsterParagraph.classList.add('monster-text-information');

    const currentMonsterInformation = monsterData.special_abilities[i];

    const specialAbilities =
      currentMonsterInformation.name + ':' + currentMonsterInformation.desc;
    monsterInformation.actions = specialAbilities;
    $monsterParagraph.textContent = monsterInformation.actions;
    $monsterSpecialAbilitiesHeader.append($monsterParagraph);
  }
  return $divMonster;
}

// async function to retrieve spell information from API
async function retrieveSpellInformation(spellName: string): Promise<void> {
  try {
    const response = await fetch('https://www.dnd5eapi.co/api/spells');

    $spellInformation.textContent = 'Looking up...';
    const responseSpells = await response.json();
    const spellsInfo = responseSpells.results;
    if (!response.ok) {
      const message = `Failed to get spells, Error ${response.status}`;
      $spellInformation.textContent = 'Error retrieving spell data';
      throw new Error(message);
    }

    for (let i = 0; i < spellsInfo.length; i++) {
      $spellInformation.textContent = 'Looking up...';

      if (spellsInfo[i].name.toLowerCase() === spellName.toLowerCase()) {
        const response = await fetch(
          `https://www.dnd5eapi.co${spellsInfo[i].url}`,
        );

        const matchSpellResponse = await response.json();
        const spellData = matchSpellResponse;
        $spellInformation.textContent = '';
        renderSpell(spellData);
        return;
      } else if (spellsInfo[i].name.toLowerCase() !== spellName.toLowerCase()) {
        $spellInformation.textContent = 'Spell not found';
      }
    }
  } catch (error) {
    $spellInformation.textContent = 'Error retrieving spell data';
  }
}

// add eventlistener for spell submit button to call async retrieve spell information
$submitSpellButton?.addEventListener('click', (event: Event) => {
  event.preventDefault();
  const $spellFormElement = $spellFormInput.elements as SpellFormElements;

  const spellName: SpellName = {
    name: $spellFormElement.spellName.value,
    spellId: data.nextSpellId,
  };

  if (spellName.name) {
    retrieveSpellInformation(spellName.name);
    data.nextSpellId++;
  } else {
    $spellInformation.textContent = 'Please use a spell name';
  }
});

// Function to render spell htmlelements with information
function renderSpell(spellData: SpellInformation): HTMLDivElement {
  const $spellTitle = document.createElement('h1');
  $spellTitle.classList.add('title-name');
  $spellTitle.textContent = spellData.name;

  if (data.spellEdit) {
    $divSpell.dataset.spellId = data.spellEdit.spellId.toString();
  } else {
    $divSpell.dataset.spellId = data.nextSpellId.toString();
  }
  $divSpell?.append($spellTitle);

  const $addSpellButton = document.createElement('i');
  $addSpellButton.setAttribute('class', 'fas fa-plus-circle');
  $spellTitle.append($addSpellButton);

  const $spellSchoolLevelDivContainer = document.createElement('div');
  $spellSchoolLevelDivContainer.classList.add('row');
  $spellTitle.append($spellSchoolLevelDivContainer);

  const $spellSchoolHeader = document.createElement('h2');
  $spellSchoolHeader.classList.add('column-half');
  $spellSchoolHeader.classList.add('spell-header');
  $spellSchoolHeader.textContent = 'School';
  $spellSchoolLevelDivContainer?.append($spellSchoolHeader);

  const $spellLevelHeader = document.createElement('h2');
  $spellLevelHeader.classList.add('column-half');
  $spellLevelHeader.classList.add('spell-header');
  $spellLevelHeader.textContent = 'Level';
  $spellSchoolLevelDivContainer?.append($spellLevelHeader);

  const $spellRangeCastTimeDivContainer = document.createElement('div');
  $spellRangeCastTimeDivContainer.classList.add('row');
  $spellTitle.append($spellRangeCastTimeDivContainer);

  const $spellRangeHeader = document.createElement('h2');
  $spellRangeHeader.classList.add('column-half');
  $spellRangeHeader.classList.add('spell-header');
  $spellRangeHeader.textContent = 'Range';
  $spellRangeCastTimeDivContainer?.append($spellRangeHeader);

  const $spellCastTimeHeader = document.createElement('h2');
  $spellCastTimeHeader.classList.add('column-half');
  $spellCastTimeHeader.classList.add('spell-header');
  $spellCastTimeHeader.textContent = 'Cast Time';
  $spellRangeCastTimeDivContainer?.append($spellCastTimeHeader);

  const $spellDurationConcentrationDivContainer = document.createElement('div');
  $spellDurationConcentrationDivContainer.classList.add('row');
  $spellTitle.append($spellDurationConcentrationDivContainer);

  const $spellConcentrationHeader = document.createElement('h2');
  $spellConcentrationHeader.classList.add('column-half');
  $spellConcentrationHeader.classList.add('spell-header');
  $spellConcentrationHeader.textContent = 'Concentration';
  $spellDurationConcentrationDivContainer?.append($spellConcentrationHeader);

  const $spellDurationHeader = document.createElement('h2');
  $spellDurationHeader.classList.add('column-half');
  $spellDurationHeader.classList.add('spell-header');
  $spellDurationHeader.textContent = 'Duration';
  $spellDurationConcentrationDivContainer?.append($spellDurationHeader);

  const $spellDescriptionDivContainer = document.createElement('div');
  $spellDescriptionDivContainer.classList.add('row');
  $spellTitle.append($spellDescriptionDivContainer);

  const $spellDamageOrHealDivContainer = document.createElement('div');
  $spellDescriptionDivContainer.classList.add('row');
  $spellTitle.append($spellDamageOrHealDivContainer);

  const $spellDescHeader = document.createElement('h2');
  $spellDescHeader.classList.add('row');
  $spellDescHeader.textContent = 'Description';
  $spellDescriptionDivContainer?.append($spellDescHeader);

  // Spell level information
  const $spellLevel = document.createElement('p');
  $spellLevel.classList.add('spell-text-information');

  const spellInformation: any = {};

  spellInformation.spellId = data.nextSpellId;
  spellInformation.name = spellData.name;

  // Introduce variable that will change as it pushes information to spellInformation object
  const currentSpellInformation = spellData.level;
  const spellLevel = currentSpellInformation;
  spellInformation.level = spellLevel;
  $spellLevel.textContent = spellInformation.level;
  $spellLevelHeader.append($spellLevel);

  // Spell school information

  const $spellSchoolInformation = document.createElement('p');
  $spellSchoolInformation.classList.add('spell-text-information');

  const spellSchoolInformation = spellData.school.name.toString();

  const spellSchool = spellSchoolInformation;

  spellInformation.school = spellSchool;
  $spellSchoolInformation.textContent = spellInformation.school;
  $spellSchoolHeader.append($spellSchoolInformation);

  // Spell range information

  const $spellRangeInformation = document.createElement('p');
  $spellRangeInformation.classList.add('spell-text-information');

  const spellRangeInformation = spellData.range;

  const spellRange = spellRangeInformation;

  spellInformation.range = spellRange;
  $spellRangeInformation.textContent = spellInformation.range;
  $spellRangeHeader.append($spellRangeInformation);

  // Spell cast time information
  const $spellCastTimeInformation = document.createElement('p');
  $spellCastTimeInformation.classList.add('spell-text-information');

  const spellCastTimeInformation = spellData.casting_time;

  const spellCastTime = spellCastTimeInformation;

  spellInformation.castTime = spellCastTime;
  $spellCastTimeInformation.textContent = spellInformation.castTime;
  $spellCastTimeHeader.append($spellCastTimeInformation);

  // Spell concentration
  const $spellConcentrationInformation = document.createElement('p');
  $spellConcentrationInformation.classList.add('spell-text-information');

  const spellConcentrationInformation = spellData.concentration;

  const spellConcentration = spellConcentrationInformation;

  spellInformation.concentration = spellConcentration;
  $spellConcentrationInformation.textContent =
    spellInformation.concentration.toString();
  $spellConcentrationHeader.append($spellConcentrationInformation);

  // Spell duration
  const $spellDurationInformation = document.createElement('p');
  $spellDurationInformation.classList.add('spell-text-information');

  const spellDurationInformation = spellData.duration;

  const spellDuration = spellDurationInformation;

  spellInformation.duration = spellDuration;
  $spellDurationInformation.textContent = spellInformation.duration;
  $spellDurationHeader.append($spellDurationInformation);

  // description of spells
  for (let i = 0; i < spellData.desc.length; i++) {
    const $spellDescriptionInformation = document.createElement('p');
    $spellDescriptionInformation.classList.add('spell-text-information');

    spellInformation.desc = spellData.desc[i];
    $spellDescriptionInformation.textContent = spellInformation.desc;
    $spellDescHeader.append($spellDescriptionInformation);
  }

  const $spellDamageInformation = document.createElement('p');
  $spellDamageInformation.classList.add('spell-text-information');

  // damage of spells
  if (spellData?.damage?.damage_at_slot_level !== undefined) {
    const $spellDamageHeader = document.createElement('h2');
    $spellDamageHeader.classList.add('row');
    $spellDamageHeader.textContent = 'Damage';
    $spellDamageOrHealDivContainer?.append($spellDamageHeader);
  }
  if (spellData?.damage?.damage_at_slot_level !== undefined) {
    spellInformation.damage = spellData.damage?.damage_at_slot_level;
    let currentDamage = '';
    for (const [key, value] of Object.entries(spellInformation.damage)) {
      const $spellDamageInformation = document.createElement('p');
      $spellDamageInformation.classList.add('spell-text-information');
      $spellDamageInformation.classList.add('spell-damage-text');

      currentDamage = 'Level ' + key + ': ' + value;
      $spellDamageInformation.textContent = currentDamage;
      $spellDamageOrHealDivContainer.append($spellDamageInformation);
    }
  }

  // healing of spells
  if (spellData?.heal_at_slot_level !== undefined) {
    const $spellHealHeader = document.createElement('h2');
    $spellHealHeader.classList.add('row');
    $spellHealHeader.textContent = 'Heal';
    $spellDamageOrHealDivContainer?.append($spellHealHeader);
  }
  if (spellData?.heal_at_slot_level !== undefined) {
    spellInformation.heal_at_slot_level = spellData.heal_at_slot_level;
    let currentHeal = '';
    for (const [key, value] of Object.entries(
      spellInformation.heal_at_slot_level,
    )) {
      const $spellHealInformation = document.createElement('p');
      $spellHealInformation.classList.add('spell-text-information');
      $spellHealInformation.classList.add('spell-heal-text');

      currentHeal = 'Level ' + key + ': ' + value;
      $spellHealInformation.textContent = currentHeal;
      $spellDamageOrHealDivContainer.append($spellHealInformation);
    }
  }
  data.spellList.unshift(spellInformation);

  return spellInformation;
}

// event listener for clicking on 'plus' icon to add spell to list of spells user can refer to
const $spellMainDivContainer = document.createElement('div');
$spellMainDivContainer.classList.add('spell-list-container');
$spellList?.append($spellMainDivContainer);

const $spellContainerRow = document.createElement('div');
$spellContainerRow.classList.add('row-spell');

$spellMainDivContainer.append($spellContainerRow);
$divSpell.addEventListener('click', (event: Event) => {
  const $eventTarget = event.target as HTMLElement;
  const $addIcon = $eventTarget.tagName;
  const $dataSpellId = $eventTarget
    .closest('div')
    ?.getAttribute('data-spell-id');

  viewSwap('spell-list-view');

  // new spell obj with spell information that gets pushed into array

  const spellObj: SpellObj = {
    name: '',
    level: 1,
    range: '',
    duration: '',
    desc: [],
  };

  if ($addIcon === 'I') {
    for (let i = 0; i < data.spellList.length; i++) {
      if ($dataSpellId === data.spellList[i].spellId.toString()) {
        const $spellContainer = document.createElement('div');
        $spellContainer.classList.add('column-third');
        $spellContainer.classList.add('spell-item-background');
        $spellContainerRow.append($spellContainer);

        // minus icon
        const $minusIcon = document.createElement('i');
        $minusIcon.setAttribute('class', 'fa-solid fa-circle-minus');
        $spellContainer?.append($minusIcon);
        // spell name
        const $spellName = document.createElement('h1');
        $spellName.textContent = data.spellList[i].name;
        $spellName.classList.add('spell-list-information');
        $spellContainer.append($spellName);
        $spellContainer?.append($spellName);
        spellObj.name = data.spellList[i].name;

        // spell level
        const $spellLevel = document.createElement('p');
        $spellLevel.textContent =
          'Level: ' + data.spellList[i].level.toString();
        $spellLevel.classList.add('spell-list-information');
        $spellContainer.append($spellLevel);
        spellObj.level = data.spellList[i].level;

        // spell range
        const $spellRange = document.createElement('p');
        $spellRange.textContent = 'Range:' + data.spellList[i].range;
        $spellRange.classList.add('spell-list-information');
        $spellContainer.append($spellRange);
        spellObj.range = data.spellList[i].range;

        // spell duration
        const $spellDuration = document.createElement('p');
        $spellDuration.textContent = 'Duration: ' + data.spellList[i].duration;
        $spellDuration.classList.add('spell-list-information');
        $spellContainer.append($spellDuration);
        spellObj.duration = data.spellList[i].duration;

        // spell description
        const $spellDescription = document.createElement('p');
        $spellDescription.textContent = data.spellList[i].desc.toString();
        $spellDescription.classList.add('spell-list-information');
        $spellContainer.append($spellDescription);
        spellObj.desc = data.spellList[i].desc;

        data.actualSpellList.unshift(spellObj);
      }
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < data.actualSpellList.length; i++) {
    if (data.actualSpellList[i] !== null) {
      const $spellContainer = document.createElement('div');
      $spellContainer.classList.add('column-third');
      $spellContainer.classList.add('spell-item-background');
      $spellContainerRow.append($spellContainer);

      // minus icon
      const $minusIcon = document.createElement('i');
      $minusIcon.setAttribute('class', 'fa-solid fa-circle-minus');
      $spellContainer.append($minusIcon);

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
});
