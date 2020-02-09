<template>
  <b-container>
      <b-row>
          <b-col cols="12"  lg="11" offset-lg="1" class="top-title" >
            <h2>What are you looking to do today?</h2>
         </b-col>
          <b-col class="col-container top-container" cols="12" lg="auto" offset-lg="1">
              <div class="img-container">
                  <img class="icon-option-new-search" src="~/assets/icons/icon-option-new-search.svg" />
              </div>
              <h3 class="m-text">Start a new home search</h3>
              <div class="img-tick-mark" cols="12" lg="auto" offset-lg="1">
                  <img class="check" src="~/assets/icons/icon-interface-check.svg" />
              </div>
          </b-col>
          <b-col class="col-container" cols="12" lg="auto" >
              <div class="img-container">
                  <img class="icon-option-new-search" src="~/assets/icons/icon-option-previous-search.svg" />
              </div>
              <h3 class="m-text">Start a new home search</h3>
              <div class="img-tick-mark">
                  <img class="check" src="~/assets/icons/icon-interface-check.svg" />
              </div>
          </b-col>
              <b-col class="col-container" cols="12" lg="auto" >
              <div class="img-container">
                  <img class="icon-option-new-search" src="~/assets/icons/icon-option-preapproval.svg" />
              </div>
              <h3 class="m-text">Start a new home search</h3>
              <div class="img-tick-mark">
                  <img class="check" src="~/assets/icons/icon-interface-check.svg" />
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
  transition: box-shadow .3s;
  margin-top: 42px;
 
  @media screen and (max-width: 992px) {
        margin-top: 8px;
    }
  margin-right: 24px;
  width: 296px;
  height: 392px;
  border-radius: 2px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
}

.col-container:hover{
  cursor: pointer; 
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.12);
  background-color: #ffffff;
}

.top-container{
  @media screen and (max-width: 992px) {
        margin-top: 48px;
    }
}
.m-text {
  margin-top: 24px;
  margin-left: 48px;
  margin-right: 48px;
}

.top-title{
  margin-top: 92px;
  @media screen and (max-width: 992px) {
        margin-top: 42px;
    }
}

.check{
  width: 16px;
  height: 11px;
  object-fit: contain;
}

.img-tick-mark{
    width: 32px;
    height: 32px;
    margin-top: 35px;
    margin-left: 216px;
    @media screen and (max-width: 992px) {
        margin-top: 16px;
        margin-left: 287px;
    }
}

</style>