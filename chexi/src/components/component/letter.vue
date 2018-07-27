<template>
    <ul
    @touchstart = "touchStart"
    @touchmove = "touchMove">
         <li>#</li>
        <li v-for="(item,index) in letter" :key="index">{{item}}</li>
    </ul>
   
</template>
<style lang="scss" scoped>
@import '../../scss/letter.css';
</style>

<script>
export default {
    data(){
        return {}
    },
    props:{
        letter:'',
        changeLetter:''
    },
    methods:{
        touchStart(e){
            this.height = window.innerWidth/750*100*0.4;
            this.offsetTop = (window.innerHeight - this.height*this.letter.length)/2;
        },
        touchMove(e){
            let pageY = e.touches[0].pageY;
            let ind = parseInt((pageY - this.offsetTop)/20);
            if(ind<0){
                ind=0;
            }else if(ind>this.letter.length-1){
                ind=this.letter.length-1;
            }
            this.changeLetter(this.letter[ind])
        }
    },
    mounted(){
       
    }
}
</script>

