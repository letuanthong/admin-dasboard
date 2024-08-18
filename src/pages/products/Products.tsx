import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./products.scss";
import { useState } from "react";
import Add from "../../components/add/Add";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchProducts } from "../../api/products";

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
    field: "ProductName",
    type: "string",
    headerName: "Product Name",
    width: 150,
  },
  {
    field: "ProductCode",
    type: "string",
    headerName: "Product Code",
    width: 200,
  },
  {
    field: "ProductPrice",
    type: "string",
    headerName: "Product Price",
    width: 200,
  },
  {
    field: "ProductDescription",
    headerName: "Product Description",
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

const Products = () => {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery(['products'], fetchProducts, {
    staleTime: 5 * 60 * 1000, // Dữ liệu sẽ stale sau 5 phút
    refetchOnWindowFocus: false, // Tắt refetch khi focus lại window
  });

  const rows = data?.data.map((product: { productThumbnail: any; productName: any; productPrice: any; productDescription: any; productCode: any; updatedAt: any; statusCode: any; }, index: number) => ({
    id: index + 1,
    img: product.productThumbnail || null,
    ProductName: product.productName || null,
    ProductPrice: product.productPrice || null,
    ProductDescription: product.productDescription || null,
    ProductCode: product.productCode || null,
    CreatedUpdated: product.updatedAt || null,
    StatusCode: product.statusCode || null,
  })) || [];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <div className="products">
      <div className="info">
        <h1>Products</h1>
        <button onClick={() => setOpen(true)}>Add New Products</button>
      </div>
      <DataTable slug="products" columns={columns} rows={rows} />
      {open && <Add slug="products" columns={columns} setOpen={setOpen} />}
    </div>
  );

};

export default Products;
