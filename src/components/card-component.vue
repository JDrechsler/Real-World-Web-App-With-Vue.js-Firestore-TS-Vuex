<template>
  <q-card :class="getDueClass()">
    <div class="card-biller-due">
      <div class="due-sign">
        <q-icon :name="dueIcon"></q-icon>
      </div>
      <div class="due-text">
        {{propbill.dayOfMonth}}
      </div>
    </div>
    <div class="card-biller-image">
      <img :src="propbill.imageUrl" />
    </div>
    <div class="card-biller-title">
      {{propbill.title}}
    </div>
    <div class="card-biller-price" :class='getPriceClass()'>
      ${{propbill.amount}}
    </div>
  </q-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

const date = new Date();

@Component({})
export default class Card extends Vue {
  @Prop({ required: true })
  propbill!: Bill;

  getPriceClass() {
    return {
      isPaid: this.propbill.isPaid,
      isNotPaid: !this.propbill.isPaid
    };
  }

  getDueClass() {
    return {
      duePast:
        !this.propbill.isPaid && this.propbill.dayOfMonth < date.getDate(),
      dueToday:
        !this.propbill.isPaid && this.propbill.dayOfMonth === date.getDate(),
      dueOneDay:
        !this.propbill.isPaid &&
        this.propbill.dayOfMonth === date.getDate() + 1,
      dueTwoDays:
        !this.propbill.isPaid &&
        this.propbill.dayOfMonth === date.getDate() + 2,
      dueThreeDays:
        !this.propbill.isPaid && this.propbill.dayOfMonth === date.getDate() + 3
    };
  }

  get dueIcon() {
    if (!this.propbill.isPaid && this.propbill.dayOfMonth < date.getDate())
      return 'priority_high'; //report, error_outline
    if (!this.propbill.isPaid && this.propbill.dayOfMonth === date.getDate())
      return 'error_outline';
    if (
      !this.propbill.isPaid &&
      this.propbill.dayOfMonth === date.getDate() + 1
    )
      return 'notifications_none';
    if (
      !this.propbill.isPaid &&
      this.propbill.dayOfMonth === date.getDate() + 2
    )
      return 'notifications_none';
    if (
      !this.propbill.isPaid &&
      this.propbill.dayOfMonth === date.getDate() + 3
    )
      return 'notifications_none';
  }
}
// @fts-check
</script>

<style scoped>
.q-card {
  display: grid !important;
  grid-template-columns: 1fr 2fr 2fr 1fr;
  grid-template-areas: 'card-biller-due card-biller-image card-biller-title card-biller-price';
  padding-right: 10px;
  margin-bottom: 10px;
  min-width: 250px;
  min-height: 120px;
  max-width: 900px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  background: rgba(239, 239, 218, 0.63);
}
.card-biller-due {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas:
    'biller-due-sign'
    'card-biller-due'
    '.';
}
.due-text {
  justify-self: center;
  align-self: center;
  color: rgba(0, 0, 0, 0.54);
  font-size: 16px;
  grid-area: card-biller-due;
}
.due-sign {
  font-size: 31px;
  justify-self: center;
  align-self: center;
  grid-area: biller-due-sign;
}
.card-biller-image {
  grid-area: card-biller-image;
  justify-self: start;
  align-self: center;
}
.card-biller-title {
  font-size: 16px;
  grid-area: card-biller-title;
  justify-self: start;
  align-self: center;
}
.card-biller-price {
  font-size: 16px;
  grid-area: card-biller-price;
  justify-self: end;
  align-self: center;
}
.isPaid {
  color: green;
  text-decoration: line-through;
}
.isNotPaid {
  font-weight: 500;
}
.dueToday {
  border-right: 6px solid red;
}
.dueOneDay {
  border-right: 6px solid rgb(204, 66, 16);
}
.dueTwoDays {
  border-right: 6px solid rgb(209, 169, 66);
}
.dueThreeDays {
  border-right: 3px solid rgb(66, 209, 142);
}
.duePast {
  border: 6px solid red;
}
@media screen and (max-width: 300px) {
  .card-biller-image > img {
    width: 60px;
  }
}
@media screen and (min-width: 301px) {
  .card-biller-image > img {
    width: 70px;
  }
}
@media screen and (min-width: 351px) {
  .card-biller-image > img {
    width: 80px;
  }
}
@media screen and (min-width: 401px) {
  .card-biller-image > img {
    width: 100px;
  }
}
</style>