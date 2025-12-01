from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from utils import read_rows, filter_rows
from spreadsheet_directory_path import spreadsheet_directory_path as sdp
from pathlib import Path

router = APIRouter()


class ReadRequest(BaseModel):
    filters: dict | None = None


@router.post("/read")
async def read_items(body: ReadRequest):

    try:
        file_path = sdp.get_path()

        if not file_path:
            raise HTTPException(status_code=500, detail="Caminho da planilha não configurado no servidor.")

        path = Path(file_path)

        if not path.exists():
            raise HTTPException(status_code=404, detail=f"Arquivo '{path}' não encontrado.")

        if body.filters:
            rows = filter_rows(path, body.filters)
        else:
            rows = read_rows(path)

        return {
            "success": True,
            "count": len(rows),
            "rows": rows
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))