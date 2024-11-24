const API_URL = "http://localhost:8001/posts";

// Fetch all posts
async function fetchPosts() {
  const response = await fetch(API_URL);
  const posts = await response.json();
  const postsContainer = document.getElementById("posts");
  postsContainer.innerHTML = posts.map(post => `
    <div class="post">
      <h3>${post.title}</h3>
      <p>${post.description}</p>
      <small>${post.author}</small>
      <button onclick="deletePost('${post._id}')">Delete</button>
      <button onclick="editPost('${post._id}', '${post.title}', '${post.description}', '${post.author}')">Edit</button>
    </div>
  `).join("");
}

// Create a new post
async function createPost(e) {
  e.preventDefault();///запобігає перезавантаженню сторінки під час відправки форми
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const author = document.getElementById("author").value;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description, author }),
  });

  clearForm();
  fetchPosts();
}

// Delete a post
async function deletePost(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  fetchPosts();
}

// Edit a post
async function editPost(id, title, description, author) {
  // Populate form with the post data
  document.getElementById("title").value = title;
  document.getElementById("description").value = description;
  document.getElementById("author").value = author;


  // Update the onsubmit behavior for the form
  document.getElementById("postForm").onsubmit = async function(e) {
    e.preventDefault();
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        author: document.getElementById("author").value,
      }),
    });

    // Reset the form to default behavior
    document.getElementById("postForm").onsubmit = createPost;
    submitButton.textContent = "Create Post";

    clearForm();
    fetchPosts();
  };
}

// Clear form inputs
function clearForm() {
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("author").value = "";
}

// Attach event listener for the form
document.getElementById("postForm").addEventListener("submit", createPost);

// Fetch posts on page load
fetchPosts();