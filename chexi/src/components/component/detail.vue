<template>
    <div class="content">
        <div class="img" @click="getImg(num)">
            <img v-lazy="detailList.CoverPhoto" alt="">
            <span>{{detailList.pic_group_count}}张照片</span>
        </div>
        <div class="info">
            <p v-if="detailList&&detailList.market_attribute.dealer_price">{{detailList.market_attribute.dealer_price}}</p>
            <p v-if="detailList&&detailList.market_attribute.official_refer_price">指导价 {{detailList.market_attribute.official_refer_price}}</p>
            <div class="action">
                <button @click="clickBtn">{{detailList.BottomEntranceTitle}}</button>
            </div>
        </div>

        <div class="car-list">
            <div class="c-type">
                <span v-for="(item,index) in yearList" :key="index" @click="getList(item)">{{item}}</span>
            </div>
            <div>
                <div v-for="(item,index) in typeList" :key="index" class="cont">
                     <p>{{ item.tit}}</p>
                     <ul>
                        <li v-for='(v,ind) in item.datas' :key='ind'>
                            <p>{{v.car_name}}</p>
                            <p>{{v.horse_power}}马力{{v.gear_num}}挡</p>
                            <p><span>指导价{{v.market_attribute.official_refer_price}}</span><span>{{v.market_attribute.dealer_price_min}}起</span></p>
                            <span class='btn'>询问低价 </span>
                        </li>
                     </ul>
                </div>
               <div class="bottom">
                   <p>询问低价</p>
                   <p>本地经销商为你报价</p>
               </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@import '../../scss/detail.scss';
</style>

<script>
export default {
    data(){
        return{
           detailList:"",
           yearList:[],
           allList:[],
           typeList:[],
           num:''
        }

    },
    methods:{
        getData(){
            let id = this.$route.query.id;
            this.num = id;
              fetch(`https://baojia.chelun.com/v2-car-getInfoAndListById.html?SerialID=${id}`).then(res=>{
                res.json().then(body=>{
                    this.detailList = body.data;
                    //处理年份数据
                    let arr = ['全部'],arrs=[];
                    body.data.list.forEach((item,index)=>{
                        if(arr.indexOf(item.market_attribute.year)===-1){
                               arr.push(item.market_attribute.year)
                        }
                    })
                    this.yearList = arr;
                    //处理年份相对应的数据
                    arr.forEach((item,index)=>{
                        let obj = {
                            year:item,
                            list:[]
                        }
                        body.data.list.forEach((val,ind)=>{
                            if(item ==='全部'){
                                obj.list.push(val);
                            }
                            else if(item === val.market_attribute.year){
                                obj.list.push(val);
                            }
                        })
                        arrs.push(obj);
                    })
                   this.allList = arrs;
                   this.getList('全部')
                 })
             })
        },
        getList(y){
            let arr=[];
            this.allList.forEach((v,i)=>{
                if(y===v.year){
                    arr=v.list;
                }
            })
             //排序
                let sortCar = (arr)=>{
                    return arr.sort((a,b)=>{
                        if(a.exhaust<b.exhaust){
                            return -1;
                        }else if(a.exhaust<b.exhaust){
                                return 1;
                        }else{
                            if(a.max_power<b.max_power){
                                return -1;
                            }else if(a.max_power>b.max_power){
                                return 1;
                            }else{
                                return b.inhale_type-a.inhale_type;
                            }
                        }
                    })
                };
                let list = sortCar(arr);
                let arrs =[],data=[];
                list.forEach((v,i)=>{
                     let str = v.exhaust_str + v.max_power_str + v.inhale_type;
                    if(arrs.indexOf(str)===-1){
                        arrs.push(str);
                    }
                })
                arrs.forEach((v,i)=>{
                    data.push({tit:v,datas:[]})
                })
                list.forEach((v,i)=>{
                     let str = v.exhaust_str + v.max_power_str + v.inhale_type;
                   data.forEach((item,ind)=>{
                    if(item.tit.indexOf(str)!==-1){
                        item.datas.push(v)
                    }
                 })
                })
                console.log(data);
                this.typeList=data;       
        },
        getImg(id){
            this.$router.push({path:'/imgList',query:{id }});
        },
        clickBtn(){
            let id = null;
            this.detailList.list.forEach((item,index)=>{
                if(index==0){
                      id = item.car_id*1;
                }
            })
           this.$router.push({path:'/carQuestion',query:{id:id}})
        }
    },
    mounted(){
        this.getData();
    }
}
</script>

