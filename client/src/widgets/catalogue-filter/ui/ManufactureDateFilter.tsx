import React, { useRef } from "react";
import { ManufactureDate } from "generated/model";

interface Props {
  onValueChange: (names: ManufactureDate | null) => void;
  fieldName: string;
  labelName: string;
}

export const ManufactureDateFilter = ({
  onValueChange,
  fieldName,
  labelName,
}: Props) => {
  const manufacturerDate = useRef<HTMLInputElement>(null);

  function onChange() {
    if (!manufacturerDate.current) {
      return;
    }
    onValueChange({
      manufacture_date: manufacturerDate.current.value,
    } as ManufactureDate);
  }

  return (
    <div>
      <label htmlFor={fieldName}>{labelName}</label>
      <input
        ref={manufacturerDate}
        type="date"
        name={fieldName}
        onChange={onChange}
        min="0001-01-01"
        max="9999-12-31"
      />
    </div>
  );
};
