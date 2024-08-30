import React, { useRef, useState } from "react";
import formStyles from "./styles/EditInstrument.page.module.css";
import styles from "./styles/InstrumentBasicMaterial.field.module.css";
import { BasicMaterial } from "generated/model";

interface Props {
  materials: BasicMaterial[];
  usedMaterialsForInstrument: BasicMaterial[];
}

export const InstrumentBasicMaterialField = (props: Props) => {
  const selectedBasicMaterial = useRef<BasicMaterial>();
  const [basicMaterials, setBasicMaterials] = useState<BasicMaterial[]>(
    props.usedMaterialsForInstrument,
  );

  const addInstrumentForEditInstrument = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedBasicMaterial.current === undefined) {
      return;
    }

    if (selectedBasicMaterial.current.i18n_code === "") {
      return;
    }

    if (basicMaterials.includes(selectedBasicMaterial.current)) {
      return;
    }

    setBasicMaterials([...basicMaterials, selectedBasicMaterial.current]);
  };

  const removeMaterial = (materialForRemoval: BasicMaterial) => {
    setBasicMaterials(
      basicMaterials.filter(
        (material) => material.i18n_code !== materialForRemoval.i18n_code,
      ),
    );
  };

  return (
    <div className={formStyles.edit_instrument__form__field}>
      <span className={formStyles.edit_instrument__form__field__key}>
        Basic Material
      </span>

      <div className={formStyles.edit_instrument__form__field__value}>
        <div className={styles.used_basic_materials}>
          {basicMaterials.map((material) => (
            <div
              key={material.i18n_code}
              className={`
                ${styles.edit_instrument_field_instrument_span} 
                ${!props.usedMaterialsForInstrument.includes(material) ? styles.edit_instrument_field_instrument_span_new : ""}
              `}
            >
              <span>{material.localized_text}</span>
              <input
                type="hidden"
                name="material"
                value={material.localized_text}
              />
              <button onClick={() => removeMaterial(material)}>-</button>
            </div>
          ))}
        </div>

        <select
          onChange={(e) => {
            if (selectedBasicMaterial.current?.i18n_code === "") {
              return;
            }
            selectedBasicMaterial.current = {
              i18n_code: e.target.value,
            } as BasicMaterial;
          }}
          required
        >
          <option value={""}>Select a material</option>

          {props.materials.map((material) => (
            <option key={material.i18n_code} value={material.localized_text}>
              {material.localized_text}
            </option>
          ))}
        </select>
        <button onClick={addInstrumentForEditInstrument}>Add</button>
      </div>
    </div>
  );
};
