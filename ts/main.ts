interface Spell{
  name:string,
  range:string,
  school:string,
  concentration:boolean,
  castTime: string,
  material:string
}

let $monsterSearchBar = document.querySelector('.monster-search-bar');
let $monsterSearchButton = document.querySelector('.monster-search-button');
let $view = document.querySelectorAll('.view');
let $homeButton = document.querySelector('.home-button');

const domQueries: Record<string,any> = {
  $monsterSearchBar,
  $monsterSearchButton,
  $view,
}

for(const key in domQueries){
  if (!domQueries[key]) throw new Error(`The ${key} dom query failed `);
}

// const $icon = document.createElement('i');
// $icon.setAttribute('class','fa-solid fa-dice-d20');
// $monsterSearchBar?.append($icon);

$monsterSearchButton?.addEventListener('click',()=>{
  viewSwap('monster-view');
})

$homeButton?.addEventListener('click', ()=>{
  viewSwap('home-view');
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
