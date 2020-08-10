<template>
  <v-row justify="center">
    <v-dialog v-model="showDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Đánh giá công ty</span>
        </v-card-title>
        <v-card>
          <v-col>
            <v-text-field label="Tên Nhân Viên" outlined dense v-model="staffNm"></v-text-field>
            <v-text-field label="Thuộc bộ phận" outlined dense v-model="department"></v-text-field>
            <v-select
              :items="itemsDanhGiaS"
              label="Đánh giá công ty"
              v-model="evaluation"
              item-text="text"
              item-value="code"
              dense
              outlined
            ></v-select>
            <v-textarea
              v-model="contentForReview"
              label="Đánh giá"
              clearable
              clear-icon="cancel"
              auto-grow
              rows="2"
              row-height="15"
            ></v-textarea>
          </v-col>
        </v-card>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn small color="primary" @click="close">Đóng</v-btn>
          <v-btn small color="primary" @click="addReview">Đăng Comment</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    showDialog: {
      type: Boolean,
    },
    params:{
        type:Object
    }
  },
  data: () => ({
    contentForReview: "",
    evaluation: "",
    staffNm: null,
    department: null,
    itemsDanhGiaS: [
      {
        code:1,
        text:"Max Sida",
      },{
        code:2,
        text: "Hết thuốc chữa, Đang tính đường chuồn",
      },{
        code:3,
        text: "Cũng tạm",
      },{
        code:4,
        text:"Ngon",
      },{
        code:5,
        text: "Công ty tuyệt vời",
      }
    ],
  }),
  watch:{
     
  },
  created(){
      
  },
  methods: {
    ...mapActions("comments", ["saveComments"]),
    async addReview() {
      if (this.staffNm.trim() == null || this.staffNm.trim() == '') {
        this.staffNm = "Anonymous";
      }
      if (this.department.trim() == null || this.department.trim() == '') {
        this.department = "Boss";
      }
      if (this.contentForReview.trim() == "") {
        return;
      }
      const params = {
        contents: this.contentForReview,
        evaluation: this.evaluation,
        companyCd: this.params.companyCd,
        staffNm: this.staffNm,
        department: this.department,
        commentName: this.staffNm
      };
      console.log(params);
      const resultSave = await this.saveComments(params);
      if (resultSave === "Save Success!") {
        this.contentForReview = "";
        this.evaluation = "";
        this.staffNm = "";
        this.department = "";
        this.closePopup(params)
      }
    },
    closePopup(params) {
      this.$emit("closePopup", params);
    },
    close(){
      var params = {
        close:'close'
      }
     this.closePopup(params)
    }
  },
};
</script>