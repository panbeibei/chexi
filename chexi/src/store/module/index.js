import {getBrandList} from '../../api/index';

const state = {
    letter:[],
    CarList:[],
    masterList:[],
    masterCls:''
}

const mutations = {
    updateBrandList: (state,payload)=>{
        state.CarList = payload.CarList;
    },
    updateLetter: (state,payload)=>{
        state.letter = payload.letter;
    }
}

const actions = {
    
}