import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./warehouse.scss";
import { useState } from "react";
import Add from "../../components/add/Add";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchWarehouses } from "../../api/warehouses";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },

  {
    field: "warehouseCode",
    type: "string",
    headerName: "Warehouse Code",
    width: 200,
  },
  {
    field: "warehouseName",
    type: "string",
    headerName: "Warehouse Name",
    width: 200,
  },
  {
    field: "warehouseTemperature",
    type: "string",
    headerName: "Temperature",
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
    headerName: "Status Code",
    width: 150,
    type: "string",
  },
];

const Warehouses = () => {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery(['warehouses'], fetchWarehouses, {
    staleTime: 5 * 60 * 1000, // Dữ liệu sẽ stale sau 5 phút
    refetchOnWindowFocus: false, // Tắt refetch khi focus lại window
  });

  const rows = data?.data.map((warehouse: { idWarehouse: any; warehouseCode: any; warehouseName: any;warehouseTemperature:any ; userAddress: any; createdAt: any; updatedAt: any; statusCode: any; }, index: number) => ({
    id: index + 1,
    idWarehouse: warehouse.idWarehouse || null,
    warehouseCode: warehouse.warehouseCode || null,
    warehouseName: warehouse.warehouseName || null,
    warehouseTemperature: warehouse.warehouseTemperature || null,
    Address: warehouse.userAddress || null,
    CreatedAt: warehouse.createdAt || null,
    CreatedUpdated: warehouse.updatedAt || null,
    StatusCode: warehouse.statusCode || null,
  })) || [];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <div className="warehouses">
      <div className="info">
        <h1>Warehouses</h1>
        <button onClick={() => setOpen(true)}>Add New Warehouse</button>
      </div>
      <DataTable slug="warehouses" columns={columns} rows={rows} />
      {open && <Add slug="warehouses" columns={columns} setOpen={setOpen} />}
    </div>
  );

};

export default Warehouses;
