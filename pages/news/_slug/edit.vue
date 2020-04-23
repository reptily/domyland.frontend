<template>
  <v-layout
    column
    justify-center
  >
    <v-text-field v-model="data.title" label="Загаловок"></v-text-field>
    <div class="colum2">
      <div>
        <v-col class="d-flex" cols="12" sm="6">
          <v-select
            :items="author"
            v-model="data.author_id"
            label="Авторы"
            outlined
            item-value="id"
            item-text="name"
          ></v-select>
        </v-col>
      </div>
      <div>
        <v-text-field v-model="data.date" label="Дата" @click="datepicker = true"></v-text-field>
        <v-date-picker v-if="datepicker" v-model="data.date" no-title @input="datepicker = false"></v-date-picker>
      </div>
    </div>
    <v-textarea
      filled
      auto-grow
      label="Превью"
      rows="5"
      row-height="20"
      v-model="data.preview"
    ></v-textarea>
    <v-textarea
      filled
      auto-grow
      label="Тект"
      rows="10"
      row-height="20"
      v-model="data.body"
    ></v-textarea>
    <v-text-field v-model="data.image" label="Ссылка на изображение"></v-text-field>
    <v-alert v-if="error" type="error">
      {{ error }}
    </v-alert>
    <v-btn
      color="primary"
      nuxt
      @click="editNews"
    >Изменить
    </v-btn>
  </v-layout>
</template>

<script>
    export default {
        components: {},
        data() {
            return {
                data: {
                    title: null,
                    date: null,
                    preview: null,
                    body: null,
                    author_id: null,
                    image: null,
                },
                author: [],
                datepicker: false,
                error: false,
            }
        },
        mounted() {
            this.$axios.get("/api/author").then(responce => {
                this.author = responce.data;
            }).catch(e => console.error(e));

            if (this.$store.state.news.length > 0) {
                this.data = this.$store.state.news;
                this.data.author_id = this.data.author.id;
            } else {
                this.$axios.get('/api/news/' + this.$route.params.slug).then(responce => {
                    this.data = responce.data;
                    this.data.author_id = this.data.author.id;
                }).catch(e => console.error(e));
            }

        },
        methods: {
            async editNews() {
                let responce;

                try {
                    responce = await this.$axios.put("/api/news/" + this.data.id, this.data);

                    this.$router.push("/news/" + this.data.id);
                } catch (e) {
                    console.log(e);
                    this.error = "Ошибка заполнения полей"
                }
            }
        }
    }
</script>

<style scoped>
  input {
    border: 1px solid white;
  }

  .colum2 {
    display: flex;
    flex-template-columns: 1fr 1fr;
    width: 100%;
  }
</style>
