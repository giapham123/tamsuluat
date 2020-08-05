<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card width="100%" height="100px">
          <v-list-item-title class="text-md-center">{{msg}}</v-list-item-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  props:{
    msg:String
  },
   data: () => ({
   })
}
</script>