<template>
   <vue-recaptcha sitekey="6Le1LrsZAAAAAEL-M9owy1ElVMJNp61kpD2ZThVH">
    <button>Click me</button>
  </vue-recaptcha>
</template>
<script src="https://unpkg.com/vue-recaptcha@latest/dist/vue-recaptcha.js"></script>
<!-- Minify -->
<script src="https://unpkg.com/vue-recaptcha@latest/dist/vue-recaptcha.min.js"></script>
<script src="https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit" async defer>
</script>
<script>
  import VueRecaptcha from 'vue-recaptcha';
  export default {
    components: { VueRecaptcha }
  };
</script>