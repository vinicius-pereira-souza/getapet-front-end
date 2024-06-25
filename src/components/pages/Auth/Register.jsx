import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import Input from "../../form/Input";
import styles from "../../form/Form.module.css";
import { Context } from "../../../context/UserContext";

const Register = () => {
  const { register } = useContext(Context);
  const [user, setUser] = useState({});

  const handlechange = (e) => {
    const currentInput = e.target;

    setUser({ ...user, [currentInput.name]: currentInput.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // enviar o usuário para o banco
    register(user);
  };

  return (
    <section className={styles.form_container}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <Input
          text="Nome"
          type="text"
          name="name"
          placeholder="Digite o seu nome"
          handleOnChange={handlechange}
        />
        <Input
          text="Telefone"
          type="text"
          name="phone"
          placeholder="Digite o seu nome"
          handleOnChange={handlechange}
        />
        <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="Digite o seu e-mail"
          handleOnChange={handlechange}
        />
        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite a sua senha"
          handleOnChange={handlechange}
        />
        <Input
          text="Confimação de Senha"
          type="password"
          name="confirmpassword"
          placeholder="Confirme a sua senha"
          handleOnChange={handlechange}
        />
        <input type="submit" value="Cadastrar" />
      </form>
      <p>
        Já tem conta? <Link to="/login">Clique aqui</Link>
      </p>
    </section>
  );
};

export default Register;
