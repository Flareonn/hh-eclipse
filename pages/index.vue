<template>
  <div class="list">
    <el-card style="margin-bottom: 1rem">
      <el-form class="list-form" :model="controls">
        <el-row type="flex" justify="space-between" style="margin-bottom: 10px">
          <el-col :sm="12">
            <el-input
              v-model="controls.search.text"
              :placeholder="'Введите'"
              autofocus
              clearable
            />
          </el-col>
          <el-col :sm="8">
            <el-select
              v-model="controls.search.mode"
              placeholder="Сортировка по..."
              :style="{ width: '100%' }"
            >
              <el-option value="Name" label="названию" />
              <el-option value="NumCode" label="коду" />
            </el-select>
          </el-col>
        </el-row>
        <el-row type="flex" justify="end">
          <el-col :sm="8">
            <el-select
              v-model="controls.ownCurrency"
              :style="{ width: '100%' }"
              @change="setOwnCurrency"
            >
              <el-option
                v-for="{ Name, ID, CharCode } in currencies"
                :value="CharCode"
                :key="ID"
                :label="Name"
              />
            </el-select>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <v-card
      class="list-item"
      v-for="currency in filteredCurrencies"
      :key="currency.ID"
      :currency="currency"
      :own="getCurrencyByCharCode(controls.ownCurrency)"
    />
  </div>
</template>

<script>
import VCard from "@/components/VCard.vue";
import { getCurrencyByCharCode } from "@/use";

export default {
  name: "IndexPage",
  components: {
    VCard,
  },
  data() {
    return {
      getCurrencyByCharCode,
      controls: {
        search: {
          text: "",
          mode: "Name",
        },
        ownCurrency: this.$store.getters.getOwnCurrency.CharCode,
      },
    };
  },
  methods: {
    setOwnCurrency() {
      this.$store.commit("setOwnByCharCode", this.controls.ownCurrency);
    },
  },
  computed: {
    filteredCurrencies() {
      const { mode, text } = this.controls.search;
      return this.currencies.filter((currency) =>
        currency[mode].includes(text)
      );
    },
  },
  async asyncData({ error, store }) {
    if (store.getters.currencies) {
      const currencies = store.getters.currencies;
      return { currencies };
    }
    try {
      const currencies = await store.dispatch("fetchCurrency");
      return { currencies };
    } catch (e) {
      error(e);
    }
  },
};
</script>

<style lang="sass" scoped>
.list
  max-width: 1200px
  width: 100%
  margin-top: 0.5rem
</style>