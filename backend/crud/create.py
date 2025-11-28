from spreadsheet_directory_path import spreadsheet_directory_path as sdp
from ..utils import add_row

path: str = sdp.get_path()

def create():

    data = ["Maria", "123.456.789-00"]

    new_id = add_row(path, data)
    print(f"Linha adicionada com ID: {new_id}")


if __name__ == "__main__":
    create()