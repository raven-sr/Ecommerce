import { useEffect, useMemo, useState } from "react";

import {
  Users,
  Search,
  Edit,
  Trash2,
  Eye,
  X,
  ShieldCheck,
  User,
  UserCheck,
  UserX,
  UserCog,
  Mail,
  CalendarDays,
  MoreVertical,
} from "lucide-react";

import toast from "react-hot-toast";
import Footer from "../components/footer";
import Nav from "../components/nav";

function ManageUsers() {
  // =====================================================
  // STATES
  // =====================================================

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [roleFilter, setRoleFilter] = useState("all");

  const [showViewModal, setShowViewModal] =
    useState(false);

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [selectedUser, setSelectedUser] =
    useState(null);

  const [selectedRole, setSelectedRole] =
    useState("");

  const [updateLoading, setUpdateLoading] =
    useState(false);

  // =====================================================
  // GET ALL USERS
  // =====================================================

  const getAllUsers = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/users",
        {
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch users"
        );
      }

      setUsers(data.users || []);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // LOAD USERS
  // =====================================================

  useEffect(() => {
    getAllUsers();
  }, []);

  // =====================================================
  // STATISTICS
  // =====================================================

  const totalUsers = users.length;

  const totalAdmins = users.filter(
    (user) => user.role === "admin"
  ).length;

  const totalNormalUsers = users.filter(
    (user) => user.role === "user"
  ).length;

  // Users without admin role
  const activeUsers = users.filter(
    (user) => user.role !== "admin"
  ).length;

  // =====================================================
  // FILTER USERS
  // =====================================================

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchValue =
        search.toLowerCase().trim();

      const matchesSearch =
        user.name
          ?.toLowerCase()
          .includes(searchValue) ||
        user.email
          ?.toLowerCase()
          .includes(searchValue);

      const matchesRole =
        roleFilter === "all" ||
        user.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter]);

  // =====================================================
  // VIEW USER
  // =====================================================

  const viewUser = (user) => {
    setSelectedUser(user);

    setShowViewModal(true);
  };

  // =====================================================
  // OPEN EDIT MODAL
  // =====================================================

  const openEditModal = (user) => {
    setSelectedUser(user);

    setSelectedRole(user.role);

    setShowEditModal(true);
  };

  // =====================================================
  // CLOSE MODALS
  // =====================================================

  const closeModals = () => {
    if (updateLoading) return;

    setShowViewModal(false);

    setShowEditModal(false);

    setSelectedUser(null);

    setSelectedRole("");
  };

  // =====================================================
  // UPDATE USER ROLE
  // =====================================================

  const updateUserRole = async () => {
    if (!selectedUser) return;

    if (!selectedRole) {
      toast.error("Please select a role");

      return;
    }

    try {
      setUpdateLoading(true);

      const response = await fetch(
        `http://localhost:5000/api/users/${selectedUser._id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            role: selectedRole,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update user"
        );
      }

      toast.success(
        "User updated successfully"
      );

      // Update UI immediately

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === selectedUser._id
            ? {
                ...user,
                role: selectedRole,
              }
            : user
        )
      );

      closeModals();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUpdateLoading(false);
    }
  };

  // =====================================================
  // DELETE USER
  // =====================================================

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/users/${id}`,
        {
          method: "DELETE",

          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete user"
        );
      }

      toast.success(
        "User deleted successfully"
      );

      // Immediately remove from UI

      setUsers((prevUsers) =>
        prevUsers.filter(
          (user) => user._id !== id
        )
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

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

  // =====================================================
  // USER AVATAR
  // =====================================================

  const UserAvatar = ({
    user,
    size = 60,
  }) => {
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
          fontSize:
            size >= 60 ? "22px" : "17px",
        }}
      >
        {user?.name
          ? user.name
              .charAt(0)
              .toUpperCase()
          : "U"}
      </div>
    );
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div>

        <Nav/>

        <div className="container mt-5">

      {/* =================================================
          HEADER
      ================================================= */}

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

          <strong>
            {totalUsers}
          </strong>

          <span className="text-muted">
            Total Users
          </span>

        </div>

      </div>

      {/* =================================================
          STATISTICS
      ================================================= */}

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
                    backgroundColor:
                      "#E8F1EE",
                    color: "#5C8374",
                  }}
                >
                  <Users size={23} />
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* NORMAL USERS */}

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
                    backgroundColor:
                      "#E8F1EE",
                    color: "#5C8374",
                  }}
                >
                  <UserCheck size={23} />
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ADMINS */}

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
                    backgroundColor:
                      "#FFF4D6",
                    color: "#D97706",
                  }}
                >
                  <ShieldCheck size={23} />
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ACTIVE */}

        <div className="col-12 col-sm-6 col-xl-3">

          <div className="card border-0 shadow-sm h-100">

            <div className="card-body">

              <div className="d-flex justify-content-between align-items-center">

                <div>

                  <p className="text-muted small mb-1">
                    Regular Accounts
                  </p>

                  <h3 className="fw-bold mb-0">
                    {activeUsers}
                  </h3>

                </div>

                <div
                  className="rounded-circle p-3"
                  style={{
                    backgroundColor:
                      "#E8F1EE",
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

      {/* =================================================
          SEARCH + FILTER
      ================================================= */}

      <div className="card border-0 shadow-sm mb-4">

        <div className="card-body">

          <div className="row g-3">

            {/* SEARCH */}

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

            {/* ROLE */}

            <div className="col-12 col-lg-4">

              <select
                className="form-select"
                value={roleFilter}
                onChange={(e) =>
                  setRoleFilter(
                    e.target.value
                  )
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

      {/* =================================================
          RESULTS
      ================================================= */}

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

        {search || roleFilter !== "all" ? (

          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => {
              setSearch("");
              setRoleFilter("all");
            }}
          >
            Clear Filters
          </button>

        ) : null}

      </div>

      {/* =================================================
          LOADING
      ================================================= */}

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

      {/* =================================================
          USER GRID
      ================================================= */}

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

                  {/* =================================================
                      CARD HEADER
                  ================================================= */}

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
                          <MoreVertical
                            size={18}
                          />
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

                              Change Role

                            </button>

                          </li>

                          <li>
                            <hr className="dropdown-divider" />
                          </li>

                          <li>

                            <button
                              className="dropdown-item text-danger d-flex align-items-center gap-2"
                              onClick={() =>
                                deleteUser(
                                  user._id
                                )
                              }
                            >

                              <Trash2 size={16} />

                              Delete User

                            </button>

                          </li>

                        </ul>

                      </div>

                    </div>

                    {/* =================================================
                        USER INFO
                    ================================================= */}

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

                    {/* =================================================
                        ROLE
                    ================================================= */}

                    <div className="mt-3">

                      {user.role === "admin" ? (

                        <span className="badge bg-danger d-inline-flex align-items-center gap-1">

                          <ShieldCheck
                            size={13}
                          />

                          Administrator

                        </span>

                      ) : (

                        <span className="badge bg-secondary d-inline-flex align-items-center gap-1">

                          <User size={13} />

                          Customer

                        </span>

                      )}

                    </div>

                    {/* =================================================
                        DETAILS
                    ================================================= */}

                    <div className="border-top mt-4 pt-3">

                      <div className="d-flex justify-content-between">

                        <div>

                          <small className="text-muted d-block">
                            Joined
                          </small>

                          <span className="small fw-semibold d-flex align-items-center gap-1">

                            <CalendarDays
                              size={14}
                            />

                            {formatDate(
                              user.createdAt
                            )}

                          </span>

                        </div>

                        <div className="text-end">

                          <small className="text-muted d-block">
                            Account
                          </small>

                          <span className="small fw-semibold text-success">
                            Active
                          </span>

                        </div>

                      </div>

                    </div>

                  </div>

                  {/* =================================================
                      ACTIONS
                  ================================================= */}

                  <div className="card-footer bg-white border-0 pt-0 pb-3">

                    <div className="d-flex gap-2">

                      <button
                        className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center gap-2"
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
                          width: "48px",
                        }}
                        onClick={() =>
                          openEditModal(user)
                        }
                        title="Change Role"
                      >

                        <Edit size={16} />

                      </button>

                      <button
                        className="btn btn-outline-danger d-flex align-items-center justify-content-center"
                        style={{
                          width: "48px",
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

      {/* =====================================================
          VIEW USER MODAL
      ===================================================== */}

      {showViewModal && selectedUser && (

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

              {/* HEADER */}

              <div className="modal-header">

                <h5 className="modal-title fw-bold">
                  User Profile
                </h5>

                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModals}
                ></button>

              </div>

              {/* BODY */}

              <div className="modal-body">

                <div className="text-center">

                  <UserAvatar
                    user={selectedUser}
                    size={100}
                  />

                  <h4 className="fw-bold mt-3 mb-1">
                    {selectedUser.name}
                  </h4>

                  <p className="text-muted">
                    {selectedUser.email}
                  </p>

                  {selectedUser.role ===
                  "admin" ? (

                    <span className="badge bg-danger">

                      <ShieldCheck
                        size={13}
                        className="me-1"
                      />

                      Administrator

                    </span>

                  ) : (

                    <span className="badge bg-secondary">

                      <User
                        size={13}
                        className="me-1"
                      />

                      Customer

                    </span>

                  )}

                </div>

                {/* DETAILS */}

                <div className="mt-4">

                  <div className="border-bottom py-3">

                    <small className="text-muted">
                      User ID
                    </small>

                    <div className="fw-semibold text-break">
                      {selectedUser._id}
                    </div>

                  </div>

                  <div className="border-bottom py-3">

                    <small className="text-muted">
                      Email Address
                    </small>

                    <div className="fw-semibold text-break">
                      {selectedUser.email}
                    </div>

                  </div>

                  <div className="border-bottom py-3">

                    <small className="text-muted">
                      Account Role
                    </small>

                    <div className="fw-semibold">
                      {selectedUser.role ===
                      "admin"
                        ? "Administrator"
                        : "Customer"}
                    </div>

                  </div>

                  <div className="py-3">

                    <small className="text-muted">
                      Joined Date
                    </small>

                    <div className="fw-semibold">
                      {formatDate(
                        selectedUser.createdAt
                      )}
                    </div>

                  </div>

                </div>

              </div>

              {/* FOOTER */}

              <div className="modal-footer">

                <button
                  className="btn btn-outline-secondary"
                  onClick={closeModals}
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

                    openEditModal(
                      selectedUser
                    );
                  }}
                >
                  <Edit size={16} />
                  {" "}Change Role
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

      {/* =====================================================
          EDIT ROLE MODAL
      ===================================================== */}

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

              {/* HEADER */}

              <div className="modal-header">

                <div>

                  <h5 className="modal-title fw-bold">
                    Change User Role
                  </h5>

                  <small className="text-muted">
                    Update account permissions
                  </small>

                </div>

                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModals}
                ></button>

              </div>

              {/* BODY */}

              <div className="modal-body">

                <div className="d-flex align-items-center gap-3 mb-4">

                  <UserAvatar
                    user={selectedUser}
                    size={55}
                  />

                  <div>

                    <h6 className="fw-bold mb-1">
                      {selectedUser.name}
                    </h6>

                    <small className="text-muted">
                      {selectedUser.email}
                    </small>

                  </div>

                </div>

                <label className="form-label fw-semibold">
                  Select Role
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

                <div className="alert alert-warning mt-3 mb-0 small">

                  <ShieldCheck
                    size={16}
                    className="me-2"
                  />

                  Administrators may have access
                  to store management features.

                </div>

              </div>

              {/* FOOTER */}

              <div className="modal-footer">

                <button
                  className="btn btn-outline-secondary"
                  onClick={closeModals}
                  disabled={updateLoading}
                >
                  Cancel
                </button>

                <button
                  className="btn text-white"
                  style={{
                    backgroundColor:
                      "#5C8374",
                  }}
                  onClick={updateUserRole}
                  disabled={updateLoading}
                >

                  {updateLoading ? (

                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Updating...
                    </>

                  ) : (

                    <>
                      <ShieldCheck
                        size={16}
                        className="me-1"
                      />
                      Update Role
                    </>

                  )}

                </button>

              </div>

            </div>

          </div>

        </div>

      )}
      </div>

      <Footer/>

    </div>
  );
}

export default ManageUsers;