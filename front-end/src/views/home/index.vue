<template>
  <v-container>
    <div class="background">
      <h1 class="font">Review công ty</h1>
      <v-row  justify="center">
      <v-col sm="8">
      <v-toolbar>
        <v-toolbar-title>Chọn Công Ty</v-toolbar-title>
        <v-autocomplete
          v-model="selectCompany"
          :loading="loading"
          :items="items"
          :search-input.sync="search"
          cache-items
          item-value="companyCd"
          item-text="companyNm"
          class="mx-4"
          hide-no-data
          hide-details
          label="Công Ty bạn muốn review?"
          solo
          @change="searchCompany"
        ></v-autocomplete>
      </v-toolbar></v-col></v-row>
    </div>
    <v-row>
      <v-col>
        <v-card width="auto">
          <v-list>
            <template v-for="(item) in itemsCompanyList">
              <v-divider :key="item.index"></v-divider>
              <v-list-item :key="item.index"   class="hoverCard">
                <v-list-item-avatar>
                  <v-img :src="item.image"></v-img>
                </v-list-item-avatar>
                <v-row no-gutters>
                  <v-list-item-content>
                    <a>
                      <v-list-item-title
                        class="text-md-left hovertext"
                        @click="commentCompany(item)"
                        v-html="item.companyNm"
                      ></v-list-item-title>
                    </a>
                    <v-row no-gutters>
                      <v-col class="text-md-center col-1">
                        <v-icon small>location_on</v-icon>
                      </v-col>
                      <v-col class="text-md-left col-2">
                        <b>
                          <v-list-item-subtitle v-html="item.addressCd"></v-list-item-subtitle>
                        </b>
                      </v-col>
                      <v-col class="text-md-center col-1">
                        <v-icon small>person</v-icon>
                      </v-col>
                      <v-col class="text-md-left col-3">
                        <b>
                          <v-list-item-subtitle v-html="item.sizePeople"></v-list-item-subtitle>
                        </b>
                      </v-col>
                    </v-row>
                  </v-list-item-content>
                </v-row>
                <v-avatar color="teal" size="48">
                  <span class="white--text">{{item.count}}</span>
                </v-avatar>
              </v-list-item>
            </template>
          </v-list>
        </v-card>
      </v-col>
      <v-col sm="4" style="margin-left:-16px">
        <v-card width="auto">
          <v-list>
            <b>REVIEW MỚI NHẤT</b>
            <template v-for="(item) in itemForCommentLatest">
              <v-divider :key="item.index"></v-divider>
              <v-list-item :key="item.index">
                <v-list-item-content>
                  <v-list-item-title class="text-md-left">
                    <b>{{item.commentName}}</b> review
                    <a @click="commentCompany(item)">{{item.companys[0].companyNm}}</a>
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-md-left">{{item.createdAt}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      itemsCompanyList: [],
      loading: false,
      items: [],
      search: null,
      selectCompany: '',
      itemsCompany: [],
      itemCompanyListBeta: [],
      itemForCommentLatest: []
    }
  },
  watch: {
    search (val) {
      if (val == '' || val == null) {
        this.getCompanyAndAddress()
      } else {
        val && val !== this.select && this.querySelections(val)
      }
    }
  },
  created () {
    this.getCompanyAndAddress()
  },
  methods: {
    ...mapActions('home', ['getCompany', 'getAddress', 'getCommentsLatest']),
    searchCompany () {
      var resultSearchAddress = this.itemCompanyListBeta.filter(element => {
        if (element.companyCd === this.selectCompany) {
          return element
        }
      })
      this.itemsCompanyList = resultSearchAddress
    },
    commentCompany (item) {
      this.$router.push({ path: `/${item.companyCd}` })
    },
    async getCompanyAndAddress () {
      const getCommetsNew = await this.getCommentsLatest()
      const resultCompany = await this.getCompany()
      for (let i = 0; i < getCommetsNew.length; i++) {
        getCommetsNew[i].createdAt = this.moment(
          getCommetsNew[i].createdAt
        ).format('L')
      }
      this.itemForCommentLatest = getCommetsNew
      for (let i = 0; i < resultCompany.length; i++) {
        resultCompany[i].image =
          process.env.VUE_APP_SERVER + resultCompany[i].image
      }
      this.itemsCompany = resultCompany
      this.itemsCompanyList = resultCompany
      this.itemCompanyListBeta = resultCompany
    },
    querySelections (v) {
      this.loading = true
      setTimeout(() => {
        this.items = this.itemsCompany.filter(e => {
          return e
        })
        this.loading = false
      }, 500)
    }
  }
}
</script>
<style scoped>
.hovertext:hover {
  font-size: 20px;
  font-weight: bold;
}
.hoverCard:hover {
  background-color: #DCDCDC;
}
.background{
  background-image: url('../../assets/background.jpg');
  background-size: 100%;
  
}
.font {
  color: white;
  font-family: cursive;
}
</style>
