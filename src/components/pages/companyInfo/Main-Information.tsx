import { Company } from "@/types";
import { TextField } from "@mui/material";
import { Control, Controller, FieldErrors } from "react-hook-form";

interface MainInfoProps {
  control: Control<Company, any>
  errors: FieldErrors<Company>
}

const MainInformation: React.FC<MainInfoProps> = ({
  control,
  errors,
}) => {
  return (
    <div>
      <h5 className="mb-8 text-2xl font-semibold text-main md:mt-4">
        Company Main Information
      </h5>
      <div className="mb-4 md:w-1/2 md:pr-5">
        <label className="mb-2 text-lg font-semibold text-main">
          Name *
        </label>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          rules={{ required: "Name is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              className="w-full"
              placeholder="Enter your company name"
              error={!!errors?.name?.message}
            />
          )}
        />
        {errors.name && (
          <p className="mt-2 text-sm text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label className="mb-2 text-lg font-semibold text-main">
          Title
        </label>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="w-full"
              placeholder="Enter The Company Title"
            />
          )}
        />
      </div>
      <div className="mb-4">
        <label className="mb-2 text-lg font-semibold text-main">
          About
        </label>
        <Controller
          name="about"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="w-full"
              placeholder="Enter your company description"
              sx={{
                "& .MuiOutlinedInput-root": {
                  p: 0,
                  borderRadius: "10px",
                  height: "auto",
                },
              }}
              multiline
              minRows={4}
              maxRows={4}
            />
          )}
        />
      </div>
    </div>
  );
};

export default MainInformation;
