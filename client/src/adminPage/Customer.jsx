import React from "react";
import { useMemo } from "react";
import Template from "../components/adminComponents/Template";
import { useGetAllUserQuery } from "../feature/user/userApiSlice";
import { DataGrid } from "@mui/x-data-grid";

const Customer = () => {
  const { data = [], isLoading } = useGetAllUserQuery();
  console.log(data);
  const { ids, entities } = data;
  const user = useMemo(() => {
    return ids?.map((id) => {
      return entities[id];
    });
  }, [data]);
  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
    },
  ];

  return (
    <div>
      <Template title={`Users ${user?.length}`} style="text-[25px] pt-6">
        <p className="pt-2 leading-8 text-[18px] text-secondary-white">
          Entire list of users
        </p>

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
          className="mt-10"
          autoHeight="100%"
          loading={isLoading || !user}
          getRowId={(row) => row.id}
          rows={user || []}
          columns={columns}
        />
      </Template>
    </div>
  );
};

export default Customer;
