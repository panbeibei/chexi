<template>
    <div>
        <div class="tit">
            <p><span>颜色</span></p>
            <p><span>车款</span></p>
        </div>
        <ul class="imgs">
            <li v-for="(item,index) in data" :key="index" >
                <img v-lazy="item.url" alt="">
                <div v-if="item.count" @click="clickDiv(id,item.id)">
                    <p>{{item.name}}</p>
                    <p>{{item.count}}></p>
                </div>
            </li>
        </ul>
    </div>
</template>
<style lang="scss" scoped>
    @import '../../scss/imgList.scss';
</style>
<script>
export default {
    data(){
        return {
            data:[],
            id:null
        }
    },
    methods:{
        getData(){
            let id = this.$route.query.id;
            this.id = id;
            fetch(`https://baojia.chelun.com/v2-car-getImageList.html?SerialID=${id}`).then(res=>{
                res.json().then(body=>{
                    console.log(body)
                    let arr = [];
                    body.data.forEach((item,index)=>{
                        item.List.forEach((val,ind)=>{
                            val.Url = val.Url.replace('{0}',ind+1)
                            if(ind===0){
                                arr.push({
                                    url:val.Url,
                                    name:item.Name,
                                    id:item.Id,
                                    count:item.Count
                                })
                            }else{
                                arr.push({
                                    url:val.Url,
                                    name:item.Name,
                                    id:item.Id
                                })
                            }
                        })
                    })
                    this.data = arr;
                    console.log(arr)
                })
            })
        },
        clickDiv(id,pageId){
            this.$router.push({path:'/imgList_detail',query:{id:id,pageId:pageId}});
        }
    },
    mounted(){
        this.getData()
    }
}
</script>


