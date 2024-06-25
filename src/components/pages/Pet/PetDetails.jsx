import api from "../../../utils/api";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import styles from "./PetDetails.module.css";

// hook
import useFlashMassage from "../../../hooks/useFlashMassage";

const PetDetails = () => {
  const [pet, setPet] = useState({});
  const { id } = useParams();
  const { setFlashMessage } = useFlashMassage();
  const [token] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    api
      .get(`/pets/${id}`)
      .then((response) => {
        setPet(response.data.pet);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const schedule = async () => {
    let msgType = "success";

    const data = await api
      .patch(`pets/schedule/${pet._id}`, {
        Authorization: `Beared ${JSON.parse(token)}`,
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        msgType = "error";
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);
  };

  return (
    <>
      {pet.name && (
        <section className={styles.pet_details_container}>
          <header className={styles.pet_details_header}>
            <h1>Conhecendo o Pet: {pet.name}</h1>
            <p>Se tiver interesse, marque uma vísita para conhecê-lo</p>
          </header>
          <div className={styles.pet_images}>
            {pet.images.map((image, index) => (
              <img
                src={`${
                  import.meta.env.VITE_REACT_APP_API
                }/images/pets/${image}`}
                alt={pet.name}
                key={index}
              />
            ))}
          </div>
          <p>
            <span className="bold">Peso:</span>
            {pet.weight}kg
          </p>
          <p>
            <span className="bold">Anos:</span>
            {pet.age}kg
          </p>
          {token ? (
            <button onClick={schedule}>Solitar uma vísita</button>
          ) : (
            <p>
              Você precisa <Link to="/register">criar uma conta</Link> para
              solitar a visita
            </p>
          )}
        </section>
      )}
    </>
  );
};

export default PetDetails;
