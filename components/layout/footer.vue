<template>
<div class="footer" v-if="(!$auth.loggedIn)">
    <b-container :class="(!$auth.loggedIn)? 'm-container before-login': 'm-container'">
        <b-row align-v="center">
            <b-col cols="12" md="4">
                <p class="mobile-center mb-0 p4">© 2019 Search By Mortgage Payment</p>
            </b-col>
            <b-col cols="12" md="4" class="social-link">
                <div class="d-flex justify-content-center">
                    <b-link href="#" class="img_container"><img class="fb" src="~/assets/icons/icon-social-facebook.svg" /></b-link>
                    <b-link href="#" class="img_container_1"><img class="insta" src="~/assets/icons/icon-social-instagram.svg" /></b-link>
                    <b-link href="#" class="img_container_2"><img class="linkedin" src="~/assets/icons/icon-social-linkedin.svg" /></b-link>
                    <b-link href="#" class="img_container_3"><img class="twitter" src="~/assets/icons/icon-social-twitter.svg" /></b-link>
                </div>
            </b-col>
            <b-col cols="12" md="4">
                <div class="d-flex justify-content-end mobile-flex-center">
                    <p class="p4 mb-0">Privacy Policy <span class="m-left-text p4 mb-0">Terms of Service</span></p>
                </div>
            </b-col>
        </b-row>
    </b-container>
</div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.fb {
    width: 8px;
    height: 17px;
}

.insta {
    width: 18px;
    height: 18px;
}

.linkedin {
    width: 17px;
    height: 17px;
}

.twitter {
    width: 19px;
    height: 15px;
}

.img_container {
    width: 32px;
    height: 32px;
    text-align: center;
}

@for $i from 1 through 3 {
    .img_container_#{$i} {
        width: 32px;
        height: 32px;
        text-align: center;
        margin-left: 8px;
    }
}

.m-left-text {
    margin-left: 24px;
}
@media screen and (max-width: 720px) {
    .social-link{
        margin-top: 10px;
    }
}
</style>
