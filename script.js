// ElementID's
let fetchButton = document.getElementById("fetchButton");
let postList = document.getElementById("postList");
let postForm = document.getElementById("postForm");
let titleInput = document.getElementById("titleInput");
let bodyInput = document.getElementById("bodyInput");
let formSuccess = document.getElementById("formSuccess");
let formError = document.getElementById("formError");
let errorDiv = document.getElementById("error");

// 1 Fetch and display posts
function fetchPosts() {
  postList.innerHTML = "";
  errorDiv.textContent = "Loading...";

  fetch("https://jsonplaceholder.typicode.com/posts")
    .then(function (response) {
      return response.json();
    })
    .then(function (posts) {
      errorDiv.textContent = "";
      for (let i = 0; i < 10; i++) {
        let post = posts[i];

        let postDiv = document.createElement("div");
        postDiv.innerHTML = "<h3>" + post.title + "</h3><p>" + post.body + "</p>";
        postDiv.style.borderBottom = "1px solid #ccc";
        postDiv.style.marginBottom = "10px";

        postList.appendChild(postDiv);
      }
    })
    .catch(function (error) {
      errorDiv.textContent = "Error";
      console.log(error);
    });
}

// 2 Submit a new post
function submitPost(event) {
  event.preventDefault(); 
  formSuccess.textContent = "";
  formError.textContent = "";

  let title = titleInput.value;
  let body = bodyInput.value;

  if (title === "" || body === "") {
    formError.textContent = "Please fill in both fields.";
    return;
  }

  let postData = {
    title: title,
    body: body,
  };
// 3
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      formSuccess.innerHTML =
        "<p><strong>Post submitted!</strong></p>" +
        "<p>ID: " + data.id + "</p>" +
        "<p>Title: " + data.title + "</p>" +
        "<p>Body: " + data.body + "</p>";
      postForm.reset();
    })
    .catch(function (error) {
      formError.textContent = "Error submitting post.";
      console.log(error);
    });
}


fetchButton.addEventListener("click", fetchPosts);
postForm.addEventListener("submit", submitPost);

