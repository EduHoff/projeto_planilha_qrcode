import { useState } from "react";
import api from "../api/client";
import { FormDeleteStyle } from "../styles/FormDeleteStyle";

interface FormDeleteProps {
    ids: string[];
}

function FormDelete({ ids }: FormDeleteProps) {
    const [confirm1, setConfirm1] = useState(false);
    const [confirm2, setConfirm2] = useState(false);

    const handleDelete = async () => {
        if (ids.length === 0) {
            alert("Nenhum registro encontrado para apagar.");
            return;
        }

        if (!confirm1 || !confirm2) {
            alert("Você precisa confirmar duas vezes antes de apagar !");
            return;
        }

        try {
            await api.post("/api/crud/delete", {
                ids: ids.map(String)
            });

            alert("Registros apagados!");
            setConfirm1(false);
            setConfirm2(false);

        } catch (err) {
            console.error("Erro ao apagar:", err);
            alert("Erro ao apagar registros.");
        }
    };

    return (
        <div style={FormDeleteStyle.container}>
            <h3 style={{ color: "red" }}>Deletar dados dos resultados encontrados</h3>

            <p><strong>Total selecionado:</strong> {ids.length}</p>

            <label>
                <input type="checkbox" checked={confirm1} onChange={() => setConfirm1(!confirm1)}/>
                {" "}
                Confirmo que desejo apagar os dados
            </label>

            <label>
                <input type="checkbox" checked={confirm2} disabled={!confirm1} onChange={() => setConfirm2(!confirm2)}/>
                {" "}
                Confirmo novamente que entendi que essa ação é irreversível
            </label>

            <button onClick={handleDelete} style={FormDeleteStyle.button}>
                Apagar Dados
            </button>
        </div>
    );
}

export default FormDelete;