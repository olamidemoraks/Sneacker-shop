import React from "react";
import { useDeleteProductMutation } from "../../feature/product/productApiSlice";

const Model = ({ values, isModelOpen, closeModel }) => {
  const [deleteProduct, { isLoading, isSuccess }] = useDeleteProductMutation();

  const handleDelete = async () => {
    const { id } = values;
    await deleteProduct({ id }).unwrap;
    if (isLoading) {
      return <p>Loading</p>;
    }
    closeModel();
  };

  return (
    <div>
      <div className="bg-black/10 opacity-[20rem] w-[100%] h-[100vh] z-10 absolute flex  justify-center pt-[200px] ">
        <div className="h-[270px] w-[500px] bg-primary-black/95 relative z-10  flex flex-col justify-between rounded-md">
          <div
            className=" text-secondary-white text-[20px] font-semibold py-3 px-4 uppercase
             border-b-[1px] border-b-[#5151518b] flex justify-between"
          >
            <p>Confirm Delete</p>
            <p
              className=" text-red-500 cursor-pointer"
              onClick={() => isModelOpen && closeModel()}
            >
              X
            </p>
          </div>
          <div className="px-8 pt-5 text-white text-[23px] text-center flex-1">
            <p>Are you sure you want to permanently remove ({values?.name})</p>
          </div>
          <div className="border-t-[1px] border-t-[#5151518b] p-3 flex justify-end gap-3 w-full">
            <button
              className="hover:text-black text-white py-1 px-2 hover:bg-white border-[1px] border-white "
              onClick={handleDelete}
            >
              Proceed
            </button>
            <button
              className="text-white py-1 px-2  hover:bg-red-600"
              onClick={() => isModelOpen && closeModel()}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Model;
