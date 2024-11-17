import { useState, useMemo, useEffect } from "react";
import { type UseFormRegister } from "react-hook-form";

import {
  type CountryCallingCode,
  type E164Number,
  getExampleNumber,
  isValidPhoneNumber as matchIsValidPhoneNumber,
  parsePhoneNumber,
} from "libphonenumber-js";
import i18nIsoCountries from "i18n-iso-countries";
import enCountries from "i18n-iso-countries/langs/en.json";
import PhoneInput, { type Country } from "react-phone-number-input/input";
import examples from "libphonenumber-js/mobile/examples";
import { Input } from "../ui/input";

import { ComboboxCountryInput } from "./combobox";
import {
  getCountriesOptions,
  isoToEmoji,
  replaceNumbersWithZeros,
} from "./helper";

type CountryOption = {
  value: Country;
  label: string;
  indicatif: CountryCallingCode;
};

i18nIsoCountries.registerLocale(enCountries);

type Props = {
  register: UseFormRegister<any>;
  name: string;
  defaultValue?: string;
};

export const PhoneInputShadcnUiPhoneInput = ({
  register,
  name,
  defaultValue,
}: Props) => {
  const options = useMemo(() => getCountriesOptions(), []);

  const defaultCountry = useMemo(
    () => parsePhoneNumber("+33606060606")?.country,
    []
  );

  const defaultCountryOption = useMemo(
    () => options.find((option) => option.value === defaultCountry),
    [options, defaultCountry]
  );

  const [country, setCountry] = useState<CountryOption>(
    defaultCountryOption || options[0]!
  );

  const [phoneNumber, setPhoneNumber] = useState<E164Number | undefined>(defaultValue as E164Number);

  const placeholder = useMemo(
    () =>
      replaceNumbersWithZeros(
        getExampleNumber(country.value, examples)!.formatInternational()
      ),
    [country.value]
  );

  const onCountryChange = (value: CountryOption) => {
    setPhoneNumber(undefined);
    setCountry(value);
  };

 
  return (
    <div className="not-prose mt-8 flex flex-col gap-4">
      <div className="flex gap-2">
        <ComboboxCountryInput
          value={country}
          onValueChange={onCountryChange}
          options={options}
          placeholder="Find your country..."
          renderOption={({ option }) =>
            `${isoToEmoji(option.value)} ${option.label}`
          }
          renderValue={(option) => option.label}
          emptyMessage="No country found."
        />
        <PhoneInput
          {...register(name, {
            validate: (value) =>
              matchIsValidPhoneNumber(value) || "Invalid phone number",
          })}
          international
          withCountryCallingCode
          country={country.value.toUpperCase() as Country}
          value={phoneNumber}
          inputComponent={Input}
          placeholder={placeholder}
          onChange={(value) => {
            setPhoneNumber(value);
          }}
        />
      </div>
    </div>
  );
};
