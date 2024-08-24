import React, { useEffect, useState } from "react";
import "./styles/InstrumentDetails.css";
import { InstrumentDetail } from "generated/model";
import { GetInstrumentPhotoApi } from "generated/api/get-instrument-photo-api";

interface Props {
  instrument: InstrumentDetail;
}

const getInstrumentPhoto = new GetInstrumentPhotoApi();

export const InstrumentDetails = (props: Props) => {
  const [photo, setPhoto] = useState<string | undefined>();

  useEffect(() => {
    const fetchPhoto = async () => {
      const response = await getInstrumentPhoto.getInstrumentPhoto(
        props.instrument.instrument_id.instrument_id,
      );

      setPhoto(response.data.photo);
    };

    fetchPhoto();
  }, [props.instrument]);

  return (
    <div className="instrument-details">
      {photo !== undefined && (
        <img src={`data:image/*; base64, ${photo}`} width={250} height={300} />
      )}
      <div className="instrument-details-description">
        <h2>{props.instrument.manufacturer_name.manufacturer_name}</h2>
        <br />
        <b>Type</b>: {props.instrument.instrument_type.instrument_type}
        <br />
        <b>Manufacturer</b>:{" "}
        {props.instrument.manufacturer_name.manufacturer_name}
        <br />
        <b>Manufacturer Date</b>:{" "}
        {props.instrument.manufacturer_date.manufacture_date}
        <br />
        <b>Release Date</b>: {props.instrument.release_date.release_date}
        <br />
        <b>Country</b>: {props.instrument.country.country}
        <br />
        <b>Basic Materials</b>:
        <ul>
          {props.instrument.basic_materials.map((basicMaterial) => (
            <li key={basicMaterial.basic_material}>
              {basicMaterial.basic_material}
            </li>
          ))}
        </ul>
        <br />
      </div>
    </div>
  );
};
