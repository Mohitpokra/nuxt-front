<template>
  <b-container>
    <div class="inner-container">
      <b-row align-h="start" class="location">
        <b-col>
          <b-breadcrumb :items="items"></b-breadcrumb>
        </b-col>
      </b-row>
      <div>
        <b-row
          align-h="start"
          v-if="getSearchFetched && getSearchHistory.length == 0"
        >
          <b-col cols="12" lg="12">
            <h2 class="top-title">Search history</h2>
          </b-col>
        </b-row>
        <b-row
          align-h="center"
          align-v="center"
          v-if="getSearchFetched && getSearchHistory.length == 0"
        >
          <b-col class="text-center" cols="auto">
            <div class="no-found">
              <img
                class="img"
                src="~/assets/icons/illustration-empty-search.svg"
              />
              <h4>None found.</h4>
              <p class="p2">Your search history will appear here.</p>
            </div>
          </b-col>
        </b-row>
      </div>
      <div v-if="getSearchFetched && getSearchHistory.length">
        <b-row align-h="start">
          <b-col cols="12" lg="12">
            <h2 class="top-title">Search history</h2>
          </b-col>
        </b-row>
        <b-row
          class="search-table"
          v-for="history in getSearchHistory"
          :key="history.id"
        >
          <b-col lg="12">
            <b-row align-h="between">
              <b-col lg="2">
                <p class="p3">
                  {{
                    $dateFns.format(new Date(history.created_at), "MM/dd/yyyy")
                  }}
                </p>
              </b-col>
              <b-col lg="2">
                <p class="p3 text-heading">
                  {{
                    history.client.first_name + " " + history.client.last_name
                  }}
                </p>
              </b-col>
              <b-col lg="4">
                <p class="p3">
                  Single Family • Average+ • 3+ Bed • 2+ Bath Long Branch, NJ
                </p>
              </b-col>
              <b-col lg="3">
                <b-badge pill variant="success" class="p3"
                  >Pre-approval Requested</b-badge
                >
              </b-col>
              <b-col cols="12">
                <hr class="hr-divider" />
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row align-h="center">
          <b-col cols="auto" lg="auto">
            <div class="sh-page">
              <b-pagination
                v-model="currentPage"
                pills
                :total-rows="getSearchHistory.length"
                size="sm"
              ></b-pagination>
            </div>
          </b-col>
        </b-row>
      </div>
    </div>
  </b-container>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      search_count: 0,
      rows: 100,
      currentPage: 1,
      items: [
        {
          text: "Home",
          href: "/"
        },
        {
          text: "Search History",
          href: "#"
        }
      ]
    };
  },
  computed: {
    ...mapGetters("searchHome", ["getSearchHistory", "getSearchFetched"])
  },
  mounted() {
    this.$store.dispatch("searchHome/fetchSearchHistory");
  }
};
</script>

<style lang="scss" scoped>
.top-title {
  margin-top: 48px;
  font-size: 42px;
  margin-bottom: 0px;
  @media screen and(max-width: 992px) {
    font-size: 26px;
    margin-top: 24px;
  }
}
.no-found {
  margin-top: 24px;
  margin-bottom: 168px;
  img {
    max-width: 100%;
  }
  h4 {
    margin-top: 24px;
    margin-bottom: 0px;
  }
  @media screen and(max-width: 992px) {
    margin-top: 48px;
  }
}
.search-table {
  margin-top: 48px;
  .badge {
    margin-bottom: 1rem;
  }
}
.badge-success {
  background-color: #f1faf5;
  font-size: 12px;
  padding: 0px 10px;
}
.hr-divider {
  margin-top: 0px;
}
.text-heading {
  text-transform: capitalize;
}
</style>
