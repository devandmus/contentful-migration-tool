# Contentful Migration Tool

Version: 1

A simple migration tool for Contentful, useful to clone data between
environments in a same space.

## Before start

Create a `.env` file with keys inside `.env.example`

Create a `config.yml` file with keys inside `config.example.yml`

Take a look in `config.yml` file and set:

- `MODEL_TO_MIGRATE` as your own model
- `DOWNLOAD_FOLDER` as the name of assets folder downloaded from Contentful
- `FROM_ENVIRONMENT` as your base environment
- `TO_ENVIRONMENT` as an array with target environments

## Commands

For now, we have only one command:

- `npm run migrate:all` to migrate all related with model: the model itself, 
  his entries and assets.
