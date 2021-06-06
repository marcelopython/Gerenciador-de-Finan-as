<template>
  <v-card :color="color">
    <v-card-title primary-title>
      <div class="text-center ma-auto">
        <h1 class="display-1">{{ totalIncurrency }}</h1>
      </div>
    </v-card-title>
  </v-card>
</template>

<script>
import formatCurrentMixin from '@/mixins/format-currency'
import RecordsService from './../services/records-service'

export default {
  name: 'TotalBalance',
  mixins: [
    formatCurrentMixin
  ],
  data: () => ({
    total: 0
  }),
  computed: {
    color () {
      return this.total < 0 ? 'red  lighten-1' : 'primary'
    },
    totalIncurrency () {
      return this.formatCurrency(this.total)
    }
  },
  async created () {
    this.total = await RecordsService.totalBalance()
  }
}
</script>
