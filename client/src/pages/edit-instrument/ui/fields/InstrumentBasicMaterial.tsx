import React, { useRef, useState } from "react";
import "./InstrumentBasicMaterial.css";
import { BasicMaterial } from "generated/model";

interface Props {
  usedMaterialsForInstrument: BasicMaterial[];
  materials: BasicMaterial[];
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
    <div className="edit-instrument-field">
      <div className={"edit-instrument-field-name"}>
        <span>Basic Material</span>
      </div>

      <div className={"edit-instrument-field-value"}>
        <div id={"used-basic-materials"}>
          {basicMaterials.map((material) => (
            <div
              key={material.basic_material}
              className={`edit-instrument-field-instrument-span 
                ${!props.usedMaterialsForInstrument.includes(material) ? "edit-instrument-field-instrument-span-new" : ""}`}
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
