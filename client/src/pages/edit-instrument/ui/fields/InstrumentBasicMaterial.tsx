import React, { useRef, useState } from "react";
import { Material, Materials } from "domain/model/material";
import "./InstrumentBasicMaterial.css";

interface Props {
  usedMaterialsForInstrument: Materials;
  materials: Materials;
}

export const InstrumentBasicMaterialFormField = (props: Props) => {
  const selectedBasicMaterial: React.MutableRefObject<string | undefined> = useRef<string>();
  const [basicMaterials, setBasicMaterials] = useState(props.usedMaterialsForInstrument);


  const addInstrumentForEditInstrument = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedBasicMaterial.current === undefined) {
      return;
    }

    if (selectedBasicMaterial.current === "") {
      return;
    }

    if (basicMaterials.includes(selectedBasicMaterial.current)) {
      return;
    }

    setBasicMaterials([...basicMaterials, selectedBasicMaterial.current]);
  };

  const removeMaterial = (materialForRemoval: Material) => {
    setBasicMaterials(basicMaterials.filter(material => material !== materialForRemoval));
  };

  return (
    <div className="edit-instrument-field">
      <div className={"edit-instrument-field-name"}>
        <span>Basic Material</span>
      </div>

      <div className={"edit-instrument-field-value"}>
        <div id={"used-basic-materials"}>
          {basicMaterials.map((material) => (
            <div key={material} className={`edit-instrument-field-instrument-span 
                ${!props.usedMaterialsForInstrument.includes(material) ? "edit-instrument-field-instrument-span-new" : ""}`}>
              <span>{material}</span>
              <input type="hidden" name="material" value={material} />
              <button onClick={() => removeMaterial(material)}>-</button>
            </div>
          ))}
        </div>

        <select
          onChange={(e) => {
            if (selectedBasicMaterial.current === "") {
              return;
            }
            selectedBasicMaterial.current = e.target.value;
          }}
          required
        >
          <option value={""}>Select a material</option>

          {props.materials.map((material) => (
            <option key={material} value={material}>
              {material}
            </option>
          ))}
        </select>
        <button onClick={addInstrumentForEditInstrument}>Add</button>
      </div>
    </div>
  );
};