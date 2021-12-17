<template>
  <div class="converter">
    <el-card class="converter-form" :model="controls">
      <el-form>
        <el-row
          type="flex"
          justify="space-between"
          align="middle"
          style="margin-bottom: 10px"
        >
          <el-col :sm="6">
            <h2>
              {{
                currencies.find(
                  (cur) => cur.CharCode === controls.CharCode.from
                ).Name
              }}
            </h2>
            <div class="converter-form__wrapper">
              <el-select
                v-model="controls.CharCode.from"
                :style="{ width: '100%' }"
                ref="from"
                @change="convert('from')"
              >
                <el-option
                  :value="CharCode"
                  :label="CharCode"
                  v-for="{ CharCode, ID } in currencies"
                  :key="ID"
                />
              </el-select>
              <el-input v-model="controls.Value.from" @input="convert('to')" />
            </div>
          </el-col>
          <button class="converter-form__button" @click.prevent="reverse">
            <i
              class="el-icon-d-caret"
              :style="{ transform: 'rotate(90deg)' }"
            />
          </button>
          <el-col :sm="6">
            <h2>
              {{
                currencies.find((cur) => cur.CharCode === controls.CharCode.to)
                  .Name
              }}
            </h2>
            <div class="converter-form__wrapper">
              <el-select
                v-model="controls.CharCode.to"
                :style="{ width: '100%' }"
                ref="to"
                @change="convert('to')"
              >
                <el-option
                  :value="CharCode"
                  :label="CharCode"
                  v-for="{ CharCode, ID } in currencies"
                  :key="ID"
                />
              </el-select>
              <el-input v-model="controls.Value.to" @input="convert('from')" />
            </div>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getCurrencyByCharCode } from "@/use";

export default {
  name: "ConverterPage",
  data() {
    return {
      currencies: this.$store.getters.currencies,
      getCurrencyByCharCode,
      controls: {
        CharCode: {
          from: this.$store.getters.getOwnCurrency.CharCode,
          to: "KZT",
        },
        Value: {
          from: this.$store.getters.getOwnCurrency.Value,
          to: 1,
        },
      },
    };
  },
  mounted() {
    this.convert("to");
  },
  methods: {
    reverse() {
      const reverser = (field) => {
        let a = this.controls[field].from;
        this.controls[field].from = this.controls[field].to;
        this.controls[field].to = a;
      };
      reverser("CharCode");
      reverser("Value");
    },
    convert(field) {
      const reverseField = field === "to" ? "from" : "to";
      const from = this.getCurrencyByCharCode(
        this.controls.CharCode[reverseField]
      );
      const to = this.getCurrencyByCharCode(this.controls.CharCode[field]);

      const normalizeNominal = from.Value / from.Nominal;
      const result =
        (normalizeNominal / to.Value) *
        this.controls.Value[reverseField] *
        to.Nominal;

      this.controls.Value[field] = result.toFixed(2);
    },
  },
  async validate({ store }) {
    if (!store.getters.currencies) {
      await store.dispatch("fetchCurrency");
    }
    return true;
  },
};
</script>

<style lang="sass" scoped>
h2
  font-size: 1.2rem
  margin-bottom: 0.75rem
.converter
  margin-top: 0.5rem
  max-width: 1200px
  width: 100%
  &-form__button
    width: 50px
    height: 50px
    border-radius: 50%
    background-color: transparent
    transition: .125s background-color linear
    cursor: pointer
    border: .5px solid #409EFF
    &:hover
      background-color: #409EFF
      transition: .125s background-color linear
</style>