<template>
<b-container class="m-container">
    <b-navbar type="primary" variant>
        <b-navbar-brand to="/"><img class="logo" src="~/assets/icons/icon-interface-home.svg" /></b-navbar-brand>
        <b-navbar-nav class="ml-auto" v-if="$route.name === 'sign_in' || $route.name === 'sign_in-forgot_password' || $route.name === 'sign_in-forgot_password-success'">
            <b-nav-text class="p3">Need an account?</b-nav-text>
            <b-nav-item class="p3 text-primary" to="/sign_up"><span class="text-primary">Sign Up</span></b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-else>
            <b-nav-text class="p3">Already have an account?</b-nav-text>
            <b-nav-item class="p3 text-primary" to="/sign_in"><span class="text-primary">Sign In</span></b-nav-item>
            <div class="sidebar-icon">
                <img class="logo" src="~/assets/icons/icon-interface-menu.svg" />
            </div>
        </b-navbar-nav>
    </b-navbar>
    <div class="sidebar-menu">
        <img class="cross" src="~/assets/icons/icon-interface-x.svg" />
        <ul>
            <li>Home</li>
            <li>Start a new home search</li>
            <li>Revisit a previous search</li>
            <li>Request a pre-approval</li>
            <li>My Account</li>
        </ul>
    </div>
</b-container>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.navbar-primary {
    padding-left: 0px !important;
    padding-right: 0px !important;
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
        display: none;
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
        .cross{
            float: right;
            width: 35px;
            padding: 10px;
            height: 35px;
            cursor: pointer;
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
            }
        }
        @media screen and (max-width: 720px) {
            width: 100%;
            padding: 30px 25px;
            padding-right: 0px;
            transform: translateX(100%);
            ul{
                li{
                    font-size: 14px;
                }
            }
            .cross{
                margin-right: 14px;
            }
        }
    }
}

</style>
