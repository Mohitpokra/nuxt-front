<template>
<b-container>
    <div class="inner-container">
        <b-row align-h="start">
            <b-col offset-lg="1">
                <b-breadcrumb :items="items"></b-breadcrumb>
            </b-col>
        </b-row>
        <b-row>
            <b-col offset-lg="1">
                <h2>Home Design</h2>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12" lg="5" offset-lg="1">
                <h3 class="text-primary">Property Type<span class="p3"> (Select at least one)</span></h3>
                <b-form-checkbox :state="null" size="lg">Single Family</b-form-checkbox>
                <b-form-checkbox :state="null" size="lg">Duplex</b-form-checkbox>
                <b-form-checkbox :state="null" size="lg">Triplex</b-form-checkbox>
                <b-form-checkbox :state="null" size="lg">Quadplex</b-form-checkbox>
                <b-form-checkbox :state="null" size="lg">Commercial</b-form-checkbox>
                <b-form-invalid-feedback :state="null">Please select One</b-form-invalid-feedback>
            </b-col>
            <b-col class="h-100" cols="12" lg="5">
                <h3 class="text-primary">Property Condition</h3>
                <b-form-checkbox :state="null" size="lg">Any</b-form-checkbox>
                <b-form-checkbox :state="null" size="lg">Average+ only</b-form-checkbox>
                <b-form-checkbox :state="null" size="lg">Personal Customs Desired</b-form-checkbox>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12" lg="5" offset-lg="1">
                <h3>Home Design</h3>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12" lg="10" offset-lg="1">
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
        <b-row>
            <b-col cols="12" lg="5" offset-lg="1">
                <h3 class="text-primary">Must Haves<span class="p3"> (Select all that apply)</span></h3>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12" lg="5" offset-lg="1">
                <b-form-checkbox :state="null" size="lg">Off Street Parking</b-form-checkbox>
                <b-form-checkbox :state="null" size="lg">Garage</b-form-checkbox>
                <b-form-checkbox :state="null" size="lg">Roof Deck</b-form-checkbox>
                <b-form-checkbox :state="null" size="lg">In-ground Pool</b-form-checkbox>
                <b-form-checkbox :state="null" size="lg">New Construction</b-form-checkbox>
                <b-form-invalid-feedback :state="null">Please select One</b-form-invalid-feedback>
            </b-col>
            <b-col class="h-100" cols="12" lg="5">
                <b-form-checkbox :state="null" size="lg">Other</b-form-checkbox>
                <div>
                    <b-form-textarea id="textarea-state" v-model="text" :state="null" placeholder="Enter at least 10 characters" rows="3"></b-form-textarea>
                </div>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12" offset-lg="1" lg="10">
                <hr>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12" lg="10" offset-lg="1">
                <h2>Location</h2>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12" lg="10" offset-lg="1">
                <p class="p3">Search Area</p>
                <b-input :class="{form_fill: search}" v-model.trim="search" :state="error_state.search" size="lg" id="search" placeholder="Subdivision, City, Zip, County, State..."></b-input>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12">
                <div class="text-center">
                    <p class="p3 text-primary">Add Point of Interest</p>
                </div>
            </b-col>
            <b-col cols="12" lg="10" offset-lg="1">
            </b-col>
        </b-row>
    </div>
    <b-row align-h="end" class="buttons">
        <b-col cols="6" align-self="start">
            <b-btn class="btn-custom btn-back" variant="secondary" size="lg" @click="goBack()">Back</b-btn>
        </b-col>
        <b-col cols="6" class="text-right" align-self="end">
            <b-btn class="btn-custom" variant="primary" size="lg" @click="moveToNext()">Next</b-btn>
        </b-col>
    </b-row>
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


</style>
