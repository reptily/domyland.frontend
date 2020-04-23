<template>
  <v-layout
    column
    justify-center
  >
    <h1>Досвиданья !</h1>
  </v-layout>
</template>

<script>
  export default {
      mounted() {
          this.$store.dispatch('auth/logout');
          window.setTimeout(() => {
              this.$router.push("/");
          }, 3000);
      }
  }
</script>
