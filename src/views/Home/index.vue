<template>
<div class="content home">
    <Navbar :navtabActive="1"/>
    <div class="home_main">
        <!-- 左侧的导航栏 -->
        <Homenav />
        <!-- 右侧的内容 -->
        <Homemain />
    </div>
</div>
</template>

<script src='./script.js'></script>

<style lang='scss' src='./style.scss'></style>