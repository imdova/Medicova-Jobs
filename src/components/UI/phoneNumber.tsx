import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCountries } from "@/store/slices/locationSlice";
import {
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { useEffect, useState } from "react";
import Flag from "./flagitem";
import SearchableSelect from "./SearchableSelect";

const PhoneNumberInput: React.FC<TextFieldProps> = (props) => {
  const {
    countries: { data: countries, loading, error },
  } = useAppSelector((state) => state.location);
  const dispatch = useAppDispatch();

  const [countryCode, setCountryCode] = useState<string>("20");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const handleCountryChange = (event: SelectChangeEvent<string>) => {
    const newCode = event.target.value;
    setCountryCode(newCode);
    const newValue = `${formatCode(newCode)}${phoneNumber}`;
    if (props.onChange) {
      const syntheticEvent = {
        target: {
          value: newValue,
        },
      } as React.ChangeEvent<HTMLInputElement>;
      props.onChange(syntheticEvent);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const digits = e.target.value;
    setPhoneNumber(digits);
    const newValue = `${formatCode(countryCode)}${digits}`;
    if (props.onChange) {
      const syntheticEvent = {
        target: {
          value: newValue,
        },
      } as React.ChangeEvent<HTMLInputElement>;
      props.onChange(syntheticEvent);
    }
  };

  const formatCode = (code: string): string => {
    if (!code.startsWith("+")) {
      return `+${code}`;
    }
    return code;
  };

  useEffect(() => {
    if (countries.length === 0) {
      dispatch(fetchCountries());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  return (
    <div className="flex">
      <SearchableSelect
        displayEmpty
        options={countries.map((x) => ({
          value: x.phonecode,
          label: `${x.name} (${formatCode(x.phonecode)})`,
        }))}
        value={countries.length > 0 ? countryCode : ""}
        onChange={handleCountryChange}
        sx={{
          "& fieldset": {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          },
        }}
        renderValue={(selected: string) => {
          const item = countries.find((x) => x.phonecode == selected);
          return (
            item && (
              <div className="flex w-fit items-center">
                <Flag
                  code={item.isoCode.toLocaleLowerCase()}
                  name={item.name}
                />{" "}
                <p className="ml-2 min-w-12">{formatCode(selected)}</p>
              </div>
            )
          );
        }}
      />
      <TextField
        {...props}
        sx={{
          "& fieldset": {
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          },
          ...props.sx,
        }}
        value={phoneNumber}
        onChange={handlePhoneChange}
      />
    </div>
  );
};

export default PhoneNumberInput;
