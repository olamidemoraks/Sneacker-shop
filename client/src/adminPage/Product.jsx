import React, { useMemo } from "react";
import Template from "../components/adminComponents/Template";
import { Link } from "react-router-dom";
import { IoAddSharp } from "react-icons/io5";
import { DataGrid } from "@mui/x-data-grid";
import { useGetProductsQuery } from "../feature/product/productApiSlice";
import {
  IoPencilSharp,
  IoOpen,
  IoTrashSharp,
  IoExitSharp,
} from "react-icons/io5";
import { useState } from "react";
import Model from "../components/adminComponents/Model";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const { data = [], isLoading } = useGetProductsQuery();
  const { ids, entities } = data;
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [values, setValues] = useState({});
  const navigate = useNavigate();

  const product = useMemo(() => {
    const item = ids?.map((id) => {
      return entities[id];
    });
    return item;
  }, [data]);

  const handleDeleteModel = (params) => {
    const objectValue = {
      id: params.row.id,
      name: params.row.name,
    };
    setIsModelOpen(true);
    setValues(objectValue);
  };
  console.log(values);
  const closeModel = () => {
    setIsModelOpen(false);
    setValues({});
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "image",
      headerName: "Name",
      flex: 1.4,
      renderCell: (params) => {
        return (
          <div className="flex items-center gap-2">
            <div className="h-[40px] w-[40px] flex justify-center rounded-full">
              <img
                className=" object-contain"
                src={`http://localhost:4500/assets/${params.value}`}
              />
            </div>
            <p className="flex-1 truncate">{params.row.name}</p>
          </div>
        );
      },
    },

    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      renderCell: (params) => Number(params.value).toFixed(2),
    },
    {
      field: "feature",
      headerName: "Feature",
      flex: 0.5,
    },
    {
      field: "inventory",
      headerName: "# of Products",
      flex: 0.7,
      renderCell: (params) => Number(params.value),
    },
    {
      field: "createdAt",
      headerName: "Date Created",
      flex: 0.5,
      renderCell: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: "updatedAt",
      headerName: "Date updated",
      flex: 0.5,
      renderCell: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      flex: 0.5,
      renderCell: (params) => {
        return (
          <div className="flex gap-4">
            <Link to={`/admin/edit-product/${params.row.id}`}>
              <IoPencilSharp className=" text-[18px] hover:text-green-400" />
            </Link>
            <button onClick={() => handleDeleteModel(params)}>
              <IoTrashSharp className=" text-[18px] hover:text-red-400" />
            </button>
          </div>
        );
      },
    },
  ];
  return (
    <div className="relative">
      {isModelOpen ? (
        <Model
          values={values}
          isModelOpen={isModelOpen}
          closeModel={closeModel}
        />
      ) : null}
      <Template style="mb-8">
        <div className="flex justify-between">
          <div className="flex gap-2 flex-col">
            <h2 className="text-[25px] text-secondary-white">
              Products {product?.length}
            </h2>
            <p className="text-[16px] text-secondary-white">
              Entire list of products
            </p>
          </div>

          <Link
            to="/admin/create-product"
            className=" bg-lime-200 hover:bg-lime-300 p-2 rounded-sm float-right flex gap-2 items-center ease-linear duration-100 h-9"
          >
            <IoAddSharp className="text-[15px]" />
            Create Product
          </Link>
        </div>
        <DataGrid
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#36363669",
              color: "whitesmoke",
              borderBottom: "none",
            },
            "& .MuiDataGrid-cell": {
              color: `#b6b6b6 !important`,
              borderBottom: "1px solid #363636a4",
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "#36363669",
              color: "whitesmoke",
              borderTop: "none",
            },
            "& .MuiTablePagination-root": {
              color: `#b6b6b6 !important`,
            },
            "& .MuiButtonBase-root": {
              color: `#b6b6b6 !important`,
            },
          }}
          className="mt-10 overflow-auto"
          autoHeight="100%"
          loading={isLoading || !product}
          getRowId={(row) => row.id}
          rows={product || []}
          columns={columns}
        />
      </Template>
    </div>
  );
};

export default Product;
