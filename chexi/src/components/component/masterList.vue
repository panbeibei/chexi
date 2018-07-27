<template>
    <div ref="master" :class='"car-type "+masterCls'
    @touchstart.stop = "touchStart"
    @touchmove.stop = "touchMove"
    @touchend.stop = "touchEnd"
    >
        <div v-for="(item,index) in list" :key="index">
            <p>{{item.GroupName}}</p>
            <ul v-for="(val,ind) in item.GroupList" :key="ind">
                <li :data-id="val.SerialID" @click="getSerialID(val.SerialID)">
                    <img v-lazy="val.Picture" alt=""> 
                    <div class="Alias">
                        <p>{{val.AliasName}}</p>
                        <p>{{val.DealerPrice}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<style lang="scss" scope>
    @import '../../scss/masterList.scss';
</style>

<script>
export default {
    props:{
        list:'',
        masterCls:'',
        hideCls:''
    },
    methods:{
        touchStart(e){
            this.pageX = e.touches[0].pageX;
           
        },
         touchMove(e){
            let X = e.touches[0].pageX;
            this.pageX = X-this.pageX;
            if(this.pageX>0){
                this.$refs.master.style = `transform:translate3d(${this.pageX}px,0,0)`;
            }
        },
         touchEnd(e){
             this.$refs.master.style ='';
            if(this.pageX>100){
                this.hideCls();
            }
        },
        getSerialID(id){
            this.$router.push({path:'/detail',query:{id:id}})
           
        }
    }
}
</script>

