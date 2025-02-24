import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCountries } from "@/store/slices/locationSlice";
import { TextField, TextFieldProps, SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import Flag from "./flagitem";
import SearchableSelect from "./SearchableSelect";
import { CountryCode, parsePhoneNumberFromString } from "libphonenumber-js";
import { isValidEgyptianPhoneNumber } from "@/util/forms";

const formatCode = (code: string): string => {
  if (!code.startsWith("+")) {
    return `+${code}`;
  }
  return code;
};

const PhoneNumberInput: React.FC<TextFieldProps> = (props) => {
  const {
    countries: { data: countries },
  } = useAppSelector((state) => state.location);
  const dispatch = useAppDispatch();

  const [countryCode, setCountryCode] = useState<string>("20"); // Default to Egypt
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);

  useEffect(() => {
    if (countries.length === 0) {
      dispatch(fetchCountries());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleCountryChange = (event: SelectChangeEvent<string>) => {
    const newCode = event.target.value;
    setCountryCode(newCode);
    validateAndFormatPhone(phoneNumber, newCode);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputNumber = e.target.value;
    setPhoneNumber(inputNumber);
    validateAndFormatPhone(inputNumber, countryCode);
  };

  const validateAndFormatPhone = (input: string, code: string) => {
    const country = countries.find((x) => x.phonecode === code);
    if (!country) return;

    const phoneNumberObj = parsePhoneNumberFromString(
      input,
      country.isoCode as CountryCode,
    );
    if (phoneNumberObj && phoneNumberObj.isValid()) {
      setIsValid(true);
      if (
        country.isoCode === "EG" &&
        !isValidEgyptianPhoneNumber(phoneNumberObj.number)
      ) {
        setIsValid(false);
      }
      if (props.onChange) {
        const syntheticEvent = {
          target: { value: phoneNumberObj.number },
        } as unknown as React.ChangeEvent<HTMLInputElement>;
        props.onChange(syntheticEvent);
      }
    } else {
      setIsValid(false);
    }
  };

  const getOnlyPhoneNumber = (number: string) => {
    const phoneNumberObj = parsePhoneNumberFromString(number);
    return phoneNumberObj?.nationalNumber;
  };
  return (
    <div className="flex">
      <SearchableSelect
        displayEmpty
        IconComponent={() => null}
        options={countries.map((x) => ({
          value: x.phonecode,
          label: `${x.name} (${formatCode(x.phonecode)})`,
        }))}
        value={countryCode}
        onChange={handleCountryChange}
        sx={{
          "& fieldset": { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
        }}
        renderValue={(selected) => {
          const item = countries.find((x) => x.phonecode === selected);
          return (
            item && (
              <div className="flex items-center">
                <Flag code={item.isoCode.toLowerCase()} name={item.name} />
                <p className="ml-2 max-w-12">{formatCode(selected)}</p>
              </div>
            )
          );
        }}
      />
      <TextField
        {...props}
        error={!isValid}
        helperText={!isValid ? "Invalid phone number" : ""}
        sx={{
          "& fieldset": { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 },
          ...props.sx,
        }}
        value={phoneNumber || getOnlyPhoneNumber(props.value as string)}
        onChange={handlePhoneChange}
      />
    </div>
  );
};

export default PhoneNumberInput;
