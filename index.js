let express = require("express");
let app = express();
let port = 3000;
app.listen(port, () => {
  console.log(`app running at http://localhost:${port}`);
});
let watchList = [
  {
    videoId: 1,
    title: "JavaScript Tutorial",
    watched: false,
    url: "https://youtu.be/shorturl1",
  },
  {
    videoId: 2,
    title: "Node.js Basics",
    watched: true,
    url: "https://youtu.be/shorturl2",
  },
  {
    videoId: 3,
    title: "React.js Guide",
    watched: false,
    url: "https://youtu.be/shorturl3",
  },
];

let watchList2 = [
  {
    videoId: 1,
    title: "JavaScript Tutorial",
    watched: false,
    url: "https://youtu.be/shorturl1",
    isFavorite: false,
  },
  {
    videoId: 2,
    title: "Node.js Basics",
    watched: true,
    url: "https://youtu.be/shorturl2",
    isFavorite: false,
  },
  {
    videoId: 3,
    title: "React.js Guide",
    watched: false,
    url: "https://youtu.be/shorturl3",
    isFavorite: false,
  },
];

let tasks = [
  { taskId: 1, title: "Buy groceries", completed: false },
  { taskId: 2, title: "Walk the dog", completed: false },
  { taskId: 3, title: "Do laundry", completed: true },
];
let tasks2 = [
  { taskId: 1, title: "Buy groceries", completed: false },
  { taskId: 2, title: "Walk the dog", completed: false },
  { taskId: 3, title: "Do laundry", completed: true },
];

let books = [
  { bookId: 1, title: "1984", available: true },
  { bookId: 2, title: "Brave New World", available: true },
  { bookId: 3, title: "Fahrenheit 451", available: false },
];

/*
Exercise 1: Remove All Unwatched Videos

Create an endpoint /watchlist/delete-unwatched which will return all the watched videos

Create a function deleteUnwatchedVideos to filter and return all unwatched videos.

API Call:

http://localhost:3000/watchlist/delete-unwatched

[
  { videoId: 2, title: 'Node.js Basics', watched: true, url: 'https://youtu.be/shorturl2' },
]

*/
function deleteUnwatchedVideos(watchList) {
  return watchList.filter((video) => video.watched);
  // return a new array containing only the videos that have  been watched => req is to remove the unwatched videos
}
app.get("/watchlist/delete-unwatched", (req, res) => {
  let result = deleteUnwatchedVideos(watchList);
  console.log("original watchList inside API call:", watchList);
  if (result.length === watchList.length) {
    // If no video was removed, return a 404 error
    return res.status(404).json({ error: "Video not found" });
  }

  // update the watchList with the updated result

  watchList = result; // now original arry will contain only  watched videos now. so if we run same api again then error will be no videos found
  console.log("Updated watchList inside API call:", watchList);
  res.json(result);
});

/*
Exercise 2: Mark Video as Favorite by ID

Create an endpoint /watchlist/favorite to favorite a video by ID.

Declare variables for videoId and isFavorite to accept input from query parameters.

Create a function markVideoAsFavorite to update the favorite status of a video by ID.

API Call:

http://localhost:3000/watchlist/favorite?videoId=1&isFavorite=true
Expected output:

[
  { 'videoId': 1, 'title': 'JavaScript Tutorial', 'watched': false, 'url': 'https://youtu.be/shorturl1', 'isFavorite': true },
  { 'videoId': 2, 'title': 'Node.js Basics', 'watched': true, 'url': 'https://youtu.be/shorturl2', 'isFavorite': false },
  { 'videoId': 3, 'title': 'React.js Guide', 'watched': false, 'url': 'https://youtu.be/shorturl3', 'isFavorite': false }
]

*/
function markVideoAsFavorite(watchList2, videoid, isFavorite) {
  let videoFound = false;
  for (let i = 0; i < watchList2.length; i++) {
    if (watchList2[i].videoId === videoid) {
      watchList2[i].isFavorite = isFavorite;
      videoFound = true;
      break; // once we found video no need iterate through rest of the array
    }
  }
  if (!videoFound) {
    return null; // If the video was not found, return null
  }
  /*this  function modifies the watchList array directly and returns it.
   */
  return watchList2; // Return the entire updated watch list
}
app.get("/watchlist/favorite", (req, res) => {
  let videoid = parseInt(req.query.videoId);
  let isFavorite = req.query.isFavorite === "true"; // in sample value is as boolean

  console.log("original  watchList:", watchList2);
  let result = markVideoAsFavorite(watchList2, videoid, isFavorite);

  if (!result) {
    return res.status(404).json({ error: "Video not found" });
  }

  console.log("Updated watchList:", watchList2);

  res.json(result); // Return the entire updated watch list
});

/*
Example 3: Update Task Status by ID

Create an endpoint /tasks/update to update the status of a task

Declare taskId and completed variables to accept input from query parameters.

Create a function updateTaskStatusById to update the status of a task by ID.

API Call:

http://localhost:3000/tasks/update?taskId=1&completed=true



Expected output:

[
  { 'taskId': 1, 'title': 'Buy groceries', 'completed': true },
  { 'taskId': 2, 'title': 'Walk the dog', 'completed': false },
  { 'taskId': 3, 'title': 'Do laundry', 'completed': true }
]
*/
function updateTaskStatusById(tasks, taskId, completed) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].completed = completed;
      break;
    }
  }
  return tasks;
}
app.get("/tasks/update", (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let completed = req.query.completed === "true";
  console.log("original tasks:", tasks);
  let result = updateTaskStatusById(tasks, taskId, completed);
  console.log("Updated tasks:", tasks);
  res.json(result);
});

/*
Example 4: Remove Completed Tasks

Create an endpoint /tasks/remove-completed to return all the pending tasks

Create a function removeCompletedTasks to filter out completed tasks.

API Call:

http://localhost:3000/tasks/remove-completed

Sample data:

let tasks = [
  { taskId: 1, title: 'Buy groceries', completed: false },
  { taskId: 2, title: 'Walk the dog', completed: false },
  { taskId: 3, title: 'Do laundry', completed: true }
];

Expected output:

[
  { 'taskId': 1, 'title': 'Buy groceries', 'completed': false },
  { 'taskId': 2, 'title': 'Walk the dog', 'completed': false }
]

*/

function removeCompletedTasks(tasks2) {
  return tasks2.filter((task) => !task.completed);
  // return a new array containing only the task that have not been completed => req is to remove the completed tasks
}
app.get("/tasks/remove-completed", (req, res) => {
  let result = removeCompletedTasks(tasks2);
  console.log("original tasks:", tasks2);
  if (result.length === tasks2.length) {
    // If no task was removed, return a 404 error
    return res.status(404).json({ error: "No completed tasks found" });
  }

  // update the tasks with the updated result

  tasks2 = result; // now original arry will contain only  pending tasks now. so if we run same api again then error will be no tasks found
  console.log("Updated tasks:", tasks2);
  res.json(result);
});
/*
Example 5: Update Library Book Availability by ID

Create an endpoint /library/update to update the availability of a book

Declare bookId and available variables to accept input from query parameters.

Create a function updateBookAvailabilityById to update the availability of a book by ID.

API call:

http://localhost:3000/library/update?bookId=1&available=false

Expected output:

[
  { 'bookId': 1, 'title': '1984', 'available': false },
  { 'bookId': 2, 'title': 'Brave New World', 'available': true },
  { 'bookId': 3, 'title': 'Fahrenheit 451', 'available': false }
]
*/
function updateBookAvailabilityById(books, bookId, available) {
  for (let i = 0; i < books.length; i++) {
    if (books[i].bookId === bookId) {
      books[i].available = available;
      break;
    }
  }
  return books;
}
app.get("/library/update", (req, res) => {
  let bookId = parseInt(req.query.bookId);
  let available = req.query.available === "true";
  console.log("original books:", books);
  let result = updateBookAvailabilityById(books, bookId, available);
  console.log("Updated books:", books);
  res.json(result);
});
