<template>
<b-container >
    <b-row align-h="center" align-v="center">
        <b-col class="text-center" cols="auto">
            <div>
                <img class="img" src="~/assets/icons/icon-decorative-send-email.svg" />
                <h3 class="m-heading">Check your inbox.</h3>
                <p class="p1 m-bottom">We’ve sent a link with the instructions to reset your <br class="d-none d-lg-block"> password.</p>
            </div>
        </b-col>
    </b-row>
</b-container>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

img {
    margin-top: 185px;
    width: 128px;
    height: 128px;
}

.m-heading {
    margin-top: 24px;
    margin-bottom: 24px;
}

.m-bottom {
    margin-bottom: 338px;

    @media screen and (max-width: 992p) {
           margin-bottom: 280px;
    }
}
</style>
