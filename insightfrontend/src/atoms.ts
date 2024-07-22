import {atom} from 'recoil';

export const dateState = atom({
    key: "dateState",
    default: undefined,
})

export const loadingState = atom({
    key:"loadingState",
    default: false
})

export const buttonDisabledState = atom({
    key:"buttonState",
    default:false
})


export const journalState = atom({
    key: 'journalState',
    default: {
      title: '',
      journal: '',
      insight: '',
      date: new Date(),
    },
  });



export const modalState = atom({
    key:'modalState',
    default:false
})