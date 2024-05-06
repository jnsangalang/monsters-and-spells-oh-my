/* exported data */
interface Data {
  spellList:SpellInformation[],
  nextSpellId:number,
  spellEdit: null | SpellInformation,
};

let data: Data = {
  spellList:[],
  nextSpellId:1,
  spellEdit:null,
};
