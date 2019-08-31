module.exports = {
  apps: [
    {
      'name': "api",
      "cwd": "./api",
      'script': "src/server.js",
      'watch': true,
    },
    {
      'name': "movie-service",
      "cwd": "./movie",
      'script': "index.js",
      'watch': true,
    },
    {
      'name': "locations-service",
      "cwd": "./locations",
      'script': "index.js",
      'watch': true,
    },
  ]
}
