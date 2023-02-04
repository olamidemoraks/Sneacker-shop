import React, { useCallback, useEffect, useMemo, useState } from "react";
import Template from "../components/adminComponents/Template";
import * as yup from "yup";
import { Formik } from "formik";
import Input from "../components/Input";
import CreatableReactSelect from "react-select/creatable";
import Dropzone from "react-dropzone";
import { IoPencil } from "react-icons/io5";
import {
  useCreateProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
} from "../feature/product/productApiSlice";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const ProductSchema = yup.object().shape({
  name: yup.string().min(3).required("please fill in product name"),
  description: yup.string().required("please fill in product name"),
  price: yup.number().moreThan(0).required("please enter price range"),
  brand: yup.string().required("please enter product brand"),
  feature: yup.boolean(),
  freeShipping: yup.boolean(),
  inventory: yup.number(),
  averageRating: yup
    .number()
    .min(0, "value should be greater than 0")
    .max(5, "value should be less than 5"),
  picture: yup.object().nullable(),
});
// let initialValueProductForm = {
//   name: "",
//   description: "",
//   price: 0.0,
//   brand: "",
//   feature: false,
//   freeShipping: true,
//   inventory: 0,
//   averageRating: 4,
//   picture: "",
// };

const defaultOption = [39, 40, 41, 42, 43, 44];

const CreateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product } = useGetProductsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      product: data?.entities[id],
    }),
  });

  console.log(product);

  let initialValueProductForm = {
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || 0,
    brand: product?.brand || "",
    feature: product?.feature || false,
    freeShipping: product?.freeShipping || true,
    inventory: product?.inventory || 0,
    averageRating: product?.averageRating || 4,
    picture: { name: product?.image },
  };

  const [selectedSize, setSelectedSize] = useState((prev) => {
    return (
      product?.size.map((item) => {
        return { label: item, value: item };
      }) || []
    );
  });
  const [option, setOption] = useState(defaultOption);

  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const handleUpdate = async (values, onSubmitProps) => {
    let formData = new FormData();
    for (var value in values) {
      formData.append(value, values[value]);
    }
    formData.append("image", values.picture.name);

    formData.append(
      "shoeSize",
      selectedSize.map(({ label }) => {
        return [label];
      })
    );
    formData.append("id", id);

    var json = Object.fromEntries(formData);
    try {
      const data = await updateProduct(formData);
      navigate("/admin/product");

      console.log(data);
    } catch (error) {
      console.log("Error", error);
    }
  };
  const handleCreate = async (values, onSubmitProps) => {
    let formData = new FormData();
    for (var value in values) {
      formData.append(value, values[value]);
    }
    formData.append("image", values.picture.name);

    formData.append(
      "shoeSize",
      selectedSize.map(({ label }) => {
        return [label];
      })
    );
    try {
      const data = await createProduct(formData);
      onSubmitProps.resetForm();

      console.log(data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleSubmitForm = async (values, onSubmitProps) => {
    if (id) {
      await handleUpdate(values, onSubmitProps);
    } else {
      await handleCreate(values, onSubmitProps);
    }
  };
  let content;
  if (product === undefined && id) content = <p>Loading...</p>;
  if (product || id === undefined) {
    content = (
      <div className="overflow-auto h-full">
        <Template
          title={`${id ? "Update" : "Create New"} Product`}
          style="text-[18px] text-center pt-[2rem]"
        >
          <div>
            <Formik
              onSubmit={handleSubmitForm}
              initialValues={initialValueProductForm}
              validationSchema={ProductSchema}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-2 justify-start p-2">
                    <label
                      className=" text-secondary-white text-sm"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <Input
                      id="name"
                      borderColor="border-lime-300"
                      type="text"
                      placeholder="Product Name"
                      name="name"
                      value={values.name}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      error={errors.name}
                      touched={touched.name}
                    />
                  </div>
                  <div className="flex flex-col gap-2 justify-start p-2">
                    <label
                      className=" text-secondary-white text-sm"
                      htmlFor="desc"
                    >
                      Description
                    </label>
                    <Input
                      id="desc"
                      borderColor="border-lime-300"
                      type="text"
                      placeholder="Description"
                      name="description"
                      value={values.description}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      error={errors.description}
                      touched={touched.description}
                      textArea={true}
                    />
                  </div>

                  <div className="flex md:flex-row flex-col ">
                    <div className="flex flex-col gap-2 justify-start p-2">
                      <label
                        className=" text-secondary-white text-sm"
                        htmlFor="price"
                      >
                        Price
                      </label>
                      <Input
                        id="price"
                        borderColor="border-lime-300"
                        type="number"
                        placeholder="0.0"
                        name="price"
                        value={values.price}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        error={errors.price}
                        touched={touched.price}
                        step={3}
                      />
                    </div>
                    <div className="flex flex-col gap-2 justify-start p-2">
                      <label
                        className=" text-secondary-white text-sm"
                        htmlFor="brand"
                      >
                        Brand
                      </label>
                      <Input
                        id="brand"
                        borderColor="border-lime-300"
                        type="text"
                        placeholder="Brand Name"
                        name="brand"
                        value={values.brand}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        error={errors.brand}
                        touched={touched.brand}
                      />
                    </div>
                    <div className="flex flex-col gap-2 justify-start p-2 flex-1">
                      <label
                        className=" text-secondary-white text-sm"
                        htmlFor="brand"
                      >
                        Size
                      </label>
                      <CreatableReactSelect
                        value={selectedSize.map((size) => {
                          return { label: size.label, value: size.label };
                        })}
                        className=""
                        isMulti
                        options={option.map((size) => {
                          return { label: size, value: size };
                        })}
                        onCreateOption={(inputValue) =>
                          setOption((prev) => [...prev, inputValue])
                        }
                        onChange={(newValue) => setSelectedSize(newValue)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 justify-start p-2 flex-1">
                    <label
                      className=" text-secondary-white text-sm"
                      htmlFor="brand"
                    >
                      Product Image
                    </label>
                    <Dropzone
                      acceptedFiles=".jpeg,.jpg,.png"
                      multiple={false}
                      onDrop={(acceptedFiles) => {
                        setFieldValue("picture", acceptedFiles[0]);
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div
                          {...getRootProps()}
                          className="bg-transparent border border-dashed border-lime-300 h-13 w-full p-3 rounded-md"
                        >
                          <input {...getInputProps()} />
                          {!values.picture ? (
                            <p className=" text-secondary-white">
                              Add Picture Here
                            </p>
                          ) : (
                            <div className="flex justify-between items-center">
                              <p className=" text-secondary-white">
                                {values.picture.name}
                              </p>
                              <IoPencil className=" text-secondary-white" />
                            </div>
                          )}
                        </div>
                      )}
                    </Dropzone>
                    <div className="flex lg:flex-row flex-col md:gap-2 lg:items-center gap-2 ">
                      <div className="flex sm:flex-row flex-col">
                        <div className="flex flex-col gap-2 justify-start p-2 ">
                          <label
                            className=" text-secondary-white text-sm"
                            htmlFor="inventory"
                          >
                            Inventory
                          </label>
                          <Input
                            id="inventory"
                            borderColor="border-lime-300"
                            type="number"
                            placeholder="10"
                            name="inventory"
                            value={values.inventory}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            error={errors.inventory}
                            touched={touched.inventory}
                          />
                        </div>
                        <div className="flex flex-col gap-2 justify-start p-2">
                          <label
                            className=" text-secondary-white text-sm"
                            htmlFor="rating"
                          >
                            Rating
                          </label>
                          <Input
                            id="rating"
                            borderColor="border-lime-300"
                            type="number"
                            placeholder="default 4 star"
                            name="averageRating"
                            value={values.averageRating}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            error={errors.averageRating}
                            touched={touched.averageRating}
                          />
                        </div>
                      </div>
                      <div className="flex gap-3 pl-2">
                        <div className="flex gap-2 items-center text-secondary-white">
                          <label htmlFor="shipping">Free shipping</label>
                          <input
                            value={values.freeShipping}
                            onChange={handleChange}
                            className="indeterminate:bg-gray-700 default:ring-2 checked:bg-lime-300"
                            checked={values.freeShipping}
                            type="checkbox"
                            name="freeShipping"
                            id="shipping"
                          />
                        </div>
                        <div className="flex gap-2 items-center text-secondary-white">
                          <label htmlFor="feature">Feature</label>
                          <input
                            value={values.feature}
                            onChange={handleChange}
                            checked={values.feature}
                            className="indeterminate:bg-gray-700 default:ring-2 checked:bg-lime-300"
                            type="checkbox"
                            name="feature"
                            id="feature"
                          />
                          <p className=" text-sm text-gray-400">
                            (will be display on the front page)
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-4 justify-end">
                      {!id ? (
                        <button
                          type="submit"
                          className=" bg-transparent border border-lime-300 text-lime-300 rounded-sm px-3 py-1 hover:bg-lime-900 hover:text-white ease-linear duration-200"
                        >
                          Create Product
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className=" bg-transparent border border-indigo-600 text-indigo-300 rounded-sm px-3 py-1 hover:bg-indigo-900 hover:text-white ease-linear duration-200"
                        >
                          Update Product
                        </button>
                      )}

                      <button
                        className=" bg-transparent border border-gray-300 text-gray-300 rounded-sm px-3 py-1 hover:bg-gray-300 hover:text-black ease-linear duration-200"
                        type="reset"
                        onClick={resetForm}
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </Template>
      </div>
    );
  }
  return content;
};

export default CreateProduct;
