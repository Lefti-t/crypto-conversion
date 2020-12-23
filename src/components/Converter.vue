<template>
  <div class="container">
    <h3>Cryptocurrency Conversion</h3>

    <div>
      <b-form>
        <div>
          <label for="datepicker">Choose a date</label>
          <b-form-datepicker
            id="datepicker"
            v-model="date"
            class="mb-2"
          ></b-form-datepicker>

          <b-form-group label="Cryptocurrency" label-for="coin">
            <b-form-select id="coin" v-model="coin.symbol" >
              <option v-for="name in Object.keys(tokenData)" :key="name">
                {{ name }}
              </option>
            </b-form-select>
          </b-form-group>

          <b-form-group label="Currency" label-for="currency">
            <b-form-select id="currency" v-model="currency">
              <option>USD</option>
              <option>EUR</option>
              <option>JPY</option>
            </b-form-select>
          </b-form-group>
        </div>
        <div>
          <b-button type="button" v-on:click="convert" variant="success"
            >Convert</b-button
          >
        </div>
      </b-form>
    </div>
    <div class="result-container">
      <p id="resultMsg" v-show="conversionCompleted">{{ convertedResult }}</p>
      <p id="resultErrorMsg" v-show="!conversionCompleted">{{ convertedResult }}</p>
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
      coin: {
        symbol: "",
      },
      currency: "",
      conversionCompleted: false,
      convertedResult: "",
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
  methods: {
    convert() {
      let coin = this.coin.symbol;
      let currency = this.currency;
      let value = this.tokenData[coin][currency] + currency;
      if (this.coin.symbol === "" || this.currency === "" ){
            this.conversionCompleted = false;
        this.convertedResult = "Please choose both currencies";
      }
      if (this.coin.symbol !== "" && this.currency !== "") {
        this.conversionCompleted = true;
        this.convertedResult = "The value of " + coin + " is  " + value;
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@100;400;600&display=swap");
.container {
  padding: 25px;
  height: 50%;
  width: 30%;
  align-items: center;
  border: 2px solid #00c486;
  border-radius: 5px;
  overflow: hidden;
}
h3 {
  font-family: "Open Sans", sans-serif;
  margin-bottom: 50px;
}
.result-container {
  margin-bottom: 20px;
  margin-top: 20px;
  height: 5%;
  overflow: hidden;
}
#resultMsg {
  font-family: "Open Sans", sans-serif;
  font-size: 20px;
}
#resultErrorMsg {
  font-family: "Open Sans", sans-serif;
  font-size: 20px;
  color: red;
}
</style>