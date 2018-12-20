Context:

Use a back with an express server and a front with what you want, in this case react(CRA)

** Start application

npm run dev

This command will launch your back with nodemon and your front watcher

For the front can communicate with my server, I need to specify the proxy on his own package json

"server": "nodemon back/server.js --exec babel-node"
This command launch a nodemon watcher on my file server.js, who is my express server, and it exec babel-node, babel-node will call the file .babelrc (configuation file)