<template>
  <v-navigation-drawer
    :value="value"
    @input="$emit('input', $event)"
    :mini-variant="mini"
    absolute
    temporary
  >
    <v-list>

      <v-list-item
        v-if="mini"
        @click.stop="mini = !mini"
      >

        <v-toolbar-title>

          <v-btn
            icon
            style="display: contents;"
          >
            <v-icon>chevron_right</v-icon>
          </v-btn>

        </v-toolbar-title>

      </v-list-item>

      <v-list-item tag="div">

        <v-list-item-icon>
          <v-icon>person</v-icon>
        </v-list-item-icon>

        <v-list-item-title>User Name</v-list-item-title>

        <v-toolbar-title>
          <v-btn
            icon
            @click.stop="mini = !mini"
          >
            <v-icon>chevron_left</v-icon>
          </v-btn>
        </v-toolbar-title>

      </v-list-item>

    </v-list>

  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'AppMenu',
  props: {
    value: Boolean
  },
  data: () => ({
    items: [
      { title: 'Home', icon: 'dashboard', url: '/dashboard', exact: true }
    ],
    mini: false
  })
}
</script>
