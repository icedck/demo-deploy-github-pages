import React, { Component } from "react";
import axios from "axios";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      searchName: "",
      searchBirthday: "",
      currentPage: 1,
      totalPages: 0,
      itemsPerPage: 5,
    };
  }

  fetchUsers(page = 1) {
    const { searchName, searchBirthday, itemsPerPage } = this.state;
    let url = `http://localhost:3004/users?_page=${page}&_limit=${itemsPerPage}&_sort=name&_order=asc`;
    if (searchName) url += `&name_like=${searchName}`;
    if (searchBirthday) url += `&birthday_like=${searchBirthday}`;

    axios
      .get(url)
      .then((res) => {
        const totalCount = parseInt(res.headers["x-total-count"], 10);
        const totalPages = Math.ceil(totalCount / itemsPerPage);
        this.setState({
          users: res.data,
          totalPages,
          currentPage: page,
        });
      })
      .catch((err) => {
        throw err;
      });
  }

  componentDidMount() {
    this.fetchUsers();
  }

  handleSearch = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value, currentPage: 1 }, () => {
      this.fetchUsers(1);
    });
  };

  handlePageChange = (newPage) => {
    this.fetchUsers(newPage);
  };

  handleCreate = () => {
    window.location.href = "/user/add";
  };

  handleEdit = (id) => {
    window.location.href = `/user/${id}`;
  };

  handleDelete = (id) => {
    axios
      .delete(`http://localhost:3004/users/${id}`)
      .then((res) => {
        console.log(res.data);
        this.componentDidMount();
      })
      .catch((err) => {
        throw err;
      });
  };

  render() {
    const { users, currentPage, totalPages, searchName, searchBirthday } = this.state;
    return (
      <div>
        <h1 className="mb-4">Users</h1>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex search-form">
            <input
              type="text"
              name="searchName"
              className="form-control"
              placeholder="Search by name..."
              value={searchName}
              onChange={this.handleSearch}
            />
            <input
              type="date"
              name="searchBirthday"
              className="form-control"
              value={searchBirthday}
              onChange={this.handleSearch}
            />
          </div>
          <button className="btn btn-primary" onClick={this.handleCreate}>
            Create User
          </button>
        </div>

        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Birthday</th>
              <th style={{ width: "150px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td> {user.name} </td>
                <td> {user.birthday} </td>
                <td className="action-buttons">
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => this.handleEdit(user.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => this.handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {totalPages > 0 && (
          <div className="pagination-controls">
            <button
              className="btn btn-outline-secondary"
              onClick={() => this.handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="mx-3">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="btn btn-outline-secondary"
              onClick={() => this.handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Users;
