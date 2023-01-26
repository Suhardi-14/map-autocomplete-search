## Map Autocomplete Search

This is an implementation of [Google Place Autocomplete API](https://developers.google.com/maps/documentation/javascript/examples/placesautocomplete) to find locations on map. The search box will provide suggestions as the user is typing. User search history is also kept and can be viewed by clicking on an empty search box after clearing previous searches.

## Getting Started

To run the application in your local machine...

First, clone the repository into your local machine.

```bash
$ git clone https://github.com/Suhardi-14/map-autocomplete-search.git
$ cd map-autocomplete-search
```

Then, install the dependencies:

```bash
$ yarn install
```

In the map-autocomplete-search directory, create a .env.local file store your own API key. The API key **MUST BE STORED** under the following variable name: `REACT_APP_GOOGLE_MAP_API_KEY`.

Refer the image below for an example:

![sample_env_local](/sample_env_local.png)

```
    map-autocomplete-search
    ├── node_modules
    ├── public
    ├── src
    ├── .env.local              # Create .env.local file to store your API key
    ├── .gitignore
    ├── package.json
    ├── postcss.config.js
    ├── README.md
    ├── tailwind.config.js
    ├── tsconfig.json
    └── yarn.lock
```

Finally, run the development server through your terminal:

```bash
$ yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to use the application.

You can start searching for places on the map by typing in the search box located at top left of the window.
