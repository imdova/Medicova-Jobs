import { API_GET_COMPANY_SECTORS, API_GET_COMPANY_TYPES_BY_SECTOR } from "@/api/admin";
import useFetch from "@/hooks/useFetch";
import { Company, Sector } from "@/types";
import {
  FormControl,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import { Control, Controller, UseFormSetValue, FieldErrors, UseFormWatch } from "react-hook-form";

interface SectorSelectionProps {
  control: Control<Company, any>
  watch: UseFormWatch<Company>;
  setValue: UseFormSetValue<Company>

}

const SectorSelection: React.FC<SectorSelectionProps> = ({
  control,
  watch,
  setValue
}) => {
  const selectedCompanySectorId = watch("companySectorId");

  const { data: sectorsData } = useFetch<PaginatedResponse<Sector>>(API_GET_COMPANY_SECTORS);
  const { data: typesData } = useFetch<PaginatedResponse<Sector>>(selectedCompanySectorId ? API_GET_COMPANY_TYPES_BY_SECTOR + selectedCompanySectorId : null, {
    fetchOnce: false,
    fetchOnUrlChange: true,
  });

  const sectors = sectorsData?.data || []
  const types = typesData?.data || []


  return (
    <div className="flex flex-wrap gap-5 md:flex-nowrap">
      {/* Company Sector Selector */}
      <div className="min-w-[200px] flex-1">
        <label className="text-lg font-semibold text-main">Company Sector *</label>
        <Controller
          name="companySectorName"
          control={control}
          rules={{ required: "Company Sector is required" }}
          render={({ field, fieldState: { error } }) => (
            <FormControl error={Boolean(error)} fullWidth>
              <Select
                {...field}
                value={field.value ?? undefined}
                onChange={(e) => {
                  const selectSector = e.target.value
                  field.onChange(e.target.value);
                  const sector = sectors.find(
                    (sector) => sector.name === selectSector,
                  );
                  setValue("companySectorId", sector?.id)
                  setValue("companyTypeId", "");
                  setValue("companyTypeName", "");
                }}
                displayEmpty
                MenuProps={{
                  disableScrollLock: true,
                  PaperProps: {
                    sx: { maxHeight: 300 },
                  },
                }}
                renderValue={(selected?: string) => {
                  if (!selected) {
                    return <em className="text-gray-400">Select Company Sector</em>;
                  }
                  return <span>{selected}</span>;
                }}
              >
                <MenuItem value="" disabled>
                  <em>Select Sector</em>
                </MenuItem>
                {sectors && sectors.map((sector) => (
                  <MenuItem key={sector.id} value={sector.name}>
                    {sector.name}
                  </MenuItem>
                ))}
              </Select>

              {error && (
                <p className="mt-2 text-sm text-red-500">
                  {error.message}
                </p>
              )}
            </FormControl>
          )}
        />
      </div>

      {/* Company Type Selector */}
      <div className="min-w-[200px] flex-1">
        <label className="text-lg font-semibold text-main">Company Type *</label>
        <Controller
          name="companyTypeName"
          control={control}
          rules={{ required: "Company Type is required" }}
          render={({ field, fieldState: { error } }) => (
            <FormControl error={Boolean(error)} fullWidth>
              <Tooltip
                title={
                  selectedCompanySectorId
                    ? undefined
                    : "Please select company sector first"
                }
                placement="bottom"
              >
                <Select
                  {...field}
                  value={field.value ?? undefined}
                  displayEmpty
                  MenuProps={{
                    disableScrollLock: true,
                    PaperProps: {
                      sx: { maxHeight: 300 },
                    },
                  }}
                  onChange={(e) => {
                    const selectSector = e.target.value
                    field.onChange(e.target.value);
                    const type = types.find(
                      (type) => type.name === selectSector,
                    );
                    setValue("companyTypeId", type?.id)
                  }}
                  renderValue={(selected?: string) => {
                    if (!selected) {
                      return <em className="text-gray-400">Select Company Type</em>;
                    }
                    return <span>{selected}</span>;
                  }}
                >
                  <MenuItem value="" disabled>
                    <em>Select Type</em>
                  </MenuItem>
                  {types && types.map((type) => (
                    <MenuItem key={type.id} value={type.name}>
                      {type.name}
                    </MenuItem>
                  ))}
                </Select>
              </Tooltip>

              {error && (
                <p className="mt-2 text-sm text-red-500">
                  {error.message}
                </p>
              )}
            </FormControl>
          )}
        />
      </div>
    </div>
  );
};

export default SectorSelection;
