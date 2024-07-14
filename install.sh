#!/bin/sh

echo "This script will install the emoji-commit tool. It requires sudo access to create symbolic links."
echo "Continue? (y/n)"
read answer
if [ "$answer" != "${answer#[Yy]}" ]; then 
    git clone https://github.com/root309/emoji-commit.git
    cd emoji-commit

    bun install 

    chmod +x index.ts 

    if [ -L /usr/local/bin/emoji-commit ]; then
        echo "Removing existing symbolic link..."
        sudo rm /usr/local/bin/emoji-commit
    fi

    echo "Creating new symbolic link..."
    sudo ln -s "$(pwd)/index.ts" /usr/local/bin/emoji-commit

    if [ $? -eq 0 ]; then
        echo "emoji-commit has been installed successfully."
    else
        echo "Failed to install emoji-commit. Please check your permissions."
    fi
else
    echo "Installation aborted."
fi
