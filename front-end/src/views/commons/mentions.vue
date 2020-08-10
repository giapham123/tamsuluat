<template>
  <v-row justify="center">
    <v-dialog v-model="showDialog" persistent max-width="600px">
      <v-card>
        aaaaaaaaaaaaaaaaa
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn small color="primary" @click="showDialog =false">Đóng</v-btn>
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
      required: true,
    },
  },
  data: () => ({
    
  }),

  methods: {
    closePopup() {
      this.$emit("closePopup");
    },
  },
};
</script>