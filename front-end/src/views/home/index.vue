<template>
  <v-container>
    <div>
      <v-img :src="require('../../assets/rview.jpg')" class="background" >
        <v-text-field
          style="margin-top:30px"
          class="mx-4 search"
          label="Tìm công ty"
          solo
          prepend-inner-icon="find_in_page"
          v-model="inputValueSearch"
          @keydown.enter= "searchCompany"
          ></v-text-field>
      </v-img>
      <v-row  justify="center">
        <v-col sm="10">
        </v-col>
      </v-row>
    </div>
    <v-row>
      <v-col cols="12" sm="9" xs="9">
        <v-card>
           <nodata v-show="nodataShow"></nodata>
          <v-list v-show="nodataShowList">
            <template v-for="(item) in itemsCompanyList">
              <v-divider :key="item.index"></v-divider>
              <v-list-item :key="item.index"   class="hoverCard">
                <!-- <v-list-item-avatar>
                  <v-img :src="item.image"></v-img>
                </v-list-item-avatar> -->
                <v-col cols="6" sm="2">
                  <v-img :src="item.image">
                    <div class="fill-height bottom-gradient"></div>
                  </v-img>
                </v-col>
                <v-row no-gutters>
                  <v-list-item-content @click="commentCompany(item)">
                    <a class="text-md-left hovertext">
                      {{item.companyNm}}
                    </a>
                    <v-row>
                      <v-col class="text-md-left col-5">
                          <v-list-item-subtitle v-html="item.addressCd"></v-list-item-subtitle>
                          <v-list-item-subtitle>Số lượng comments: {{item.count}}</v-list-item-subtitle>
                           <v-row no-gutters>
                              <v-col class="text-md-left col-6">
                              <v-list-item-subtitle>Số lượng views: {{item.count}}</v-list-item-subtitle>
                              </v-col>
                               <v-col class="text-md-left col-6">
                              <v-list-item-subtitle>Số lượng follow: {{item.count}}</v-list-item-subtitle>
                               </v-col>
                           </v-row>
                      </v-col>
                    </v-row>
                  </v-list-item-content>
                </v-row>
                <!-- <v-avatar color="teal" size="30">
                  <span class="white--text">{{item.count}}</span>
                </v-avatar> -->
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
       <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
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
import './style.scss'
export default {
  components: {
    InfiniteLoading,
    nodata
  },
  data () {
    return {
      overlay: true,
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
    },
    overlay (val) {
      val && setTimeout(() => {
        this.overlay = false
      }, 3000)
    },
    page(){
       this.overlay = true
    }
  },
  created () {
    this.getCompanyAndAddress()
    this.getListCompany(1);
  },
  methods: {
    ...mapActions('home', ['getCompany', 'getAddress', 'getCommentsLatest','getCompanyNmForSelect','getCompanyForSearch']),
    async searchCompany () {
      this.overlay = true
      this.showPaging = false
      this.itemsCompanyList = []
      var resultCompany = await this.getCompanyForSearch({companyCd:this.inputValueSearch})
      if(resultCompany.length == 0){
        this.nodataShow = true
        this.nodataShowList = false
        return;
      }
      for (let i = 0; i < resultCompany.length; i++) {
        resultCompany[i]._source.image = 'data:image/jpeg;base64,'+resultCompany[i]._source.image 
        this.itemsCompanyList.push(resultCompany[i]._source)
      }
      if(resultCompany.length > 0) { this.overlay = false}
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
        resultCompany[i].image = 'data:image/jpeg;base64,'+resultCompany[i].image 
      }
      this.itemsCompanyList = resultCompany;
      this.itemsCompany =   this.itemsCompanyList
      this.itemsCompanyList.length > 0 ? this.overlay = false: this.overlay = true
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
    }
  }
}
</script>
<style scoped>


</style>
