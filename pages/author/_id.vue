<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <div class="text-center">
        <h1>Новости</h1>
      </div>
      <div style="width: 100%; height: 50px; text-align: right;">
        <v-btn
          v-if="is_auth"
          color="primary"
          nuxt
          to="/news/add"
        >Добавить
        </v-btn>
      </div>
      <v-card>
        <News preview='true' :content="obj" v-for="obj in news"/>
        <v-pagination
          v-model="meta.current_page"
          :length="meta.total"
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right"
          @input="next"
        ></v-pagination>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
    import News from '~/components/News.vue';
    import Cookies from 'js-cookie';

    export default {
        components: {
            News,
        },
        data() {
            return {
                is_auth: false,
                news: [],
                links: [],
                meta: {
                    current_page: 1,
                    total: 0,
                }
            }
        },
        mounted() {
            this.is_auth = this.isAuth();
            this.getResults(1);
        },
        methods: {
            isAuth() {
                if (Cookies.get('token') !== undefined) {
                    return true;
                } else {
                    return false;
                }
            },
            async getResults(page) {
                let responce;
                try {
                    responce = await this.$axios.get("/api/author/" + this.$route.params.id + "?page=" + page);
                    this.news = responce.data.data;
                    this.links = responce.data.links;
                    this.meta = responce.data.meta;
                } catch (e) {
                    console.error(e);
                }
            },
            next() {
                let page = this.meta.current_page++;
                if (page <= this.meta.last_page) {
                    this.getResults(page);
                }
            }
        }
    }
</script>
