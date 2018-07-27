<template>
    <div class="page" ref="page">
        <div class="loading" v-show="flag">
            <div>
            <img src=" https://h5.chelun.com/2017/official/img/loading.gif" alt="">
            <p>...加载中</p></div>
        </div>
       
        <!-- 汽车列表组件 -->
        <CarList :carList="CarList" :getId="getId"/>
        <!-- 点击字母组件 -->
        <Letter :letter="letter" :changeLetter="changeLetter"/>
        <!-- 滑动组件 -->
        <MasterList :list="masterList" :masterCls="masterCls" :hideCls="hideCls"/>
    </div>
</template>
<script>
import CarList from './component/CartList';
import Letter from './component/letter';
import MasterList from './component/masterList';
export default {
    data(){
        return {
            //  汽车列表数据
            CarList:[],
            // 点击字母数据
            letter:[],
            //滑动列表数据
            masterList:[],
            masterCls:'',
            flag:true
        }
    },
    methods:{
        getData(){
            fetch('https://www.easy-mock.com/mock/5af6599acf64741ceacf1c57/es6/carBrand').then(res=>{
                res.json().then(body=>{
                    let letter=[];
                    let CarList = [];
                    body.data.forEach((item,index)=>{
                        item.spelling = item.Spelling[0];
                        if(letter.indexOf(item.spelling)===-1){
                            letter.push(item.spelling)
                        }
                    });
                    
                    letter.forEach((val,ind)=>{
                        let obj = {
                            letter:val,
                            list:[]
                        }
                        body.data.forEach((v,i)=>{
                            if(val===v.spelling){
                                obj.list.push(v)
                            }
                        })
                        CarList.push(obj)
                    });

                    this.CarList = CarList;
                    console.log(CarList)
                    this.letter = letter;
                    this.flag = false;
                }) 
            })
        },
        getId(id){
           fetch(`https://baojia.chelun.com/v2-car-getMakeListByMasterBrandId.html?MasterID=${id}`).then(res=>{
               res.json().then(body=>{
                   this.masterList = body.data;
                   console.log(this.masterList)
                   this.masterCls = 'active';
               })
           })
        },
        hideCls(){
             this.masterCls = null;
        },
        changeLetter(ind){
            if(ind === '#'){
                return;
            }
            let scrollTop = document.querySelector(`#${ind}`).offsetTop;
            this.$refs.page.scrollTop = scrollTop;
        }
    },
    components:{
        CarList,
        Letter,
        MasterList
    },
    mounted(){
        this.getData();
    }
}
</script>

