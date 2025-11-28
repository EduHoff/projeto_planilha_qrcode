import { useState } from "react";
import api from "../api/client";

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
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

            <input
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
            />

            <input
                type="text"
                placeholder="CPF"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
            />

            <button
                onClick={handleSubmit}
                style={{
                    width: 100,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                Confirmar
            </button>
        </div>
    );
}

export default FormCreate;