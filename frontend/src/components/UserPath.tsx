import { useState } from "react"
import api from "../api/client";

function UserPath() {
    const [path, setPath] = useState<string>("")
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPath(e.target.value.trim())
    };

    const handleSubmit = async () => {
        const windowsPathRegex = /^[a-zA-Z]:[/\\](?:[^\\/:*?"<>|\r\n]+[/\\]?)*[^\\/:*?"<>|\r\n]*$/
        const unixPathRegex = /^\/([^/\0]+[/\0]?)*$/

        if(path == localStorage.getItem("UserPath")){
            alert("Planilha já foi registrada previamente!")
            return
        }

        if (!windowsPathRegex.test(path) && !unixPathRegex.test(path)){
            alert("Caminho inválido! \n\nDica: o caminho precisa ser absoluto e estar dentro da pasta pessoal do usuário \n\nExemplos.: C:\\Users\\nome_usuario\\exemplo.csv ou /home/nome_usuario/exemplo.csv.")
            return
        }

        if(!path.endsWith(".xlsx")  && !path.endsWith(".xlsm") && !path.endsWith(".xls") && !path.endsWith(".csv")){
            alert("Formato de arquivo inválido! \n\n Formatos aceitos: xlsx, xlsm, xls e csv")
            return
        }

        

        try {
            const response = await api.post("/api/check-file", {
                file_path: path
            });

            const fileExists = response.data.exists; 

            if (fileExists) {
                localStorage.setItem("UserPath", path);
                console.log("Caminho coletado:", localStorage.getItem("UserPath"));
                alert("Caminho salvo com sucesso!");
                setPath("");
            } else {
                alert("Erro: Arquivo não encontrado no servidor.");
            }

        } catch (error) {
            console.error("Erro na comunicação com a API:", error);
            alert("Erro ao conectar com o backend. Tente novamente.");
        }

    };
    

  return (
    <div>
        <input 
            type="text" 
            placeholder="C:/pasta/planilha.xlsx"
            value={path} 
            onChange={handleInputChange} 
        />

        <button onClick={handleSubmit}>Confirmar</button>
    </div>
  );
}

export default UserPath