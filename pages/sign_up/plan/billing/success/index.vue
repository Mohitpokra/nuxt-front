<template>
<b-container class="">
    <b-row class="" align-h="center" align-v="center">
        <b-col class="text-center" cols="auto">
            <div>
                <img src="~/assets/icons/icon-decorative-setup-complete.svg" />
                <h3 class="m-heading">Account setup complete!</h3>
                <p class="p1 m-bottom">We’ve sent a link to verfiy the account, just click on the link <br class="d-none d-lg-block"> in the email to get started.</p>
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
    height: 128px
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
