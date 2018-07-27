<template>
    <div id="app">
        <div class="q">
            <header>
               可像多个商家咨询最低价，商家及时回复
            </header>
            <div class="content">
                <div class="q-info" @click="getId(data.details.serial.SerialID)">
                    <img :src="data.details.serial.Picture" alt="">
                    <div class="flex-column">
                        <p>{{data.details.serial.AliasName}}</p>
                        <p>{{data.details.market_attribute.year+data.details.car_name}}</p>
                    </div>
                </div>
                <div class="self-info">
                    <p class="tip">个人信息</p>
                    <ul>
                        <li>
                            <span>姓名</span>
                            <input type="text" placeholder="输入你的真实中文姓名">
                        </li>
                        <li>
                            <span>手机</span>
                            <input type="text" placeholder="输入你的真实手机号码">
                        </li>
                        <li>
                            <span>城市</span>
                            <span>北京</span>
                        </li>
                    </ul>
                    <div class="quotation">
                        <button>询最低价</button>
                    </div>
                </div>   
                <div class="dealer-info">
                    <p class="tip">选择报价经销商</p>
                    <ul class="dealer-info-list">
                        <li v-for="(item,index) in data.list" :key="index" class="dealer-info-list-li" @click="clickLi(index)"
                        :class="isChecked==index?'active':''">
                            <p>
                                <span>
                                    {{item.dealerShortName}}
                                </span>
                                <span>
                                    {{(item.promotePrice).slice(0,5)}}万
                                </span>
                            </p>
                            <p>
                                <span>
                                    {{item.address}}
                                </span>
                                <span>
                                   售{{item.saleRange}}
                                </span>
                            </p>
                        </li>
                    </ul>
                </div>
             </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            data:[],
            carId:'',
            isChecked:''
            }
    },
    methods:{
        getcityData(){
            let id = this.$route.query.id;
            fetch('https://baojia.chelun.com/location-client.html').then(res=>{
                res.json().then(body=>{
                    let carId = body.data.CityID*1; 
                    this.carId = carId;
                    this.getData(id,this.carId);
                })
            });
            
        },
        getData(id,carId){
            console.log(111);
            fetch(`https://baojia.chelun.com/v2-dealer-alllist.html?carId=${id}&cityId=${carId}`).then(res=>{
                   res.json().then(body=>{
                           this.data = body.data;
                           console.log(this.data)
                        })
                    }) 
        },
        clickLi(index){
            this.isChecked = index;
        },
        getId(id){
            this.$router.push({path:'/official',query:{id}})
        }
    },
    mounted(){
        this.getcityData();
    }
}
</script>
<style lang="scss" scoped>
@import '../../scss/CarQuestion.scss';
</style>

 
