<template>
<div class="navbar" >
        <p class="public_floatleft" :class="navtab == '1' ? 'navhover' : ''" @click="updatetab(1)">
            首页
            <span class="border row1" v-show="navtab == '1'"></span>
            <span class="border row2" v-show="navtab == '1'"></span>
            <span class="border col1" v-show="navtab == '1'"></span>
            <span class="border col2" v-show="navtab == '1'"></span>
        </p>
        <p class="public_floatleft" :class="navtab == '2' ? 'navhover' : ''" @click="updatetab(2)">
            人员台账
            <span class="border row1" v-show="navtab == '2'"></span>
            <span class="border row2" v-show="navtab == '2'"></span>
            <span class="border col1" v-show="navtab == '2'"></span>
            <span class="border col2" v-show="navtab == '2'"></span>
        </p>
        <p class="public_floatleft" :class="navtab == '3' ? 'navhover' : ''" @click="updatetab(3)">
            线索台账
            <span class="border row1" v-show="navtab == '3'"></span>
            <span class="border row2" v-show="navtab == '3'"></span>
            <span class="border col1" v-show="navtab == '3'"></span>
            <span class="border col2" v-show="navtab == '3'"></span>
        </p>
        <p class="public_floatleft" :class="navtab == '4' ? 'navhover' : ''" @click="updatetab(4)">
            问题台账
            <span class="border row1" v-show="navtab == '4'"></span>
            <span class="border row2" v-show="navtab == '4'"></span>
            <span class="border col1" v-show="navtab == '4'"></span>
            <span class="border col2" v-show="navtab == '4'"></span>
        </p>
</div>
</template>

<script src='./script.js'></script>

<style lang='scss' src='./style.scss'></style>