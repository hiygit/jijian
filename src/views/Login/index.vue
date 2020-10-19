<template>
<div class="login">
    <!-- 头部标题 -->
    <div class="login_header">
        <div class="public_floatleft login_header_img ">
            <img src="./../../assets/loginleft.png" alt="" class=""/>
        </div>
        
        <div class="public_floatleft login_header_text">{{projectName}}</div>
        <div class="public_floatleft login_header_img ">
            <img src="./../../assets/loginright.png" alt="" class=""/>
        </div>
    </div>
    <!-- 登录部分 -->
    <div class="login_center">
        <div class="login_center_text">
            <div >
                用户登录
            </div>
            <div class="login_center_text_admin">
                <img src="./../../assets/loginadmin.png" alt="" class="public_floatleft">
                <input  class="public_floatleft" type="text" placeholder="请填写登录账号" v-model="loginform.username">
            </div>
            <div class="login_center_text_admin">
                <img src="./../../assets/loginpassword.png" alt="" class="public_floatleft">
                <input  class="public_floatleft" type="password" placeholder="请填写登录密码" v-model="loginform.password">
            </div>
            <div class="login_center_text_btn">
                <input class="login_center_text_btn_btn" type="submit" value="登 录" @click="tohome()">
            </div>
        </div>
    </div>
</div>
</template>

<script src='./script.js'></script>

<style lang='scss' src='./style.scss'></style>