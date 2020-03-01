<template>
<b-container>
    <div class="inner-container">
        <b-row align-h="start" class="location">
            <b-col offset-lg="1">
                <b-breadcrumb>
                    <b-breadcrumb-item>Home</b-breadcrumb-item>
                    <b-breadcrumb-item active>Search History</b-breadcrumb-item>
                </b-breadcrumb>
            </b-col>
        </b-row>
        <div v-if="!search_count">
            <b-row align-h="start">
                <b-col cols="12" lg="11" offset-lg="1">
                    <h2>Search history</h2>
                </b-col>
            </b-row>
            <b-row align-h="center" align-v="center">
                <b-col class="text-center" cols="auto">
                    <div>
                        <img class="img" src="~/assets/icons/illustration-empty-search.svg" />
                        <h4 class="">None found.</h4>
                        <p class="p2">Your search history will appear here.</p>
                    </div>
                </b-col>
            </b-row>
        </div>
        <div v-else>
            <b-row>
                <b-col lg="10" offset-lg="1">
                    <b-row align-h="between">
                        <b-col lg="2">
                            <p class="p3">12/23/2019</p>
                        </b-col>
                        <b-col lg="2">
                            <p class="p3 text-heading">Stephen Shaw</p>
                        </b-col>
                        <b-col lg="4">
                            <p class="p3">Single Family • Average+ • 3+ Bed • 2+ Bath
                                Long Branch, NJ</p>
                        </b-col>
                        <b-col lg="3">
                            <b-badge pill variant="success" class="p3">Pre-approval Requested</b-badge>
                        </b-col>
                        <b-col cols="12">
                            <hr>
                        </b-col>
                    </b-row>
                    <b-row align-h="between">
                        <b-col lg="2">
                            <p class="p3">12/23/2019</p>
                        </b-col>
                        <b-col lg="2">
                            <p class="p3 text-heading">Stephen Shaw</p>
                        </b-col>
                        <b-col lg="4">
                            <p class="p3">Single Family • Average+ • 3+ Bed • 2+ Bath
                                Long Branch, NJ</p>
                        </b-col>
                        <b-col lg="3">
                            <b-badge pill variant="success" class="p3">Pre-approval Requested</b-badge>
                        </b-col>
                        <b-col cols="12">
                            <hr>
                        </b-col>
                    </b-row>

                </b-col>
            </b-row>
            <b-row align-h="center">
                <b-col cols="auto" lg="auto">
                    <div>
                        <b-pagination v-model="currentPage" pills :total-rows="rows" size="sm"></b-pagination>
                    </div>
                </b-col>
            </b-row>
        </div>
    </div>
</b-container>
</template>

<script>
export default {
    data() {
        return {
            search_count: 0,
            rows: 100,
            currentPage: 1
        }
    }

}
</script>

<style lang="scss" scoped>

</style>
