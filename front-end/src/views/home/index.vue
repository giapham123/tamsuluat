<template>
  <v-container>
    <div class="background">
      <h1 class="font" style="text-align: center">Review công ty</h1>
      <v-row  justify="center">
      <v-col sm="10">
      <v-toolbar>
        <v-toolbar-title>Chọn Công Ty</v-toolbar-title>
        <v-text-field
            style="margin-top:30px"
            cache-items
            class="mx-4"
            label="Công Ty bạn muốn review?"
            solo
            v-model="inputValueSearch"
            @keydown.enter= "searchCompany"
          ></v-text-field>
      </v-toolbar></v-col></v-row>
    </div>
    <v-row>
      <v-col>
        <v-card width="100%">
           <nodata v-show="nodataShow"></nodata>
          <v-list v-show="nodataShowList">
            <template v-for="(item) in itemsCompanyList">
              <v-divider :key="item.index"></v-divider>
              <v-list-item :key="item.index"   class="hoverCard">
                <v-list-item-avatar>
                  <v-img :src="item.image"></v-img>
                </v-list-item-avatar>
                <v-row no-gutters>
                  <v-list-item-content @click="commentCompany(item)">
                    <a>
                      <v-list-item-title
                        class="text-md-left hovertext"
                        v-html="item.companyNm"
                      ></v-list-item-title>
                    </a>
                    <v-row no-gutters>
                      <v-col class="text-md-left col-5">
                        <b>
                          <v-list-item-subtitle v-html="item.addressCd"></v-list-item-subtitle>
                        </b>
                      </v-col>
                    </v-row>
                  </v-list-item-content>
                </v-row>
                <v-avatar color="teal" size="30">
                  <span class="white--text">{{item.count}}</span>
                </v-avatar>
              </v-list-item>
            </template>
          </v-list>
          <div class="text-center">
            <v-pagination
              v-show="showPaging"
              v-model="page"
              :length="totalPaging"
              :total-visible="10"
              @input="nextPage"
            ></v-pagination>
          </div>
        </v-card>
      </v-col>
      <v-col sm="3" style="margin-left:-16px">
        <v-card width="auto">
          <v-list>
            <b  style="padding-left:20px">REVIEW MỚI NHẤT</b>
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
import InfiniteLoading from "vue-infinite-loading";
import nodata from "../commons/noData"
export default {
  components: {
    InfiniteLoading,
    nodata
  },
  data () {
    return {
      nodataShowList:true,
      nodataShow: false,
      showPaging:true,
      inputValueSearch: '',
      totalPaging: 0,
      page: 1,
      itemsCompanyList: [],
      itemComSearch:{},
      items: [],
      search: null,
      selectCompany: '',
      itemsCompany: [],
      itemCompanyListBeta: [],
      itemForCommentLatest: []
    }
  },
  watch: {
    inputValueSearch (val) {
      if (val == '' || val == null || val == 'undefined') {
        this.nodataShow = false
        this.nodataShowList = true
        this.showPaging = true
        this.itemsCompanyList = this.itemsCompany
      }
    }
  },
  created () {
    this.getCompanyAndAddress()
    this.getListCompany(1);
  },
  methods: {
    ...mapActions('home', ['getCompany', 'getAddress', 'getCommentsLatest','getCompanyNmForSelect','getCompanyForSearch']),
    async searchCompany () {
      this.showPaging = false
      this.itemsCompanyList = []
      var resultCompany = await this.getCompanyForSearch({companyCd:this.inputValueSearch})
      if(resultCompany.length == 0){
        this.nodataShow = true
        this.nodataShowList = false
        return;
      }
      for (let i = 0; i < resultCompany.length; i++) {
        resultCompany[i]._source.image =
        process.env.VUE_APP_SERVER + resultCompany[i]._source.image
        this.itemsCompanyList.push(resultCompany[i]._source)
      }
    },
    commentCompany (item) {
      this.$router.push({ path: `/${item.companyCd}` })
    },
    async nextPage(){
      this.getListCompany(this.page)
    },
    async getListCompany(paging){
      var pages = {
        page: Math.ceil(this.page) + 1
      };
      var resultCompany = await this.getCompany(pages);
      for (let i = 0; i < resultCompany.length; i++) {
        resultCompany[i].image =
          process.env.VUE_APP_SERVER + resultCompany[i].image
      }
      this.itemsCompanyList = resultCompany;
      this.itemsCompany =   this.itemsCompanyList
    },
    async getCompanyAndAddress () {
      const getCommetsNew = await this.getCommentsLatest()
      const resultCompanyForselect = await this.getCompanyNmForSelect()
      for(let i = 0; i<resultCompanyForselect.length; i++){
        resultCompanyForselect[i].companyNm =  resultCompanyForselect[i].companyNm.concat(' - ' + resultCompanyForselect[i].addressCd)
      }
      for (let i = 0; i < getCommetsNew.length; i++) {
        getCommetsNew[i].createdAt = this.moment(
          getCommetsNew[i].createdAt
        ).fromNow()
      }
      this.itemForCommentLatest = getCommetsNew
      this.itemsCompanyListForSearch = resultCompanyForselect
      this.items = resultCompanyForselect
      this.totalPaging = Math.ceil(resultCompanyForselect.length/10)
      this.itemCompanyListBeta = this.itemsCompanyList
    },
    querySelections (v) {
      this.loading = true
      setTimeout(() => {
        this.items = this.itemsCompanyList.filter(e => {
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
  font-size: 17px;
  font-weight: bold;
}
.hoverCard:hover {
  background-color: #DCDCDC;
}
.background{
  /* background-image: url('../../assets/background.jpg'); */
  background-size: 100%;

}
.font {
  color: dimgrey;
  font-family:serif;
  font-size: 70px;
}
</style>
