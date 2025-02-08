import { Company } from "@/types";
import { InputLabel, TextField } from "@mui/material";

interface SectorSelectionProps {
  data: Company;
  handleChange: <K extends keyof Company>(name: K, value: Company[K]) => void;
  errors: { [key: string]: string };
}

const MainInformation: React.FC<SectorSelectionProps> = ({
  data,
  errors,
  handleChange,
}) => {
  return (
    <div>
      <h5 className="mb-8 text-2xl font-semibold text-main md:mt-4">
        Company Main Information
      </h5>
      <div className="mb-4 md:w-1/2 md:pr-5">
        <InputLabel className="mb-2 text-lg font-semibold text-main">
          Name *
        </InputLabel>
        <TextField
          className="w-full"
          name="name"
          placeholder="Enter your company name"
          value={data.name}
          onChange={(e) => handleChange("name", e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
        />
      </div>
      <div className="mb-4">
        <InputLabel className="mb-2 text-lg font-semibold text-main">
          Title
        </InputLabel>
        <TextField
          className="w-full"
          name="Title"
          placeholder="Enter your title"
          value={data.title}
          onChange={(e) => handleChange("title", e.target.value)}
          error={!!errors.title}
          helperText={errors.title}
        />
      </div>
      <div className="mb-4">
        <InputLabel className="mb-2 text-lg font-semibold text-main">
          About
        </InputLabel>
        <TextField
          className="w-full"
          name="about"
          defaultValue={data.about}
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
          onChange={(e) => handleChange("about", e.target.value)}
        />
      </div>
    </div>
  );
};

export default MainInformation;
