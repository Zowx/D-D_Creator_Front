#!/bin/bash

# Augmentation des limites de mémoire pour Node.js
export NODE_OPTIONS="--max-old-space-size=4096"

# Vérification de la version de pnpm
echo "Vérification de pnpm..."
if ! command -v pnpm &> /dev/null; then
    echo "Installation de pnpm..."
    npm i -g pnpm
fi

# Configuration du registre npm avec options supplémentaires
echo "Configuration du registre npm..."
pnpm config set registry https://registry.npmjs.org/
pnpm config set fetch-retries 5
pnpm config set fetch-timeout 300000
pnpm config set network-timeout 100000

# Installation des dépendances
echo "Installation des dépendances..."
pnpm install --no-frozen-lockfile

# Vérification de l'installation
if [ $? -eq 0 ]; then
    echo "Installation réussie!"
    exit 0
else
    echo "Échec de l'installation avec pnpm, tentative avec npm..."
    npm install
    exit $?
fi