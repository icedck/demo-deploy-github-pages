import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// export default function UserDetails() {
//   const { userId } = useParams();
//   const isCreate = !userId;
//   const [user, setUser] = useState({});

//   useEffect(() => {
//     axios
//       .get(`http://localhost:3004/users/${userId}`)
//       .then((res) => {
//         setUser(res.data);
//       })
//       .catch((err) => {
//         throw err;
//       });
//   }, [userId]);

//   function handleChange(event) {
//     setUser({
//       ...user,
//       [event.target.name]: event.target.value,
//     });
//   }

//   function handleSubmit() {
//     if (isCreate) {
//       axios
//         .post("http://localhost:3004/users", user)
//         .then((res) => {
//           alert(`Create user ${JSON.stringify(res.data)} successfully!!!`);
//         })
//         .catch((err) => {
//           throw err;
//         });
//     } else {
//       axios
//         .put(`http://localhost:3004/users/${userId}`, user)
//         .then((res) => {
//           alert(`Edit user ${JSON.stringify(res.data)} successfully!!!`);
//         })
//         .catch((err) => {
//           throw err;
//         });
//     }
//   }

//   return (
//     <div>
//       <h1>User details</h1>
//       <form>
//         <div>
//           <label>Id</label>
//           <input
//             name="id"
//             value={user.id || ""}
//             onChange={handleChange}
//             readOnly={!isCreate}
//           />
//         </div>
//         <div>
//           <label>Name</label>
//           <input name="name" value={user.name || ""} onChange={handleChange} />
//         </div>
//         <div>
//           <label>Birthday</label>
//           <input
//             type="date"
//             name="birthday"
//             value={user.birthday || ""}
//             onChange={handleChange}
//           />
//         </div>
//         <button type="button" onClick={handleSubmit}>
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }

export default function UserEdit() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [article, setArticle] = useState({});
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3004/users/${userId}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

    axios
      .get(`http://localhost:3004/articles?userId=${userId}`)
      .then((res) => {
        setArticles(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [userId]);

  function handleChange(event) {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  }

  function handleUserUpdate() {
    axios
      .put(`http://localhost:3004/users/${userId}`, user)
      .then((res) => {
        alert(`Edit user ${JSON.stringify(res.data)} successfully!!!`);
        navigate("/");
      })
      .catch((err) => {
        throw err;
      });
  }

  function handleArticleChange(event) {
    setArticle({
      ...article,
      [event.target.name]: event.target.value,
    });
  }

  function handleAddArticle() {
    const newArticle = {
      ...article,
      userId: Number(userId),
    };

    axios
      .post(`http://localhost:3004/articles`, newArticle)
      .then((res) => {
        alert(`Add article ${JSON.stringify(res.data)} successfully!!!`);
        setArticles([...articles, res.data]);
        setArticle({});
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleEditArticle(articleToEdit) {
    const updated = {
      ...articleToEdit,
      title: prompt("New title:", articleToEdit.title),
    };

    axios
      .put(`http://localhost:3004/articles/${articleToEdit.id}`, updated)
      .then((res) => {
        alert("Article updated!", res.data);
        setArticles(articles.map((a) => (a.id === updated.id ? updated : a)));
      });
  }

  function handleDeleteArticle(articleId) {
    axios.delete(`http://localhost:3004/articles/${articleId}`).then(() => {
      alert("Article deleted!");
      setArticles(articles.filter((a) => a.id !== articleId));
    });
  }

  return (
    <div>
      <Link to="/" className="btn btn-secondary mb-4">
        Back to List
      </Link>

      {/* Form chỉnh sửa người dùng */}
      <div className="card">
        <div className="card-header">
          <h2 className="h4 mb-0">User Details</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleUserUpdate}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                id="name"
                name="name"
                className="form-control"
                value={user.name || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="birthday" className="form-label">
                Birthday
              </label>
              <input
                type="date"
                id="birthday"
                name="birthday"
                className="form-control"
                value={user.birthday || ""}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Update User
            </button>
          </form>
        </div>
      </div>

      {/* Phần quản lý bài viết */}
      <div className="card mt-5">
        <div className="card-header">
          <h2 className="h4 mb-0">Articles</h2>
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="New article title"
              value={article.title}
              onChange={handleArticleChange}
            />
            <button
              className="btn btn-success"
              type="button"
              onClick={handleAddArticle}
            >
              Add Article
            </button>
          </div>

          <table className="table table-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th style={{ width: "150px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((art) => (
                <tr key={art.id}>
                  <td>{art.title}</td>
                  <td className="action-buttons">
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => handleEditArticle(art)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteArticle(art.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
  