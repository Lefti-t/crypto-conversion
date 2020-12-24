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
            <b-form-select id="coin" v-model="coin.symbol">
              <option v-for="name in Object.keys(tokenData)" :key="name">
                {{ name }}
              </option>
            </b-form-select>
          </b-form-group>
          <b-form-group label="Amount" label-for="amount">
            <b-form-input
              v-model="coin.amount"
              id="amount"
              type="number"
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Currency" label-for="currency">
            <b-form-select id="currency" v-model="currency">
              <option>USD</option>
              <option>EUR</option>
              <option>JPY</option>
            </b-form-select>
          </b-form-group>
        </div>
        <div class="convertButton">
          <b-button type="button" v-on:click="convert" variant="success"
            >Convert</b-button
          >
        </div>
      </b-form>
    </div>
    <div class="result-container">
      <p id="resultMsg" v-show="conversionCompleted">{{ convertedResult }}</p>
      <p id="resultErrorMsg" v-show="!conversionCompleted">
        {{ convertedResult }}
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import numeral from "numeral";
export default {
  data() {
    return {
      date: "",
      tokenData: { data: [] },
      coin: {
        symbol: "",
        amount: "",
      },
      currency: "",
      conversionCompleted: false,
      convertedResult: "",
    };
  },
  created() {
    axios
      .get(
        "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LINK,XRP,LTC,ETC&tsyms=USD,EUR,JPY&api_key={96936126838cab0007ad9857056a9a4c40c16f0d50eaf42927c07e2abb2262ad}"
      )
      .then((response) => {
        this.tokenData = response.data;
      })
      .catch((error) => console.log(error));
  },
  methods: {
    convert() {
      let amount = this.coin.amount;
      let coin = this.coin.symbol;
      let currency = this.currency;
      if (
        !this.coin ||
        !this.coin.symbol ||
        this.coin.symbol === "" ||
        this.amount === "" ||
        !this.currency ||
        this.currency === ""
      ) {
        this.convertedResult = "Please choose both currencies and an amount.";
      } else {
        let value =
          numeral(this.tokenData[coin][currency] * amount).format(
            "0,000.000a"
          ) +
          " " +
          currency;
        this.conversionCompleted = true;
        this.convertedResult =
          "The value of " + amount + " " + coin + " is  " + value;

        console.log(this.tokenData.BTC.USD);
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@100;400;600&display=swap");
.container {
  padding: 15px;
  width: 40%;
  height: 90%;
  align-items: center;
  border: 2px solid #00c486;
  border-radius: 5px;
  overflow: hidden;
  background: #f3f5f5;
    box-shadow: 0px 0px 8px 0px #00c486;
}
h3 {
  font-family: "Open Sans", sans-serif;
  margin-bottom: 50px;
  text-align: center;
}

.result-container {
  margin-top: 20px;
  height: 50px;
}
#resultMsg {
  font-family: "Open Sans", sans-serif;
  font-size: 20px;
  text-align: center;
}
#resultErrorMsg {
  font-family: "Open Sans", sans-serif;
  font-size: 20px;
  color: red;
  text-align: center;
}
.convertButton {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>