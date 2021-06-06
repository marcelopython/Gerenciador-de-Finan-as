<template>
  <div>
    <TotalBalance />
    <ToolbarByMonth
      format="MM-YYYY"
      @month="changeMonth"
      :color="toolbarColor"
      :month="$route.query.month"
    />
    <v-card>

      <v-card-text
        class="text-center"
        v-if="mappedRecordsLenght === 0"
      >
        <v-icon
          size="100"
          color="grey"
        >assignment</v-icon>
        <p class="font-weight-light subheading grey--text">
          Nenhum lançamento no periodo
        </p>
      </v-card-text>

      <v-list
        two-line
        subheader
        v-else
      >
        <template v-for="(records, date, index) in mappedRecords">
          <v-subheader :key="date">{{ date }}</v-subheader>
          <RecordsListItem
            v-for="record in records"
            :key="record.id"
            :record="record"
          />
          <v-divider
            :key="`${date}-${index}`"
            v-if="showDivider(index, mappedRecords)"
          ></v-divider>
        </template>
      </v-list>
      <v-footer class="pa-2">
        <v-flex class="">
          <h3 class="font-weight-light text-right">
            <span>Saldo do mês:</span>
            <strong
              class="ml-5"
              :class="amountColor(totalAmount)"
            >{{formatCurrency(totalAmount)}}</strong>
          </h3>
        </v-flex>
      </v-footer>
    </v-card>
  </div>
</template>

<script>
import moment from 'moment'
import { Subject } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import RecordsListItem from './RecordsListItem'
import ToolbarByMonth from './ToolbarByMonth'
import TotalBalance from './TotalBalance'

import RecordsService from './../services/records-service'
import { groupBy } from '@/utils'
import formatCurrencyMixin from '@/mixins/format-currency'
import amountColorMixin from './../mixins/amount-color'

export default {
  name: 'RecordList',
  components: {
    RecordsListItem,
    ToolbarByMonth,
    TotalBalance
  },
  mixins: [
    formatCurrencyMixin,
    amountColorMixin
  ],
  data: () => ({
    records: [],
    monthSubject$: new Subject()
  }),
  computed: {
    mappedRecords () {
      return groupBy(this.records, 'date', (record, dateKey) => {
        return moment(record[dateKey].substr(0, 10)).format('DD/MM/YYYY')
      })
    },
    mappedRecordsLenght () {
      return Object.keys(this.mappedRecords).length
    },
    totalAmount () {
      return this.records.reduce((sum, record) => sum + record.amount, 0)
    },
    toolbarColor () {
      return this.totalAmount < 0 ? 'red  lighten-1' : 'primary'
    }
  },
  created () {
    this.setRecords()
  },
  methods: {
    changeMonth (month) {
      if (this.$route.fullPath !== this.$route.path + '?month=' + month) {
        this.$router.push({
          path: this.$route.path,
          query: { month }
        })
      }
      this.monthSubject$.next({
        month
      })
      this.setRecords(month)
    },
    showDivider (index, object) {
      return index < Object.keys(object).length - 1
    },
    setRecords (month) {
      this.monthSubject$
        .pipe(
          mergeMap((variables) => RecordsService.records(variables))
        )
        .subscribe(records => (this.records = records))
    }

  }
}
</script>
