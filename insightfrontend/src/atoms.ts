import {atom} from 'recoil';



export const dateState = atom<Date>({
    key: "dateState",
    default:new Date(),
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


export const aiInsightsState = atom({
    key:'aiInsightsState',
    default:""
})

export const aiInsight = atom({
    key: 'aiInsight',
    default: false
})