import React, { useRef, useState } from "react";
import formStyles from "./styles/EditInstrumentPage.module.css";
import styles from "./styles/InstrumentBasicMaterial.module.css";
import { BasicMaterial } from "generated/model";

interface Props {
  materials: BasicMaterial[];
  usedMaterialsForInstrument: BasicMaterial[];
}

export const InstrumentBasicMaterialFormField = (props: Props) => {
  const selectedBasicMaterial = useRef<BasicMaterial>();
  const [basicMaterials, setBasicMaterials] = useState<BasicMaterial[]>(
    props.usedMaterialsForInstrument,
  );

  const addInstrumentForEditInstrument = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedBasicMaterial.current === undefined) {
      return;
    }

    if (selectedBasicMaterial.current.basic_material === "") {
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
        (material) =>
          material.basic_material !== materialForRemoval.basic_material,
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
              key={material.basic_material}
              className={`
                ${styles.edit_instrument_field_instrument_span} 
                ${!props.usedMaterialsForInstrument.includes(material) ? styles.edit_instrument_field_instrument_span_new : ""}
              `}
            >
              <span>{material.basic_material}</span>
              <input
                type="hidden"
                name="material"
                value={material.basic_material}
              />
              <button onClick={() => removeMaterial(material)}>-</button>
            </div>
          ))}
        </div>

        <select
          onChange={(e) => {
            if (selectedBasicMaterial.current?.basic_material === "") {
              return;
            }
            selectedBasicMaterial.current = {
              basic_material: e.target.value,
            } as BasicMaterial;
          }}
          required
        >
          <option value={""}>Select a material</option>

          {props.materials.map((material) => (
            <option
              key={material.basic_material}
              value={material.basic_material}
            >
              {material.basic_material}
            </option>
          ))}
        </select>
        <button onClick={addInstrumentForEditInstrument}>Add</button>
      </div>
    </div>
  );
};
