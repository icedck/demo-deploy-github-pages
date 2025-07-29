import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./pages/Users";
import UserEdit from "./pages/UserEdit";
import UserCreate from "./pages/UserCreate";
import "./App.css";

export default function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path={"/user/add"} element={<UserCreate />} />
          <Route path={`/user/:userId`} element={<UserEdit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       users: [],
//     };
//   }

// componentDidMount() {
//   this.setState({ loading: true });
//   this.getUsers()
//     .then((res) => {
//       this.setState({ users: res.data });
//     })
//     .catch((err) => {
//       throw err;
//     })
//     .finally(() => {
//       this.setState({ loading: false });
//     });
// }

// componentDidMount() {
//   const getUsers = axios.get("http://localhost:3004/users");
//   const getArticle = axios.get("http://localhost:3004/articles");
//   axios
//     .all([getUsers, getArticle])
//     .then(
//       axios.spread((res1, res2) => {
//         const users = res1.data.map((user) => {
//           return {
//             ...user,
//             article: res2.data.filter((item) => {
//               return item.userId === Number(user.id);
//             }),
//           };
//         });
//         this.setState({ users: users });
//       })
//     )
//     .catch((err) => {
//       throw err;
//     });
// }

// getUsers = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       axios
//         .get("http://localhost:3004/users")
//         .then((res) => {
//           resolve(res);
//         })
//         .catch((err) => {
//           reject(err);
//         });
//     }, 3000);
//   });
// };

// getUsers = async () => {
//   await new Promise((resolve) => {
//     setTimeout(resolve, 3000);
//   });
//   return await axios.get("http://localhost:3004/users");
// };

// render() {
//   const { loading, users } = this.state;
//   if (loading) return <p>loading...</p>;
//   return (
//     <div>
//       <h1>Users</h1>
//       <ul>
//         {users.map((user) => (
//           <li key={user.id}> {user.name} </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

//   render() {
//     const { users } = this.state;
//     return (
//       <div>
//         <h1>Users</h1>
//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Article numbers</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user.id}>
//                 <td> {user.name} </td>
//                 <td> {user.article.length} </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   }
// }
