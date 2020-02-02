<template>
<div id="main-wrapper">
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
</style>
