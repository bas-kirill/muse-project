import styles from "./styles/InstrumentPhoto.module.css";
import React, { useEffect, useState } from "react";
import { GetInstrumentPhotoApi } from "generated/api/get-instrument-photo-api";
import { InstrumentDetail } from "generated/model";

interface Props {
  instrument: InstrumentDetail;
}

const getInstrumentPhoto = new GetInstrumentPhotoApi();

export const InstrumentPhoto = (props: Props) => {
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
    <div className={styles.instrument__photo__wrapper}>
      {photo && (
        <img
          src={`data:image/*; base64, ${photo}`}
          alt={""}
          className={styles.instrument__photo}
        />
      )}
    </div>
  );
};
