import { useState } from "react"

function UserPath() {
    const [path, setPath] = useState<string>("")
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPath(e.target.value)
    };

    const handleSubmit = () => {
        const windowsPathRegex = /^[a-zA-Z]:[/\\](?:[^\\/:*?"<>|\r\n]+[/\\]?)*[^\\/:*?"<>|\r\n]*$/
        const unixPathRegex = /^\/([^/\0]+[/\0]?)*$/

        if (!windowsPathRegex.test(path.trim()) && !unixPathRegex.test(path.trim())){
            alert("Caminho inválido! \n\nDica: o caminho precisa ser absoluto.")
            return
        }

        if(!path.endsWith(".xlsx")  && !path.endsWith(".xlsm") && !path.endsWith(".xls") && !path.endsWith(".csv")){
            alert("Formato de arquivo inválido! \n\n Formatos aceitos: xlsx, xlsm, xls e csv")
            return
        }

        localStorage.setItem("UserPath",path)
        console.log("Caminho coletado:", localStorage.getItem("UserPath"))
        alert("Caminho salvo com sucesso!")
        setPath("");
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