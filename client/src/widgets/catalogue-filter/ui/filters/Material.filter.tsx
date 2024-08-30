import React, { useEffect, useState } from "react";
import { GetInstrumentBasicMaterialsApi } from "generated/api";
import { BasicMaterial } from "generated/model";
import { apiConfig } from "shared/config/api";
import { I18N_INSTRUMENT_BASIC_MATERIALS } from "../../../../i18n";
import { useTranslation } from "react-i18next";

interface Props {
  onValueChange: (names: BasicMaterial[]) => void;
}

const getInstrumentMaterials = new GetInstrumentBasicMaterialsApi(apiConfig);

export const MaterialFilter = ({ onValueChange }: Props) => {
  const { t } = useTranslation();
  const [materials, setMaterials] = useState<BasicMaterial[]>([]);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response =
          await getInstrumentMaterials.getInstrumentBasicMaterials();
        setMaterials(response.data.content);
      } catch (error) {
        console.error("Failed to fetch materials:", error);
      }
    };

    fetchMaterials();
  }, []);

  function onChange() {
    const elements: NodeListOf<HTMLInputElement> = document.querySelectorAll(
      ".materials-filter-checkbox",
    );

    onValueChange(
      Array.from(elements)
        .filter((inputTag) => inputTag.checked)
        .map(
          (inputTag) =>
            ({
              i18n_code: inputTag.name,
            }) as BasicMaterial,
        ),
    );
  }

  return (
    <div>
      <legend style={{ padding: "0" }}>
        {t(I18N_INSTRUMENT_BASIC_MATERIALS)}
      </legend>
      {materials.map((material) => (
        <div key={material.i18n_code}>
          <input
            type="checkbox"
            id={material.i18n_code}
            name={material.i18n_code}
            className="materials-filter-checkbox"
            defaultChecked={true}
            onChange={onChange}
          />
          <label htmlFor={material.i18n_code}>{material.localized_text}</label>
        </div>
      ))}
    </div>
  );
};
