/* exported data */
interface Data {
  spellList:SpellInformation[],
  actualSpellList: SpellObj[],
  nextSpellId:number,
  spellEdit: null | SpellInformation,
};

let data: Data = {
  spellList:[],
  actualSpellList:[],
  nextSpellId:1,
  spellEdit:null,
};
