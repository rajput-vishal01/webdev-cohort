import { useState } from "react";
import "./App.css";
import useCurrencyInfo from "./hooks/useCurrencyinfo.js";
import { InputBox } from "./components/index.js";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const swap = () => {
    setAmount((prevAmount) => convertedAmount);
    setConvertedAmount((prevConvertedAmount) => amount);
    setFrom((prevFrom) => to);
    setTo((prevTo) => from);
  };

  const convert = () => {
    if (currencyInfo && currencyInfo[to]) {
      setConvertedAmount(amount * currencyInfo[to]);
    } else {
      console.error("Conversion rate not available");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Currency Converter
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
          className="space-y-6">
          <InputBox
            label="From"
            amount={amount}
            currencyOptions={options}
            onCurrencyChange={(currency) => setFrom(currency)}
            onAmountChange={(amount) => setAmount(amount)}
            selectedCurrency={from}
          />
          <div className="flex justify-center">
            <button
              type="button"
              onClick={swap}
              className="w-10 h-10 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v6h6M20 20v-6h-6M4 10l6 6m10-6l-6 6"
                />
              </svg>
            </button>
          </div>
          <InputBox
            label="To"
            amount={convertedAmount}
            currencyOptions={options}
            onCurrencyChange={(currency) => setTo(currency)}
            selectedCurrency={to}
            amountDisabled
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700">
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
