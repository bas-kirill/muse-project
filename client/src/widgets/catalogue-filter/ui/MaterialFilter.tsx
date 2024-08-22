import React, { useEffect, useState } from "react";
import { ManufacturerNames } from "domain/model/manufacturer-name";
import { InstrumentBasicMaterial } from "generated/model";
import { GetInstrumentBasicMaterialsApi } from "generated/api/get-instrument-basic-materials-api";

interface Props {
  onValueChange: (names: ManufacturerNames) => void;
}

const getInstrumentMaterials = new GetInstrumentBasicMaterialsApi();

export const MaterialFilter = ({ onValueChange }: Props) => {
  const [materials, setMaterials] = useState<InstrumentBasicMaterial[]>([]);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await getInstrumentMaterials.getInstrumentBasicMaterials();
        setMaterials(response.data.content);
      } catch (error) {
        console.error("Failed to fetch materials:", error);
      }
    };

    fetchMaterials();
  }, []);

  function onChange() {
    const elements: NodeListOf<HTMLInputElement> = document.querySelectorAll(
      ".materials-filter-checkbox"
    );

    onValueChange(
      Array.from(elements)
        .filter((inputTag) => inputTag.checked)
        .map((inputTag) => inputTag.name)
    );
  }

  return (
    <div id="materials-filter">
      <legend>Basic Materials:</legend>
      {materials.map((material) => (
        <div key={material.basic_material}>
          <input
            type="checkbox"
            id={material.basic_material}
            name={material.basic_material}
            className="materials-filter-checkbox"
            defaultChecked={true}
            onChange={onChange}
          />
          <label htmlFor={material.basic_material}>{material.basic_material}</label>
        </div>
      ))}
    </div>
  );
};
