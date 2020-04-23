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
      @click="addNews"
    >Добавить
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
        async mounted() {
            let responce;

            try {
                responce = await this.$axios.get("/api/author");
                this.author = responce.data;
            } catch (e) {
                console.error(e);
            }

        },
        methods: {
            async addNews() {
                let responce;

                try {
                    responce = await this.$axios.post("/api/news", this.data);
                    let id = responce.data.id;

                    this.$router.push("/news/" + id);
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
