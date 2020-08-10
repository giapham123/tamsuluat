<template>
<v-container>
  <v-file-input
        type="file" 
          show-size
          label="File input"
          @change="selectFile"
        ></v-file-input>
  <v-btn @click="InsertData">Insert</v-btn>
</v-container>
</template>
<script>
import { mapActions } from "vuex";
export default {
    data: () => ({
    }),
    methods: {
    ...mapActions("company", ['insertCompany']),
    async selectFile(files) {
       var formData = new FormData();
       formData.append("files",files)
      await this.insertCompany(formData)
    },
    async InsertData(){
        var formData = new formData();
    }
    }
}
</script>