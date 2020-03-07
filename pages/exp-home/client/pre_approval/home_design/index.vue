<template>
<b-container>
    <div class="inner-container">
        <b-row align-h="start">
            <b-col>
                <b-breadcrumb :items="items"></b-breadcrumb>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12" lg="12">
                <h2 class="top-title">Home Design</h2>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12" lg="6" class="filter">
                <h3 class="text-primary filter-title">Property Type<span class="p3"> (Select at least one)</span></h3>
                <b-form-checkbox :state="null" size="lg">Single Family</b-form-checkbox>
                <b-form-checkbox :state="null" size="lg">Duplex</b-form-checkbox>
                <b-form-checkbox :state="null" size="lg">Triplex</b-form-checkbox>
                <b-form-checkbox :state="null" size="lg">Quadplex</b-form-checkbox>
                <b-form-checkbox :state="null" size="lg">Commercial</b-form-checkbox>
                <b-form-invalid-feedback :state="null">Please select One</b-form-invalid-feedback>
            </b-col>
            <b-col class="filter" cols="12" lg="6" >
                <h3 class="text-primary filter-title">Property Condition</h3>
                <b-form-checkbox :state="null" size="lg">Any</b-form-checkbox>
                <b-form-checkbox :state="null" size="lg">Average+ only</b-form-checkbox>
                <b-form-checkbox :state="null" size="lg">Personal Customs Desired</b-form-checkbox>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12" lg="12">
                <h3 class="text-primary filter">Home Design</h3>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12" lg="10">
                <b-row>
                    <b-col cols="12" lg="4">
                        <b-form-select v-model="selected" :options="options" size="lg" class="mt-3"></b-form-select>
                    </b-col>
                    <b-col cols="12" lg="4">
                        <b-form-select v-model="selected" :options="options" size="lg" class="mt-3"></b-form-select>
                    </b-col>
                    <b-col cols="12" lg="4">
                        <b-form-select v-model="selected" :options="options" size="lg" class="mt-3"></b-form-select>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <b-row class="filter">
            <b-col cols="12" lg="12">
                <h3 class="text-primary filter-title">Must Haves<span class="p3"> (Select all that apply)</span></h3>
            </b-col>
            <b-col cols="12" lg="12">
                <b-row>
                    <b-col cols="12" lg="6">
                        <b-form-checkbox :state="null" size="lg">Off Street Parking</b-form-checkbox>
                        <b-form-checkbox :state="null" size="lg">Garage</b-form-checkbox>
                        <b-form-checkbox :state="null" size="lg">Roof Deck</b-form-checkbox>
                        <b-form-checkbox :state="null" size="lg">In-ground Pool</b-form-checkbox>
                        <b-form-checkbox :state="null" size="lg">New Construction</b-form-checkbox>
                        <b-form-invalid-feedback :state="null">Please select One</b-form-invalid-feedback>
                    </b-col>
                    <b-col class="h-100" cols="12" lg="6">
                        <b-form-checkbox :state="null" size="lg">Other</b-form-checkbox>
                        <div class="extra-text">
                            <b-form-textarea id="textarea-state" v-model="text" :state="null" placeholder="Please Specify" rows="3"></b-form-textarea>
                        </div>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12" lg="12">
                <hr class="divider">
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12" lg="12">
                <h2>Location</h2>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12" lg="12">
                <p class="p3 filter">Search Area</p>
                <b-input :class="{form_fill: search}" v-model.trim="search" :state="error_state.search" size="lg" id="search" placeholder="Subdivision, City, Zip, County, State..."></b-input>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12">
                <div class="text-center">
                    <p class="p3 text-primary filter">Add Point of Interest</p>
                </div>
            </b-col>
            <b-col cols="12" lg="10">
            </b-col>
        </b-row>
    </div>
    <div class="flex justify-between steps-btn">
        <b-button class="mt-3 back" variant="secondary" size="lg" @click="goBack()">Back</b-button>
        <b-button class="mt-3 next" variant="primary" size="lg" @click="moveToNext()">Next</b-button>
    </div>
</b-container>
</template>

<script>
export default {
    data() {
        return {
            text: '',
            selected: null,
            options: [{
                    value: null,
                    text: 'Please select an option'
                },
                {
                    value: 'a',
                    text: 'This is First option'
                },
                {
                    value: 'b',
                    text: 'Selected Option'
                },
                {
                    value: {
                        C: '3PO'
                    },
                    text: 'This is an option'
                }
            ],
            search: null,
            error_state: {
                search: null
            },
            items: [
                {
                    text: 'Home',
                    href: '/'
                },
                {
                    text: 'Client',
                    href: '/exp-home/client/'
                },
                {
                    text: 'Pre-approval',
                    href: '/exp-home/client/pre_approval/'
                },
                {
                    text: 'Home Design',
                    href: '#'
                },
            ]
        }
    },
    methods:{
        moveToNext(){
            this.$router.push('/exp-home/client/pre_approval/home_design/search_result')
        },
        goBack(){
            this.$router.back()
        }
    }
}
</script>

<style lang="scss">

.btn-custom {
    width: 156px;

    @media screen and(max-width: 992px) {
        width: 175px;
    }
}

.btn-back {
    border-radius: 2px;
    background-color: #f5f5f5;
    color: #1f1f1f;
}

.top-title{
    margin-top: 48px;
    font-size: 42px;
    @media screen and(max-width: 992px) {
        font-size: 26px;
        margin-top: 24px;
    }
}
.filter{
    margin-top: 48px;
    &-title{
        margin-bottom: 20px;
        span{
            margin-left: 8px;
        }
    }
    .extra-text{
        margin-top: 24px;
        textarea{
            background-color: #f5f5f5;
            border-radius: 2px;
            border: none;
            resize: none;
            padding: 12px;
            min-height: 145px;
        }
    }
}
.divider{
    margin: 48px 0px;
}
.steps-btn{
    margin-top: 188px;
    margin-bottom: 30px;
    button{
        min-width: 156px;
        border: none;
        &:hover{
            border: none;
        }
    }
    .back{
        background-color: #f5f5f5;
        color: black;
    }
    @media screen and (max-width: 992px) {
        margin-left: -15px;
        margin-right: -15px;
        margin-top: 184px;
        button{
            min-width: 167px;
        }
     }
}

</style>
