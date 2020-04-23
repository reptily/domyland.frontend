<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <News :content="news" v-if="news.id"/>
    <span style="color: cadetblue" @click="edit">Изменить</span>
  </v-layout>
</template>

<script>
    import News from '~/components/News.vue'

    export default {
        validate ({ params }) {
            return /^\d+$/.test(params.id)
        },
        components: {
            News,
        },
        data() {
            return {
                news: []
            }
        },
        async mounted() {
            let responce;
            try {
                responce = await this.$axios.get("/api/news/" + this.$route.params.id);
                this.news = responce.data;
            } catch (e) {
                console.error(e);
            }
        },
        methods: {
            edit() {
                this.$store.commit("setNews", this.news);
                this.$router.push("/news/" +  this.news.id + "/edit");
            }
        }
    }
</script>
