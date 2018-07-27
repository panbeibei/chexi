const state = {
    data:[],
    pageNum:0
}

const mutations = {
    getPageNum:(state)=>{
        state.pageNum++;
    },
    getImgData:(state,payload)=>{
        state.data =  payload;
    }
}

const actions = {
    getData(context,{serialId,imageId}){
        context.commit("getPageNum");
        fetch(`https://baojia.chelun.com/v2-car-getCategoryImageList.html?SerialID=${serialId}&ImageID=${imageId}&Page=${context.state.pageNum}&PageSize=30`).then(res=>{
            res.json().then(body=>{
                context.commit('getImgData',body.data)
            })
        })
    }
}

export default{
    state,
    mutations,
    actions
}