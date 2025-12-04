from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from utils import read_rows, write_rows
from spreadsheet_directory_path import spreadsheet_directory_path as sdp
from pathlib import Path

router = APIRouter()

class DeleteManyRequest(BaseModel):
    ids: list[str]


@router.post("/delete")
def delete_items(body: DeleteManyRequest):

    file_path = sdp.get_path()
    if not file_path:
        raise HTTPException(500, "Arquivo não configurado no servidor")

    path = Path(file_path)
    rows = read_rows(path)

    deleted = 0
    new_rows = []

    for row in rows:
        if row[0] in body.ids:
            new_rows.append([row[0], "", ""])
            deleted += 1
        else:
            new_rows.append(row)

    if deleted == 0:
        raise HTTPException(404, f"Nenhum dos IDs {body.ids} foi encontrado")

    write_rows(path, new_rows)

    return {
        "success": True,
        "deleted_count": deleted,
        "deleted_ids": body.ids
    }