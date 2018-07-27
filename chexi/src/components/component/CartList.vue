<template>
    <div class="car-brand">
        <div v-for="(item,index) in carList" :id="item.letter" :key="index">
            <p>{{item.letter}}</p>
            <ul v-for="(val,ind) in item.list" :key="ind">
                <li @click="getId(val.MasterID)"><img v-lazy="val.CoverPhoto"><span>{{val.Name}}</span></li>
            </ul>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@import '../../scss/carLlist.css';
</style>

<script>
export default {
    data(){
        return {}
    },
    props:{
        carList:'',
        getId:''
    }
}
</script>

