<template>
<b-container>
    <b-row class="" align-h="center" align-v="center">
        <b-col class="text-center" cols="auto">
            <div class="search-deliver">
                <img src="~/assets/icons/icon-decorative-results.svg" />
                <h3 class="m-heading">Your results will be delivered shortly.</h3>
                <p class="para-info p1 m-bottom">Please be patient, we are searching Mortgage Payments and <br class="d-none d-lg-block">will email you the results when the search is completed.</p>
            </div>
        </b-col>
    </b-row>
    <b-row class="" align-h="center">
        <b-col align-self="center" cols="auto">
            <b-btn class="btn-custom btn-back" variant="secondary" size="lg" @click="backToHome()">Back to home</b-btn>
        </b-col>
    </b-row>
</b-container>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    methods: {
        backToHome(){
            this.$router.push('/')
        }
    }
}
</script>

<style lang="scss" scoped>
.btn-custom {
    width: 156px;

    @media screen and(max-width: 992px) {
        width: 175px;
    }
}

.btn-back {
    border-radius: 2px;
    margin-top: 96px;
    background-color: #f5f5f5;
    color: #1f1f1f;
}
.search-deliver{
    img{
        margin-top: 192px;
        margin-bottom: 24px;
    }
    .para-info{
        margin-top: 24px;
        margin-bottom: 24px;
    }
}
</style>
