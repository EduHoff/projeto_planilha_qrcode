#!/bin/bash


KERNEL_NAME=$(uname -s)

if [[ "$KERNEL_NAME" == "Linux" ]] || [[ "$KERNEL_NAME" == "Darwin" ]]; then
    echo "Host: Unix-like detectado. Usando \$HOME para mapeamento."

    HOST_HOME="$HOME"

elif [[ "$KERNEL_NAME" == *"NT"* ]]; then
    echo "Host: Windows detectado."

    HOST_HOME=$(cmd.exe /C echo %USERPROFILE% | tr -d '\r')

    if [ -z "$HOST_HOME" ]; then
        echo "ERRO: Não foi possível detectar a variável %USERPROFILE%. Por favor, defina-a manualmente."
        exit 1
    fi

else
    echo "ERRO: Sistema Operacional não suportado. Por favor, defina a variável HOST_HOME manualmente."
    exit 1
fi

echo "Mapeando Home do Host para: $HOST_HOME"

echo "HOST_HOME=$HOST_HOME" > .env

echo "Iniciando Docker Compose..."

HOST_HOME=$HOST_HOME docker compose up "$@"
