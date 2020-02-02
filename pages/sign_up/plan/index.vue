<template>
<b-container class="mb-5">
    <b-row> 
        <b-col lg="10" offset-lg="1" cols="12"><h2 class="mt-5 pt-2 pl-2">Choose the plan for you</h2></b-col>
    </b-row>
    <b-row class="mt-5 mx-2 mx-lg-0">
        <b-col class="box-shadow-low p-5 mr-lg-2" cols="12" lg="5" offset-lg="1">
            <h3>Free</h3>
            <p class="p2">Limited to 5 searches per month</p>
            <h2 class="text-primary my-5">
                $0
                <span class="p5">/ month</span>
            </h2>
            <div>
                <b-button block variant="primary">Choose Free Plan</b-button>
            </div>
        </b-col>
        <b-col class="box-shadow-low p-5 ml-lg-2 mt-2 mt-lg-0" cols="12" lg="5">
            <h3>Pro</h3>
            <p class="p2">Unlimited searches</p>
            <h2 class="text-primary my-5">
                $15
                <span class="p5">/ month</span>
            </h2>
            <div>
                <b-button block variant="primary">Choose Pro Plan</b-button>
            </div>
        </b-col>
    </b-row>
</b-container>
</template>

<script>
export default {};
</script>

<style>
</style>
