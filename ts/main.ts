interface FormElements extends HTMLFormControlsCollection{
  name: HTMLInputElement
}

interface MonsterName{
  name:string
}

interface MonsterInformation{
  actions:string,
  type:string,
  armorClass:number,
  specialAbilities:string,
  hitDice:string,
  hitPoints:number,
  strength:number,
  intelligence:number,
  wisdom:number,
  charisma:number,
  dexterity:number,
  constitution:number,
  damageImmunities?: string,
  damageResistance?: string,
  damageVulnerabilities?: string,
  legendaryActions?:string

}

interface Spell{
  name:string;
  range:string;
  school:string;
  concentration:boolean;
  castTime: string;
  material:string;
}

let $formInput = document.querySelector('#form-input') as HTMLFormElement;
let $monsterInput = document.querySelector('.monster-input') as HTMLInputElement;
let $monsterSearchButton = document.querySelector('.monster-search-button');
let $view = document.querySelectorAll('.view');
let $homeButton = document.querySelector('.home-button');
let $monsterInformation = document.querySelector('.monster-information') as HTMLDivElement;
let $submitMonsterButton = document.querySelector('.submit-monster-button');
let $divMonster = document.querySelector('#monster-information');

const domQueries: Record<string,any> = {
  $formInput,
  $monsterInput,
  $monsterSearchButton,
  $view,
  $homeButton,
  $monsterInformation,
  $submitMonsterButton,
  $divMonster
}

for(const key in domQueries){
  if (!domQueries[key]) throw new Error(`The ${key} dom query failed `);
}

// const $icon = document.createElement('i');
// $icon.setAttribute('class','fa-solid fa-dice-d20');
// $monsterInput?.append($icon);

$monsterSearchButton?.addEventListener('click',()=>{
  viewSwap('monster-view');
})

$homeButton?.addEventListener('click', ()=>{
  viewSwap('home-view');
})

$submitMonsterButton?.addEventListener('click',(event:Event)=>{
  event.preventDefault();
  const $formElement = $formInput.elements as FormElements;

  const monsterName:MonsterName = {
   name: $formElement.name.value,
  };

  if(monsterName.name){
    retrieveMonsterInformation(monsterName.name);
  }
  else{
    $monsterInformation.textContent = "Please use a monster name";
  }
})

function viewSwap(string:string):void{
  for(let i = 0; i < $view.length; i++ ){
    const dataView = $view[i].getAttribute('data-view');
    if(dataView === string){
      $view[i].classList.remove('hidden');
    }
    else{
      $view[i].classList.add('hidden')
    }
  }
}


async function retrieveMonsterInformation(monsterName:string){
  const response = await fetch('https://www.dnd5eapi.co/api/monsters');

  $monsterInformation.textContent="Looking up...";
    const responseMonsters = await response.json();
    const monstersInfo = responseMonsters.results;
    console.log('monsterInfo:',monstersInfo);

  try {


    for(let i = 0; i < monstersInfo.length ; i++){
      if(monstersInfo[i].name.toLowerCase() === monsterName.toLowerCase()){

        const response = await fetch(`https://www.dnd5eapi.co${monstersInfo[i].url}`);
        console.log(response);

        const matchMonsterResponse = await response.json();
        const monsterData = matchMonsterResponse;

        console.log('monsterData:',monsterData);

        const $monsterTitle = document.createElement('h2');
        $monsterTitle.classList.add('.row');
        $monsterTitle.textContent = monsterData.name;

        $divMonster?.append($monsterTitle);



        let monsterInformation: any = {};

        for (let i = 0; i < monsterData.armor_class.length; i++) {
          const $monsterParagraph = document.createElement('p');
          $monsterParagraph.classList.add('.row');

          const currentMonsterInformation = monsterData.armor_class[i];

          let armorClass = currentMonsterInformation;
          monsterInformation.armorClass = armorClass;
          $monsterParagraph.textContent = 'Armor Class:' + monsterInformation.armorClass.value;
          $monsterTitle.append($monsterParagraph);

        }

        for(let i = 0; i < monsterData.actions.length; i++){
          const $monsterParagraph = document.createElement('p');
          $monsterParagraph.classList.add('.row');

          const currentMonsterInformation = monsterData.actions[i];

          let actions = currentMonsterInformation.name + ':' + currentMonsterInformation.desc ;
          monsterInformation.actions = actions;
          $monsterParagraph.textContent = monsterInformation.actions;
          $monsterTitle.append($monsterParagraph);

        }

        return $divMonster;
      }
      else {
        $monsterInformation.textContent = "Monster not found";
    }
    }
    return $divMonster;
  }
  catch(error){
    if(!response.ok){
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
