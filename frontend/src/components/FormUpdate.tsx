import { useState } from "react";
import api from "../api/client";
import { GlobalStyle } from "../styles/GlobalStyle";

interface FormUpdateProps {
    ids: string[];
}

function FormUpdate({ ids }: FormUpdateProps) {
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");

    const handleUpdate = async () => {
        if (ids.length === 0) {
            alert("Nenhum registro encontrado para atualizar.");
            return;
        }

        if (!nome && !cpf) {
            alert("Preencha ao menos um campo para atualizar.");
            return;
        }

        try {
            await api.post("/api/crud/update", {
                ids: ids.map(String),
                nome: nome || null,
                cpf: cpf || null
            },{ headers: { "Content-Type": "application/json" } });

            alert("Todos os registros foram atualizados!");

            setNome("");
            setCpf("");

        } catch (err) {
            console.error("Erro ao atualizar:", err);
            alert("Erro ao atualizar.");
        }
    };

    return (
        <div style={GlobalStyle.container}>
            <h3>Atualizar TODOS os resultados exibidos</h3>

            <p><strong>Total selecionado:</strong> {ids.length}</p>

            <input type="text" placeholder="Novo nome (opcional)" style={GlobalStyle.input} value={nome} onChange={(e) => setNome(e.target.value)}/>
            <input type="text" placeholder="Novo CPF (opcional)" style={GlobalStyle.input} value={cpf} onChange={(e) => setCpf(e.target.value)}/>

            <button onClick={handleUpdate} style={GlobalStyle.button}>Atualizar Todos</button>
        </div>
    );
}

export default FormUpdate;