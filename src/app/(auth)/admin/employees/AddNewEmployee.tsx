"use client";
import PhoneNumberInput from "@/components/UI/phoneNumber";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

// Define the form data types
interface FormData {
  name: string;
  email: string;
  password: string | number;
  StatusId: string;
  TitleId: string;
  DepartmentId: string;
  phone: string;
}

interface AddNewEmployeeProps {
  handleCloseModal: () => void; // Function to close the modal
  isModalOpen: boolean; // State to control the modal's visibility
  endPoint: string;
}

const AddNewEmployee: React.FC<AddNewEmployeeProps> = ({
  handleCloseModal,
  isModalOpen,
  endPoint,
}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [errorMessage, setErrorMessage] = useState<string>(""); // Error state
  const [phone, setPhone] = useState("");

  // Assume this function will call the API
  const submitFormData = async (data: FormData) => {
    const response = await fetch(endPoint, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    return response.json();
  };
  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    setLoading(true); // Start loading when form is submitted
    setErrorMessage(""); // Reset previous error messages

    try {
      const response = await submitFormData(data);
      if (response.error) {
        setErrorMessage(response.error); // Handle API errors
      } else {
        // Handle successful form submission (e.g., redirect or show success message)
        alert("Form submitted successfully!");
      }
    } catch (error) {
      setErrorMessage(
        "There was an error processing your request. Please try again.",
      );
    } finally {
      setLoading(false); // Stop loading after submission attempt
    }
  };

  function clearErrors(arg0: string) {
    throw new Error("Function not implemented.");
  }

  return (
    <Dialog
      open={isModalOpen}
      onClose={handleCloseModal}
      fullWidth
      maxWidth="sm"
    >
      <Typography
        className="m-3 w-fit border-b-2 border-primary p-3 text-primary"
        variant="h6"
        gutterBottom
      >
        Add New Employee
      </Typography>

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-5 flex flex-col items-center gap-3 border-b pb-5 md:flex-row">
            <div className="w-full md:w-fit">
              <label
                htmlFor="dropzone-file"
                className="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white p-2 text-gray-400 hover:border-primary hover:text-primary md:h-52 md:w-52"
              >
                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                  <svg
                    className="mb-3"
                    width="28"
                    height="28"
                    viewBox="0 0 34 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M23 9H23.02H23Z" fill="#A0AEC0" />
                    <path
                      d="M23 9H23.02"
                      stroke="#A0AEC0"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M27 1H7C3.68629 1 1 3.68629 1 7V27C1 30.3137 3.68629 33 7 33H27C30.3137 33 33 30.3137 33 27V7C33 3.68629 30.3137 1 27 1Z"
                      stroke="#A0AEC0"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M1 22.9999L9 14.9999C9.91212 14.1222 10.9468 13.6602 12 13.6602C13.0532 13.6602 14.0879 14.1222 15 14.9999L25 24.9999"
                      stroke="#A0AEC0"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M21 20.9999L23 18.9999C23.9121 18.1222 24.9468 17.6602 26 17.6602C27.0532 17.6602 28.0879 18.1222 29 18.9999L33 22.9999"
                      stroke="#A0AEC0"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <p>
                    <span className="text-xs font-semibold">
                      Click to upload
                    </span>
                  </p>
                  <p className="text-center text-[10px]">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  accept="image/*"
                />
              </label>
            </div>
            <div className="w-full">
              <div className="mb-3">
                <InputLabel className="text-sm">Full Name</InputLabel>
                <TextField
                  placeholder="Example"
                  fullWidth
                  className="mt-2"
                  {...register("name", {
                    required: "Company Name is required",
                  })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="w-full">
                  <InputLabel className="text-sm">Email</InputLabel>
                  <TextField
                    type="email"
                    placeholder="Example@gmail.com"
                    fullWidth
                    className="mt-2"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email address",
                      },
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                </div>
                <div className="w-full">
                  <InputLabel className="text-sm">Password</InputLabel>
                  <TextField
                    placeholder="Enter your Password"
                    fullWidth
                    type="password"
                    className="mt-2"
                    {...register("password", {
                      required: "password is required",
                    })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-2 flex flex-col gap-3 md:flex-row">
            <div className="w-full">
              <InputLabel className="relative mb-2 text-sm">
                Phone Number
              </InputLabel>
              <Box
                sx={{
                  mb: 1,
                  "& .PhoneInput": {
                    display: "flex",
                    border: errors.phone ? "1px solid red" : "1px solid #ccc",
                    height: "50px",
                    borderRadius: "10px",
                    alignItems: "center", // Ensures proper alignment
                    padding: "0 10px", // Adds padding inside the input
                  },
                }}
              >
                <Controller
                  control={control}
                  name="phone"
                  rules={{ required: "Phone number is required" }}
                  render={({ field }) => (
                    <PhoneNumberInput
                      {...field}
                      placeholder="Enter phone number"
                    />
                  )}
                />
                {errors.phone && (
                  <Typography sx={{ color: "red", fontSize: "12px", mt: 1 }}>
                    {errors.phone.message}
                  </Typography>
                )}
              </Box>
            </div>
            <div className="w-full">
              <div className="min-w-[150px] flex-1">
                <InputLabel className="relative mb-2 text-sm">
                  Status
                </InputLabel>
                <Controller
                  name="StatusId"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Status is required" }}
                  render={({ field }) => (
                    <FormControl error={Boolean(errors.StatusId)} fullWidth>
                      <Select
                        {...field}
                        displayEmpty
                        MenuProps={{
                          disableScrollLock: true,
                        }}
                        renderValue={(selected) => {
                          return selected || <em>Select Status</em>;
                        }}
                      >
                        <MenuItem value="" disabled>
                          <em>Select Status</em>
                        </MenuItem>
                        <MenuItem value="1">Active</MenuItem>
                        <MenuItem value="2">Active</MenuItem>
                        <MenuItem value="3">Active</MenuItem>
                      </Select>
                      {errors.StatusId && (
                        <p className="mt-2 text-sm text-red-500">
                          {errors.StatusId.message}
                        </p>
                      )}
                    </FormControl>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 md:flex-row">
            <div className="w-full">
              <InputLabel className="relative mb-2 text-sm">Title</InputLabel>
              <Controller
                name="TitleId"
                control={control}
                defaultValue=""
                rules={{ required: "Title is required" }}
                render={({ field }) => (
                  <FormControl error={Boolean(errors.TitleId)} fullWidth>
                    <Select
                      {...field}
                      displayEmpty
                      MenuProps={{
                        disableScrollLock: true,
                      }}
                      renderValue={(selected) => {
                        return selected || <em>Select Title</em>;
                      }}
                    >
                      <MenuItem value="" disabled>
                        <em>Select Title</em>
                      </MenuItem>
                      <MenuItem value="1">Title 1</MenuItem>
                      <MenuItem value="2">Title 2</MenuItem>
                      <MenuItem value="3">Title 3</MenuItem>
                    </Select>
                    {errors.TitleId && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.TitleId.message}
                      </p>
                    )}
                  </FormControl>
                )}
              />
            </div>
            <div className="mb-3 w-full">
              <div className="min-w-[150px] flex-1">
                <InputLabel className="relative mb-2 text-sm">
                  Department
                </InputLabel>
                <Controller
                  name="DepartmentId"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Department is required" }}
                  render={({ field }) => (
                    <FormControl error={Boolean(errors.DepartmentId)} fullWidth>
                      <Select
                        {...field}
                        displayEmpty
                        MenuProps={{
                          disableScrollLock: true,
                        }}
                        renderValue={(selected) => {
                          return selected || <em>Select Department</em>;
                        }}
                      >
                        <MenuItem value="" disabled>
                          <em>Select Department</em>
                        </MenuItem>
                        <MenuItem value="1">Department 1</MenuItem>
                        <MenuItem value="2">Department 2</MenuItem>
                        <MenuItem value="3">Department 3</MenuItem>
                      </Select>
                      {errors.DepartmentId && (
                        <p className="mt-2 text-sm text-red-500">
                          {errors.DepartmentId.message}
                        </p>
                      )}
                    </FormControl>
                  )}
                />
              </div>
            </div>
          </div>
          <InputLabel className="relative mb-2 text-sm">
            Permision/ Rule
          </InputLabel>
          <div className="flex flex-col gap-4 md:flex-row">
            <button className="flex h-12 w-full items-center justify-center border text-secondary">
              Full Permision
            </button>
            <button className="flex h-12 w-full items-center justify-center border text-secondary">
              Full Permision
            </button>
            <button className="flex h-12 w-full items-center justify-center border text-secondary">
              Full Permision
            </button>
            <button className="flex h-12 w-full items-center justify-center border text-secondary">
              Full Permision
            </button>
          </div>
          <DialogActions className="mt-4 flex flex-col items-center gap-5 md:flex-row md:items-start">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              className="w-full md:w-48"
            >
              {loading ? <CircularProgress size={24} /> : "Add"}
            </Button>

            <Button
              onClick={handleCloseModal}
              variant="outlined"
              className="w-full md:w-48"
            >
              Cancel
            </Button>
            {errorMessage && (
              <div className="mt-4 text-xs text-red-500">{errorMessage}</div>
            )}
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewEmployee;
