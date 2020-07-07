<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="date"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        label="년월선택"
        prepend-icon=""
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="date" type="month" no-title scrollable>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
      <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
export default {
  data() {
    return {
      date: new Date().toISOString().substr(0, 7),
      menu: false,
      modal: false
    };
  }
};
</script>
