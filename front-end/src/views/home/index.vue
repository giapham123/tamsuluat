<template>
  <v-container>
    <h1>Rì viu công ty thôi</h1>
    <v-toolbar>
      <v-toolbar-title>Chọn Công Ty</v-toolbar-title>
      <v-autocomplete
        v-model="select"
        :loading="loading"
        :items="items"
        :search-input.sync="search"
        cache-items
        item-value='companyCd'
        item-text='companyNm'
        class="mx-4"
        hide-no-data
        hide-details
        label="Công Ty bạn muốn rì viu?"
        solo
      ></v-autocomplete>
    </v-toolbar>
    <v-toolbar class="d-flex" cols="12" sm="6">
      <v-toolbar-title>Địa chỉ</v-toolbar-title>
      <v-select
        class="mx-4"
        :items="itemsAddess"
        label="Địa Chỉ"
        solo
        hide-details
        item-value='addressCd'
        item-text='addressNm'
        style="padding-left:63px"
      ></v-select>
    </v-toolbar>
    <v-row>
      <v-card style="margin-top:10px" width="700px">
        <v-list>
          <template v-for="(item) in itemsCompanyList">
            <v-divider :key="item.index"></v-divider>
            <v-list-item :key="item.index">
              <v-list-item-avatar>
                <v-img :src="`http://localhost:3000/`+item.image"></v-img>
              </v-list-item-avatar>
              <v-row no-gutters>
                <v-list-item-content>
                  <v-list-item-title class="text-md-left" v-html="item.companyNm"></v-list-item-title>
                  <v-row no-gutters>
                    <v-col class="text-md-center col-1">
                      <v-icon small>location_on</v-icon>
                    </v-col>
                    <v-col class="text-md-left col-1">
                      <v-list-item-subtitle v-html="item.addressCd"></v-list-item-subtitle>
                    </v-col>
                    <v-col class="text-md-center col-1">
                      <v-icon small>person</v-icon>
                    </v-col>
                    <v-col class="text-md-left col-3">
                      <v-list-item-subtitle v-html="item.sizePeople"></v-list-item-subtitle>
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </v-row>
              <div class="my-2">
                <v-btn color="primary" fab small dark @click="commentCompany(item)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </div>
            </v-list-item>
          </template>
        </v-list>
      </v-card>
      <v-card style="margin-top:10px; margin-left:5px" width="480">
        <v-list>
          <v-subheader style="margin-top:17px">RỜ VIU MỚI NHẤT</v-subheader>
          <template v-for="(item) in itemsCompanyList">
            <v-divider :key="item.index"></v-divider>
            <v-list-item :key="item.index">
              <v-list-item-avatar>
                <v-img :src="item.avatar"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title class="text-md-left" v-html="item.title"></v-list-item-title>
                <v-list-item-subtitle class="text-md-left" v-html="item.subtitle"></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-card>
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
      select: null,
      itemsCompany: [],
      itemsAddess: []
    }
  },
  watch: {
    search (val) {
      val && val !== this.select && this.querySelections(val)
    }
  },
  created () {
    this.getCompanyAndAddress()
  },
  methods: {
    ...mapActions('home', ['getCompany', 'getAddress']),
    commentCompany (item) {
      this.$router.push({ path: `/${item.companyCd}` })
    },
    async getCompanyAndAddress () {
      const resultAddress = await this.getAddress()
      this.itemsAddess = resultAddress
      const resultCompany = await this.getCompany()
      this.itemsCompany = resultCompany
      this.itemsCompanyList = resultCompany
    },
    querySelections (v) {
      this.loading = true
      setTimeout(() => {
        this.items = this.itemsCompany.filter(e => {
          // return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
          return e
        })
        this.loading = false
      }, 500)
    }
  }
}
</script>
