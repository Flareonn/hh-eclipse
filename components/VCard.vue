<template>
  <el-card class="list-item">
    <h2 class="list-item__title">{{ currency.Name }}</h2>
    <div class="list-item__body">
      <div class="list-item__wrapper">
        <span class="list-item__currency">
          {{ currency.Nominal }} {{ currency.CharCode }}
        </span>
        <span>
          <i class="el-icon-d-caret" :style="{ transform: 'rotate(90deg)' }" />
        </span>
        <span class="list-item__currency">
          {{ getRate }} {{ own.CharCode }}
        </span>
      </div>
      <el-tooltip
        :class="['list-item__wrapper', isLower ? 'success' : 'danger']"
        effect="dark"
        :content="`По состоянию со вчера: ${currency.Previous} ₽`"
        placement="right"
      >
        <span>
          <i class="el-icon-top" />
          {{ getDifference }} &#8381;
        </span>
      </el-tooltip>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "VCard",
  props: {
    currency: {
      type: Object,
      required: true,
    },
    own: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isLower: null,
    };
  },
  computed: {
    getDifference() {
      const difference = this.currency.Value - this.currency.Previous;
      this.isLower = difference < 0;
      return Math.abs(difference).toFixed(4);
    },
    getRate() {
      if (this.own.CharCode === this.currency.CharCode) {
        return 1 * this.own.Nominal; // Если основная валюта совпадает с просматриваемой
      }
      if (this.own.CharCode === "RUB") {
        return this.currency.Value; // Если основная валюта рубль - вернуть этль эе куос
      } else {
        // Если это разные валюты, то умножаем просматриваемую на кол-во основной и делим на основную
        return (
          (this.currency.Value * this.own.Nominal) /
          this.own.Value
        ).toFixed(4);
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.list-item
  margin-bottom: 0.5rem
  &__title
    color: #b8b8b8
    font-weight: normal
    font-size: 1rem
    margin-bottom: .5rem
  &__body
    display: flex
    justify-content: space-between
  &__wrapper // Это решение куда лучше, чем дважды использовать условие
    cursor: default
    &.danger > i
      transform: rotate(180deg)
    &.success > i
      transform: rotate(0deg)
  &__currency
    color: #4b4b4b
</style>