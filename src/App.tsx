import { useEffect, useRef, useState } from "react";
import ProductList from "./ProductList";

const connect = () => console.log("Connecting");
const disconnect = () => console.log("Disconnecting");

const App = () => {
  const ref = useRef<HTMLInputElement>(null);

  const [category, setCategory] = useState("");

  useEffect(() => {
    document.title = "Back End";
  });

  useEffect(() => {
    connect();

    return () => disconnect();
  });

  return (
    <div>
      <div className="mb-5"></div>
      <select
        name=""
        id=""
        className="form-select"
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value=""></option>
        <option value="clothing">Clothing</option>
        <option value="household">Household</option>
      </select>
      {/* <input ref={ref} type="text" className="form-control" /> */}

      <ProductList category={category} />
    </div>
  );
};

export default App;
