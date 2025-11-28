from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from utils import add_row
from spreadsheet_directory_path import spreadsheet_directory_path as sdp

router = APIRouter()



class CreateRequest(BaseModel):
    nome: str
    cpf: str

@router.post("/create")
async def create_item(body: CreateRequest):
    
    try:
        file_path = sdp.get_path()

        if not file_path:
            raise HTTPException(status_code=500, detail="Caminho da planilha não configurado no servidor.")

        new_id = add_row(file_path, [body.nome, body.cpf])

        return {"success": True, "id": new_id}

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))