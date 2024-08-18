import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./orders.scss";
import { useState } from "react";
import Add from "../../components/add/Add";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchOrders } from "../../api/orders";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
//   {
//     field: "img",
//     headerName: "Avatar",
//     width: 100,
//     renderCell: (params) => {
//       return <img src={params.row.img || "/noavatar.png"} alt="" />;
//     },
//   },
  {
    field: "orderName",
    type: "string",
    headerName: "Name",
    width: 200,
  },
  {
    field: "orderPhoneNumber",
    headerName: "PhoneNumber",
    width: 150,
    type: "string",
  },
  {
    field: "orderAddress",
    headerName: "Address",
    width: 200,
    type: "string",
  },
  {
    field: "orderTotalPrice",
    headerName: "Total Price",
    width: 150,
    type: "string",
  },
  {
    field: "orderShippingMethod",
    headerName: "Shipping Method",
    width: 150,
    type: "string",
  },
  {
    field: "orderTrackingNumber",
    headerName: "Tracking Number",
    width: 150,
    type: "string",
  },
  {
    field: "orderPaymentMethod",
    headerName: "Payment Method",
    width: 150,
    type: "string",
  },
  {
    field: "orderPaymentStatus",
    headerName: "Payment Status",
    width: 150,
    type: "string",
  },
];

const Orders = () => {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery(['orders'], fetchOrders, {
    staleTime: 5 * 60 * 1000, // Dữ liệu sẽ stale sau 5 phút
    refetchOnWindowFocus: false, // Tắt refetch khi focus lại window
  });

  const rows = data?.data.map((order: { idUser: any; statusCode: any; orderName: any; orderPhoneNumber: any; orderAddress: any; orderTotalPrice: any; orderShippingMethod: any; orderTrackingNumber: any; orderPaymentMethod: any; orderPaymentStatus: any }, index: number) => ({
    id: index + 1,
    idUser: order.idUser || null,
    statusCode: order.statusCode || null,
    orderName: order.orderName || null,
    orderPhoneNumber: order.orderPhoneNumber || null,
    orderAddress: order.orderAddress || null,
    orderTotalPrice: order.orderTotalPrice || null,
    orderShippingMethod: order.orderShippingMethod || null,
    orderTrackingNumber: order.orderTrackingNumber || null,
    orderPaymentMethod: order.orderPaymentMethod || null,
    orderPaymentStatus: order.orderPaymentStatus || null,
  })) || [];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <div className="orders">
      <div className="info">
        <h1>Products</h1>
        <button onClick={() => setOpen(true)}>Add New Orders</button>
      </div>
      <DataTable slug="orders" columns={columns} rows={rows} />
      {open && <Add slug="orders" columns={columns} setOpen={setOpen} />}
    </div>
  );

};

export default Orders;
