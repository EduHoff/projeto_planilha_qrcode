from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
from utils import read_rows, write_rows
from spreadsheet_directory_path import spreadsheet_directory_path as sdp
from pathlib import Path

router = APIRouter()


class UpdateManyRequest(BaseModel):
    ids: list[str]
    nome: str | None = None
    cpf: str | None = None
    

@router.post("/update")
def update_items(request: Request, body: UpdateManyRequest):

    file_path = sdp.get_path()
    if not file_path:
        raise HTTPException(500, "Arquivo não configurado no servidor")

    path = Path(file_path)

    rows = read_rows(path)

    updated = 0

    new_rows = []

    for row in rows:
        if row[0] in body.ids:

            new_name = body.nome if body.nome else row[1]
            new_cpf = body.cpf if body.cpf else row[2]

            new_rows.append([row[0], new_name, new_cpf])
            updated += 1

        else:
            new_rows.append(row)

    if updated == 0:
        raise HTTPException(404, f"Nenhum dos IDs {body.ids} foi encontrado")

    write_rows(path, new_rows)

    return {
        "success": True,
        "updated_count": updated,
        "updated_ids": body.ids
    }