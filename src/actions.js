export const SET_TEXT = 'SET_TEXT';
export const setText = (text) => ({
  type: SET_TEXT,
  text
})
export const CLEAR_TEXT = 'CLEAR_TEXT';
export const clearText = () => ({
  type: CLEAR_TEXT,
  text: ''
})
// export const INIT = 'INIT';
// export const setItem = (item) => ({
//   type: 'SET_ITEM',
//   item
// })
// export const INIT = 'INIT';
// export const clearItem = () => ({
//   type: 'CLEAR_ITEM',
//   item: ''
// })
