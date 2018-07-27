<template>
    
</template>
<script>
import {mapState,mapActions} from "vuex";
export default {
    computed:{
        ...mapState({
            data:state=>state.imgList_detail.data
        })
    },
    mounted(){
        console.log(this.$route.query)
        let serialId = this.$route.query.id;
        let imageId = this.$route.query.pageId;
        this.$store.dispatch('getData',{serialId,imageId})
    }
}
</script>

