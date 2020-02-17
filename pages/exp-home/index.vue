<template>
<div>
<b-container>
    <b-row>
        <b-col cols="12" lg="11" offset-lg="1" class="top-title">
            <h2 class="m-header">What are you looking to do today?</h2>
        </b-col>
        <b-col class="box-container" :class="{'bg-heading': selected_1}" cols="12" lg="auto" offset-lg="1" @click="turnBg(1)">
            <div class="flex">
                <div class="img-container">
                    <img class="icon-option-new-search" src="~/assets/icons/icon-option-new-search.svg" />
                </div>
                <h3 class="m-text" :class="{'text-white': selected_1}">Start a new home search</h3>
                <div class="right-icon-container"><img class="icon-interface-check" src="~/assets/icons/icon-interface-check-white.svg" /></div>
            </div>
            <div class="right-icon-mobile-container"><img class="icon-interface-check" src="~/assets/icons/icon-interface-check-white.svg" /></div>
        </b-col>
        <b-col class="box-container container-middle" :class="{'bg-heading': selected_2}" cols="12" lg="auto" @click="turnBg(2)">
            <div class="flex">
                <div class="img-container">
                    <img class="icon-option-new-search" src="~/assets/icons/icon-option-previous-search.svg" />
                </div>
                <h3 class="m-text" :class="{'text-white': selected_2}">Start a new home search</h3>
                <div class="right-icon-container"><img class="icon-interface-check" src="~/assets/icons/icon-interface-check-white.svg" /></div>
            </div>
            <div class="right-icon-mobile-container"><img class="icon-interface-check" src="~/assets/icons/icon-interface-check-white.svg" /></div>
        </b-col>
        <b-col class="box-container" :class="{'bg-heading': selected_3}" cols="12" lg="auto" @click="turnBg(3)">
            <div class="flex">
                <div class="img-container">
                    <img class="icon-option-new-search" src="~/assets/icons/icon-option-preapproval.svg" />
                </div>
                <h3 class="m-text" :class="{'text-white': selected_3}">Start a new home search</h3>
                <div class="right-icon-container"><img class="icon-interface-check" src="~/assets/icons/icon-interface-check-white.svg" /></div>
            </div>
            <div class="right-icon-mobile-container"><img class="icon-interface-check" src="~/assets/icons/icon-interface-check-white.svg" /></div>
        </b-col>
        <b-col cols="12" lg="1"></b-col>
    </b-row>
     <b-row class="d-none d-lg-flex" align-h="end">
       <b-col cols="12" class="text-right p-0" align-self="end">
                <b-btn class="btn-custom" variant="primary" size="lg">Next</b-btn>
            </b-col>
    </b-row>
</b-container>
 <b-row class="d-flex d-lg-none m-btn" align-h="end">
       <b-col cols="12" class="text-right p-0" align-self="end">
                <b-btn class="btn-custom" variant="primary" size="lg">Next</b-btn>
            </b-col>
    </b-row>
</div>
</template>

<script>
export default {
    // auth: false,
    data() {
        return {
            selected_1: false,
            selected_2: false,
            selected_3: false,
            selected: null
        }
    },
    methods: {
        turnBg(elem) {
            this.selected_1 = false;
            this.selected_2 = false;
            this.selected_3 = false;
            this[`selected_${elem}`] = !this[`selected_${elem}`];
            this.selected = elem;
        }
    }
}
</script>

<style lang="scss" scoped>
.m-header {
    margin-top: 96px;
    margin-bottom: 48px;
}

.container-middle {
    margin-left: 24px;
    margin-right: 24px;

    @media screen and (max-width: 992px) {
        margin: 8px 0px;

    }

}


.btn-custom {
    width: 156px;
    margin-top: 148px;

    @media screen and (max-width: 992px) {
        width: 100%;
        margin-top: 100px;
    }
}

.box-container {
    border-radius: 2px;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08);
    background-color: #ffffff;
    width: 296px;
    height: 392px;

    @media screen and (max-width: 992px) {
        height: 100%;
        width: 100%;
    }
}

.img-container {
    margin-top: 40px;
    margin-bottom: 24px;
    width: 200px;
    height: 184px;
    margin-right: 48px;
    margin-left: 48px;

    @media screen and (max-width: 992px) {
        width: 100px;
        height: 92px;
        object-fit: contain;
        margin: 26px;
    }
}

.m-text {
    margin-right: 48px;
    margin-left: 48px;
    margin-bottom: 24px;

    @media screen and (max-width: 992px) {
        margin-left: 0px;
        margin-top: 48px;
        margin-bottom: 16px;
    }
}

.right-icon-container {
    text-align: right;
    margin-right: 48px;
    margin-bottom: 34px;

    @media screen and (max-width: 992px) {
        display: none;
    }
}

.flex {
    @media screen and (max-width: 992px) {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
}

.icon-option-new-search {
    @media screen and (max-width: 992px) {
        width: 100%;
        height: 100%;
    }
}

.row {
    @media screen and (max-width: 992px) {
        margin: 0px;
    }
}

.right-icon-mobile-container {
    display: none;

    @media screen and (max-width: 992px) {
        display: block;
        margin-bottom: 16px;
    }
}
.m-btn {
    margin-left: 8px !important; 
    margin-right: 8px !important;
}
</style>
