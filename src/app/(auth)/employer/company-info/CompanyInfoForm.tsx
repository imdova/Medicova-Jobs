"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Tooltip,
} from "@mui/material";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import DynamicRadioGroup from "@/components/form/DynamicRadioGroup";
import { Company, CompanySize, Country, Sector, state, UserState } from "@/types";
import {
  createCompany,
  getSectorList,
  getTypeList,
} from "@/lib/actions/employer.actions";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getCountryList, getStateList } from "@/lib/actions/location.actions";
import { useSession } from "next-auth/react";

const initialCompany: Company = {
  name: "",
  about: "",
  isPrivate: true,
  isProfitable: true,
  status: "active",
  countryCode: "",
  stateCode: "",
  city: "",
  size: null,
  phone: "",
  email: "",
  yearFounded: "",
  typeId: "",
};

const companySizeList: CompanySize[] = [
  "micro",
  "small",
  "medium",
  "large",
  "enterprise",
];
const CompanyInfoForm: React.FC = () => {
  const [data, setData] = useState<Company>(initialCompany);
  // const company = useAppSelector((state) => state.company);
  // const dispatch = useAppDispatch();
  const { data: session, status } = useSession();
  const user = session?.user as UserState;

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    phone: "",
    typeId: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setData({
      ...data,
      [name]: value ?? checked,
    });
  };

  const handleSelect = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value as string });
  };

  const validateForm = () => {
    const { email, phone, typeId } = data;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const error = {
      email: "",
      phone: "",
      typeId: "",
    };

    if (!emailRegex.test(email || "")) {
      error.email = "Enter a valid email address";
    }
    if (!phone) {
      error.phone = "Phone number is required";
    }
    if (!typeId) {
      error.typeId = "Type is required";
    }

    setErrors(error);
    return Object.keys(error).every(
      (key) => error[key as keyof typeof error] === "",
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (validateForm()) {
      setLoading(true);
      const result = await createCompany(data);
      if (result.success) {
        setLoading(false);
        console.log("Company created successfully");
      } else {
        setLoading(false);
        setError(result.message);
      }
    }
  };

  return (
    <form
      className="rounded-base border-gray-100 bg-white p-3 md:border md:p-5 md:shadow-lg"
      onSubmit={handleSubmit}
      noValidate
    >
      {/* <Alert severity="warning" sx={{ mb: 2 }}>
                You cannot save an empty value for a question!
              </Alert> */}
      <h5 className="mb-8 text-2xl font-semibold text-main md:mt-4">
        Company Main Information
      </h5>
      <div className="mb-4 md:w-1/2 md:pr-5">
        <InputLabel className="mb-2 text-lg font-semibold text-main">
          Name
        </InputLabel>
        <TextField
          className="w-full"
          name="name"
          placeholder="Enter your company name"
          value={data.name}
          onChange={handleChange}
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
              borderRadius: "8px",
              height: "auto",
            },
          }}
          multiline
          minRows={4}
          maxRows={6}
          onChange={handleChange}
        />
      </div>
      {/* Company Sector and Company Type Selectors */}
      <SectorSelection data={data} setData={setData} errors={errors} />
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
            defaultValue="private"
            row
            onChange={(value) =>
              setData({
                ...data,
                isPrivate: value === "private" ? true : false,
              })
            }
          />
          <span>&</span>
          <DynamicRadioGroup
            options={[
              { value: "nonProfit", label: "Non-Profit Org" },
              { value: "profit", label: "Profit Org" },
            ]}
            defaultValue="profit"
            row
            onChange={(value) =>
              setData({
                ...data,
                isProfitable: value === "profit" ? true : false,
              })
            }
          />
        </div>
      </FormControl>

      {/* Additional Form Fields */}
      <LocationSelection data={data} setData={setData} errors={errors} />
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
            onChange={handleSelect}
            renderValue={(selected) => {
              if (!selected) {
                return <em className="text-gray-400">Select Company Size</em>;
              }
              return <span>{selected}</span>;
            }}
          >
            <MenuItem value="" disabled>
              <em>Select Company Size</em>
            </MenuItem>
            {companySizeList.map((item, i) => (
              <MenuItem key={i} value={item}>
                {item}
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
            onChange={handleSelect}
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

      <div className="mb-4 flex flex-wrap gap-5">
        <div className="min-w-[250px] flex-1">
          <InputLabel className="mb-2 text-lg font-semibold text-main">
            Email
          </InputLabel>
          <TextField
            name="email"
            placeholder="Enter your email"
            className="w-full"
            value={data.email}
            type="email"
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
        </div>

        <div className="min-w-[250px] flex-1">
          <InputLabel className="mb-2 text-lg font-semibold text-main">
            Phone Number
          </InputLabel>
          <Box
            className="w-full"
            sx={{
              mb: 1,
              "& .PhoneInput": {
                display: "flex",
                border: "1px solid #ccc",
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
                  color: "GrayText", // Set placeholder color to black
                  opacity: 0.7, // Ensure full opacity
                },
                "&:hover": {
                  border: "1px solid black",
                },
                "&:focus": {
                  border: "1px solid transparent",
                  outline: "2px solid var(--light-primary)",
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
                border: "1px solid black",
              },
            }}
          >
            <PhoneInput
              defaultCountry="EG"
              value={data.phone ?? ""}
              labels={{ phone: "Enter Phone Number" }}
              placeholder="Enter phone number"
              onChange={(value) => setData({ ...data, phone: value ?? "" })}
            />
          </Box>
        </div>
      </div>
      <p className="text-center text-red-500">{error}</p>
      {/* Centered Save Button */}
      <div className="flex justify-center">
        <Button
          type="submit"
          disabled={loading}
          variant="contained"
          className="px-6 py-4 text-xl"
        >
          {loading ? "Loading..." : "Create Company"}
        </Button>
      </div>
    </form>
  );
};

export default CompanyInfoForm;

interface SectorSelectionProps {
  data: Company;
  setData: React.Dispatch<React.SetStateAction<Company>>;
  errors: { typeId: string };
}

const SectorSelection = ({ data, setData, errors }: SectorSelectionProps) => {
  const [sectorList, setSectorList] = useState<Sector[]>([]);
  const [sectorId, setSectorId] = useState(data.typeId);
  const [typeList, setTypeList] = useState<Sector[]>([]);
  const sectorDataHandler = async () => {
    const result = await getSectorList();
    if (result.success && result.data) {
      setSectorList(result.data);
    }
  };

  const typesDataHandler = async (sectorId: string) => {
    const result = await getTypeList(sectorId);
    if (result.success && result.data) {
      setTypeList(result.data);
    }
  };

  useEffect(() => {
    sectorDataHandler();
  }, []);

  useEffect(() => {
    if (sectorId) {
      typesDataHandler(sectorId);
    }
  }, [sectorId]);
  return (
    <div className="mb-8 flex flex-wrap gap-5 md:flex-nowrap">
      {/* Company Sector Selector */}
      <div className="min-w-[250px] flex-1">
        <InputLabel className="mb-2 text-lg font-semibold text-main">
          Company Sector
        </InputLabel>
        <FormControl fullWidth error={Boolean(errors.typeId) && !sectorId}>
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
              setSectorId(e.target.value);
            }}
            value={sectorId}
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
          {Boolean(errors.typeId) && !sectorId && (
            <FormHelperText>sector is required</FormHelperText>
          )}
        </FormControl>
      </div>

      {/* Company Type Selector */}
      <div className="min-w-[250px] flex-1">
        <InputLabel className="mb-2 text-lg font-semibold text-main">
          Company Type
        </InputLabel>
        <FormControl fullWidth error={Boolean(errors.typeId) && !data.typeId}>
          <Tooltip
            title={sectorId ? undefined : "Please select company sector first"}
            placement="bottom"
          >
            <Select
              className="w-full"
              displayEmpty
              disabled={sectorId ? false : true || typeList.length === 0}
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
                setData({ ...data, typeId: e.target.value });
              }}
              value={data.typeId}
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
          {Boolean(errors.typeId) && !data.typeId && (
            <FormHelperText>Type is required</FormHelperText>
          )}
        </FormControl>
      </div>
    </div>
  );
};

const LocationSelection = ({ data, setData, errors }: SectorSelectionProps) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<state[]>([]);
  const [cities, setSites] = useState<string[]>([]);
  const countriesHandler = async () => {
    const result = await getCountryList();
    if (result.success && result.data) {
      setCountries(result.data);
    }
  };

  const statesHandler = async (countryCode: string) => {
    const result = await getStateList(countryCode);
    if (result.success && result.data) {
      setStates(result.data);
    }
  };

  useEffect(() => {
    countriesHandler();
  }, []);

  useEffect(() => {
    if (data.countryCode) {
      statesHandler(data.countryCode);
    }
  }, [data.countryCode]);
  return (
    <div className="mb-8 flex flex-wrap gap-5 md:flex-nowrap">
      {/* Company Sector Selector */}
      <div className="flex flex-1 gap-5">
        <div className="min-w-[150px] flex-1">
          <InputLabel className="mb-2 text-lg font-semibold text-main">
            Country
          </InputLabel>
          <FormControl fullWidth>
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
                const countryName = countries.find(
                  (c) => c.isoCode === selected,
                )?.name;
                if (!countryName) {
                  return <em className="text-gray-400">Select Country</em>;
                }
                return <span>{countryName}</span>;
              }}
              onChange={(e) => {
                setData({ ...data, countryCode: e.target.value });
              }}
              value={data.countryCode}
            >
              <MenuItem value="" disabled>
                <em>Select Sector</em>
              </MenuItem>
              {countries.map((country) => (
                <MenuItem key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
            {/* {Boolean(errors.typeId) && !sectorId && (
            <FormHelperText>sector is required</FormHelperText>
          )} */}
          </FormControl>
        </div>
        {/* Company Type Selector */}
        <div className="min-w-[150px] flex-1">
          <InputLabel className="mb-2 text-lg font-semibold text-main">
            states
          </InputLabel>
          <FormControl
            fullWidth
            error={Boolean(errors.typeId) && !data.countryCode}
          >
            <Tooltip
              title={
                data.countryCode ? undefined : "Please select Country first"
              }
              placement="bottom"
            >
              <Select
                className="w-full"
                displayEmpty
                disabled={
                  data.countryCode ? false : true || cities.length === 0
                }
                MenuProps={{
                  disableScrollLock: true,
                  PaperProps: {
                    sx: { maxHeight: 300 },
                  },
                }}
                renderValue={(selected?: string) => {
                  const stateName = states.find(
                    (s) => s.isoCode === selected,
                  )?.name;
                  if (!stateName) {
                    return <em className="text-gray-400">Select State</em>;
                  }
                  return <span>{stateName}</span>;
                }}
                onChange={(e) => {
                  setData({ ...data, stateCode: e.target.value });
                }}
                value={data.stateCode}
              >
                <MenuItem value="" disabled>
                  <em>Select State</em>
                </MenuItem>
                {states.map((state) => (
                  <MenuItem key={state.isoCode} value={state.isoCode}>
                    {state.name}
                  </MenuItem>
                ))}
              </Select>
            </Tooltip>
            {Boolean(errors.typeId) && !data.stateCode && (
              <FormHelperText>Type is required</FormHelperText>
            )}
          </FormControl>
        </div>
      </div>
      <div className="min-w-[250px] flex-1">
        <InputLabel className="mb-2 text-lg font-semibold text-main">
          City
        </InputLabel>
        <TextField
          className="w-full"
          placeholder="Enter City"
          value={data.city}
          onChange={(e) => setData({ ...data, city: e.target.value })}
        />
      </div>
    </div>
  );
};
