import React, { ChangeEvent, useEffect, useState } from "react";
import "./CatalogueFilterWidget.css";
import { Checkboxes, Filters } from "@widgets/catalogue-filter";

interface Props {
  onFilterChange: (filters: Filters) => void;
}

export const CatalogueFilterWidget: React.FC<Props> = ({ onFilterChange }) => {
  const [checkboxes, setCheckboxes] = useState<Checkboxes>({
    KEYBOARD: true,
    STRINGED: true,
    WIND: true,
    audiocom: true,
    yamaha: true,
    manufactureDateFrom: "",
    manufactureDateTo: "",
    releaseDateFrom: "",
    releaseDateTo: "",
    usa: true,
    cyprus: true,
    wood: true,
    metall: true,
  });

  useEffect(() => {
    onFilterChange(transformCheckboxesToFilters(checkboxes));
  }, [checkboxes]);

  const transformCheckboxesToFilters = (checkboxes: Checkboxes): Filters => {
    const instrumentTypes = ["KEYBOARD", "STRINGED", "WIND"].filter(
      (type) => checkboxes[type as keyof Checkboxes],
    );
    const manufacturerNames = [];
    if (checkboxes.audiocom) {
      manufacturerNames.push("audio.com");
    }
    if (checkboxes.yamaha) {
      manufacturerNames.push("Yamaha");
    }
    const countries = [];
    if (checkboxes.cyprus) {
      countries.push("CYPRUS");
    }
    if (checkboxes.usa) {
      countries.push("USA");
    }
    const materials = [];
    if (checkboxes.metall) {
      materials.push("METALL");
    }
    if (checkboxes.wood) {
      materials.push("WOOD");
    }

    return {
      instrumentName: null,
      instrumentTypes: instrumentTypes,
      manufacturerNames: manufacturerNames,
      manufactureDateFrom:
        checkboxes.manufactureDateFrom === ""
          ? null
          : checkboxes.manufactureDateFrom,
      manufactureDateTo:
        checkboxes.manufactureDateTo === ""
          ? null
          : checkboxes.manufactureDateTo,
      releaseDateFrom:
        checkboxes.releaseDateFrom === "" ? null : checkboxes.releaseDateFrom,
      releaseDateTo:
        checkboxes.releaseDateTo === "" ? null : checkboxes.releaseDateTo,
      countries: countries,
      materials: materials,
    };
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    console.log(
      `name: ${name}, 'type': ${type}, 'checked': ${checked}, 'value': ${value}`,
    );

    console.log(checkboxes);

    setCheckboxes((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));

    console.log(checkboxes);
  };

  return (
    <div id="catalogue-filters">
      <div>
        <legend>Тип:</legend>
        <div>
          <input
            type="checkbox"
            id="keyboard"
            name="KEYBOARD"
            checked={checkboxes.KEYBOARD}
            onChange={handleChange}
          />
          <label htmlFor="keyboard">Клавишный</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="stringed"
            name="STRINGED"
            checked={checkboxes.STRINGED}
            onChange={handleChange}
          />
          <label htmlFor="stringed">Струнный</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="wind"
            name="WIND"
            checked={checkboxes.WIND}
            onChange={handleChange}
          />
          <label htmlFor="wind">Духовой</label>
        </div>
      </div>

      <div>
        <legend>Производитель:</legend>
        <div>
          <input
            type="checkbox"
            id="audiocom"
            name="audiocom"
            checked={checkboxes.audiocom}
            onChange={handleChange}
          />
          <label htmlFor="audiocom">audio.com</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="yamaha"
            name="yamaha"
            checked={checkboxes.yamaha}
            onChange={handleChange}
          />
          <label htmlFor="yamaha">Yamaha</label>
        </div>
      </div>

      <div>
        <legend>Дата изготовления</legend>
        <input
          type="date"
          name="manufactureDateFrom"
          value={checkboxes.manufactureDateFrom}
          onChange={handleChange}
          min="0001-01-01"
          max="9999-12-31"
        />
        <input
          type="date"
          name="manufactureDateTo"
          value={checkboxes.manufactureDateTo}
          onChange={handleChange}
          min="0001-01-01"
          max="9999-12-31"
        />
      </div>

      <div>
        <legend>Дата выпуска:</legend>
        <input
          type="date"
          name="releaseDateFrom"
          value={checkboxes.releaseDateFrom}
          onChange={handleChange}
          min="0001-01-01"
          max="9999-12-31"
        />
        <input
          type="date"
          name="releaseDateTo"
          value={checkboxes.releaseDateTo}
          onChange={handleChange}
          min="0001-01-01"
          max="9999-12-31"
        />
      </div>

      <div>
        <legend>Страна:</legend>
        <div>
          <input
            type="checkbox"
            name="usa"
            checked={checkboxes.usa}
            onChange={handleChange}
          />
          <label htmlFor="usa">США</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="cyprus"
            checked={checkboxes.cyprus}
            onChange={handleChange}
          />
          <label htmlFor="cyprus">Кипр</label>
        </div>
      </div>

      <div>
        <legend>Основные инструменты:</legend>
        <div>
          <input
            type="checkbox"
            id="wood"
            name="wood"
            checked={checkboxes.wood}
            onChange={handleChange}
          />
          <label htmlFor="wood">Дерево</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="metall"
            name="metall"
            checked={checkboxes.metall}
            onChange={handleChange}
          />
          <label htmlFor="metall">Металл</label>
        </div>
      </div>
    </div>
  );
};
