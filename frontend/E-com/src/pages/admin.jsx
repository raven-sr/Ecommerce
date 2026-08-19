import {
  BarChart3,
  Package,
  Users,
  ShoppingBag,
  IndianRupee,
  TrendingUp,
  ArrowUpRight,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  Plus,
  Eye,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

import { Link } from "react-router-dom";

function Admin() {

  // =====================================================
  // SAMPLE INCOME DATA
  // Replace this later with data from your backend
  // =====================================================

  const weeklyIncome = [
    {
      day: "Mon",
      income: 8500,
    },
    {
      day: "Tue",
      income: 11200,
    },
    {
      day: "Wed",
      income: 9800,
    },
    {
      day: "Thu",
      income: 14500,
    },
    {
      day: "Fri",
      income: 12800,
    },
    {
      day: "Sat",
      income: 17800,
    },
    {
      day: "Sun",
      income: 15400,
    },
  ];

  // =====================================================
  // ORDER STATUS DATA
  // =====================================================

  const orderStatus = [
    {
      name: "Delivered",
      value: 45,
    },
    {
      name: "Processing",
      value: 20,
    },
    {
      name: "Shipped",
      value: 15,
    },
    {
      name: "Cancelled",
      value: 8,
    },
  ];

  // =====================================================
  // RECENT ORDERS
  // =====================================================

  const recentOrders = [
    {
      id: "ORD001",
      customer: "Siva Sundaram",
      amount: 2999,
      status: "Delivered",
    },
    {
      id: "ORD002",
      customer: "Kumar",
      amount: 1499,
      status: "Processing",
    },
    {
      id: "ORD003",
      customer: "Arun",
      amount: 2499,
      status: "Shipped",
    },
    {
      id: "ORD004",
      customer: "Praveen",
      amount: 1899,
      status: "Delivered",
    },
    {
      id: "ORD005",
      customer: "Rahul",
      amount: 999,
      status: "Cancelled",
    },
  ];

  // =====================================================
  // TOTAL VALUES
  // =====================================================

  const totalIncome = weeklyIncome.reduce(
    (total, item) => total + item.income,
    0
  );

  const totalOrders = orderStatus.reduce(
    (total, item) => total + item.value,
    0
  );

  // =====================================================
  // STATUS COLORS
  // =====================================================

  const statusColors = {
    Delivered: "success",
    Processing: "warning",
    Shipped: "primary",
    Cancelled: "danger",
  };

  return (
    <div className="container-fluid bg-light min-vh-100">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="container-fluid py-4">

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">

          <div>

            <h2 className="fw-bold mb-1">
              Admin Dashboard
            </h2>

            <p className="text-muted mb-0">
              Monitor your store performance and sales
            </p>

          </div>

          

        </div>

      </div>

      {/* =================================================
          SUMMARY CARDS
      ================================================= */}

      <div className="container-fluid">

        <div className="row g-3">

          {/* TOTAL REVENUE */}

          <div className="col-12 col-sm-6 col-xl-3">

            <div className="card border-0 shadow-sm h-100">

              <div className="card-body">

                <div className="d-flex justify-content-between align-items-start">

                  <div>

                    <p className="text-muted mb-2">
                      Total Revenue
                    </p>

                    <h3 className="fw-bold mb-2">
                      ₹{totalIncome.toLocaleString()}
                    </h3>

                    <span className="text-success small">
                      <TrendingUp size={14} />
                      {" "}12.5% from last week
                    </span>

                  </div>

                  <div
                    className="rounded-circle p-3"
                    style={{
                      backgroundColor: "#E8F1EE",
                      color: "#5C8374",
                    }}
                  >
                    <IndianRupee size={23} />
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* TODAY INCOME */}

          <div className="col-12 col-sm-6 col-xl-3">

            <div className="card border-0 shadow-sm h-100">

              <div className="card-body">

                <div className="d-flex justify-content-between align-items-start">

                  <div>

                    <p className="text-muted mb-2">
                      Today's Income
                    </p>

                    <h3 className="fw-bold mb-2">
                      ₹15,400
                    </h3>

                    <span className="text-success small">
                      <TrendingUp size={14} />
                      {" "}8.2% today
                    </span>

                  </div>

                  <div
                    className="rounded-circle p-3"
                    style={{
                      backgroundColor: "#E8F1EE",
                      color: "#5C8374",
                    }}
                  >
                    <BarChart3 size={23} />
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* ORDERS */}

          <div className="col-12 col-sm-6 col-xl-3">

            <div className="card border-0 shadow-sm h-100">

              <div className="card-body">

                <div className="d-flex justify-content-between align-items-start">

                  <div>

                    <p className="text-muted mb-2">
                      Total Orders
                    </p>

                    <h3 className="fw-bold mb-2">
                      {totalOrders}
                    </h3>

                    <span className="text-muted small">
                      This week
                    </span>

                  </div>

                  <div
                    className="rounded-circle p-3"
                    style={{
                      backgroundColor: "#E8F1EE",
                      color: "#5C8374",
                    }}
                  >
                    <ShoppingBag size={23} />
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* USERS */}

          <div className="col-12 col-sm-6 col-xl-3">

            <div className="card border-0 shadow-sm h-100">

              <div className="card-body">

                <div className="d-flex justify-content-between align-items-start">

                  <div>

                    <p className="text-muted mb-2">
                      Total Users
                    </p>

                    <h3 className="fw-bold mb-2">
                      248
                    </h3>

                    <span className="text-success small">
                      <TrendingUp size={14} />
                      {" "}5.4% this month
                    </span>

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

        </div>

      </div>

      {/* =================================================
          CHARTS
      ================================================= */}

      <div className="container-fluid mt-4">

        <div className="row g-4">

          {/* =================================================
              WEEKLY INCOME GRAPH
          ================================================= */}

          <div className="col-12 col-xl-8">

            <div className="card border-0 shadow-sm h-100">

              <div className="card-body">

                <div className="d-flex justify-content-between align-items-center mb-4">

                  <div>

                    <h5 className="fw-bold mb-1">
                      Weekly Income
                    </h5>

                    <p className="text-muted small mb-0">
                      Revenue generated during the week
                    </p>

                  </div>

                  <span className="badge bg-light text-dark">
                    This Week
                  </span>

                </div>

                <div
                  style={{
                    width: "100%",
                    height: "320px",
                  }}
                >

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    <AreaChart
                      data={weeklyIncome}
                      margin={{
                        top: 10,
                        right: 10,
                        left: 0,
                        bottom: 0,
                      }}
                    >

                      <defs>

                        <linearGradient
                          id="incomeGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >

                          <stop
                            offset="5%"
                            stopColor="#5C8374"
                            stopOpacity={0.3}
                          />

                          <stop
                            offset="95%"
                            stopColor="#5C8374"
                            stopOpacity={0}
                          />

                        </linearGradient>

                      </defs>

                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                      />

                      <XAxis
                        dataKey="day"
                        axisLine={false}
                        tickLine={false}
                      />

                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(value) =>
                          `₹${value / 1000}k`
                        }
                      />

                      <Tooltip
                        formatter={(value) =>
                          `₹${value.toLocaleString()}`
                        }
                      />

                      <Area
                        type="monotone"
                        dataKey="income"
                        stroke="#5C8374"
                        strokeWidth={3}
                        fill="url(#incomeGradient)"
                      />

                    </AreaChart>

                  </ResponsiveContainer>

                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              ORDER STATUS PIE CHART
          ================================================= */}

          <div className="col-12 col-xl-4">

            <div className="card border-0 shadow-sm h-100">

              <div className="card-body">

                <div className="mb-3">

                  <h5 className="fw-bold mb-1">
                    Order Status
                  </h5>

                  <p className="text-muted small mb-0">
                    Current order distribution
                  </p>

                </div>

                <div
                  style={{
                    width: "100%",
                    height: "270px",
                  }}
                >

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    <PieChart>

                      <Pie
                        data={orderStatus}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={65}
                        outerRadius={95}
                        paddingAngle={3}
                      >

                        {orderStatus.map(
                          (entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={
                                [
                                  "#5C8374",
                                  "#F59E0B",
                                  "#3B82F6",
                                  "#EF4444",
                                ][index]
                              }
                            />
                          )
                        )}

                      </Pie>

                      <Tooltip />

                      <Legend
                        verticalAlign="bottom"
                        height={36}
                      />

                    </PieChart>

                  </ResponsiveContainer>

                </div>

                {/* ORDER STATUS SUMMARY */}

                <div className="mt-2">

                  {orderStatus.map((item) => (

                    <div
                      key={item.name}
                      className="d-flex justify-content-between align-items-center py-2 border-bottom"
                    >

                      <span className="text-muted">
                        {item.name}
                      </span>

                      <span className="fw-semibold">
                        {item.value}
                      </span>

                    </div>

                  ))}

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* =================================================
          MANAGEMENT LINKS
      ================================================= */}

      <div className="container-fluid mt-4">

        <div className="mb-3">

          <h5 className="fw-bold mb-1">
            Store Management
          </h5>

          <p className="text-muted small">
            Quickly access different management sections
          </p>

        </div>

        <div className="row g-3">

          {/* PRODUCTS */}

          <div className="col-12 col-md-4">

            <Link
              to="/admin/products"
              className="text-decoration-none"
            >

              <div className="card border-0 shadow-sm h-100">

                <div className="card-body p-4">

                  <div className="d-flex align-items-center justify-content-between">

                    <div className="d-flex align-items-center gap-3">

                      <div
                        className="rounded p-3"
                        style={{
                          backgroundColor: "#E8F1EE",
                          color: "#5C8374",
                        }}
                      >
                        <Package size={25} />
                      </div>

                      <div>

                        <h6 className="fw-bold mb-1">
                          Manage Products
                        </h6>

                        <small className="text-muted">
                          Add, update and delete products
                        </small>

                      </div>

                    </div>

                    <ArrowUpRight
                      size={20}
                      className="text-muted"
                    />

                  </div>

                </div>

              </div>

            </Link>

          </div>

          {/* USERS */}

          <div className="col-12 col-md-4">

            <Link
              to="/admin/users"
              className="text-decoration-none"
            >

              <div className="card border-0 shadow-sm h-100">

                <div className="card-body p-4">

                  <div className="d-flex align-items-center justify-content-between">

                    <div className="d-flex align-items-center gap-3">

                      <div
                        className="rounded p-3"
                        style={{
                          backgroundColor: "#E8F1EE",
                          color: "#5C8374",
                        }}
                      >
                        <Users size={25} />
                      </div>

                      <div>

                        <h6 className="fw-bold mb-1">
                          Manage Users
                        </h6>

                        <small className="text-muted">
                          View and manage all users
                        </small>

                      </div>

                    </div>

                    <ArrowUpRight
                      size={20}
                      className="text-muted"
                    />

                  </div>

                </div>

              </div>

            </Link>

          </div>

          {/* ORDERS */}

          <div className="col-12 col-md-4">

            <Link
              to="/admin/orders"
              className="text-decoration-none"
            >

              <div className="card border-0 shadow-sm h-100">

                <div className="card-body p-4">

                  <div className="d-flex align-items-center justify-content-between">

                    <div className="d-flex align-items-center gap-3">

                      <div
                        className="rounded p-3"
                        style={{
                          backgroundColor: "#E8F1EE",
                          color: "#5C8374",
                        }}
                      >
                        <ShoppingBag size={25} />
                      </div>

                      <div>

                        <h6 className="fw-bold mb-1">
                          Manage Orders
                        </h6>

                        <small className="text-muted">
                          View and manage all orders
                        </small>

                      </div>

                    </div>

                    <ArrowUpRight
                      size={20}
                      className="text-muted"
                    />

                  </div>

                </div>

              </div>

            </Link>

          </div>

        </div>

      </div>

      {/* =================================================
          RECENT ORDERS
      ================================================= */}

      <div className="container-fluid mt-4 pb-5">

        <div className="card border-0 shadow-sm">

          <div className="card-body p-0">

            {/* HEADER */}

            <div className="d-flex justify-content-between align-items-center p-4">

              <div>

                <h5 className="fw-bold mb-1">
                  Recent Orders
                </h5>

                <p className="text-muted small mb-0">
                  Latest customer orders
                </p>

              </div>

              <Link
                to="/admin/orders"
                className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-2"
              >
                <Eye size={15} />
                View All
              </Link>

            </div>

            {/* TABLE */}

            <div className="table-responsive">

              <table className="table table-hover align-middle mb-0">

                <thead className="table-light">

                  <tr>

                    <th className="px-4">
                      Order ID
                    </th>

                    <th>
                      Customer
                    </th>

                    <th>
                      Amount
                    </th>

                    <th>
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {recentOrders.map((order) => (

                    <tr key={order.id}>

                      <td className="px-4">

                        <span className="fw-semibold">
                          #{order.id}
                        </span>

                      </td>

                      <td>
                        {order.customer}
                      </td>

                      <td>

                        <span className="fw-semibold">
                          ₹{order.amount.toLocaleString()}
                        </span>

                      </td>

                      <td>

                        <span
                          className={`badge bg-${statusColors[order.status]}`}
                        >
                          {order.status}
                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Admin;