import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../../components/dataTable/DataTable";
import "./subcategory.scss";
import { useState } from "react";
import Add from "../../../components/add/Add";
import { useQuery} from "@tanstack/react-query";
import { fetchSubcategories } from "../../../api/subcategories";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },

  {
    field: "subCategoryCode",
    type: "string",
    headerName: "Category Code",
    width: 200,
  },
  {
    field: "subCategoryName",
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
  {
    field: "idCategory",
    headerName: "Category ID",
    width: 200,
    type: "string",
  },
];

const Subcategories = () => {
  const [open, setOpen] = useState(false);

  // const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery(['subcategories'], fetchSubcategories, {
    staleTime: 5 * 60 * 1000, // Dữ liệu sẽ stale sau 5 phút
    refetchOnWindowFocus: false, // Tắt refetch khi focus lại window
  });

  const rows = data?.data.map((subcategory: { subCategoryCode: any; subCategoryName: any; statusCode: any;statusName:any ; idCategory: any;}, index: number) => ({
    id: index + 1,
    subCategoryCode: subcategory.subCategoryCode || null,
    subCategoryName: subcategory.subCategoryName || null,
    statusCode: subcategory.statusCode || null,
    statusName: subcategory.statusName || null,
    idCategory: subcategory.idCategory || null,
  })) || [];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <div className="subcategories">
      <div className="info">
        <h1>Subcategories</h1>
        <button onClick={() => setOpen(true)}>Add New Subcategories</button>
      </div>
      <DataTable slug="subcategories" columns={columns} rows={rows} />
      {open && <Add slug="subcategories" columns={columns} setOpen={setOpen} />}
    </div>
  );

};

export default Subcategories;
