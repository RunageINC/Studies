
#NestJS

For the file name conventions on Nest, there are a few that must be very respected:

- _main.ts_ -> has the function bootstrap
- _[file].controller.ts_ -> has the app controller
- _[file].module.ts_ -> has the modules

There are a few conventions for writing those files:

1. Only one class per file (with some exceptions, of course)
2. Class names should include what we are creating
3. Name of class and file should always match up
4. Filenamen template: name.type.ts. Ex: pokemon.controller.ts