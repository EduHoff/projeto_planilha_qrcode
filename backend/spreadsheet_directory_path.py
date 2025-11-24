class spreadsheet_directory_path():

    _path: str = None

    @classmethod
    def get_path(cls) -> str:
        return cls._path

    @classmethod
    def set_path(cls, new_path: str | None):
        cls._path = new_path