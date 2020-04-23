<template>
  <v-layout
    column
    justify-center
  >
    <v-text-field v-model="username" label="Логин"></v-text-field>
    <v-text-field v-model="password" label="Пароль" type="password"></v-text-field>
    <v-btn
      color="primary"
      nuxt
      @click="Login"
    >Войти</v-btn>
  </v-layout>
</template>

<script>
  export default {
      data() {
          return {
              username: null,
              password: null,
              error: null,
          }
      },
      methods: {
          async Login() {
              let response = null;
              try {
                  response = await this.$axios.$post('/api/login', {
                      username: this.username,
                      password: this.password,
                  })
              } catch (e) {
                  console.error(e);
                  return;
              }

              this.$store.dispatch('auth/saveToken', {
                  token: response.token
              })

              this.$router.push('/')

          }
      }
  }
</script>
