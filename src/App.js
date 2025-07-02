import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [from, setFrom] = useState("EUR");
  const [to, setTo] = useState("USD");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function convert() {
        try {
          setIsLoading(true);
          const result = await fetch(
            `https://api.frankfurter.app/latest?amount=${Number(
              input
            )}&from=${from}&to=${to}`
          );

          const data = await result.json();
          if (Number(input)) {
            setOutput(() => data.rates[to]);
          }
        } catch (e) {
          console.log(e.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (from === to) return setOutput(input);

      convert();
    },
    [input, from, to]
  );

  return (
    <div className="App">
      <input
        type="text"
        disabled={isLoading}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <select
        value={from}
        disabled={isLoading}
        onChange={(e) => setFrom(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
      </select>
      <select
        value={to}
        disabled={isLoading}
        onChange={(e) => setTo(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
      </select>
      <p>
        output: {output} {to}
      </p>
    </div>
  );
}
