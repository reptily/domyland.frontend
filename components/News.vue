<template>
  <div>
    <v-card-text v-if="preview" style="min-height: 85px">
      <div class="block">
        <div>
          <img :src="content.image" height="80" width="100" :alt="content.title"
               style="background: grey; margin-right: 10px">
        </div>
        <div>
          <h3>{{ content.title }}</h3>
          <span class="time">{{ convTime(content.date) }}</span> <span><nuxt-link :to="'/author/' + content.author.id">{{ content.author.name }}</nuxt-link></span><br>
          {{ content.preview }}
          <div>
            <nuxt-link :to="'/news/' + content.id">Подробнее</nuxt-link:>
          </div>
        </div>
      </div>
    </v-card-text>
    <v-card-text v-else>
      <h1>{{ content.title }}</h1>
      <span class="time">{{ convTime(content.date) }}</span> <span>{{ content.author.name }}</span><br>
      <img :src="content.image" height="200" width="300" :alt="content.title"
           style="background: grey;"><br>
        {{ content.body }}

    </v-card-text>
  </div>
</template>

<script>
    export default {
        props: [
            'content',
            'preview'
        ],
        methods: {
            convTime(time) {
                let t = time.split("-");

                const m = {
                    '01': 'Январь',
                    '02': 'Февраль',
                    '03': 'Март',
                    '04': 'Апрель',
                    '05': 'Май',
                    '06': 'Июнь',
                    '07': 'Июль',
                    '08': 'Август',
                    '09': 'Сентябрь',
                    '10': 'Октябрь',
                    '11': 'Ноябрь',
                    '12': 'Декабрь',
                };

                return t[2] + " " + m[t[1]];
            }
        }
    }
</script>

<style scoped>
  .time {
    color: grey;
    margin-right: 15px;
  }

  .block {
    display: flex;
    flex-template-colums: 120px 1fr;
  }
</style>
