<template>
<div id="main-wrapper">
    <div class="upgrade-bar" v-if="$auth.user && $auth.user.agent_detail && $auth.user.agent_detail.subscription_plan_id == 1 && showBanner">
        <div class="container">
            <span>5 searches remaining this month. <a href="/exp-home/account">Upgrade Now</a></span>
            <img src="~/assets/icons/icon-interface-circle-x-white.svg"  @click="removeBanner"/>
        </div>
    </div>
    <nav-bar></nav-bar>
    <div class="content">
    <nuxt />
    </div>
    <footer-elem></footer-elem>
</div>
</template>

<script>
import NavBar from '../components/layout/navBar';
import FooterElem from '../components/layout/footer'

export default {
    components: {
        NavBar,
        FooterElem
    },
    data(){
        return {
            showBanner: true
        }
    },
    methods:{
        removeBanner(){
            this.$cookiz.set('showBanner',true);
            this.showBanner = false
        }
    },
    mounted(){
        if(this.$cookiz.get('showBanner')){
            this.showBanner = false
        }
    }
}
</script>

<style>
@media screen and (max-width: 720px) {
    .mobile-center {
        text-align: center
    }

    .mobile-flex-center {
        justify-content: center !important;
    }
}
.container.before-login{
    max-width: 1059px;
}
@media screen and (max-width: 720px) {
    .container.before-login .navbar-brand{
            position: relative;
            left: auto;
            transform: translateX(0px);
    }
    .navbar-brand{
        position: relative;
        left: 50%;
        transform: translateX(-50%);
    }
}
</style>
