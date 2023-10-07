import axios, {AxiosError} from "axios";
import { useEffect, useState } from "react";

// import { useEffect, useRef, useState } from "react";
// import ProductList from "./ProductList";

// const connect = () => console.log("Connecting");
// const disconnect = () => console.log("Disconnecting");

interface User {
  id: number;
  name: string;
}

const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    //Using await and async
    const fetchUsers = async () => {
      const res = await axios.get<User[]>(
        "https://jsonplaceholder.typicode.com/users"
        
      );
      setUsers(res.data)
    };
    catch (error) {
      setError((err as AxiosError).message);
    }

    //Using promise to get data with then as response and catch to catch error
    // axios
    //   .get<User[]>("https://jsonplaceholder.typicode.com/Xusers")
    //   .then((res) => setUsers(res.data))
    //   .catch((err) => {
    //     setError(err.message);
    //   });
  }, []);
  // const ref = useRef<HTMLInputElement>(null);

  // const [category, setCategory] = useState("");

  // useEffect(() => {
  //   document.title = "Back End";
  // });

  // useEffect(() => {
  //   connect();

  //   return () => disconnect();
  // });

  return (
    <div>
      {error && <h1 className="text-danger">{error}</h1>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>

      {/* <div className="mb-5"></div>
      <select
        name=""
        id=""
        className="form-select"
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value=""></option>
        <option value="clothing">Clothing</option>
        <option value="household">Household</option>
      </select> */}
      {/* <input ref={ref} type="text" className="form-control" /> */}

      {/* <ProductList category={category} /> */}
    </div>
  );
};

export default App;
