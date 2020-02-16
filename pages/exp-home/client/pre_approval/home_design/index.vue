<template>
<b-container>
    <b-row align-h="start">
        <b-col offset-lg="1">
            <b-link>Home</b-link>
            <b-link>/Client</b-link>
            <b-link>/Pre-approval</b-link>
            <b-link>/Home Design</b-link>
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
            <b-form-checkbox :state="false" size="lg">Single Family</b-form-checkbox>
            <b-form-checkbox :state="false" size="lg">Duplex</b-form-checkbox>
            <b-form-checkbox :state="false" size="lg">Triplex</b-form-checkbox>
            <b-form-checkbox :state="false" size="lg">Quadplex</b-form-checkbox>
            <b-form-checkbox :state="false" size="lg">Commercial</b-form-checkbox>
            <b-form-invalid-feedback :state="false">Please select One</b-form-invalid-feedback>
        </b-col>
        <b-col class="h-100" cols="12" lg="5">
            <h3 class="text-primary">Property Condition</h3>
            <b-form-checkbox :state="false" size="lg">Any</b-form-checkbox>
            <b-form-checkbox :state="false" size="lg">Average+ only</b-form-checkbox>
            <b-form-checkbox :state="false" size="lg">Personal Customs Desired</b-form-checkbox>
        </b-col>
    </b-row>
    <b-row>
        <b-col cols="12" lg="5" offset-lg="1">
            <h3>Home Design</h3>
        </b-col>
    </b-row>
    <b-row align-h="between">
        <b-col cols="12" lg="3" offset-lg="1">
            <div>
                <b-form-select v-model="selected" :options="options"></b-form-select>
            </div>
        </b-col>
        <b-col cols="12" lg="3"></b-col>
        <b-col cols="12" lg="3"></b-col>
    </b-row>
</b-container>
</template>

<script>
export default {
    data() {
        return {
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
                    text: 'This is an option with object value'
                },
                {
                    value: 'd',
                    text: 'This one is disabled',
                    disabled: true
                }
            ]
        }
    }
}

</script>

<style>

</style>
