# ISD App Frontend

## Description

TBA

## Features

TBA

## Getting Started
> React + Vite

### Installation

To install and run on your device:

1. git clone https://github.com/keelworks/ISD-App-frontend.git
   
2. cd ISD-App-frontend
   
3. npm i
   
4. npm run dev

## Containerization with Docker

### Example Workflow

1. Build the Docker Image

```sh
docker build -t isd-app-frontend .
```

2. Run the Docker Container

```sh
docker run -p 8080:80 isd-app-frontend
```

3. Access the Application

Open your browser and go to `http://localhost:8080`

4. Stop and Remove the Container

```sh
docker ps
docker stop <container_id_or_name>
docker rm <container_id_or_name>
```

5. Remove the Docker Image

```sh
docker rmi isd-app-frontend
```

