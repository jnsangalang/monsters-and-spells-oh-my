"use strict";
const $formInput = document.querySelector('#form-input');
const $monsterInput = document.querySelector('.monster-input');
const $monsterSearchButton = document.querySelector('.monster-search-button');
const $view = document.querySelectorAll('.view');
const $homeButton = document.querySelector('.home-button');
const $monsterInformation = document.querySelector('.monster-information');
const $submitMonsterButton = document.querySelector('.submit-monster-button');
const $divMonster = document.querySelector('#monster-information');
const $spellSearchButton = document.querySelector('.spell-search-button');
const $spellInformation = document.querySelector('.spell-information');
const $submitSpellButton = document.querySelector('.submit-spell-button');
const $spellFormInput = document.querySelector('#spell-form-input');
const $divSpell = document.querySelector('#spell-information');
const domQueries = {
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
};
for (const key in domQueries) {
    if (!domQueries[key])
        throw new Error(`The ${key} dom query failed `);
}
$monsterSearchButton?.addEventListener('click', () => {
    viewSwap('monster-view');
});
$homeButton?.addEventListener('click', () => {
    viewSwap('home-view');
});
$spellSearchButton?.addEventListener('click', () => {
    viewSwap('spell-view');
});
$submitMonsterButton?.addEventListener('click', (event) => {
    event.preventDefault();
    const $formElement = $formInput.elements;
    const monsterName = {
        name: $formElement.name.value,
    };
    if (monsterName.name) {
        retrieveMonsterInformation(monsterName.name);
    }
    else {
        $monsterInformation.textContent = 'Please use a monster name';
    }
});
function viewSwap(string) {
    for (let i = 0; i < $view.length; i++) {
        const dataView = $view[i].getAttribute('data-view');
        if (dataView === string) {
            $view[i].classList.remove('hidden');
        }
        else {
            $view[i].classList.add('hidden');
        }
    }
}
// async to get monster information from API
async function retrieveMonsterInformation(monsterName) {
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
                const response = await fetch(`https://www.dnd5eapi.co${monstersInfo[i].url}`);
                const matchMonsterResponse = await response.json();
                const monsterData = matchMonsterResponse;
                $monsterInformation.textContent = '';
                renderMonster(monsterData);
                return;
            }
            else if (monstersInfo[i].name.toLowerCase() !== monsterName.toLowerCase()) {
                $monsterInformation.textContent = 'Monster not found';
            }
        }
    }
    catch (error) {
        $monsterInformation.textContent = 'Error retrieving monster data';
    }
}
function renderMonster(monsterData) {
    const $monsterTitle = document.createElement('h1');
    $monsterTitle.classList.add('title-name');
    $monsterTitle.textContent = monsterData.name;
    $divMonster?.append($monsterTitle);
    const $monsterImageCase = document.createElement('h2');
    $monsterImageCase.classList.add('row-monster');
    $divMonster?.append($monsterImageCase);
    const $monsterImage = document.createElement('img');
    $monsterImage.classList.add('monster-image');
    $monsterImage.setAttribute('src', `https://www.dnd5eapi.co${monsterData.image}`);
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
    const monsterInformation = {};
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
        const actions = currentMonsterInformation.name + ':' + currentMonsterInformation.desc;
        monsterInformation.actions = actions;
        $monsterParagraph.textContent = monsterInformation.actions;
        $monsterActionsHeader.append($monsterParagraph);
    }
    for (let i = 0; i < monsterData.special_abilities.length; i++) {
        const $monsterParagraph = document.createElement('p');
        $monsterParagraph.classList.add('monster-text-information');
        const currentMonsterInformation = monsterData.special_abilities[i];
        const specialAbilities = currentMonsterInformation.name + ':' + currentMonsterInformation.desc;
        monsterInformation.actions = specialAbilities;
        $monsterParagraph.textContent = monsterInformation.actions;
        $monsterSpecialAbilitiesHeader.append($monsterParagraph);
    }
    return $divMonster;
}
// async function to retrieve spell information from API
async function retrieveSpellInformation(spellName) {
    try {
        const response = await fetch('https://www.dnd5eapi.co/api/spells');
        $spellInformation.textContent = 'Looking up...';
        const responseSpells = await response.json();
        const spellsInfo = responseSpells.results;
        console.log('spell info:', spellsInfo);
        if (!response.ok) {
            const message = `Failed to get spells, Error ${response.status}`;
            $spellInformation.textContent = 'Error retrieving spell data';
            throw new Error(message);
        }
        for (let i = 0; i < spellsInfo.length; i++) {
            if (spellsInfo[i].name.toLowerCase() === spellName.toLowerCase()) {
                const response = await fetch(`https://www.dnd5eapi.co${spellsInfo[i].url}`);
                const matchSpellResponse = await response.json();
                const spellData = matchSpellResponse;
                console.log('spell  data:', spellData);
                $spellInformation.textContent = '';
                renderSpell(spellData);
                return;
            }
            else if (spellsInfo[i].name.toLowerCase() !== spellName.toLowerCase()) {
                $spellInformation.textContent = 'Spell not found';
            }
        }
    }
    catch (error) {
        $spellInformation.textContent = 'Error retrieving spell data';
    }
}
//add eventlistener for spell submit button to call async retrieve spell information
$submitSpellButton?.addEventListener('click', (event) => {
    event.preventDefault();
    const $spellFormElement = $spellFormInput.elements;
    const spellName = {
        name: $spellFormElement.spellName.value
    };
    if (spellName.name) {
        retrieveSpellInformation(spellName.name);
    }
    else {
        $spellInformation.textContent = 'Please use a spell name';
    }
});
//Function to render spell htmlelements with information
function renderSpell(spellData) {
    const $spellTitle = document.createElement('h1');
    $spellTitle.classList.add('title-name');
    $spellTitle.textContent = spellData.name;
    $divSpell?.append($spellTitle);
    const $spellSchoolLevelDivContainer = document.createElement('div');
    $spellSchoolLevelDivContainer.classList.add('row');
    $spellTitle.append($spellSchoolLevelDivContainer);
    const $spellSchoolHeader = document.createElement('h2');
    $spellSchoolHeader.classList.add('column-half');
    $spellSchoolHeader.textContent = 'School';
    $spellSchoolLevelDivContainer?.append($spellSchoolHeader);
    const $spellLevelHeader = document.createElement('h2');
    $spellLevelHeader.classList.add('column-half');
    $spellLevelHeader.textContent = 'Level';
    $spellSchoolLevelDivContainer?.append($spellLevelHeader);
    const $spellRangeCastTimeDivContainer = document.createElement('div');
    $spellRangeCastTimeDivContainer.classList.add('row');
    $spellTitle.append($spellRangeCastTimeDivContainer);
    const $spellRangeHeader = document.createElement('h2');
    $spellRangeHeader.classList.add('column-half');
    $spellRangeHeader.textContent = 'Range';
    $spellRangeCastTimeDivContainer?.append($spellRangeHeader);
    const $spellCastTimeHeader = document.createElement('h2');
    $spellCastTimeHeader.classList.add('column-half');
    $spellCastTimeHeader.textContent = 'Cast Time';
    $spellRangeCastTimeDivContainer?.append($spellCastTimeHeader);
    const $spellDurationConcentrationDivContainer = document.createElement('div');
    $spellDurationConcentrationDivContainer.classList.add('row');
    $spellTitle.append($spellDurationConcentrationDivContainer);
    const $spellConcentrationHeader = document.createElement('h2');
    $spellConcentrationHeader.classList.add('column-half');
    $spellConcentrationHeader.textContent = 'Concentration';
    $spellDurationConcentrationDivContainer?.append($spellConcentrationHeader);
    const $spellDurationHeader = document.createElement('h2');
    $spellDurationHeader.classList.add('column-half');
    $spellDurationHeader.textContent = 'Duration';
    $spellDurationConcentrationDivContainer?.append($spellDurationHeader);
    const $spellDescriptionDivContainer = document.createElement('div');
    $spellDescriptionDivContainer.classList.add('row');
    $spellTitle.append($spellDescriptionDivContainer);
    const $spellDescHeader = document.createElement('h2');
    $spellDescHeader.classList.add('row');
    $spellDescHeader.textContent = 'Description';
    $spellDescriptionDivContainer?.append($spellDescHeader);
    // Spell level information
    const $spellLevel = document.createElement('p');
    $spellLevel.classList.add('spell-text-information');
    let spellInformation = {};
    //Introduce variable that will change as it pushes information to spellInformation object
    let currentSpellInformation = spellData.level;
    const spellLevel = currentSpellInformation;
    spellInformation.level = spellLevel;
    $spellLevel.textContent = spellInformation.level;
    $spellLevelHeader.append($spellLevel);
    //Spell school information
    const $spellSchoolInformation = document.createElement('p');
    $spellSchoolInformation.classList.add('spell-text-information');
    let spellSchoolInformation = spellData.school.name.toString();
    const spellSchool = spellSchoolInformation;
    spellInformation.school = spellSchool;
    $spellSchoolInformation.textContent = spellInformation.school;
    $spellSchoolHeader.append($spellSchoolInformation);
    //Spell range information
    const $spellRangeInformation = document.createElement('p');
    $spellRangeInformation.classList.add('spell-text-information');
    let spellRangeInformation = spellData.range;
    const spellRange = spellRangeInformation;
    spellInformation.range = spellRange;
    $spellRangeInformation.textContent = spellInformation.range;
    $spellRangeHeader.append($spellRangeInformation);
    //Spell cast time information
    const $spellCastTimeInformation = document.createElement('p');
    $spellCastTimeInformation.classList.add('spell-text-information');
    let spellCastTimeInformation = spellData.casting_time;
    const spellCastTime = spellCastTimeInformation;
    spellInformation.castTime = spellCastTime;
    $spellCastTimeInformation.textContent = spellInformation.castTime;
    $spellCastTimeHeader.append($spellCastTimeInformation);
    //Spell concentration
    const $spellConcentrationInformation = document.createElement('p');
    $spellConcentrationInformation.classList.add('spell-text-information');
    let spellConcentrationInformation = spellData.concentration;
    const spellConcentration = spellConcentrationInformation;
    spellInformation.concentration = spellConcentration;
    $spellConcentrationInformation.textContent = spellInformation.concentration.toString();
    $spellConcentrationHeader.append($spellConcentrationInformation);
    //Spell duration
    const $spellDurationInformation = document.createElement('p');
    $spellDurationInformation.classList.add('spell-text-information');
    let spellDurationInformation = spellData.duration;
    const spellDuration = spellDurationInformation;
    spellInformation.duration = spellDuration;
    $spellDurationInformation.textContent = spellInformation.duration;
    $spellDurationHeader.append($spellDurationInformation);
    //description of spells
    for (let i = 0; i < spellData.desc.length; i++) {
        const $spellDescriptionInformation = document.createElement('p');
        $spellDescriptionInformation.classList.add('spell-text-information');
        spellInformation.desc = spellData.desc[i];
        $spellDescriptionInformation.textContent = spellInformation.desc;
        $spellDescHeader.append($spellDescriptionInformation);
    }
    const $spellDamageInformation = document.createElement('p');
    $spellDamageInformation.classList.add('spell-text-information');
    //damage of spells
    spellInformation.damage = spellData.damage?.damage_at_slot_level;
    let currentDamage = '';
    for (const [key, value] of Object.entries(spellInformation.damage)) {
        const $spellDamageInformation = document.createElement('p');
        $spellDamageInformation.classList.add('spell-text-information');
        currentDamage = 'Level ' + key + ': ' + value;
        $spellDamageInformation.textContent = currentDamage;
        console.log($spellDamageInformation);
        $spellDescHeader.append($spellDamageInformation);
    }
    return $divSpell;
}
