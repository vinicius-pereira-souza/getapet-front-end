import api from "../../../utils/api";
import { useState, useEffect } from "react";
import styles from "./AddPet.module.css";
import PetForm from "../../form/PetForm";
import { useParams } from "react-router-dom";

import useFlashMessage from "../../../hooks/useFlashMassage";

const EditPet = () => {
  const [pet, setPet] = useState({});
  const [token] = useState(localStorage.getItem("token") || "");
  const { id } = useParams();
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    api
      .get(`/pets/${id}`, {
        Authorization: `Beared ${JSON.parse(token)}`,
        "Content-Type": "multipart/form-data",
      })
      .then((response) => {
        setPet(response.data.pet);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token, id]);

  const updatepet = async (pet) => {
    let msgType = "success";

    const formData = new FormData();

    const petFormData = await Object.keys(pet).forEach((key) => {
      if (key === "images") {
        for (let i = 0; i < pet[key].length; i++) {
          formData.append("images", pet[key][i]);
        }
      } else {
        formData.append(key, pet[key]);
      }
    });

    formData.append("pet", petFormData);

    const data = await api
      .patch(`/pets/${pet._id}`, formData, {
        headers: {
          Authorization: `Beared ${JSON.parse(token)}`,
          "Content-Type": "multipart/form-data",
        },
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
    <section>
      <div className={styles.addpet_header}>
        <h1>Editando o Pet: {pet.name}</h1>
        <p>Depois da edição os dados serão altualizados no sistema</p>
      </div>
      {pet.name && (
        <PetForm handleSubmit={updatepet} btnText="Atualizar" petData={pet} />
      )}
    </section>
  );
};

export default EditPet;
