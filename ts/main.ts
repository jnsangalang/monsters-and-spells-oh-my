interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
}

interface MonsterName {
  name: string;
}

interface MonsterInformation {
  actions: [{ name: string; desc: string }];
  type: string;
  armor_class: [];
  special_abilities: [{ name: string; desc: string }];
  hitDice: string;
  hitPoints: number;
  image: string;
  strength: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  dexterity: number;
  constitution: number;
  name: string;
}

// interface Spell{
//   name:string;
//   range:string;
//   school:string;
//   concentration:boolean;
//   castTime: string;
//   material:string;
// }

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

const domQueries: Record<string, any> = {
  $formInput,
  $monsterInput,
  $monsterSearchButton,
  $view,
  $homeButton,
  $monsterInformation,
  $submitMonsterButton,
  $divMonster,
};

for (const key in domQueries) {
  if (!domQueries[key]) throw new Error(`The ${key} dom query failed `);
}

$monsterSearchButton?.addEventListener('click', () => {
  viewSwap('monster-view');
});

$homeButton?.addEventListener('click', () => {
  viewSwap('home-view');
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

async function retrieveMonsterInformation(monsterName: string): Promise<void> {
  const response = await fetch('https://www.dnd5eapi.co/api/monsters');

  $monsterInformation.textContent = 'Looking up...';
  const responseMonsters = await response.json();
  const monstersInfo = responseMonsters.results;

  try {
    for (let i = 0; i < monstersInfo.length; i++) {
      if (monstersInfo[i].name.toLowerCase() === monsterName.toLowerCase()) {
        const response = await fetch(
          `https://www.dnd5eapi.co${monstersInfo[i].url}`,
        );

        const matchMonsterResponse = await response.json();
        const monsterData = matchMonsterResponse;

        $monsterInformation.textContent = '';
        renderMonster(monsterData);
      } else if (!monstersInfo[i]) {
        $monsterInformation.textContent = 'Monster not found';
      }
    }
  } catch (error) {
    if (!response.ok) {
      const message = `Failed to get monsters, Error ${response.status}`;
      $monsterInformation.textContent = 'Error retrieving monster data';
      throw new Error(message);
    }
  }
}

function renderMonster(monsterData: MonsterInformation): HTMLDivElement {
  const $monsterTitle = document.createElement('h1');
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

  let currentMonsterInformation = monsterData.strength;

  const strength = currentMonsterInformation;
  monsterInformation.strength = strength;
  $monsterStrength.textContent =
    'Strength: ' + monsterInformation.strength.toString();
  $monsterStats.append($monsterStrength);

  // Dexterity Stat
  const $monsterDexterity = document.createElement('p');

  currentMonsterInformation = monsterData.dexterity;

  const dexterity = currentMonsterInformation;
  monsterInformation.dexterity = dexterity;
  $monsterDexterity.textContent =
    'Dexterity: ' + monsterInformation.dexterity.toString();
  $monsterStats.append($monsterDexterity);

  // Constitution Stat
  const $monsterConstitution = document.createElement('p');

  currentMonsterInformation = monsterData.constitution;

  const constitution = currentMonsterInformation;
  monsterInformation.constitution = constitution;
  $monsterConstitution.textContent =
    'Constitution: ' + monsterInformation.constitution.toString();
  $monsterStats.append($monsterConstitution);

  // Interlligence Stat
  const $monsterIntelligence = document.createElement('p');

  currentMonsterInformation = monsterData.intelligence;

  const intelligence = currentMonsterInformation;
  monsterInformation.intelligence = intelligence;
  $monsterIntelligence.textContent =
    'Intelligence: ' + monsterInformation.constitution.toString();
  $monsterStats.append($monsterIntelligence);

  // Wisdom Stat
  const $monsterWisdom = document.createElement('p');

  currentMonsterInformation = monsterData.wisdom;

  const wisdom = currentMonsterInformation;
  monsterInformation.wisdom = wisdom;
  $monsterWisdom.textContent =
    'Wisdom: ' + monsterInformation.wisdom.toString();
  $monsterStats.append($monsterWisdom);
  // Charisma Stat
  const $monsterCharisma = document.createElement('p');

  currentMonsterInformation = monsterData.charisma;

  const charisma = currentMonsterInformation;
  monsterInformation.charisma = charisma;
  $monsterCharisma.textContent =
    'Charisma: ' + monsterInformation.charisma.toString();
  $monsterStats.append($monsterCharisma);

  // Type of Creature
  const $monsterType = document.createElement('p');

  const currentMonsterInformationString = monsterData.type;

  const type = currentMonsterInformationString;
  monsterInformation.type = type;
  $monsterType.textContent = 'Type: ' + monsterInformation.type.toString();
  $monsterStats.append($monsterType);

  for (let i = 0; i < monsterData.armor_class.length; i++) {
    const $monsterParagraph = document.createElement('p');

    const currentMonsterInformation = monsterData.armor_class[i];

    const armorClass = currentMonsterInformation;
    monsterInformation.armorClass = armorClass;
    $monsterParagraph.textContent =
      'Armor Class: ' + monsterInformation.armorClass.value;
    $monsterStats.append($monsterParagraph);
  }

  for (let i = 0; i < monsterData.actions.length; i++) {
    const $monsterParagraph = document.createElement('p');

    const currentMonsterInformation = monsterData.actions[i];

    const actions =
      currentMonsterInformation.name + ':' + currentMonsterInformation.desc;
    monsterInformation.actions = actions;
    $monsterParagraph.textContent = monsterInformation.actions;
    $monsterActionsHeader.append($monsterParagraph);
  }

  for (let i = 0; i < monsterData.special_abilities.length; i++) {
    const $monsterParagraph = document.createElement('p');

    const currentMonsterInformation = monsterData.special_abilities[i];

    const specialAbilities =
      currentMonsterInformation.name + ':' + currentMonsterInformation.desc;
    monsterInformation.actions = specialAbilities;
    $monsterParagraph.textContent = monsterInformation.actions;
    $monsterSpecialAbilitiesHeader.append($monsterParagraph);
  }
  return $divMonster;
}
