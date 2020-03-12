<template>
<b-container :class="(!$auth.loggedIn)? 'm-container before-login': 'm-container'">
    <b-navbar type="primary" variant>
        <b-navbar-brand to="/"><img class="logo" src="~/assets/icons/icon-interface-home.svg" /></b-navbar-brand>
        <b-navbar-nav class="ml-auto" v-if="$route.name === 'sign_in' || $route.name === 'sign_in-forgot_password' || $route.name === 'sign_in-forgot_password-success'">
            <b-nav-text v-if="!$auth.loggedIn" class="p3">Need an account?</b-nav-text>
            <b-nav-item v-if="!$auth.loggedIn" class="p3 text-primary" to="/sign_up"><span class="text-primary">Sign Up</span></b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-else>
            <b-nav-text v-if="!$auth.loggedIn" class="p3">Already have an account?</b-nav-text>
            <b-nav-item v-if="!$auth.loggedIn" class="p3 text-primary" to="/sign_in"><span class="text-primary">Sign In</span></b-nav-item>
            <div class="sidebar-icon" @click="toggleSideBar" v-if="$auth.loggedIn">
                <img class="logo" src="~/assets/icons/icon-interface-menu.svg" />
            </div>
        </b-navbar-nav>
    </b-navbar>
    <div :class="['sidebar-menu',{'reveal': open}]">
        <img @click="toggleSideBar" class="cross" src="~/assets/icons/icon-interface-x.svg" />
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/exp-home/client">Start a new home search</a></li>
            <li><a href="/exp-home/search_history">Revisit a previous search</a></li>
            <li><a href="/exp-home/request_approval">Request a pre-approval</a></li>
            <li><a href="/exp-home/account">My Account</a></li>
        </ul>
        <div class="logout"><a @click="logout()">Sign Out</a></div>
    </div>
</b-container>
</template>

<script>
import Vue from 'vue'
export default {
    // middleware: 'auth',
    data(){
        return {
            open: false
        }
    },
    methods:{
        toggleSideBar(){
            this.open = !this.open
        },
        logout(){
            try{
                this.$store.dispatch('clients/removeSelectedClient')
                localStorage.removeItem('selectedClient')
                this.$auth.logout()
                .then((data)=>{
                    this.$router.push('/sign_in');
                    this.toggleSideBar()
                })
            }catch(e){
                this.$toast.error('Something went wrong !!!')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.navbar-primary {
    padding-left: 0px !important;
    padding-right: 0px !important;
    @media screen and (max-width: 936px) {
    padding: 4px;
  }
}

.logo {
    width: 24px;
    height: 28px;
}

ul {
    padding-top: 5px;

    li {
        padding-bottom: 0px;
    }
}
.sidebar{
    &-icon{
        display: flex;
        align-items: center;
        cursor: pointer;
    }
    &-menu{
        position: fixed;
        right: 0px;
        transform: translateX(468px);
        top: 0px;
        transition: 0.45s;
        bottom: 0px;
        background-color: #fff;
        padding: 30px 72px;
        width: 468px;
        z-index: 1;
        box-shadow: -8px 0 24px 0 transparent;
        &.reveal{
            transform: translateX(0px);
            box-shadow: -8px 0 24px 0 rgba(0, 0, 0, 0.08);
        }
        .logout{
            width: 324px;
            height: 48px;
            border-radius: 2px;
            background-color: #f5f5f5;
            position: absolute;
            bottom: 20px;
            display: flex;
            cursor: pointer;
            justify-content: center;
            align-items: center;
            a{
                text-decoration: none;
            }
        }
        .cross{
            float: right;
            width: 35px;
            padding: 10px;
            height: 35px;
            cursor: pointer;
            margin-right: -25px;
            margin-top: -20px;
        }
        ul{
            margin-top: 50px;
            padding: 0px;
            li{
                list-style: none;
                font-size: 18px;
                font-weight: 600;
                line-height: 1.33;
                color: #44a1bf;
                margin-bottom: 24px;
                cursor: pointer;
                a{
                    text-decoration: none;
                }
            }
        }
        @media screen and (max-width: 720px) {
            width: 100%;
            padding: 30px 25px;
            transform: translateX(100%);
            ul{
                li{
                    font-size: 14px;
                }
            }
            .logout{
                left: 25px;
                right: 0px;
                width: calc(100% - 50px);
            }
            .cross{
                margin-right: -10px;
            }
        }
    }
}

</style>
