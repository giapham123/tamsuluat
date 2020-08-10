<template>
  <v-app id="app">
    <!-- <div id="nav">
       <v-img src='@/assets/location.jpg'/>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <!-- <keep-alive><router-view/></keep-alive> -->
    <keep-alive>
        <router-view :key="$route.path"></router-view>
      </keep-alive>
  </v-app>
</template>
<script>

</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  background-color:whitesmoke;
      font-weight: 500;
    color: #1c1c1c;
    /* text-transform: uppercase; */
    letter-spacing: 2px;
    display: block;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
