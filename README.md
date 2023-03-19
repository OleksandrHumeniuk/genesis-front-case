<p align="center">
    <h1 align="center">Learnify</h1>
</p>

  <p align="center">Case for Genesis Front-end school 2023</p>
  <p align="center">by Oleksandr Humeniuk</p>

## Description
Web-app with popular courses

### Built with

* Next.js
* Typescript
* Material UI
* SASS
* Axios
* Redux Toolkit
* hls.js

## Installation

Clone the repository and execute:
```bash
$ npm install
```

## Running the app

```bash
# run locally
$ npm run dev
```

You can access the website by url: http://localhost:3000/

Check the app out 

## Documentation

#### There are two pages:

**Courses (home) page `/`**:

List of all available courses, their short description, image, and preview video (on hover).

**Course page `/[courseId]`**:

Page with information about specific course. 
Also there is a list of all lessons (videos). You can view only unlocked lessons (videos). 
Progress of watching a lesson is saved locally, and when you come back, you will start, 
where you left the last time.

As instructed by alerts, you can slow down the video by pressing `h` and speed it up by pressing `j`.
You can also activate picture-in-picture mode by right-clicking the video.

If video source is undefined (server returned such value), default 404 image will be shown.

**Responsive design**

All pages are responsive (for all kinds of devices). Servers errors are handled, and error alerts are shown
(you can check it, by typing random courseId for `/[courseId]` page).

## Stay in touch

- Author -  [Oleksandr Humeniuk](https://github.com/OleksandrHumeniuk)

## License

Back-end service is [MIT licensed](LICENSE).
