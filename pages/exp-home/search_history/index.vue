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
          <b-col lg="12" class="wrapper">
            <b-row align-h="between" class="search-rows">
              <b-col lg="2">
                <p class="p3" align-h="center" align-v="center">
                  {{
                    $dateFns.format(new Date(history.created_at), "MM/dd/yyyy")
                  }}
                </p>
              </b-col>
              <b-col lg="2" align-h="center" align-v="center">
                <b class=" text-heading">
                  {{
                    history && history.client && (history.client.first_name + " " + history.client.last_name)
                  }}
                </b>
              </b-col>
              <b-col lg="4" align-h="center" align-v="center">
                <div class="area-tag">
                    <span
                        class="p3 align-fields"
                        v-for="field in getData(history.home_design)"
                        :key="field"
                        >
                        {{ field }}
                        </span>
                </div>
              </b-col>
              <b-col lg="3" class="text-right">
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
              <div class="pagin">
                  <ul class="pagination">
                      <li :class="['page-item prev', {
                        'disabled': (getCurrentPage - 1 <=0)
                      }]">
                          <span class="page-link" @click="getPrev"><img src="~/assets/icons/icon-interface-arrow-left.svg"/>Prev</span>
                      </li>
                        <li :class="['page-item ',{'active': index == getCurrentPage}]" v-for="index in getLastPage" :key="index" @click="fetchHistoryApi(index)">
                          <a class="page-link">{{index}}</a>
                        </li>
                      <li :class="['page-item next',{
                        'disabled': (getCurrentPage + 1 > getLastPage)
                      }]" @click="getNext">
                          <span class="page-link">Next<img src="~/assets/icons/icon-interface-arrow-right.svg"/></span>
                      </li>
                  </ul>
              </div>
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
  methods: {
    getData(data) {
      return [
        data && data.min_beds,
        data && data.min_full_baths,
        data && data.half_baths,
        data && data.location
      ];
    },
    fetchHistoryApi(index){
      this.$store.dispatch("searchHome/fetchSearchHistory",{page:index});
      this.updateUrlParams(index)
    },
    getPrev(){
      if (this.getCurrentPage - 1 <=0) return
      this.$store.dispatch("searchHome/fetchSearchHistory",{page: this.getCurrentPage - 1 });
      this.updateUrlParams(this.getCurrentPage - 1 )
    },
    getNext(){
      if(this.getCurrentPage + 1 > this.getLastPage) return
      this.$store.dispatch("searchHome/fetchSearchHistory",{page: this.getCurrentPage + 1 });
      this.updateUrlParams(this.getCurrentPage + 1 )
    },
    updateUrlParams(index){
      debugger
      if(index){
        this.$router.push({
          query: { ...this.$router.currentRoute.query, ...{page: index} },
        })
      }
    }
  },
  computed: {
    ...mapGetters("searchHome", ["getSearchHistory", "getSearchFetched","getLastPage","getCurrentPage"])
  },
  mounted() {
    debugger
    const query = this.$route.query
    const pageIndex = query.page || 1
    this.updateUrlParams(pageIndex)
    this.$store.dispatch("searchHome/fetchSearchHistory",{
      page: pageIndex
    });
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
    margin-top: 6px;
    margin-bottom: 0px;
}
.text-heading {
  text-transform: capitalize;
  font-size: 14px;
}
.align-fields {
  display: flex;
  // flex-wrap: wrap;
}
.area-tag{
    display: flex;
    .align-fields{
        margin-left: 15px;
        position: relative;
        &:after{
            position: absolute;
            left: -8px;
            content: '';
            width: 4px;
            height: 4px;
            top: 8px;
            background-color: #3d3d3d;
            border-radius: 100%;
        }
        &:first-child{
            &:after{
                display: none;
                padding: 0px;
            }
        }
    }
}
.wrapper{
    max-height: 560px;
    overflow-y: auto;
}
.search-rows{
    padding-top: 24px;
}
</style>
