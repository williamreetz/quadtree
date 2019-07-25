# Quadtree
A quadtree implementation in typescript.

## Requirements
[Node.js](https://nodejs.org/en/)

## Installation

```sh
# clone repository
git clone git@github.com:williamreetz/quadtree.git

# change to project directory
cd quadtree

# install dependencies
npm install

# run application
npm start
```

## Setup Debugger
**Visual Studio Code**  
1. Install [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)
2. Setup launch.json file.
```json
{
    // launch.json
    "version": "0.2.0",
    "configurations": [
        {
            "type": "chrome",
            "request": "launch",
            "name": "Launch Chrome against localhost",
            "url": "http://localhost:8080",
            "webRoot": "${workspaceFolder}",
        }
    ]
}
```