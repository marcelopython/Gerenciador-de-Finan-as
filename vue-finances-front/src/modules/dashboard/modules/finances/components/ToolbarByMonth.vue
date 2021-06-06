<template>
  <v-toolbar :color="color">
    <v-layout align-center>

      <v-flex>
        <div class="text-left">
          <v-btn
            icon
            text
            @click="decrement"
          >
            <v-icon>chevron_left</v-icon>
          </v-btn>
        </div>
      </v-flex>

      <v-flex
        xs8
        :class="arrowRightClass"
      >

        <v-toolbar-title class="text-center">
          <span>{{currentMonth}}</span>
        </v-toolbar-title>

      </v-flex>

      <v-flex
        xs1
        text-right
        v-if="showSlot"
      >
        <slot />
      </v-flex>

      <v-flex :class="arrowRightClass">
        <div class="text-right">
          <v-btn
            icon
            text
            @click="increment"
          >
            <v-icon>chevron_right</v-icon>
          </v-btn>
        </div>
      </v-flex>

    </v-layout>
  </v-toolbar>
</template>

<script>

import moment from 'moment'

export default {
  name: 'ToolbarByMonth',
  props: {
    format: String,
    color: String,
    month: String,
    showSlot: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    date: undefined
  }),
  computed: {
    arrowRightClass () {
      return !this.showSlot ? 'offset-xs' : ''
    },
    currentMonth () {
      return this.date.format('MMMM YYYY')
    }
  },
  created () {
    this.setCurretMonth()
    this.emit()
  },
  methods: {
    emit () {
      this.$emit('month', this.date.format(this.format))
    },
    decrement () {
      this.date = this.date.clone().subtract(1, 'month')
      this.emit()
    },
    increment () {
      this.date = this.date.clone().add(1, 'month')
      this.emit()
    },
    setCurretMonth () {
      this.date = this.month ? moment(this.month, this.format) : moment()
    }
  }

}
</script>
