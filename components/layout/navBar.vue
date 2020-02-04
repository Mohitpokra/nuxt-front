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
        </b-navbar-nav>
    </b-navbar>
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
    height: 21px;
}

ul {
    padding-top: 5px;

    li {
        padding-bottom: 0px;
    }
}

</style>
