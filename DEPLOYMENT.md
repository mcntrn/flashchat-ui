docker build . -t USERNAME/REPONAME:vX.Y.Z


docker build . -t mcntrn/flashchat-ui:v0.1.0

docker tag mcntrn/flashchat-ui:v0.1.0 mcntrn/flashchat-ui:latest

docker push mcntrn/flashchat-ui:latest


---

docker login --username mcntrn -p bfbWY7bs5EVu8rM        

docker run -p 80:80 mcntrn/skunkworks:latest       


docker tag mcntrn/skunkworks:latest mcntrn/skunkworks:v0.1.0



docker build . -t mcntrn/flashchat-service:v0.2.0

docker tag mcntrn/flashchat-service:v0.2.0 mcntrn/flashchat-service:latest

docker push mcntrn/flashchat-service:v0.2.0

docker push mcntrn/flashchat-service:latest