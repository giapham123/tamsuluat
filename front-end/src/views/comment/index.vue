<template>
  <div>
    <v-card>
      <v-container>
        <v-row>
          <v-col cols="auto">
            <v-img height="120" width="120" :src="imageCompany"></v-img>
          </v-col>

          <v-col>
            <v-row class="flex-column ma-0 fill-height" justify="center">
              <v-card-title>{{companyNm}}</v-card-title>
              <v-row>
                <v-card-subtitle>
                  <v-icon>location_on</v-icon>
                </v-card-subtitle>
                <v-card-subtitle>{{addressCompany}}</v-card-subtitle>
                <v-card-subtitle>
                  <v-icon>person</v-icon>
                </v-card-subtitle>
                <v-card-subtitle>{{sizeCompany}}</v-card-subtitle>
              </v-row>
            </v-row>
          </v-col>
        </v-row>
        <div class="my-2 text-md-left">
          <v-btn depressed small color="primary" @click="reviewCompany">Review</v-btn>
        </div>
      </v-container>
    </v-card>
    <v-divider></v-divider>
    <v-container>
      <v-col class="d-flex" cols="12" sm="6">
        <v-select :items="itemsDanhGia" label="Đánh giá công ty" v-show="showReview" v-model="evaluation" dense outlined></v-select>
        <v-select
          v-model="salary"
          :items="itemsMucluong"
          label="Mức lương"
          v-show="showReview"
          dense
          outlined
          style="padding-left:5px"
        ></v-select>
      </v-col>
      <v-textarea
        v-show="showReview"
        v-model="contentForReview"
        label="Review đi nek"
        clearable
        clear-icon="cancel"
        auto-grow
        rows="1"
        row-height="15"
      ></v-textarea>
      <v-btn @click="closeReviewCompany" small v-show="showReview">Close</v-btn>
      <v-btn @click="addReview" small v-show="showReview">Chém</v-btn>
      <div v-for="(item,index) in commentsList" :key="index" style="padding-top:20px">
        <v-card>
          <v-card-text>
            <v-row no-gutters>
              <v-card-subtitle class="text-md-left">Author: Anonymous mạo danh ({{item.evaluation}}) Lương: {{item.salary}}</v-card-subtitle>
              <v-col cols="7">
                <v-row no-gutters>
                  <v-card-subtitle>Báo cáo ngày: {{item.createdAt}}</v-card-subtitle>
                  <!-- <v-card-subtitle>{{item.createdAt}}</v-card-subtitle> -->
                </v-row>
              </v-col>
              <v-btn depressed small color="primary" @click="replyForReview(item,index)">Reply</v-btn>
            </v-row>
            <v-divider style="padding-top:20px"></v-divider>
            <div
              class="text--primary text-md-left"
              style="text-align:left;white-space: pre-line"
            >{{item.contents}}</div>
            <v-divider></v-divider>
            <v-col>
              <v-row>
                <v-textarea
                  v-model="commentforReply"
                  v-show="showcomment"
                  v-if="showCommentForeachReply == index"
                  label="Chửi Nó"
                  clearable
                  clear-icon="cancel"
                  auto-grow
                  rows="1"
                  row-height="15"
                ></v-textarea>
                <v-btn
                  @click="closeReply"
                  small
                  class="text-md-left"
                  v-show="showcomment"
                  v-if="showCommentForeachReply == index"
                >Close</v-btn>
                <v-btn
                  @click="addreply"
                  small
                  class="text-md-left"
                  v-show="showcomment"
                  v-if="showCommentForeachReply == index"
                >Chém</v-btn>
              </v-row>
            </v-col>
            <div v-for="itemreply in item.embeddata" :key="itemreply._id" style="padding-left:20px">
              <v-card-text>
                <div
                  class="text--primary text-md-left"
                  style="text-align:left;white-space: pre-line"
                >{{itemreply.contents}}</div>
                <v-row no-gutters>
                  <div class="text-md-left">Anonymous mạo danh</div>
                  <v-col cols="10">
                    <v-row no-gutters>
                      <div class="text-md-left" style="padding-left:20px">Báo cáo ngày:</div>
                      <div class="text-md-left">{{itemreply.createdAt}}</div>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-divider></v-divider>
            </div>
          </v-card-text>
        </v-card>
      </div>
      <v-divider style="padding-top:20px"></v-divider>
    </v-container>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data: () => ({
    evaluation: '',
    salary: '',
    imageCompany: '',
    companyNm: '',
    addressCompany: '',
    sizeCompany: '',
    itemsDanhGia: ['Good', 'Qúa Chán'],
    itemsMucluong: ['Lương Cao', 'Tạm Ổn', 'Qúa Bèo'],
    showReview: false,
    items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
    commentforReply: '',
    showcomment: false,
    commentsList: [],
    showCommentForeachReply: '',
    itemDetails: {},
    contentForReview: '',
    dataCompany: []
  }),
  created () {
    this.getCommentForCompany()
    this.loadingCompany()
  },
  methods: {
    ...mapActions('comments', ['getComments', 'saveComments', 'saveReplyCompany']),
    ...mapActions('home', ['getCompany']),
    async loadingCompany () {
      const resultCompany = await this.getCompany()
      var result = resultCompany.filter(element => element.companyCd === this.$route.params.id)
      this.dataCompany = result
      this.companyNm = result[0].companyNm
      this.addressCompany = result[0].addressCd
      this.sizeCompany = result[0].sizePeople
      this.imageCompany = 'http://localhost:3000/' + result[0].image
    },
    async getCommentForCompany () {
      const resultComments = await this.getComments()
      this.commentsList = resultComments
      for (let i = 0; i < this.commentsList.length; i++) {
        this.commentsList[i].createdAt = this.moment(this.commentsList[i].createdAt).format('L')
        for (let j = 0; j < this.commentsList[i].embeddata.length; j++) {
          this.commentsList[i].embeddata[j].createdAt = this.moment(this.commentsList[i].embeddata[j].createdAt).format('L')
        }
      }
    },
    async addReview () {
      const params = {
        contents: this.contentForReview,
        evaluation: this.evaluation,
        salary: this.salary,
        companyCd: this.dataCompany[0].companyCd
      }
      const resultSave = await this.saveComments(params)
      if (resultSave === 'Save Success!') {
        this.contentForReview = ''
        this.salary = ''
        this.evaluation = ''
        this.showReview = false
        this.getCommentForCompany()
      }
    },
    closeReviewCompany () {
      this.showReview = false
    },
    reviewCompany () {
      this.showReview = true
    },
    replyForReview (item, index) {
      this.showCommentForeachReply = index
      this.showcomment = true
      this.itemDetails = item
    },
    closeReply (item, index) {
      this.showCommentForeachReply = index
      this.showcomment = false
    },
    async addreply () {
      console.log(this.itemDetails._id)
      const paramReply = {
        contents: this.commentforReply,
        commentId: this.itemDetails._id
      }
      await this.saveReplyCompany(paramReply)
      // this.showcomment = false
      this.commentforReply = ''
      this.getCommentForCompany()
      // if (this.commentforReply !== '') {
      //   this.itemDetails.embeddata.push({ embeddata: this.commentforReply })
      //   this.commentforReply = ''
      // }
    }
  }
}
</script>
