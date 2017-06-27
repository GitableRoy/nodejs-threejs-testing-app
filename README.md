# threejs-testing-app
This is created to test out the ThreeJS javascript library through a NodeJS application.

## Contents
  1. [How to use](#how-to-use)
    - [Installing Dependencies](#installing-dependencies)
    - [Running Application](#running-application)
  2. [Directory Structure](#directory-structure)

### How to use
#### Installing Dependencies
If you have not installed dependencies yet:
  1. `cd path\to\nodejs-threejs-testing-app`
  2. `npm install`

#### Running Application
Note: This application uses ES2015/16/17 features and cannot be run using ~~`node app`~~.  To run, open your Terminal:
1. `cd path\to\nodejs-threejs-testing-app`
2. `npm run start`


## Directory Structure
  - Views
    - home.pug: the root page rendered by the app
    - pages: a subdirectory that holds all the remaining pages
  - Public
    - scripts
      - classes: uses ThreeJS lib to create essential feats for `three` dir
      - jquery:  holds JQuery scripts that corresponds to a page in `views`
      - three:   holds ThreeJS scripts that corresponds to a page in `views`
    - uploads: holds files uploaded through the client-side

### References
  1. [ThreeJS Documentation](https://threejs.org/docs/)
