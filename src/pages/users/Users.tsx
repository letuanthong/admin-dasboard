import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./Users.scss";
import { useState } from "react";
import Add from "../../components/add/Add";
import { useQuery} from "@tanstack/react-query";
import { fetchUsers } from "../../api/users";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "img",
    headerName: "Avatar",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "FullName",
    type: "string",
    headerName: "Full Name",
    width: 150,
  },
  {
    field: "PhoneNumber",
    type: "string",
    headerName: "Phone Number",
    width: 200,
  },
  {
    field: "Address",
    type: "string",
    headerName: "Address",
    width: 200,
  },
  {
    field: "CreatedAt",
    headerName: "Created At",
    width: 200,
    type: "string",
  },
  {
    field: "CreatedUpdated",
    headerName: "Updated At",
    width: 200,
    type: "string",
  },
  {
    field: "StatusCode",
    headerName: "Status",
    width: 150,
    type: "string",
  },
];

const Users = () => {
  const [open, setOpen] = useState(false);

  // const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery(['users'], fetchUsers, {
    staleTime: 5 * 60 * 1000, // Dữ liệu sẽ stale sau 5 phút
    refetchOnWindowFocus: false, // Tắt refetch khi focus lại window
  });

  const rows = data?.data.map((user: { img: any; userFullName: any; userPhoneNumber: any; userAddress: any; createdAt: any; updatedAt: any; statusCode: any; }, index: number) => ({
    id: index + 1,
    img: user.img || null,
    FullName: user.userFullName || null,
    PhoneNumber: user.userPhoneNumber || null,
    Address: user.userAddress || null,
    CreatedAt: user.createdAt || null,
    CreatedUpdated: user.updatedAt || null,
    StatusCode: user.statusCode || null,
  })) || [];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
        <button onClick={() => setOpen(true)}>Add New User</button>
      </div>
      <DataTable slug="users" columns={columns} rows={rows} />
      {open && <Add slug="user" columns={columns} setOpen={setOpen} />}
    </div>
  );

};

export default Users;
