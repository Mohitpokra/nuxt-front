<template>
  <b-container>
      <h1>What are you looking to do today?</h1>
      <b-row  align-h="center">
          <b-col class="col-container" cols="12" lg="auto" offset-lg="1">
              <div class="img-container">
                  <img class="icon-option-new-search" src="~/assets/icons/icon-option-new-search.svg" />
              </div>
              <h3 class="m-text">Start a new home search</h3>
          </b-col>
          <b-col class="col-container" cols="12" lg="auto" >
              <div class="img-container">
                  <img class="icon-option-new-search" src="~/assets/icons/icon-option-new-search.svg" />
              </div>
              <h3 class="m-text">Start a new home search</h3>
          </b-col>
              <b-col class="col-container" cols="12" lg="auto" >
              <div class="img-container">
                  <img class="icon-option-new-search" src="~/assets/icons/icon-option-new-search.svg" />
              </div>
              <h3 class="m-text">Start a new home search</h3>
          </b-col>
      </b-row>
  </b-container>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.icon-option-new-search {
  width: 200px;
  height: 184px;
  object-fit: contain;
}

.img-container {
  text-align: center;
  margin-top: 40px;
  margin-left: 48px;
  margin-right: 48px;
  margin-bottom: 24px;
}

.col-container {
  width: 296px;
  height: 392px;
  border-radius: 2px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
}

.m-text {
  margin-bottom: 80px;
   margin-left: 48px;
  margin-right: 48px;
}
</style>