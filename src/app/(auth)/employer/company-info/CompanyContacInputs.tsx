import { FormControl, InputLabel, TextField } from "@mui/material";
import { Company } from "@/types";
import PhoneNumberInput from "@/components/UI/phoneNumber";

interface SectorSelectionProps {
  data: Company;
  handleChange: <K extends keyof Company>(name: K, value: Company[K]) => void;
  errors: { [key: string]: string };
}

const CompanyContactInputs: React.FC<SectorSelectionProps> = ({
  data,
  errors,
  handleChange,
}) => {
  return (
    <div className="mb-4 flex flex-wrap gap-5">
      <div className="min-w-[250px] flex-1">
        <InputLabel className="mb-2 text-lg font-semibold text-main">
          Email *
        </InputLabel>
        <TextField
          name="email"
          placeholder="Enter your email"
          className="w-full"
          value={data.email}
          type="email"
          onChange={(e) => handleChange("email", e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
        />
      </div>

      <div className="min-w-[250px] flex-1">
        <InputLabel className="mb-2 text-lg font-semibold text-main">
          Phone Number
        </InputLabel>
        <FormControl
          fullWidth
          error={!!errors.phone}
          className="w-full"
          sx={{
            mb: 1,
            "& .PhoneInput": {
              display: "flex",
              border: errors.phone ? "1px solid red" : "1px solid #ccc",
              height: "50px",
              borderRadius: "10px",
            },
            "& .PhoneInputInput": {
              padding: "15px",
              fontSize: "14px",
              width: "100%",
              borderRadius: "0 10px 10px 0",
              border: "1px solid transparent",
              backgroundColor: "transparent",
              height: "50px",

              "&::placeholder": {
                color: errors.phone ? "red" : "GrayText", // Set placeholder color to black
                opacity: 0.7, // Ensure full opacity
              },
              "&:hover": {
                border: errors.phone ? "" : "1px solid black",
              },
              "&:focus": {
                border: errors.phone ? "" : "1px solid var(--light-primary)",
                outline: "2px solid transparent",
              },
            },
            "& .PhoneInputCountry": {
              borderRadius: "10px 0 0 10px",
              border: "1px solid transparent",
              display: "flex",
              gap: "5px",
              px: 1,
              m: 0,
            },
            "& .PhoneInputCountry:hover": {
              border: errors.phone ? "" : "1px solid black",
            },
          }}
        >
          <PhoneNumberInput
            fullWidth
            value={data.phone ?? ""}
            placeholder="Enter phone number"
            onChange={(e) => {
              handleChange("phone", e.target.value);
            }}
          />
        </FormControl>
        {Boolean(errors.phone) && (
          <p className="text-sm text-red-500">{errors.phone}</p>
        )}
      </div>
    </div>
  );
};

export default CompanyContactInputs;
