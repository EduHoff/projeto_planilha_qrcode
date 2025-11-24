@echo off

if not defined USERPROFILE (
    echo ERRO: Variavel USERPROFILE nao encontrada. Nao e possivel mapear o diretorio Home.
    goto :eof
)

set HOST_HOME=%USERPROFILE%
echo Host: Windows detectado. Usando %HOST_HOME% para mapeamento.

echo Mapeando Home do Host para: %HOST_HOME%


echo HOST_HOME=%HOST_HOME% > .env

echo Iniciando Docker Compose...

docker compose up %*

:eof
