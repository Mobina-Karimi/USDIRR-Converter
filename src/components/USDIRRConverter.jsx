import { useState, useEffect } from "react";
import { getUsdRate } from "../services/ConverterApi";
import styles from "./USDIRRConverter.module.css"

function USDIRRConverter() {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("usd");
  const [usdValue, setUsdValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRate = async () => {
      if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) return;

      setIsLoading(true);
      setError(null);

      const rate = await getUsdRate();
      if (rate) {
        setUsdValue(rate);
      } else {
        setError("Getting rates error");
      }

      setIsLoading(false);
    };

    fetchRate();
  }, [amount]);

  const computeResult = () => {
    const value = parseFloat(amount);
    if (isNaN(value) || !usdValue) return "";

    return from === "usd"
      ? (value * usdValue).toLocaleString()
      : (value / usdValue).toFixed(2);
  };

  return (
    <div className={styles.container}>
      <div className={styles.userInput}>
        <input
          type="text"
          placeholder={`Enter your price (${from === "usd" ? "USD" : "ریال"})`}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className={styles.input}
        />
        <button
          onClick={() => setFrom(from === "usd" ? "rial" : "usd")}
          disabled={isLoading}
          className={styles.usdIrrBtn}
          style={{cursor: isLoading ? "not-allowed" : "pointer"}}
        >
          {from === "usd" ? "USD → ریال" : "ریال → USD"}
        </button>
      </div>

      <div className={styles.result}>
        <input
          type="text"
          value={computeResult()}
          readOnly
          className={styles.resultInput}
        />
        <span style={{ marginLeft: "10px"}}>{from === "usd" ? "ریال" : "USD"}</span>
      </div>

      {isLoading && <p>Loading Rates ...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default USDIRRConverter;

