import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResponse(null);

    try {
      const parsedInput = JSON.parse(input);

      const apiResponse = await fetch(
        "https://your-backend-url.herokuapp.com/bfhl",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parsedInput),
        }
      );

      const data = await apiResponse.json();
      setResponse(data);
    } catch (err) {
      setError("Invalid JSON input or API error");
    }
  };

  const handleOptionChange = (option) => {
    setSelectedOptions((prevOptions) =>
      prevOptions.includes(option)
        ? prevOptions.filter((item) => item !== option)
        : [...prevOptions, option]
    );
  };

  const renderResponse = () => {
    if (!response) return null;

    return (
      <div>
        {selectedOptions.includes("Alphabets") && (
          <div>
            <h3>Alphabets:</h3>
            <p>{response.alphabets.join(", ")}</p>
          </div>
        )}
        {selectedOptions.includes("Numbers") && (
          <div>
            <h3>Numbers:</h3>
            <p>{response.numbers.join(", ")}</p>
          </div>
        )}
        {selectedOptions.includes("Highest lowercase alphabet") && (
          <div>
            <h3>Highest lowercase alphabet:</h3>
            <p>{response.highest_alphabet.join(", ")}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>BFHL API Frontend</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter JSON input (e.g., { "data": ["A","C","z"] })'
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p className="error">{error}</p>}
      {response && (
        <div>
          <h2>Select options to display:</h2>
          <div>
            <label>
              <input
                type="checkbox"
                checked={selectedOptions.includes("Alphabets")}
                onChange={() => handleOptionChange("Alphabets")}
              />
              Alphabets
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedOptions.includes("Numbers")}
                onChange={() => handleOptionChange("Numbers")}
              />
              Numbers
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedOptions.includes("Highest lowercase alphabet")}
                onChange={() =>
                  handleOptionChange("Highest lowercase alphabet")
                }
              />
              Highest lowercase alphabet
            </label>
          </div>
          {renderResponse()}
        </div>
      )}
    </div>
  );
}
