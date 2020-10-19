<template>
    <div class='BtnGroup'>
        <div class="topBtnGroup">
            <button class="subBtn addbtn"><img src="../../assets/add.png"/><span>添加</span></button>    
            <!-- <button class="subBtn addbtn"><img src="../../assets/amend.png"/><span>修改</span></button>    
            <button class="subBtn addbtn"><img src="../../assets/del.png"/><span>删除</span></button>     -->
            <button class="subBtn addbtn"><img src="../../assets/refresh.png"/><span>刷新</span></button>    
        </div>         
    </div>
</template>

<script>
export default {
    name: 'BtnGroup',

    props: {

    },
    data() {
        return {

        };
    },
    computed: {

    },
    methods: {

    },
    components: {

    },
    created() {

    },
    mounted() {

    },
    watch: {

    }
};
</script>

<style lang="stylus">
.BtnGroup
    margin-bottom  15px
    margin-top 10px
    .topBtnGroup
            display flex
            width 200px
            justify-content space-around
        .subBtn
            overflow hidden
            background transparent
            border-radius 3px
            width 80px
            height 35px
            line-height 35px
            border 1px solid #03D0FF
            display flex
            justify-content center
            img 
                width 20px
                height 20px
                margin-top 5px
            span
                display inline-block
                width 30px
                font-size 12px
                color #ffffff
</style>


