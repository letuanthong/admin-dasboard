import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./category.scss";
import { useState } from "react";
import Add from "../../components/add/Add";
import { useQuery} from "@tanstack/react-query";
import { fetchCategories } from "../../api/categories";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },

  {
    field: "categoryCode",
    type: "string",
    headerName: "Category Code",
    width: 200,
  },
  {
    field: "categoryName",
    type: "string",
    headerName: "Category Name",
    width: 200,
  },
  {
    field: "statusCode",
    type: "string",
    headerName: "Status Code",
    width: 200,
  },
  {
    field: "statusName",
    headerName: "Status Name",
    width: 200,
    type: "string",
  },
];

const Categories = () => {
  const [open, setOpen] = useState(false);

  // const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery(['categories'], fetchCategories, {
    staleTime: 5 * 60 * 1000, // Dữ liệu sẽ stale sau 5 phút
    refetchOnWindowFocus: false, // Tắt refetch khi focus lại window
  });

  const rows = data?.data.map((category: { categoryCode: any; categoryName: any; statusCode: any;statusName:any }, index: number) => ({
    id: index + 1,
    categoryCode: category.categoryCode || null,
    categoryName: category.categoryName || null,
    statusCode: category.statusCode || null,
    statusName: category.statusName || null,
  })) || [];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <div className="categories">
      <div className="info">
        <h1>Categories</h1>
        <button onClick={() => setOpen(true)}>Add New Categories</button>
      </div>
      <DataTable slug="categories" columns={columns} rows={rows} />
      {open && <Add slug="categories" columns={columns} setOpen={setOpen} />}
    </div>
  );

};

export default Categories;
