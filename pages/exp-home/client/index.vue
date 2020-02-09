<template>
<b-container>
    <div>
        <b-row align-h="start">
            <b-col offset-lg="1">
                <b-link>Home</b-link>
                <b-link>/Client</b-link>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="8" lg="6" offset-lg="1">
                <h2>Select or add a new client</h2>
            </b-col>
            <b-col class="text-right" cols="4" lg="4">
                <b-btn variant="primary" size="sm" @click="$bvModal.show('bv-modal-example')">New Client</b-btn>
            </b-col>
        </b-row>
        <b-row v-if="show" align-h="center">
            <b-col class="text-center">
                <div>
                    <img class="img-container" src="~/assets/images/illustration-empty-clients.svg" />
                </div>
                <h4>None found.</h4>
                <p class="p2">Click “New Client” button to create one.</p>
            </b-col>
        </b-row>
        <b-row v-else>
            <b-col cols="10" offset-lg="1">
                <div class="box-shadow-container">
                    <h4 class="container-text">Stephen Shaw</h4>
                </div>
            </b-col>
            <b-col cols="10" offset-lg="1">
                <div class="box-shadow-container">
                    <h4 class="container-text">Stephen Shaw</h4>
                </div>
            </b-col>
            <b-col cols="10" offset-lg="1">
                <div class="box-shadow-container">
                    <h4 class="container-text">Stephen Shaw</h4>
                </div>
            </b-col>
            <b-col cols="10" offset-lg="1">
                <div class="box-shadow-container">
                    <h4 class="container-text">Stephen Shaw</h4>
                </div>
            </b-col>
        </b-row>
        <b-row align-h="end">
            <b-col cols="6" align-self="start">
                <b-btn class="btn-custom btn-back" variant="secondary" size="lg">Back</b-btn>
            </b-col>
            <b-col cols="6" class="text-right" align-self="end">
                <b-btn class="btn-custom" variant="primary" size="lg">Next</b-btn>
            </b-col>
        </b-row>
    </div>

    <div>
        <b-modal id="bv-modal-example" centered hide-footer hide-header>
            <div class="header">
                <h3 class="text-primary">New Client</h3>
            </div>
            <div>
                <p class="p2">It can be whatever you fits your needs — full name, first name, etc but enter a name you’ll recognize since you’ll need to find it in the search history.</p>
            </div>
            <b-form>
                <label class="" for="login-name">Client Name</label>
                <b-input :class="{form_fill: user.name}" v-model.trim="user.name" :state="error_state.name" size="lg" id="login-name" placeholder="Charlie Exampleton"></b-input>
                <b-form-invalid-feedback :state="error_state.name">
                    {{error.name}}
                </b-form-invalid-feedback>
            </b-form>
            <b-button class="mt-3" block variant="primary" :disabled="isDisable" size="lg">Create</b-button>
            <b-button class="mt-3" block variant="secondary btn-custom_1" @click="$bvModal.hide('bv-modal-example')" size="lg">Cancel</b-button>
        </b-modal>
    </div>
</b-container>
</template>

<script>
export default {
    data() {
        return {
            show: 0,
            user: {
                name: null
            },
            error: {
                name: '',
            },
            error_state: {
                name: null,
            }
        }
    },
    computed: {
        isDisable() {
            if (this.user.name) {
                return false;
            } else {
                return true;
            }
        }
    },
    methods: {
        hide() {
            this.show = 0;
        }
    }

}
</script>

<style lang="scss" scoped>
.btn-sm {
    width: 104px;
}

.modal-backdrop {
   background-color: red !important;
}

.btn-back {
    border-radius: 2px;
    background-color: #f5f5f5;
    color: #1f1f1f;
}

.box-shadow-container {
    border-radius: 2px;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08);
    background-color: #ffffff;
    padding-top: 24px;
    padding-bottom: 24px;
    padding-left: 48px;

    @media screen and (max-width: 992px) {
        padding-top: 12px;
        padding-bottom: 25px;
        padding-left: 24px;

    }

}

.btn-custom {
    width: 156px;

    @media screen and(max-width: 992px) {
        width: 175px;
    }
}

.img-container {
    max-width: 640px;
    max-height: 420px;
    object-fit: contain;

    @media screen and (max-width: 992px) {
        width: 327px;
        height: 216px;
        object-fit: contain;
    }
}

.btn-custom_1 {
    color: #1f1f1f;
}
</style>
