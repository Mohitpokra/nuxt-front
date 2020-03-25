<template>
<b-container >
    <b-row align-h="center" align-v="center">
        <b-col class="text-center" cols="auto">
            <div>
                <img class="img" src="~/assets/icons/icon-decorative-send-email.svg" />
                <h3 class="m-heading">Your password is changed!</h3>
                <a variant="primary" class="continue-btn" href="/sign_in">Sign In</a>
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
    margin-bottom: 300px;
    @media screen and (max-width: 992p) {
           margin-bottom: 200px;
    }
}
.continue-btn {
  width: 360px;
  height: 48px;
  border-radius: 2px;
  background-color: #44a1bf;
  color: #fff !important;
  display: inline-block;
  text-decoration: none;
  padding: 10px;
}
</style>
