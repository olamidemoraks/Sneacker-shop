import React from "react";
import Input from "../Input";

const CheckoutForm = ({
  emailRef,
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
}) => {
  return (
    <>
      <div className="flex flex-col">
        <div className="px-4 py-3 border-b-[1px] border-b-gray-300 bg-[#262727]">
          CONTACT INFORMATION
        </div>
        <div className=" px-4 py-7 border-b-[1px] border-b-gray-300 flex w-full sm:flex-row flex-col sm:gap-0 gap-2">
          <div className="flex-1 mr-3 flex flex-col gap-2">
            <label className=" text-secondary-white text-sm" htmlFor="email">
              EMAIL ADDRESS
            </label>
            <Input
              id="email"
              borderColor="border-gray-300"
              type="text"
              placeholder="Janedoe@gmail.com"
              name="email"
              value={values.email}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.email}
              touched={touched.email}
              ref={emailRef}
            />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <label className=" text-secondary-white text-sm" htmlFor="phone">
              PHONE NUMBER
            </label>
            <Input
              id="phone"
              borderColor="border-gray-300"
              type="text"
              placeholder="(+234)81 0031 1867"
              name="phoneNumber"
              value={values.phoneNumber}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.phoneNumber}
              touched={touched.phoneNumber}
            />
          </div>
          <div></div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="px-4 py-3 border-b-[1px] border-b-gray-300 bg-[#262727]">
          SHIPPING INFORMATION
        </div>
        <div className="px-6 pt-7 flex w-full sm:flex-row flex-col sm:gap-0 gap-2">
          <div className="flex-1 mr-3 flex flex-col gap-2">
            <label className=" text-secondary-white text-sm" htmlFor="fname">
              FIRST NAME
            </label>
            <Input
              id="fname"
              borderColor="border-gray-300"
              type="text"
              placeholder="Jane"
              name="firstname"
              value={values.firstname}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.firstname}
              touched={touched.firstname}
            />
          </div>

          <div className="flex-1 mr-3 flex flex-col gap-2">
            <label className=" text-secondary-white text-sm" htmlFor="lname">
              LAST NAME
            </label>
            <Input
              id="lname"
              borderColor="border-gray-300"
              type="text"
              placeholder="Doe"
              name="lastname"
              value={values.lastname}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.lastname}
              touched={touched.lastname}
            />
          </div>
        </div>

        <div className="px-6 pt-7  flex w-full sm:flex-row flex-col sm:gap-0 gap-2">
          <div className="flex-1 mr-3 flex flex-col gap-2">
            <label className=" text-secondary-white text-sm" htmlFor="country">
              COUNTRY
            </label>
            <Input
              id="country"
              borderColor="border-gray-300"
              type="text"
              placeholder="Nigeria"
              name="country"
              value={values.country}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.country}
              touched={touched.country}
            />
          </div>

          <div className="flex-1 mr-3 flex flex-col gap-2">
            <label className=" text-white text-sm" htmlFor="city">
              CITY
            </label>
            <Input
              id="city"
              borderColor="border-gray-300"
              type="text"
              placeholder="Lagos"
              name="city"
              value={values.city}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.city}
              touched={touched.city}
            />
          </div>
        </div>

        <div className="px-6 py-7  flex w-full sm:flex-row flex-col sm:gap-0 gap-2">
          <div className="flex-1 mr-3 flex flex-col gap-2">
            <label className=" text-white text-sm" htmlFor="zip">
              ZIP CODE
            </label>
            <Input
              id="zip"
              borderColor="border-gray-300"
              type="text"
              placeholder="22122"
              name="zipCode"
              value={values.zipCode}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.zipCode}
              touched={touched.zipCode}
            />
          </div>

          <div className="flex-1 mr-3 flex flex-col gap-2">
            <label className=" text-white text-sm" htmlFor="address">
              STREET ADDRESS
            </label>
            <Input
              id="address"
              borderColor="border-gray-300"
              type="text"
              placeholder="Banana Island"
              name="address"
              value={values.address}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.address}
              touched={touched.address}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutForm;
