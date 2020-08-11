<template>
  <v-container class="container">
    <div class="text-md-left" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap">
      <v-icon large @click="HomePage">home</v-icon>
      / Review công ty {{companyNm}}
    </div>
    <v-row class="headerCompany">
      <v-col cols="auto">
        <v-img height="100" width="100" :src="imageCompany" contain></v-img>
      </v-col>
      <v-col cols="8">
        <v-row class="flex-column ma-0 fill-height" justify="center">
          <v-card-title>
            <b style="color:#1976d2 !important; font-size:20px">{{companyNm}}</b>
          </v-card-title>
          <v-row style="margin-top:-20px; margin-left:1px">
            <v-card-subtitle>{{addressCompany}}</v-card-subtitle>
          </v-row>
        </v-row>
      </v-col>
      <v-col align="right">
        <v-btn class="ma-2 buttonStyle" depressed large color="primary" @click="reviewCompany">
          <v-icon>create</v-icon>Viết Review
        </v-btn>
      </v-col>
    </v-row>
    <div v-for="(item,index) in commentsList" :key="index" style="padding-top:5px">
      <v-card style="border-radius:0px" outlined class="mx-auto">
        <v-card-text>
          <v-row no-gutters dense>
            <v-card-subtitle class="text-md-left">
              <b
                style="color:#1976d2 !important; margin-left: -15px; font-size:15px"
              >{{item.commentName}} ({{item.department}})</b>
            </v-card-subtitle>
            <v-col cols="6">
              <v-row>
                <v-card-subtitle>Báo cáo ngày: {{item.createdAt}}</v-card-subtitle>
                <v-rating
                  style="padding-top:12px"
                  dense
                  readonly
                  v-model="item.evaluation"
                  background-color="orange lighten-3"
                  color="orange"
                ></v-rating>
              </v-row>
            </v-col>
          </v-row>
          <div
            class="text--primary text-md-left"
            style="text-align:left;white-space: pre-line; font-size:14px"
          >{{item.contents}}</div>
          <v-divider></v-divider>
          <div class="text-md-left" style="margin-top: 5px">
            <v-btn icon small color=" whitesmoke lighten-2" @click="likeComment(item,index)">
              <v-icon>mdi-thumb-up</v-icon>
            </v-btn>
            <b>{{item.like}}</b>
            <v-btn
              icon
              small
              style="margin-left: 5px"
              color="whitesmoke lighten-2"
              @click="dislikeComment(item,index)"
            >
              <v-icon>mdi-thumb-down</v-icon>
            </v-btn>

            <b>{{item.dislike}}</b>
            <a @click="replyForReview(item,index)" style="margin-left: 10px">
              <b>PHẢN HỒI</b>
            </a>
            <a
              style="margin-left: 5px"
              v-if="item.qty != 0"
              @click="ShowReply(item,index)"
            >Xem {{item.qty}} câu trả lời</a>
            <vue-recaptcha
              v-if="showCaptchaInearchRow == index"
              sitekey="6Le1LrsZAAAAAEL-M9owy1ElVMJNp61kpD2ZThVH"
              @verify="onVerify"
              :loadRecaptchaScript="showReCaptcha"
            ></vue-recaptcha>
          </div>
          <v-flex xs12 sm10 d-flex style="margin-left: 20px">
            <v-row>
              <v-textarea
                v-model="commentforReply"
                v-show="showcomment"
                v-if="showCommentForeachReply == index"
                label="Reply Here"
                clearable
                clear-icon="cancel"
                auto-grow
                rows="1"
                row-height="15"
              ></v-textarea>
              <v-btn
                style="margin-left:5px; margin-top:20px"
                @click="addreply"
                small
                color="primary"
                class="text-md-left"
                v-show="showcomment"
                v-if="showCommentForeachReply == index"
              >Đăng Reply</v-btn>
              <v-btn
                style="margin-left:5px; margin-top:20px"
                @click="closeReply"
                small
                class="text-md-left"
                v-show="showcomment"
                v-if="showCommentForeachReply == index"
              >Close</v-btn>
            </v-row>
          </v-flex>
          <!-- <v-divider style="margin-top:5px"></v-divider> -->
          <div v-if="showReplyComment == index">
            <div v-for="itemreply in dataForReply" :key="itemreply._id" style="padding-left:20px">
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
          </div>
        </v-card-text>
      </v-card>
    </div>
    <v-card-text>
      <v-fab-transition>
        <!-- <v-btn
          color="#1976d2"
          dark
          top
          right
          style=" position: fixed;bottom: 0px;right: 0px; "
        >
          Chú thích
        </v-btn>
        -->
        <v-col class="shrink">
          <v-btn
            class="ma-2"
            color="#1976d2"
            dark
            top
            right
            style=" position: fixed;bottom: 0px;right: 0px; "
            @click="expand = !expand"
          >Tổng Đánh Giá</v-btn>

          <v-expand-transition>
            <v-card
              v-show="expand"
              height="300"
              width="300"
              top
              right
              style=" position: fixed;bottom: 50px;right: 10px; "
            >
              <v-list-item six-line>
                <v-list-item-content>
                  <v-list-item-title>Tổng Đánh Giá</v-list-item-title>
                  <v-card-actions>
                    <span class="text--lighten-2 caption mr-2">{{review1}} reviews</span>
                    <v-rating
                      dense
                      v-model="rating1"
                      background-color="orange lighten-3"
                      color="orange"
                      medium
                    ></v-rating>
                  </v-card-actions>
                  <v-card-actions>
                    <span class="text--lighten-2 caption mr-2">{{review2}} reviews</span>
                    <v-rating
                      dense
                      v-model="rating2"
                      background-color="orange lighten-3"
                      color="orange"
                      medium
                    ></v-rating>
                  </v-card-actions>
                  <v-card-actions>
                    <span class="text--lighten-2 caption mr-2">{{review3}} reviews</span>
                    <v-rating
                      dense
                      v-model="rating3"
                      background-color="orange lighten-3"
                      color="orange"
                      medium
                    ></v-rating>
                  </v-card-actions>
                  <v-card-actions>
                    <span class="text--lighten-2 caption mr-2">{{review4}} reviews</span>
                    <v-rating
                      dense
                      v-model="rating4"
                      background-color="orange lighten-3"
                      color="orange"
                      medium
                    ></v-rating>
                  </v-card-actions>
                  <v-card-actions>
                    <span class="text--lighten-2 caption mr-2">{{review5}} reviews</span>
                    <v-rating
                      dense
                      v-model="rating5"
                      background-color="orange lighten-3"
                      color="orange"
                      medium
                    ></v-rating>
                  </v-card-actions>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-expand-transition>
        </v-col>
      </v-fab-transition>
    </v-card-text>
    <nodata v-show="nodataShow" :msg="msg"></nodata>
    <infinite-loading @infinite="infiniteHandler" ref="infiniteLoading">
      <span slot="no-more"></span>
    </infinite-loading>
    <popupcomment :showDialog="showPopupComment" @closePopup="closePopupEvent" :params="items" />
    <mention :showDialog="showMention" @closePopup="closeMention" />
  </v-container>
</template>
<script>
import mention from "../commons/mentions";
import VueRecaptcha from "vue-recaptcha";
import InfiniteLoading from "vue-infinite-loading";
import { mapActions } from "vuex";
import nodata from "../commons/noData";
import "./style.scss";
import popupcomment from "./popup_comment";
export default {
  components: {
    InfiniteLoading,
    nodata,
    popupcomment,
    VueRecaptcha,
    mention,
  },
  data: () => ({
    rating1: 1,
    rating2: 2,
    rating3: 3,
    rating4: 4,
    rating5: 5,
    review1:0,
    review2:0,
    review3:0,
    review4:0,
    review5:0,
    expand: false,
    showMention: false,
    showReCaptcha: true,
    msg: "Không Có Comments",
    showPopupComment: false,
    nodataShow: false,
    evaluation: "",
    salary: "",
    imageCompany: "",
    companyNm: "",
    addressCompany: "",
    sizeCompany: "",
    itemsMucluong: ["Lương Cao", "Tạm Ổn", "Qúa Bèo"],
    showReview: false,
    items: ["Foo", "Bar", "Fizz", "Buzz"],
    commentforReply: "",
    showcomment: false,
    commentsList: [],
    showCommentForeachReply: "",
    itemDetails: {},
    contentForReview: "",
    dataCompany: [],
    // staffNm: "",
    // department: "",
    showReplyComment: -1,
    dataForReply: [],
    itemsReply: {},
    items: {},
    robot: false,
    dataForLikeAndDislike: {},
    showCaptchaInearchRow: -1,
  }),
  watch: {},
  created() {
    this.loadingCompany();
    this.getRating();
  },
  methods: {
    ...mapActions("comments", [
      "getComments",
      "saveComments",
      "saveReplyCompany",
      "getCommentsLoadMore",
      "getReplyOfComment",
      "updateLikeAndDislike",
      "countTotalReviews"
    ]),
    ...mapActions("home", ["getCompanyForSearch"]),
    closeMention() {
      this.showMention = false;
    },
    HomePage() {
      this.$router.push({ path: `/` });
    },
    async getRating(){
      var result = await this.countTotalReviews({companyCd: this.$route.params.id})
      this.review1 = result.onestar
      this.review2 = result.twostar
      this.review3 = result.threestar
      this.review4 = result.fourstar
      this.review5 = result.fivestar
    },
    async ShowReply(item, index) {
      this.itemsReply = { item: item, index: index };
      this.showReplyComment = index;
      const result = await this.getReplyOfComment(item);
      for (let i = 0; i < result.length; i++) {
        result[i].createdAt = this.moment(result[i].createdAt).format(
          "MM/DD/YYYY"
        );
      }
      this.dataForReply = result;
    },
    async infiniteHandler($state) {
      var pages = {
        companyCd: this.$route.params.id,
        page: Math.ceil(this.commentsList.length / 5) + 1,
      };
      var resultComments = await this.getCommentsLoadMore(pages);
      var result = resultComments.filter(
        (element) => element.companyCd === this.$route.params.id
      );
      this.commentsList = this.commentsList.concat(result);
      for (let i = 0; i < this.commentsList.length; i++) {
        this.commentsList[i].createdAt = this.moment(
          this.commentsList[i].createdAt
        ).format("MM/DD/YYYY");
        this.commentsList[i].qty = this.commentsList[i].embeddata.length;
      }
      if (this.commentsList.length == 0) {
        this.nodataShow = true;
      } else {
        this.nodataShow = false;
      }
      $state.loaded();
      if (resultComments.length === 0) {
        $state.complete();
      }
    },
    async loadingCompany() {
      const resultCompany = await this.getCompanyForSearch({
        companyCd: this.$route.params.id,
      });
      this.dataCompany = resultCompany;
      this.companyNm = resultCompany[0]._source.companyNm;
      this.addressCompany = resultCompany[0]._source.addressCd;
      this.sizeCompany = resultCompany[0]._source.sizePeople;
      this.imageCompany =
        process.env.VUE_APP_SERVER + resultCompany[0]._source.image;
    },
    async getCommentForCompany() {
      var pages = {
        companyCd: this.$route.params.id,
        page: 1,
      };
      const resultComments = await this.getCommentsLoadMore(pages);
      this.commentsList = resultComments;
      for (let i = 0; i < this.commentsList.length; i++) {
        this.commentsList[i].createdAt = this.moment(
          this.commentsList[i].createdAt
        ).format("L");
        for (let j = 0; j < this.commentsList[i].embeddata.length; j++) {
          this.commentsList[i].embeddata[j].createdAt = this.moment(
            this.commentsList[i].embeddata[j].createdAt
          ).format("L");
        }
      }
    },
    async closePopupEvent(params) {
      if (params.close == "close") {
        this.showPopupComment = false;
        return;
      }
      this.commentsList.unshift(params);
      this.showPopupComment = false;
    },
    reviewCompany() {
      this.items = {
        companyCd: this.dataCompany[0]._source.companyCd,
      };
      this.showPopupComment = true;
    },
    replyForReview(item, index) {
      this.showCommentForeachReply = index;
      this.showcomment = true;
      this.itemDetails = item;
      this.itemsReply = { item: item, index: index };
    },
    closeReply(item, index) {
      this.showCommentForeachReply = index;
      this.showcomment = false;
    },
    async addreply() {
      if (
        this.commentforReply.trim() == "" ||
        this.commentforReply.trim() == null
      ) {
        return;
      }
      const paramReply = {
        contents: this.commentforReply,
        commentId: this.itemDetails._id,
      };
      await this.saveReplyCompany(paramReply);
      this.commentforReply = "";
      this.ShowReply(this.itemsReply.item, this.itemsReply.index);
    },
    likeComment(item, index) {
      this.showCaptchaInearchRow = index;
      this.dataForLikeAndDislike = item;
      this.dataForLikeAndDislike.flag = 1;
      this.dataForLikeAndDislike.index = index;
    },
    async dislikeComment(item, index) {
      this.showCaptchaInearchRow = index;
      this.dataForLikeAndDislike = item;
      this.dataForLikeAndDislike.flag = 0;
      this.dataForLikeAndDislike.index = index;
    },
    async onVerify(response) {
      if (response) {
        if (typeof this.dataForLikeAndDislike.like == "undefined") {
          this.dataForLikeAndDislike.like = 0;
        }
        if (typeof this.dataForLikeAndDislike.dislike == "undefined") {
          this.dataForLikeAndDislike.dislike = 0;
        }
        var params = {
          _id: this.dataForLikeAndDislike._id,
          like: this.dataForLikeAndDislike.like,
          dislike: this.dataForLikeAndDislike.dislike,
          flag: this.dataForLikeAndDislike.flag,
        };
        var result = await this.updateLikeAndDislike(params);
        if ((result = "success")) {
          if (this.dataForLikeAndDislike.flag == 0) {
            this.commentsList[this.dataForLikeAndDislike.index].dislike =
              this.dataForLikeAndDislike.dislike + 1;
          } else {
            this.commentsList[this.dataForLikeAndDislike.index].like =
              this.dataForLikeAndDislike.like + 1;
          }
        }
      }
      this.showReCaptcha = false;
      this.showCaptchaInearchRow = -1;
    },
  },
};
</script>
