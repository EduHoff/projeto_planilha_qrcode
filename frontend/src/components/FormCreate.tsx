import { useState } from "react";
import api from "../api/client";
import { GlobalStyle } from "../styles/GlobalStyle";

function FormCreate() {

    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");

    const handleSubmit = async () => {
        if (!nome || !cpf) {
            alert("Preencha todos os campos!");
            return;
        }

        try {
            const response = await api.post("/api/crud/create", {
                nome,
                cpf
            });

            alert("Inserido com sucesso! ID: " + response.data.id);

            setNome("");
            setCpf("");

        } catch (error) {
            console.error("Erro ao criar:", error);
            alert("Erro ao enviar dados!");
        }
    };

    return (
        <div style={GlobalStyle.container}>

            <input type="text" placeholder="Nome" style={GlobalStyle.input} value={nome} onChange={(e) => setNome(e.target.value)}/>
            <input type="text" placeholder="CPF" style={GlobalStyle.input} value={cpf} onChange={(e) => setCpf(e.target.value)}/>

            <button onClick={handleSubmit} style={GlobalStyle.button}> Confirmar</button>
        </div>
    );
}

export default FormCreate;