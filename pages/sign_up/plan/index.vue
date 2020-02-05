<template>
<b-container class="">
    <b-row>
        <b-col lg="10" offset-lg="1" cols="12">
            <h2 class="m-plan-text">Choose the plan for you</h2>
        </b-col>
    </b-row>
    <b-row class="m-bottom">
        <b-col class="box-shadow-low p-box m-box-right" cols="12" lg="5" offset-lg="1">
            <h3>Free</h3>
            <p class="p-box-subheading p2">Limited to 5 searches per month</p>
            <div class="p-box-money d-flex align-items-center">
                <h2 class="text-primary">
                    $0
                </h2>
                <h2 class="month">/ month</h2>
            </div>
            <div>
                <b-button block variant="primary" size="lg">Choose Free Plan</b-button>
            </div>
        </b-col>
        <b-col class="box-shadow-low p-box m-box-left" cols="12" lg="5">
            <h3>Pro</h3>
            <p class="p-box-subheading p2">Unlimited searches</p>
            <div class="p-box-money d-flex align-items-center">
                <h2 class="text-primary">
                    $15
                </h2>
                <h2 class="month">/ month</h2>
            </div>
            <div>
                <b-button block variant="primary" size="lg">Choose Pro Plan</b-button>
            </div>
        </b-col>
    </b-row>
</b-container>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.m-plan-text {
    margin-top: 90px;
    margin-bottom: 48px;

    @media screen and (max-width: 992px) {
        margin-top: 77px;
        margin-bottom: 48px;
    }
}

.p-box {
    padding: 48px;

    @media screen and (max-width: 992px) {
        padding: 24px
    }

}

.p-box-subheading {
    margin-bottom: 48px;

    @media screen and (max-width: 992px) {
        margin-bottom: 24px
    }
}

.p-box-money {
    margin-bottom: 72px;

    @media screen and (max-width: 992px) {
        margin-bottom: 24px
    }
}

.m-box-right {
    margin-right: 12px;

    @media screen and (max-width: 992px) {
        margin-right: 0px;
        margin-bottom: 8px;
    }
}

.m-box-left {
    margin-left: 12px;

    @media screen and (max-width: 992px) {
        margin-left: 0px;
    }
}

.m-bottom {
    margin-bottom: 227px;

    @media screen and (max-width: 992px) {
        margin-bottom: 88px
    }
}

.row {
    @media screen and (max-width: 992px) {
        margin-right: -0px;
        margin-left: -0px;
    }
}

.month {
    font-family: CerebriSans;
    font-size: 20px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.4;
    letter-spacing: normal;
    color: #44a1bf;
    margin-left: 8px;
}
</style>
