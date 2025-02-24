import { FormControl, InputLabel, TextField } from "@mui/material";
import { Company } from "@/types";
import PhoneNumberInput from "@/components/UI/phoneNumber";

interface SectorSelectionProps {
  data: Partial<Company>;
  handleChange: <K extends keyof Company>(name: K, value: Company[K]) => void;
  errors: FormErrors;
}

const CompanyContactInputs: React.FC<SectorSelectionProps> = ({
  data,
  errors,
  handleChange,
}) => {
  return (
    <div className="flex flex-wrap gap-5">
      <div className="min-w-[250px] flex-1">
        <InputLabel className="mb-2 text-lg font-semibold text-main">
          Email *
        </InputLabel>
        <TextField
          name="email"
          placeholder="Enter your email"
          className="w-full"
          value={data.email || ""}
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
        <FormControl fullWidth error={!!errors.phone} className="w-full">
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
