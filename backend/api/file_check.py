import os
from fastapi import APIRouter
from pydantic import BaseModel
from pathlib import Path
from typing import Optional, Dict
from spreadsheet_directory_path import spreadsheet_directory_path as sdp

router:APIRouter = APIRouter()

CONTAINER_ROOT_PATH:Path = Path("/host_root")

class FilePathRequest(BaseModel):
    file_path:str 

HOST_HOME_PATH_STR:Optional[str] = os.environ.get("HOST_HOME_PATH") 


def translate_path_for_container(user_input_path: str) -> Path:
    user_input_path = user_input_path.strip()
    
    if not HOST_HOME_PATH_STR:
         return Path(user_input_path) 
    
    normalized_host_path:str = HOST_HOME_PATH_STR.replace('\\', '/')
    normalized_user_path:str = user_input_path.replace('\\', '/')
    
    if normalized_user_path.startswith(normalized_host_path):
        relative_path_str = normalized_user_path[len(normalized_host_path):]
        return CONTAINER_ROOT_PATH / relative_path_str.lstrip('/')
        
    return Path(user_input_path) 

@router.post("/check-file")
def check_file_existence(request_data: FilePathRequest) -> Dict[str, bool]:
    
    file_path_str:str = request_data.file_path
    
    translated_path_obj:Path = translate_path_for_container(file_path_str)
    
    file_exists:bool = translated_path_obj.is_file()

    if file_exists:
        sdp.set_path(translated_path_obj.resolve())

    return {"exists": file_exists}