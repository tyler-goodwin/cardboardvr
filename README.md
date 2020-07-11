# cardboardvr

## Getting Started
To run, we require `docker` and `docker-compose` installed (tested on PopOS).

First time setup:
```bash
docker-compose run --rm backend rake db:create db:migrate db:seed
```

Starting dev environment:
```bash
docker-compose up -d
```
Website can now be accessed at http://localhost:8080

To run tests:
```bash
docker-compose run --rm backend rails t
```

Stopping:
```bash
docker-compose down
```


## Assumptions
I have made the following assumptions during development:
1. Auth isn't required
2. Assume mobile responsiveness is not a priority
3. Assume it is okay to run frontend & backend in development mode (for purpose of demo only)


## Acknowledgments

Docker setup adapted from:
https://github.com/adaam2/docker-rails-react-starter