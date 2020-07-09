# cardboardvr

## Getting Started
To run, we require `docker` and `docker-compose` installed on linux.

First time setup:
```bash
docker-compose run --rm backend rake db:create db:migrate
```

Starting dev environment:
```bash
docker-compose up -d
```

Website can now be accessed at http://localhost:8080

Stopping:
```bash
docker-compose down
```


## Assumptions
I have made the following assumptions during development:
1. Auth isn't required
2. Whole dollar price amounts only supported

## Design Decisions


### API Endpoints



## Acknowledgments

Docker setup based on:
https://github.com/adaam2/docker-rails-react-starter