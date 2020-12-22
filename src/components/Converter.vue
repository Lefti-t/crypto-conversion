<template>
  <div class="container">
    <h3>Cryptocurrency Conversion</h3>
    <div>
      <label for="example-datepicker">Choose a date</label>
      <b-form-datepicker
        id="example-datepicker"
        v-model="date"
        class="mb-2"
      ></b-form-datepicker>
    </div>

    <div>
      <b-form-group label="Cryptocurrency" label-for="coin">
        <b-form-select id="coin" v-model="coin">
          <option v-for="name in tokenData" :key="name">
            {{ name }}
          </option>
        </b-form-select>
      </b-form-group>
    </div>
    <div>
      <b-form-group label="Currency" label-for="currency">
        <b-form-select id="currency" v-model="currency">
          <option>USD</option>
          <option>EUR</option>
          <option>JPY</option>
        </b-form-select>
      </b-form-group>
    </div>
    <div>
      <b-button type="submit" variant="success">Convert</b-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      date: "",
      tokenData: { data: [] },
      coin: null,
      currency: null,
    };
  },
  created() {
    axios
      .get(
        "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LINK&tsyms=USD,EUR,JPY&api_key={96936126838cab0007ad9857056a9a4c40c16f0d50eaf42927c07e2abb2262ad}"
      )
      .then((response) => {
        this.tokenData = response.data;
      })
      .catch((error) => console.log(error));
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@100;400;600&display=swap");
.container {
  padding: 25px;
  width: 30%;
  align-items: center;
  border: 2px solid #00c486;
  border-radius: 5px;
}
h3 {
  font-family: "Open Sans", sans-serif;
  margin-bottom: 20px;
}
</style>