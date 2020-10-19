<template>
<div class="selectyear">
    <el-select v-model="yeardata" placeholder="请选择" class="selectyear_margin" popper-class="selectyear_popper" @change="selectyear(yeardata)">
        <el-option v-for="item in options" :key="item" :label="item" :value="item"></el-option>
    </el-select>
    <el-select v-model="monthdata" placeholder="月份" @change="selectmonth(monthdata)">
        <el-option v-for="item in monthoptions" :key="item" :label="item" :value="item"></el-option>
    </el-select>
</div>
</template>

<script src='./script.js'></script>

<style lang='scss' src='./style.scss'></style>