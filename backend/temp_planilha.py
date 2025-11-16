import pandas as pd
import numpy as np

import platform
import subprocess

file_path: str = None

if platform.system() == "Windows":
    user: str = subprocess.check_output("whoami", shell=True, text=True).strip().split('\\')[1]
    file_path:str = f"C:\\Users\\{user}\\Downloads\\teste.csv"
else:
    user: str = subprocess.check_output("whoami", shell=True, text=True).strip()
    file_path:str = f"/home/{user}/Downloads/teste.csv"


#Apenas primeira estrutura com ideias de como fazer a interação dos dados para a planilha. Nada muito sério por enquanto

try:
    print(pd.read_csv(file_path))

    data = {'Name': ['Alice'],
            'Age': [25],
            'City': ['New York']}

    df = pd.DataFrame(data)

    df.to_csv(file_path, mode='a', header=False)


    print(pd.read_csv(file_path))
except Exception as e:
    print(f"O que aconteceu foi o seguinte: {e}")
