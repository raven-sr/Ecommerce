import { useEffect, useMemo, useState } from "react";
import {
  Users,
  Search,
  Eye,
  Edit,
  Trash2,
  ShieldCheck,
  User,
  UserCheck,
  UserCog,
  Mail,
  CalendarDays,
  MoreVertical,
} from "lucide-react";
import toast from "react-hot-toast";
import Footer from "../components/footer";
import Nav from "../components/nav";
import { useDispatch, useSelector } from "react-redux";
import {
  AllUsers,
  UpdateUser,
  DeleteUser,
} from "../reduxslice/userslice";

function ManageUsers() {
  const { users = [], loading } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    dispatch(AllUsers());
  }, [dispatch]);

  const totalUsers = users.length;

  const totalAdmins = users?.filter(
    (user) => user.role === "admin"
  ).length;

  const totalNormalUsers = users?.filter(
    (user) => user.role === "user"
  ).length;

  const filteredUsers = useMemo(() => {
    return users?.filter((user) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        user.name?.toLowerCase().includes(searchValue) ||
        user.email?.toLowerCase().includes(searchValue);

      const matchesRole =
        roleFilter === "all" ||
        user?.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter]);

  const viewUser = (user) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  const closeViewModal = () => {
    setShowViewModal(false);
    setSelectedUser(null);
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setSelectedRole(user.role);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedUser(null);
    setSelectedRole("");
  };

  const updateUser = async () => {
    if (!selectedUser) return;

    try {
      await dispatch(
        UpdateUser({
          id: selectedUser._id,
          value: {
            role: selectedRole,
          },
        })
      ).unwrap();

      toast.success("User role updated successfully");

      closeEditModal();

      dispatch(AllUsers());
    } catch (error) {
      toast.error(
        error?.message ||
          error?.error ||
          "Failed to update user"
      );
    }
  };

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await dispatch(DeleteUser(id)).unwrap();

      toast.success("User deleted successfully");

      dispatch(AllUsers());
    } catch (error) {
      toast.error(
        error?.message ||
          error?.error ||
          "Failed to delete user"
      );
    }
  };

  const formatDate = (date) => {
    if (!date) return "Unknown";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  const UserAvatar = ({ user, size = 60 }) => {
    if (user?.avatar?.url) {
      return (
        <img
          src={user.avatar.url}
          alt={user.name}
          className="rounded-circle"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            objectFit: "cover",
          }}
        />
      );
    }

    return (
      <div
        className="rounded-circle d-flex align-items-center justify-content-center fw-bold"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: "#E8F1EE",
          color: "#5C8374",
          fontSize: size >= 60 ? "22px" : "17px",
        }}
      >
        {user?.name
          ? user.name.charAt(0).toUpperCase()
          : "U"}
      </div>
    );
  };

  return (
    <div>
      <Nav />

      <div className="container mt-5">
        {/* HEADER */}

        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">
          <div>
            <h2 className="fw-bold mb-1">
              Users
            </h2>

            <p className="text-muted mb-0">
              Manage customers and administrator accounts
            </p>
          </div>

          <div className="bg-white border rounded px-3 py-2 d-flex align-items-center gap-2">
            <Users
              size={18}
              style={{
                color: "#5C8374",
              }}
            />

            <strong>{totalUsers}</strong>

            <span className="text-muted">
              Total Users
            </span>
          </div>
        </div>

        {/* STATISTICS */}

        <div className="row g-3 mb-4">
          {/* TOTAL USERS */}

          <div className="col-12 col-sm-6 col-xl-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p className="text-muted small mb-1">
                      Total Users
                    </p>

                    <h3 className="fw-bold mb-0">
                      {totalUsers}
                    </h3>
                  </div>

                  <div
                    className="rounded-circle p-3"
                    style={{
                      backgroundColor: "#E8F1EE",
                      color: "#5C8374",
                    }}
                  >
                    <Users size={23} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CUSTOMERS */}

          <div className="col-12 col-sm-6 col-xl-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p className="text-muted small mb-1">
                      Customers
                    </p>

                    <h3 className="fw-bold mb-0">
                      {totalNormalUsers}
                    </h3>
                  </div>

                  <div
                    className="rounded-circle p-3"
                    style={{
                      backgroundColor: "#E8F1EE",
                      color: "#5C8374",
                    }}
                  >
                    <UserCheck size={23} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ADMINISTRATORS */}

          <div className="col-12 col-sm-6 col-xl-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p className="text-muted small mb-1">
                      Administrators
                    </p>

                    <h3 className="fw-bold mb-0">
                      {totalAdmins}
                    </h3>
                  </div>

                  <div
                    className="rounded-circle p-3"
                    style={{
                      backgroundColor: "#FFF4D6",
                      color: "#D97706",
                    }}
                  >
                    <ShieldCheck size={23} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* DISPLAYED USERS */}

          <div className="col-12 col-sm-6 col-xl-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p className="text-muted small mb-1">
                      Displayed Users
                    </p>

                    <h3 className="fw-bold mb-0">
                      {filteredUsers.length}
                    </h3>
                  </div>

                  <div
                    className="rounded-circle p-3"
                    style={{
                      backgroundColor: "#E8F1EE",
                      color: "#5C8374",
                    }}
                  >
                    <UserCog size={23} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SEARCH AND FILTER */}

        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-12 col-lg-8">
                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <Search
                      size={18}
                      className="text-muted"
                    />
                  </span>

                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search users by name or email..."
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="col-12 col-lg-4">
                <select
                  className="form-select"
                  value={roleFilter}
                  onChange={(e) =>
                    setRoleFilter(e.target.value)
                  }
                >
                  <option value="all">
                    All Users
                  </option>

                  <option value="user">
                    Customers
                  </option>

                  <option value="admin">
                    Administrators
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* RESULTS */}

        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <span className="text-muted">
              Showing{" "}
            </span>

            <strong>
              {filteredUsers.length}
            </strong>

            <span className="text-muted">
              {" "}users
            </span>
          </div>

          {(search || roleFilter !== "all") && (
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => {
                setSearch("");
                setRoleFilter("all");
              }}
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* LOADING */}

        {loading && (
          <div className="text-center py-5">
            <div
              className="spinner-border"
              style={{
                color: "#5C8374",
              }}
            ></div>

            <p className="text-muted mt-2">
              Loading users...
            </p>
          </div>
        )}

        {/* USERS */}

        {!loading && (
          <div className="row g-4">
            {filteredUsers.length === 0 ? (
              <div className="col-12">
                <div className="card border-0 shadow-sm">
                  <div className="card-body text-center py-5">
                    <Users
                      size={55}
                      className="text-muted mb-3"
                    />

                    <h5 className="fw-bold">
                      No Users Found
                    </h5>

                    <p className="text-muted mb-0">
                      Try changing your search or filter.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              filteredUsers.map((user) => (
                <div
                  className="col-12 col-md-6 col-xl-4"
                  key={user._id}
                >
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start">
                        <UserAvatar
                          user={user}
                          size={65}
                        />

                        {/* DROPDOWN */}

                        <div className="dropdown">
                          <button
                            className="btn btn-light rounded-circle"
                            data-bs-toggle="dropdown"
                          >
                            <MoreVertical size={18} />
                          </button>

                          <ul className="dropdown-menu dropdown-menu-end">
                            <li>
                              <button
                                className="dropdown-item d-flex align-items-center gap-2"
                                onClick={() =>
                                  viewUser(user)
                                }
                              >
                                <Eye size={16} />
                                View Details
                              </button>
                            </li>

                            <li>
                              <button
                                className="dropdown-item d-flex align-items-center gap-2"
                                onClick={() =>
                                  openEditModal(user)
                                }
                              >
                                <Edit size={16} />
                                Edit Role
                              </button>
                            </li>

                            <li>
                              <hr className="dropdown-divider" />
                            </li>

                            <li>
                              <button
                                className="dropdown-item text-danger d-flex align-items-center gap-2"
                                onClick={() =>
                                  deleteUser(user._id)
                                }
                              >
                                <Trash2 size={16} />
                                Delete User
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>

                      {/* USER INFO */}

                      <div className="mt-3">
                        <h5 className="fw-bold mb-1">
                          {user.name}
                        </h5>

                        <div className="text-muted small d-flex align-items-center gap-2">
                          <Mail size={14} />

                          <span className="text-break">
                            {user.email}
                          </span>
                        </div>
                      </div>

                      {/* ROLE */}

                      <div className="mt-3">
                        {user.role === "admin" ? (
                          <span className="badge bg-danger d-inline-flex align-items-center gap-1">
                            <ShieldCheck size={13} />
                            Administrator
                          </span>
                        ) : (
                          <span className="badge bg-secondary d-inline-flex align-items-center gap-1">
                            <User size={13} />
                            Customer
                          </span>
                        )}
                      </div>

                      {/* JOINED DATE */}

                      <div className="border-top mt-4 pt-3">
                        <small className="text-muted d-block">
                          Joined
                        </small>

                        <span className="small fw-semibold d-flex align-items-center gap-1">
                          <CalendarDays size={14} />

                          {formatDate(user.createdAt)}
                        </span>
                      </div>
                    </div>

                    {/* ACTION BUTTONS */}

                    <div className="card-footer bg-white border-0 pt-0 pb-3">
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-outline-secondary flex-grow-1 d-flex align-items-center justify-content-center gap-2"
                          onClick={() =>
                            viewUser(user)
                          }
                        >
                          <Eye size={16} />
                          View
                        </button>

                        <button
                          className="btn btn-outline-primary d-flex align-items-center justify-content-center"
                          style={{
                            width: "45px",
                          }}
                          onClick={() =>
                            openEditModal(user)
                          }
                          title="Edit Role"
                        >
                          <Edit size={16} />
                        </button>

                        <button
                          className="btn btn-outline-danger d-flex align-items-center justify-content-center"
                          style={{
                            width: "45px",
                          }}
                          onClick={() =>
                            deleteUser(user._id)
                          }
                          title="Delete User"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* VIEW USER MODAL */}

        {showViewModal && selectedUser && (
          <div
            className="modal d-block"
            tabIndex="-1"
            style={{
              backgroundColor:
                "rgba(0,0,0,0.55)",
            }}
          >
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content border-0 shadow">
                <div className="modal-header">
                  <h5 className="modal-title fw-bold">
                    User Profile
                  </h5>

                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeViewModal}
                  ></button>
                </div>

                <div className="modal-body">
                  {/* PROFILE */}

                  <div className="text-center">
                    <UserAvatar
                      user={selectedUser}
                      size={90}
                    />

                    <h4 className="fw-bold mt-2 mb-0">
                      {selectedUser.name}
                    </h4>

                    <p className="text-muted mb-2">
                      {selectedUser.email}
                    </p>

                    {selectedUser.role === "admin" ? (
                      <span className="badge bg-danger">
                        Administrator
                      </span>
                    ) : (
                      <span className="badge bg-secondary">
                        Customer
                      </span>
                    )}
                  </div>

                  {/* DETAILS */}

                  <div className="mt-3 border rounded overflow-hidden">
                    <div className="row g-0">

                      <div className="col-4 py-2 px-3 bg-light text-muted small border-bottom">
                        User ID
                      </div>

                      <div className="col-8 py-2 px-3 fw-semibold text-break small border-bottom">
                        {selectedUser._id}
                      </div>

                      <div className="col-4 py-2 px-3 bg-light text-muted small border-bottom">
                        Email
                      </div>

                      <div className="col-8 py-2 px-3 fw-semibold text-break border-bottom">
                        {selectedUser.email}
                      </div>

                      <div className="col-4 py-2 px-3 bg-light text-muted small border-bottom">
                        Phone
                      </div>

                      <div className="col-8 py-2 px-3 fw-semibold border-bottom">
                        {selectedUser.phoneNo ||
                          "Not provided"}
                      </div>

                      <div className="col-4 py-2 px-3 bg-light text-muted small border-bottom">
                        Address
                      </div>

                      <div className="col-8 py-2 px-3 fw-semibold text-break border-bottom">
                        {selectedUser.address ||
                          "Not provided"}
                      </div>

                      <div className="col-4 py-2 px-3 bg-light text-muted small border-bottom">
                        City
                      </div>

                      <div className="col-8 py-2 px-3 fw-semibold border-bottom">
                        {selectedUser.city ||
                          "Not provided"}
                      </div>

                      <div className="col-4 py-2 px-3 bg-light text-muted small border-bottom">
                        State
                      </div>

                      <div className="col-8 py-2 px-3 fw-semibold border-bottom">
                        {selectedUser.state ||
                          "Not provided"}
                      </div>

                      <div className="col-4 py-2 px-3 bg-light text-muted small border-bottom">
                        Country
                      </div>

                      <div className="col-8 py-2 px-3 fw-semibold border-bottom">
                        {selectedUser.country ||
                          "Not provided"}
                      </div>

                      <div className="col-4 py-2 px-3 bg-light text-muted small border-bottom">
                        Pin Code
                      </div>

                      <div className="col-8 py-2 px-3 fw-semibold border-bottom">
                        {selectedUser.pinCode ||
                          "Not provided"}
                      </div>

                      <div className="col-4 py-2 px-3 bg-light text-muted small border-bottom">
                        Role
                      </div>

                      <div className="col-8 py-2 px-3 fw-semibold border-bottom">
                        {selectedUser.role === "admin"
                          ? "Administrator"
                          : "Customer"}
                      </div>

                      <div className="col-4 py-2 px-3 bg-light text-muted small">
                        Joined
                      </div>

                      <div className="col-8 py-2 px-3 fw-semibold">
                        {formatDate(
                          selectedUser.createdAt
                        )}
                      </div>

                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={closeViewModal}
                  >
                    Close
                  </button>

                  <button
                    className="btn text-white"
                    style={{
                      backgroundColor:
                        "#5C8374",
                    }}
                    onClick={() => {
                      setShowViewModal(false);
                      openEditModal(selectedUser);
                    }}
                  >
                    <Edit
                      size={16}
                      className="me-1"
                    />
                    Edit Role
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* EDIT USER MODAL */}

        {showEditModal && selectedUser && (
          <div
            className="modal d-block"
            tabIndex="-1"
            style={{
              backgroundColor:
                "rgba(0,0,0,0.55)",
            }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content border-0 shadow">

                <div className="modal-header">
                  <h5 className="modal-title fw-bold">
                    Update User Role
                  </h5>

                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeEditModal}
                  ></button>
                </div>

                <div className="modal-body">

                  <div className="d-flex align-items-center gap-3 mb-3">
                    <UserAvatar
                      user={selectedUser}
                      size={55}
                    />

                    <div>
                      <h6 className="fw-bold mb-1">
                        {selectedUser.name}
                      </h6>

                      <p className="text-muted small mb-0">
                        {selectedUser.email}
                      </p>
                    </div>
                  </div>

                  <label className="form-label fw-semibold">
                    User Role
                  </label>

                  <select
                    className="form-select"
                    value={selectedRole}
                    onChange={(e) =>
                      setSelectedRole(
                        e.target.value
                      )
                    }
                  >
                    <option value="user">
                      Customer
                    </option>

                    <option value="admin">
                      Administrator
                    </option>
                  </select>

                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={closeEditModal}
                  >
                    Cancel
                  </button>

                  <button
                    className="btn text-white"
                    style={{
                      backgroundColor:
                        "#5C8374",
                    }}
                    onClick={updateUser}
                  >
                    <Edit
                      size={16}
                      className="me-1"
                    />
                    Update User
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default ManageUsers;