"use client";
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
  Price: string;
  password: string | number;
  BillungCycle: string;
  Views: number;
  Unlocks: number;
  Jobs: number;
  Invitaions: number;
  Users: number;
  AccessPeriod: string;
}

// Assume this function will call the API
const submitFormData = async (data: FormData) => {
  const response = await fetch("/api/submit-form", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return response.json();
};
interface AddNewPlanProps {
  handleCloseModal: () => void; // Function to close the modal
  isModalOpen: boolean; // State to control the modal's visibility
}

const AddNewPlan: React.FC<AddNewPlanProps> = ({
  handleCloseModal,
  isModalOpen,
}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [errorMessage, setErrorMessage] = useState<string>(""); // Error state

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
        Add New Plan
      </Typography>

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-5 flex flex-col items-center gap-3 border-b pb-5 md:flex-row">
            <div className="w-full">
              <div className="mb-3">
                <InputLabel className="text-sm">Name</InputLabel>
                <TextField
                  placeholder="Enter plan name"
                  fullWidth
                  className="mt-2"
                  {...register("name", {
                    required: "Plan Name is required",
                  })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="w-full">
                  <InputLabel className="text-sm">Price</InputLabel>
                  <TextField
                    type="Price"
                    placeholder="Enter plan Price"
                    fullWidth
                    className="mt-2"
                    {...register("Price", {
                      required: "Price is required",
                    })}
                    error={!!errors.Price}
                    helperText={errors.Price?.message}
                  />
                </div>
                <div className="w-full">
                  <InputLabel className="relative mb-2 text-sm">
                    BillungCycle
                  </InputLabel>
                  <Controller
                    name="BillungCycle"
                    control={control}
                    defaultValue=""
                    rules={{ required: "BillungCycle is required" }}
                    render={({ field }) => (
                      <FormControl
                        error={Boolean(errors.BillungCycle)}
                        fullWidth
                      >
                        <Select
                          {...field}
                          displayEmpty
                          MenuProps={{
                            disableScrollLock: true,
                          }}
                          renderValue={(selected) => {
                            return (
                              selected || (
                                <div className="text-sm text-gray-400">
                                  Select BillungCycle
                                </div>
                              )
                            );
                          }}
                        >
                          <MenuItem value="" disabled>
                            <div className="text-sm text-gray-400">
                              Select Billung Cycle
                            </div>
                          </MenuItem>
                          <MenuItem value="1">BillungCycle 1</MenuItem>
                          <MenuItem value="2">BillungCycle 2</MenuItem>
                          <MenuItem value="3">BillungCycle 3</MenuItem>
                        </Select>
                        {errors.BillungCycle && (
                          <p className="mt-2 text-sm text-red-500">
                            {errors.BillungCycle.message}
                          </p>
                        )}
                      </FormControl>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mb-2">
            <div className="flex w-full flex-col gap-3 md:flex-row">
              <div className="mb-3">
                <InputLabel className="text-sm">Views</InputLabel>
                <TextField
                  placeholder="Enter Number of allowed Views"
                  fullWidth
                  className="mt-2"
                  {...register("Views", {
                    required: "Number of Views is required",
                  })}
                  error={!!errors.Views}
                  helperText={errors.Views?.message}
                />
              </div>
              <div className="mb-3">
                <InputLabel className="text-sm">Unlocks</InputLabel>
                <TextField
                  placeholder="Enter Number of Unlocks"
                  fullWidth
                  className="mt-2"
                  {...register("Unlocks", {
                    required: "Number of Unlocks is required",
                  })}
                  error={!!errors.Unlocks}
                  helperText={errors.Unlocks?.message}
                />
              </div>
              <div className="mb-3">
                <InputLabel className="text-sm">Jobs</InputLabel>
                <TextField
                  placeholder="Enter Number of Jobs"
                  fullWidth
                  className="mt-2"
                  {...register("Jobs", {
                    required: "Number of Jobs is required",
                  })}
                  error={!!errors.Jobs}
                  helperText={errors.Jobs?.message}
                />
              </div>
            </div>
          </div>
          <div className="mb-2">
            <div className="flex w-full flex-col gap-3 md:flex-row">
              <div className="mb-3 w-full">
                <InputLabel className="text-sm">Invitaions</InputLabel>
                <TextField
                  placeholder="Enter Number of allowed Invitaions"
                  fullWidth
                  className="mt-2"
                  {...register("Invitaions", {
                    required: "Number of Invitaions is required",
                  })}
                  error={!!errors.Invitaions}
                  helperText={errors.Invitaions?.message}
                />
              </div>
              <div className="mb-3 w-full">
                <InputLabel className="text-sm">Users</InputLabel>
                <TextField
                  placeholder="Enter Number of allowed Users"
                  fullWidth
                  className="mt-2"
                  {...register("Users", {
                    required: "Number of Users is required",
                  })}
                  error={!!errors.Users}
                  helperText={errors.Users?.message}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 md:flex-row">
            <div className="w-full">
              <InputLabel className="relative mb-2 text-sm">
                Access Period
              </InputLabel>
              <Controller
                name="AccessPeriod"
                control={control}
                defaultValue=""
                rules={{ required: "AccessPeriod is required" }}
                render={({ field }) => (
                  <FormControl error={Boolean(errors.AccessPeriod)} fullWidth>
                    <Select
                      {...field}
                      displayEmpty
                      MenuProps={{
                        disableScrollLock: true,
                      }}
                      renderValue={(selected) => {
                        return (
                          selected || (
                            <div className="text-sm text-gray-400">
                              Select AccessPeriod
                            </div>
                          )
                        );
                      }}
                    >
                      <MenuItem value="" disabled>
                        <div className="text-sm text-gray-400">
                          Select Access Period
                        </div>
                      </MenuItem>
                      <MenuItem value="1">AccessPeriod 1</MenuItem>
                      <MenuItem value="2">AccessPeriod 2</MenuItem>
                      <MenuItem value="3">AccessPeriod 3</MenuItem>
                    </Select>
                    {errors.AccessPeriod && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.AccessPeriod.message}
                      </p>
                    )}
                  </FormControl>
                )}
              />
            </div>
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

export default AddNewPlan;
