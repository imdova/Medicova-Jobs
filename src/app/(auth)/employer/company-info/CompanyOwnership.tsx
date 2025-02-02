import DynamicRadioGroup from "@/components/form/DynamicRadioGroup";
import SearchableSelect from "@/components/UI/SearchableSelect";
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

          <SearchableSelect
            options={Array.from({
              length: new Date().getFullYear() - 1800 + 1,
            })
              .reverse()
              .map((_, i) => ({
                value: String(new Date().getFullYear() - i),
                label: String(new Date().getFullYear() - i),
              }))}
            className="w-full"
            displayEmpty
            name="yearFounded"
            value={data.yearFounded?.toString() || ""}
            onChange={(e) => handleChange("yearFounded", e.target.value)}
            renderValue={(selected) => {
              if (!selected) {
                return <em className="text-gray-400">Select Founded Year </em>;
              }
              return <span>{selected}</span>;
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyOwnership;
