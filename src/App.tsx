import axios, { AxiosError, CanceledError } from "axios";
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
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    //Using await and async
    // const fetchUsers = async () => {
    //   try {
    //     const res = await axios.get<User[]>(
    //       "https://jsonplaceholder.typicode.com/users"
    //     );
    //     setUsers(res.data);
    //   } catch (err) {
    //     setError((err as AxiosError).message);
    //   }

    //   fetchUsers();

    // Using promise to get data with then as response and catch to catch error
    // axios

    const controller = new AbortController();

    setLoading(true);
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users", {
        signal: controller.signal,
      })
      .then((res) => {
        setUsers(res.data), setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message), setLoading(false);
      });

    return () => controller.abort();
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

  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));

    axios
      .delete("https://jsonplaceholder.typicode.com/users/" + user.id)
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  const addUser = () => {
    const newUser = { id: 1, name: "Sagir" };
    setUsers([newUser, ...users]);

    axios
      .post("https://jsonplaceholder.typicode.com/users/", newUser)
      .then((res) => setUsers([res.data, ...users]));
  };

  return (
    <div>
      <button className="btn btn-primary mb-3" onClick={addUser}>
        Add User
      </button>
      {error && <h1 className="text-danger">{error}</h1>}

      {isLoading && <div className="spinner-border"></div>}

      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between"
          >
            {user.name}
            <button
              className="btn btn-outline-danger"
              onClick={() => deleteUser(user)}
            >
              Delete
            </button>{" "}
          </li>
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
