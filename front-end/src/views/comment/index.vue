<template>
  <div>
    <v-container fluid>
      <v-card>
        <v-container>
          <div class="text-md-left">
            <router-link to="/">Trang chủ</router-link>
            / Review công ty {{companyNm}}
          </div>
          <v-row>
            <v-col cols="auto">
              <v-img height="100" width="100" :src="imageCompany"></v-img>
            </v-col>
            <v-col>
              <v-row class="flex-column ma-0 fill-height" justify="center">
                <v-card-title>
                  <b style="color:#00b7ff; font-size:30px">{{companyNm}}</b>
                </v-card-title>
                <v-row style="margin-top:-20px; margin-left:20px">
                  <v-card-subtitle>{{addressCompany}}</v-card-subtitle>
                </v-row>
              </v-row>
            </v-col>
          </v-row>
          <div class="my-2 text-md-left">
            <v-btn depressed small color="primary" @click="reviewCompany">Review</v-btn>
          </div>
        </v-container>
      </v-card>
    </v-container>
    <v-divider></v-divider>
    <v-container>
      <v-card v-show="showReview">
        <v-col sm="6">
          <v-text-field v-show="showReview" label="Tên Nhân Viên" outlined dense v-model="staffNm"></v-text-field>
          <v-text-field
            v-show="showReview"
            label="Thuộc bộ phận"
            outlined
            dense
            v-model="department"
          ></v-text-field>
          <v-select
            :items="itemsDanhGia"
            label="Đánh giá công ty"
            v-show="showReview"
            v-model="evaluation"
            dense
            outlined
          ></v-select>
        </v-col>
        <v-container>
          <v-textarea
            v-show="showReview"
            v-model="contentForReview"
            label="Review đi nek"
            clearable
            clear-icon="cancel"
            auto-grow
            rows="2"
            row-height="15"
          ></v-textarea>
          <v-btn
            @click="addReview"
            small
            v-show="showReview"
            color="primary"
            style="margin-right:5px"
          >Đăng Comment</v-btn>
          <v-btn @click="closeReviewCompany" small v-show="showReview">Hủy bỏ</v-btn>
        </v-container>
      </v-card>
      <div v-for="(item,index) in commentsList" :key="index" style="padding-top:5px">
        <v-card>
          <v-card-text>
            <v-row no-gutters>
              <v-card-subtitle class="text-md-left">
                <b
                  style="color:blue; margin-left: -15px"
                >{{item.commentName}} ({{item.department}}) {{item.evaluation}}</b>
              </v-card-subtitle>
              <v-col cols="6">
                <v-row no-gutters>
                  <v-card-subtitle>Báo cáo ngày: {{item.createdAt}}</v-card-subtitle>
                  <v-card-subtitle v-if="item.evaluation == 'Max Sida'">
                    <font-awesome-icon icon="star" size="lg" :style="{ color: 'yellow' }" />
                    <font-awesome-icon
                      :icon="['far', 'star']"
                      size="lg"
                      :style="{ color: 'yellow' }"
                    />
                    <font-awesome-icon
                      :icon="['far', 'star']"
                      size="lg"
                      :style="{ color: 'yellow' }"
                    />
                    <font-awesome-icon
                      :icon="['far', 'star']"
                      size="lg"
                      :style="{ color: 'yellow' }"
                    />
                    <font-awesome-icon
                      :icon="['far', 'star']"
                      size="lg"
                      :style="{ color: 'yellow' }"
                    />
                  </v-card-subtitle>
                  <v-card-subtitle
                    v-else-if="item.evaluation == 'Hết thuốc chữa, Đang tính đường chuồn'"
                  >
                    <font-awesome-icon icon="star" size="lg" :style="{ color: 'yellow' }" />
                    <font-awesome-icon icon="star" size="lg" :style="{ color: 'yellow' }" />
                    <font-awesome-icon
                      :icon="['far', 'star']"
                      size="lg"
                      :style="{ color: 'yellow' }"
                    />
                    <font-awesome-icon
                      :icon="['far', 'star']"
                      size="lg"
                      :style="{ color: 'yellow' }"
                    />
                    <font-awesome-icon
                      :icon="['far', 'star']"
                      size="lg"
                      :style="{ color: 'yellow' }"
                    />
                  </v-card-subtitle>
                  <v-card-subtitle v-else-if="item.evaluation== 'Cũng tạm'">
                    <font-awesome-icon icon="star" size="lg" :style="{ color: 'yellow' }" />
                    <font-awesome-icon icon="star" size="lg" :style="{ color: 'yellow' }" />
                    <font-awesome-icon icon="star" size="lg" :style="{ color: 'yellow' }" />
                    <font-awesome-icon
                      :icon="['far', 'star']"
                      size="lg"
                      :style="{ color: 'yellow' }"
                    />
                    <font-awesome-icon
                      :icon="['far', 'star']"
                      size="lg"
                      :style="{ color: 'yellow' }"
                    />
                  </v-card-subtitle>
                  <v-card-subtitle v-else-if="item.evaluation == 'Ngon'">
                    <font-awesome-icon icon="star" size="lg" :style="{ color: 'yellow' }" />
                    <font-awesome-icon icon="star" size="lg" :style="{ color: 'yellow' }" />
                    <font-awesome-icon icon="star" size="lg" :style="{ color: 'yellow' }" />
                    <font-awesome-icon icon="star" size="lg" :style="{ color: 'yellow' }" />
                    <font-awesome-icon
                      :icon="['far', 'star']"
                      size="lg"
                      :style="{ color: 'yellow' }"
                    />
                  </v-card-subtitle>
                  <v-card-subtitle v-else>
                    <font-awesome-icon icon="star" size="lg" :style="{ color: 'yellow' }" />
                    <font-awesome-icon icon="star" size="lg" :style="{ color: 'yellow' }" />
                    <font-awesome-icon icon="star" size="lg" :style="{ color: 'yellow' }" />
                    <font-awesome-icon icon="star" size="lg" :style="{ color: 'yellow' }" />
                    <font-awesome-icon icon="star" size="lg" :style="{ color: 'yellow' }" />
                  </v-card-subtitle>
                </v-row>
              </v-col>
            </v-row>
            <div
              class="text--primary text-md-left"
              style="text-align:left;white-space: pre-line; font-size:16px"
            >{{item.contents}}</div>
            <v-divider></v-divider>
            <div class="text-md-left" style="margin-top: 5px">
              <v-btn depressed small color="primary" @click="replyForReview(item,index)">Reply</v-btn>
              <a
                style="margin-left: 5px"
                v-if="item.qty != 0"
                @click="ShowReply(item,index)"
              >See reply {{item.qty}}</a>
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
            <v-divider style="margin-top:5px"></v-divider>
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
      <nodata v-show="nodataShow"></nodata>
      <infinite-loading @infinite="infiniteHandler" ref="infiniteLoading">
        <span slot="no-more"></span>
      </infinite-loading>
    </v-container>
  </div>
</template>
<script>
import InfiniteLoading from "vue-infinite-loading";
import { mapActions } from "vuex";
import nodata from "../commons/noData"
export default {
  components: {
    InfiniteLoading,
    nodata
  },
  data: () => ({
    nodataShow: false,
    evaluation: "",
    salary: "",
    imageCompany: "",
    companyNm: "",
    addressCompany: "",
    sizeCompany: "",
    itemsDanhGia: [
      "Max Sida",
      "Hết thuốc chữa, Đang tính đường chuồn",
      "Cũng tạm",
      "Ngon",
      "Công ty tuyệt vời"
    ],
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
    staffNm: "",
    department: "",
    showReplyComment: -1,
    dataForReply: [],
    itemsReply: {}
  }),
  created() {
    this.loadingCompany();
  },
  methods: {
    ...mapActions("comments", [
      "getComments",
      "saveComments",
      "saveReplyCompany",
      "getCommentsLoadMore",
      "getReplyOfComment"
    ]),
    ...mapActions("home", ["getCompanyForSearch"]),
    async ShowReply(item, index) {
      this.itemsReply = { item: item, index: index };
      this.showReplyComment = index;
      const result = await this.getReplyOfComment(item);
      for (let i = 0; i < result.length; i++) {
        result[i].createdAt = this.moment(result[i].createdAt).format("MM/DD/YYYY")
      }
      this.dataForReply = result;
    },
    async infiniteHandler($state) {
      
      var pages = {
        companyCd: this.$route.params.id,
        page: Math.ceil(this.commentsList.length / 5) + 1
      };
      var resultComments = await this.getCommentsLoadMore(pages);
      var result = resultComments.filter(
        element => element.companyCd === this.$route.params.id
      );
      this.commentsList = this.commentsList.concat(result);
      for (let i = 0; i < this.commentsList.length; i++) {
        this.commentsList[i].createdAt = this.moment(
          this.commentsList[i].createdAt
        ).format("MM/DD/YYYY");
        this.commentsList[i].qty = this.commentsList[i].embeddata.length;
      }
      if(this.commentsList.length == 0){
        this.nodataShow = true
      }else{
        this.nodataShow = false
      }
      $state.loaded();
      if (resultComments.length === 0) {
        $state.complete();
      }
    },
    async loadingCompany() {
      const resultCompany = await this.getCompanyForSearch({companyCd:this.$route.params.id});
      console.log(resultCompany);
      this.dataCompany = resultCompany;
      this.companyNm = resultCompany[0]._source.companyNm;
      this.addressCompany = resultCompany[0]._source.addressCd;
      this.sizeCompany = resultCompany[0]._source.sizePeople;
      this.imageCompany = 'data:image/jpeg;base64,'+resultCompany[i]._source.image;
    },
    async getCommentForCompany() {
      var pages = {
        companyCd: this.$route.params.id,
        page: 1
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
    async addReview() {
      if (this.staffNm === "") {
        this.staffNm = "Anonymous";
      }
      if (this.department === "") {
        this.department = "Boss";
      }
      if (this.contentForReview === "") {
        return;
      }
      const params = {
        contents: this.contentForReview,
        evaluation: this.evaluation,
        salary: this.salary,
        companyCd: this.dataCompany[0]._source.companyCd,
        staffNm: this.staffNm,
        department: this.department
      };
      const resultSave = await this.saveComments(params);
      if (resultSave === "Save Success!") {
        this.contentForReview = "";
        this.salary = "";
        this.evaluation = "";
        this.showReview = false;
        this.staffNm = "";
        this.department = "";
        this.commentsList = [];
        this.ShowReply({}, -1);
        this.showcomment = false;
        this.$refs.infiniteLoading.$emit("$InfiniteLoading:reset");
      }
    },
    closeReviewCompany() {
      this.showReview = false;
    },
    reviewCompany() {
      this.showReview = true;
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
      const paramReply = {
        contents: this.commentforReply,
        commentId: this.itemDetails._id
      };
      await this.saveReplyCompany(paramReply);
      this.commentforReply = "";
      this.ShowReply(this.itemsReply.item, this.itemsReply.index);
    }
  }
};
</script>
