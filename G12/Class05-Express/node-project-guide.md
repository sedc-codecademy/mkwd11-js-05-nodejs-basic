1. Initalize project using `npm init -y`
2. Change type in package.json to `"type": "module"`
3. Create `.gitignore` file and add `/node_modules` inside it
4. Create project .js files
5. Install dependencies (ex `npm i express`)
6. Install nodemon `npm i nodemon -D`
7. Add start and dev scripts in package.json:

```
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
```

7. Start nodemon server with `npm run dev` or node server with `npm start`
8. OPTIONAL Install cors `npm i cors` if you want to use a client that runs in the browser, to use import cors and then add this line to project `app.use(cors())`
9. When downloading a project without node modules, before using it enter `npm i`

## Adding code with git from terminal

1. Work on some code ,after you are finished
2. `git add .` adds all files to git
3. `git commit -m "message"` commits all files to git
4. `git push` pushes (uploads) all files to the remote repo
