from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.file_check import router as file_check_router
from api.crud.create import router as crud_create_router
from api.crud.read import router as crud_read_router
from api.crud.update import router as crud_update_router
from api.crud.delete import router as crud_delete_router

from spreadsheet_directory_path import spreadsheet_directory_path as sdp #isso é apenas para testar se o python está armazenado o diretório com a planilha


def create_app() -> FastAPI:

    
    app = FastAPI(title="MyApp API")
    
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"], 
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    

    app.include_router(file_check_router, prefix="/api")
    app.include_router(crud_create_router, prefix="/api/crud")
    app.include_router(crud_read_router, prefix="/api/crud")
    app.include_router(crud_update_router, prefix="/api/crud")
    app.include_router(crud_delete_router, prefix="/api/crud")

    @app.get("/api/hello")
    def hello():
        return {"message": sdp.get_path()}
        
    return app