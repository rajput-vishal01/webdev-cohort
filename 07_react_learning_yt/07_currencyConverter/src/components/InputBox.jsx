import React, { useId } from "react";

function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectedCurrency = "usd",
  amountDisabled = false,
  currrencyDisabled = false,
  className = "",
  id = useId(),
}) {
  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      <label htmlFor={id} className="text-white font-medium text-sm">
        {label}
      </label>
      <div className="flex items-center space-x-2">
        <input
          id={id}
          type="number"
          placeholder="Amount"
          value={amount}
          disabled={amountDisabled}
          onChange={(e) =>
            onAmountChange && onAmountChange(Number(e.target.value))
          }
          className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        />
        <select
          value={selectedCurrency}
          onChange={(e) => {
            onCurrencyChange && onCurrencyChange(e.target.value);
          }}
          disabled={currrencyDisabled}
          className="bg-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50">
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default InputBox;
