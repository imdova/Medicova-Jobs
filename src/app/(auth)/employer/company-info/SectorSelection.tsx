import { getSectorList, getTypeList } from "@/lib/actions/employer.actions";
import { Company, Sector } from "@/types";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";

interface SectorSelectionProps {
  data: Partial<Company>;
  setData: React.Dispatch<React.SetStateAction<Partial<Company>>>;
  errors: FormErrors;
}

const SectorSelection = ({ data, setData, errors }: SectorSelectionProps) => {
  const [sectorList, setSectorList] = useState<Sector[]>([]);
  const [typeList, setTypeList] = useState<Sector[]>([]);
  const sectorDataHandler = async () => {
    const result = await getSectorList();
    if (result.success && result.data) {
      setSectorList(result.data);
    }
  };

  const typesDataHandler = async (companySectorId: string) => {
    const result = await getTypeList(companySectorId);
    if (result.success && result.data) {
      setTypeList(result.data);
    }
  };

  useEffect(() => {
    sectorDataHandler();
  }, []);

  useEffect(() => {
    if (data.companySectorId) {
      typesDataHandler(data.companySectorId);
    }
  }, [data.companySectorId]);

  return (
    <div className="flex flex-wrap gap-5 md:flex-nowrap">
      {/* Company Sector Selector */}
      <div className="min-w-[250px] flex-1">
        <InputLabel className="mb-2 text-lg font-semibold text-main">
          Company Sector *
        </InputLabel>
        <FormControl
          fullWidth
          error={Boolean(errors.companyTypeId) && !data.companySectorId}
        >
          <Select
            className="w-full"
            displayEmpty
            MenuProps={{
              disableScrollLock: true,
              PaperProps: {
                sx: { maxHeight: 300 },
              },
            }}
            renderValue={(selected?: string) => {
              const sec = sectorList.find(
                (sector) => sector.id === selected,
              )?.name;
              if (!sec) {
                return <em className="text-gray-400">Select Company Sector</em>;
              }
              return <span>{sec}</span>;
            }}
            onChange={(e) => {
              setData({ ...data, companySectorId: e.target.value });
            }}
            value={sectorList.length > 0 ? (data.companySectorId ?? "") : ""}
          >
            <MenuItem value="" disabled>
              <em>Select Sector</em>
            </MenuItem>
            {sectorList.map((sector) => (
              <MenuItem key={sector.id} value={sector.id}>
                {sector.name}
              </MenuItem>
            ))}
          </Select>
          {Boolean(errors.companyTypeId) && !data.companySectorId && (
            <FormHelperText>sector is required</FormHelperText>
          )}
        </FormControl>
      </div>

      {/* Company Type Selector */}
      <div className="min-w-[250px] flex-1">
        <InputLabel className="mb-2 text-lg font-semibold text-main">
          Company Type *
        </InputLabel>
        <FormControl
          fullWidth
          error={Boolean(errors.companyTypeId) && !data.companyTypeId}
        >
          <Tooltip
            title={
              data.companySectorId
                ? undefined
                : "Please select company sector first"
            }
            placement="bottom"
          >
            <Select
              className="w-full"
              displayEmpty
              disabled={
                data.companySectorId ? false : true || typeList.length === 0
              }
              MenuProps={{
                disableScrollLock: true,
                PaperProps: {
                  sx: { maxHeight: 300 },
                },
              }}
              renderValue={(selected?: string) => {
                const type = typeList.find((t) => t.id === selected)?.name;
                if (!type) {
                  return <em className="text-gray-400">Select Company Type</em>;
                }
                return <span>{type}</span>;
              }}
              onChange={(e) => {
                setData({ ...data, companyTypeId: e.target.value });
              }}
              value={typeList?.length > 0 ? data.companyTypeId || "" : ""}
            >
              <MenuItem value="" disabled>
                <em>Select Company Type</em>
              </MenuItem>
              {typeList.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </Tooltip>
          {Boolean(errors.companyTypeId) && !data.companyTypeId && (
            <FormHelperText>Type is required</FormHelperText>
          )}
        </FormControl>
      </div>
    </div>
  );
};

export default SectorSelection;
