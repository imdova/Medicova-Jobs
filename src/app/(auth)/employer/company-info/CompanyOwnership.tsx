import DynamicRadioGroup from "@/components/form/DynamicRadioGroup";
import { companySizeList } from "@/constants";
import { CompanySize } from "@/constants/enums/company-size.enum";
import { Company } from "@/types";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface SectorSelectionProps {
  data: Company;
  handleChange: <K extends keyof Company>(name: K, value: Company[K]) => void;
  errors: { [key: string]: string };
}

const CompanyOwnership: React.FC<SectorSelectionProps> = ({
  data,
  errors,
  handleChange,
}) => {
  return (
    <div>
      <h5 className="mb-8 mt-4 text-2xl font-semibold text-main">
        Company Ownership Type
      </h5>
      <FormControl className="mb-4" component="fieldset" fullWidth>
        <div className="flex flex-wrap items-center gap-2">
          <DynamicRadioGroup
            options={[
              { value: "private", label: "Private" },
              { value: "governmental", label: "Governmental" },
            ]}
            defaultValue={data.isPrivate ? "private" : "governmental"}
            row
            onChange={(value) =>
              handleChange("isPrivate", value === "private" ? true : false)
            }
          />
          <span>&</span>
          <DynamicRadioGroup
            options={[
              { value: "nonProfit", label: "Non-Profit Org" },
              { value: "profit", label: "Profit Org" },
            ]}
            defaultValue={data.isProfitable ? "profit" : "nonProfit"}
            row
            onChange={(value) =>
              handleChange("isProfitable", value === "profit" ? true : false)
            }
          />
        </div>
      </FormControl>

      {/* Additional Form Fields */}
      <div className="mb-4 flex flex-wrap gap-5">
        <div className="flex-1">
          <InputLabel className="mb-2 text-lg font-semibold text-main">
            Company Size
          </InputLabel>
          <Select
            displayEmpty
            MenuProps={{
              disableScrollLock: true,
              PaperProps: {
                sx: { maxHeight: 300 },
              },
            }}
            className="w-full"
            name="size"
            value={data.size || ""}
            onChange={(e) =>
              handleChange("size", e.target.value as CompanySize)
            }
            renderValue={(selected) => {
              const selectedSize = companySizeList.find(
                (item) => item.value === selected,
              );
              if (!selectedSize) {
                return <em className="text-gray-400">Select Company Size</em>;
              }
              return <span>{selectedSize.name}</span>;
            }}
          >
            <MenuItem value="" disabled>
              <em>Select Company Size</em>
            </MenuItem>
            {companySizeList.map((item, i) => (
              <MenuItem key={item.value} value={item.value}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="flex-1">
          <InputLabel className="mb-2 text-lg font-semibold text-main">
            Year Founded
          </InputLabel>
          <Select
            className="w-full"
            displayEmpty
            MenuProps={{
              disableScrollLock: true,
              PaperProps: {
                sx: { maxHeight: 300 },
              },
            }}
            name="yearFounded"
            value={data.yearFounded?.toString() || ""}
            onChange={(e) => handleChange("yearFounded", e.target.value)}
            renderValue={(selected) => {
              if (!selected) {
                return <em className="text-gray-400">Select Founded Year </em>;
              }
              return <span>{selected}</span>;
            }}
          >
            <MenuItem value="" disabled>
              <em>Select Founded Year</em>
            </MenuItem>
            {Array.from({
              length: new Date().getFullYear() - 1800 + 1,
            }).map((_, i) => (
              <MenuItem key={i + 1800} value={i + 1800}>
                {i + 1800}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
};

export default CompanyOwnership;
