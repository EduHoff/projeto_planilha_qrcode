from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import file_check
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
    

    app.include_router(file_check.router, prefix="/api") 

    @app.get("/api/hello")
    def hello():
        return {"message": sdp.get_path()}
        
    return app