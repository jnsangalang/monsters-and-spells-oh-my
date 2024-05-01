"use strict";
let $formInput = document.querySelector('#form-input');
let $monsterInput = document.querySelector('.monster-input');
let $monsterSearchButton = document.querySelector('.monster-search-button');
let $view = document.querySelectorAll('.view');
let $homeButton = document.querySelector('.home-button');
let $monsterInformation = document.querySelector('.monster-information');
let $submitMonsterButton = document.querySelector('.submit-monster-button');
let $divMonster = document.querySelector('#monster-information');
const domQueries = {
    $formInput,
    $monsterInput,
    $monsterSearchButton,
    $view,
    $homeButton,
    $monsterInformation,
    $submitMonsterButton,
    $divMonster
};
for (const key in domQueries) {
    if (!domQueries[key])
        throw new Error(`The ${key} dom query failed `);
}
// const $icon = document.createElement('i');
// $icon.setAttribute('class','fa-solid fa-dice-d20');
// $monsterInput?.append($icon);
$monsterSearchButton?.addEventListener('click', () => {
    viewSwap('monster-view');
});
$homeButton?.addEventListener('click', () => {
    viewSwap('home-view');
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
        $monsterInformation.textContent = "Please use a monster name";
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
async function retrieveMonsterInformation(monsterName) {
    const response = await fetch('https://www.dnd5eapi.co/api/monsters');
    $monsterInformation.textContent = "Looking up...";
    const responseMonsters = await response.json();
    const monstersInfo = responseMonsters.results;
    console.log('monsterInfo:', monstersInfo);
    try {
        const monsterinformation = {};
        for (let i = 0; i < monstersInfo.length; i++) {
            if (monstersInfo[i].name.toLowerCase() === monsterName.toLowerCase()) {
                const response = await fetch(`https://www.dnd5eapi.co${monstersInfo[i].url}`);
                console.log(response);
                const matchMonsterResponse = await response.json();
                const monsterData = matchMonsterResponse;
                console.log('monsterData:', monsterData);
                const $monsterTitle = document.createElement('h2');
                $monsterTitle.classList.add('.row');
                $monsterTitle.textContent = monsterData.name;
                $divMonster?.append($monsterTitle);
                const $monsterParagraph = document.createElement('p');
                $monsterParagraph.classList.add('.row');
                for (let i = 0; i < monsterData.actions.length; i++) {
                    Object.assign(monsterData.actions[i].name);
                    Object.assign(monsterData.actions[i].desc);
                    $monsterParagraph.textContent = actions.toString();
                    $monsterParagraph.append(description.toString());
                }
                $monsterTitle.append($monsterParagraph);
            }
            else {
                $monsterInformation.textContent = "Monster not found";
            }
        }
        return $divMonster;
    }
    catch (error) {
        if (!response.ok) {
            const message = `Failed to get monsters, Error ${response.status}`;
            $monsterInformation.textContent = "Error retrieving monster data";
            throw new Error(message);
        }
    }
}
console.log(retrieveMonsterInformation('goblin'));
// async function createMonster(){
//   const response = await fetch('https://www.dnd5eapi.co/api/monsters');
//   try{
//     const monsters = await response.json();
//     console.log(monsters);
//   }
// }
// console.log(createMonster());
