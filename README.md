<h1 align="center">
  <br>
  <a href="https://tailwind-movies.vercel.app/">
    <img src="./public/images/placeholder.jpeg" alt="Movies Logo" width="385">
  </a>
  <br />
   Find Movies/shows Information
  <br />
</h1>

<p align="center">
 <a href="#Gif">Gif</a> •
  <a href="#about">About</a> •
  <a href="#roadmap">Roadmap</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#feedback">Feedback</a> •
  <a href="#deployment">Deployment</a> •
</p>

![Movies Next/TypeScript](./public/images/movies.png)

## Gif

<p align="center">

 <img src="./public/images/moviesGIf.gif" alt="Movies Logo" width="5000"/>

</p>

## About

This was one of my first project I created a while back, and although the previous one was good, I thought it could be improved to use the latest **Tech Stack** updating some of the previous stack to make it better and faster.

This is movie app that allows the user to find information about specific movies. You can find everything from duration to cast and more. You can also watch the trailer if interested.

The app uses _TMDB_ API to interact with the backend.

### Features

- The app allows you to do certain actions, it allows you to login/logout
  - Note:
    - You do need a **TMDB** account to be able to login
- It allows the user to search for specific movie
- it shows information about movies
- it can change mode accordingly
- it can add favorite and watchlist movies to your profile
- you can **talk** to the app by giving a few commands, more are coming your way
  - what does this app do?
  - Hey Alan, can you tell me about this app?
  - How can you help me?
  - Go to **specific genre**
  - Change Mode
  - Please Log me in
  - Please log me out
  - Please take me to my profile

### Built using

For the past few months I have been working with **TypeScript**, so this is what I am using to build this app

- **NextJs**: Front-end framework
- **Redux**: State management
- **Tailwind**: CSS framework

### Structure

```sh
TailwindMovies/
├── public         # Public files
├── src            # Source files
├──── app          # Redux stores
├──── Features     # Redux Features using slices
├──── components   # Reusable code
├──── helpers      # functions that are useful manipulating data
├──── hooks        # custom functions
├──── Layouts      # Layout of different pages
├──── pages        # Application views
├──── services     # TMDB api calls using Redux RTK
├──── styles       # Global app styles
├──── types        # all types being used in the app. Cleaning is needed
```

---

## Roadmap

There are still some issues at the moment so if you want to contribute check it out [open issues](https://github.com/enyelsequeira/tailwind-movies/issues) for a list of issues and improvements

## Contributing

if you are interested in helping it would be great any contributions will be welcomed.

## Feedback

like mentioned earlier there are still bugs that need to be worked out, if you find and see and issue please open one issue or if you need/want a feature you can also make a request for said feature

## Deployment

I am a big fan of Next and the **Vercel** team so it's only natural to be deployed there

## Running app locally

If you wish to contribute or add a feature

`git clone (gh repo clone htpp..)`

`git checkout -b your_name`

create a `.env.local = "NEXT_PUBLIC_API_KEY=key goes here`

Please use `yarn` as package manager to run `yarn dev`
