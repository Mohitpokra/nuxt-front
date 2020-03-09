<template>
<div>
<b-container>
    <div>
        <b-row>
            <div class="top-title">
                <h2 class="m-header">What are you looking to do today?</h2>
            </div>
            <div class="looking-for">
                <div class="looking-for-box">
                    <div class="box-container" :class="{'bg-heading': selected_1}" @click="turnBg(1)">
                        <div class="flex looking-box">
                            <div class="img-container">
                                <img class="icon-option-new-search" src="~/assets/icons/icon-option-new-search.svg" />
                            </div>
                            <h3 class="m-text" :class="{'text-white': selected_1}">Start a new home search</h3>
                            <div class="right-icon-container"><img class="icon-interface-check" src="~/assets/icons/icon-interface-check-white.svg" /></div>
                        </div>
                    </div>
                </div>
                <div class="looking-for-box">
                    <div class="box-container" :class="{'bg-heading': selected_2}" @click="turnBg(2)">
                        <div class="flex looking-box">
                            <div class="img-container">
                                <img class="icon-option-new-search" src="~/assets/icons/icon-option-previous-search.svg" />
                            </div>
                            <h3 class="m-text" :class="{'text-white': selected_2}">Start a new home search</h3>
                            <div class="right-icon-container"><img class="icon-interface-check" src="~/assets/icons/icon-interface-check-white.svg" /></div>
                        </div>
                    </div>
                </div>
                <!-- <div class="looking-for-box">
                    <div class="box-container" :class="{'bg-heading': selected_3}" @click="turnBg(3)">
                        <div class="flex looking-box">
                            <div class="img-container">
                                <img class="icon-option-new-search" src="~/assets/icons/icon-option-preapproval.svg" />
                            </div>
                            <h3 class="m-text" :class="{'text-white': selected_3}">Start a new home search</h3>
                            <div class="right-icon-container"><img class="icon-interface-check" src="~/assets/icons/icon-interface-check-white.svg" /></div>
                        </div>
                    </div>
                </div> -->
            </div>
        </b-row>
        <b-row class="d-none d-lg-flex" align-h="end">
        <b-col cols="12" class="text-right" align-self="end">
            <b-btn class="btn-custom" variant="primary" size="lg" @click="moveToNext">Get Started</b-btn>
        </b-col>
        </b-row>
    </div>
</b-container>
 <b-row class="d-flex d-lg-none m-btn" align-h="end">
       <b-col cols="12" class="text-right p-0" align-self="end">
                <b-btn class="btn-custom" variant="primary" size="lg" @click="moveToNext">Next</b-btn>
            </b-col>
    </b-row>
</div>
</template>

<script>
export default {
    middleware: 'auth',
    data() {
        return {
            selected_1: false,
            selected_2: false,
            selected_3: false,
            selected: null
        }
    },
    methods: {
        moveToNext(){
            this.$router.push('/exp-home/client')
        },
        turnBg(elem) {
            this.selected_1 = false;
            this.selected_2 = false;
            this.selected_3 = false;
            this[`selected_${elem}`] = !this[`selected_${elem}`];
            this.selected = elem;
        }
    },
    mounted(){
    }

}
</script>

<style lang="scss" scoped>
.m-header {
    margin-top: 96px;
    margin-bottom: 48px;
    @media screen and (max-width: 936px) {
        margin-top: 48px;
    }
}
.looking-box{
    flex-direction: column;
}

.container-middle {
    margin-left: 24px;
    margin-right: 24px;

    @media screen and (max-width: 992px) {
        margin: 8px 0px;

    }

}
.top-title{
    width: 940px;
    margin: auto;
}
.looking-for{
    display: flex;
    width: 940px;
    max-width: 940px;
    margin: auto;
    justify-content: center;
    &-box{
        margin-left: 12px;
        margin-right: 12px;
    }
    @media screen and (max-width: 992px) {
        flex-direction: column;
        &-box{
            margin-left: 12px;
            margin-right: 12px;
            margin-bottom: 10px;
        }
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
    width: 296px;
    position: relative;
    height: 392px;
    transition: 0.45s;
    @media screen and (max-width: 992px) {
        height: 100%;
        width: 100%;
    }
    &:hover{
        box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.12);
    }
    &.bg-heading{
        .right-icon-container {
            transform: scale(1);
        }
    }
}

.img-container {
    margin-top: 40px;
    margin-bottom: 24px;
    width: 100%;
    text-align: center;
    height: 192px;
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
           margin-right: 24px;
    }
}

.right-icon-container {
    position: absolute;
    bottom: 18px;
    right: 34px;
    transition: 0.45s;
    transform: scale(0);
    transition-delay: 0.25s;
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
.m-btn {
    margin-left: 8px !important; 
    margin-right: 8px !important;
}
</style>
