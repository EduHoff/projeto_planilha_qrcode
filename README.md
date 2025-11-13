# README temporário sem está organizado ainda




apt install python3.12-venv
#para poder criar ambientes locais das bibliotecas

python3 -m venv venv
#cria o ambiente virtual para instalar as bibliotecas
obs.: não esqueça de ter um .gitignore

source venv/bin/activate
#ativa o ambiente virtual

pip install pandas
#exemplo da instalação de uma biblioteca

 pip freeze > requirements.txt
#criar arquivo com as dependências do programa python


(Linux/MacOS)
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

(Windows)
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
#códigos após o git clone para recriar o ambiente do programa



FastApi:
fastapi dev main.py (isso vai começar o servido do Python)
