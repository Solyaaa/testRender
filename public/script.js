// const API_URL = "http://localhost:8001/posts";

// // Fetch all posts
// async function fetchPosts() {
//   const response = await fetch(API_URL);
//   const posts = await response.json();
//   const postsContainer = document.getElementById("posts");
//   postsContainer.innerHTML = posts.map(post => `
//     <div class="post">
//       <h3>${post.title}</h3>
//       <p>${post.description}</p>
//       <small>${post.author}</small>
//       <button onclick="deletePost('${post._id}')">Delete</button>
//       <button onclick="editPost('${post._id}', '${post.title}', '${post.description}', '${post.author}')">Edit</button>
//     </div>
//   `).join("");
// }

// // Create a new post
// async function createPost(e) {
//   e.preventDefault();///запобігає перезавантаженню сторінки під час відправки форми
//   const title = document.getElementById("title").value;
//   const description = document.getElementById("description").value;
//   const author = document.getElementById("author").value;

//   await fetch(API_URL, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ title, description, author }),
//   });

//   clearForm();
//   fetchPosts();
// }

// // Delete a post
// async function deletePost(id) {
//   await fetch(`${API_URL}/${id}`, { method: "DELETE" });
//   fetchPosts();
// }

// // Edit a post
// async function editPost(id, title, description, author) {
//   // Populate form with the post data
//   document.getElementById("title").value = title;
//   document.getElementById("description").value = description;
//   document.getElementById("author").value = author;


//   // Update the onsubmit behavior for the form
//   document.getElementById("postForm").onsubmit = async function(e) {
//     e.preventDefault();
//     await fetch(`${API_URL}/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         title: document.getElementById("title").value,
//         description: document.getElementById("description").value,
//         author: document.getElementById("author").value,
//       }),
//     });

//     // Reset the form to default behavior
//     document.getElementById("postForm").onsubmit = createPost;
//     submitButton.textContent = "Create Post";

//     clearForm();
//     fetchPosts();
//   };
// }

// // Clear form inputs
// function clearForm() {
//   document.getElementById("title").value = "";
//   document.getElementById("description").value = "";
//   document.getElementById("author").value = "";
// }

// // Attach event listener for the form
// document.getElementById("postForm").addEventListener("submit", createPost);

// // Fetch posts on page load
// fetchPosts();




// const API_URL = "https://post-blog-e47sty6mi-solomiias-projects-5cb781b5.vercel.app/"; 

// Fetch all posts
// async function fetchPosts() {
//   const response = await fetch(API_URL);
//   const posts = await response.json();
//   const postsContainer = document.getElementById("posts");
//   postsContainer.innerHTML = posts.map(post => `
//     <div class="post">
//       <h3>${post.title}</h3>
//       <p>${post.description}</p>
//       <small>${post.author}</small>
//       <button onclick="deletePost('${post._id}')">Delete</button>
//       <button onclick="editPost('${post._id}', '${post.title}', '${post.description}', '${post.author}')">Edit</button>
//     </div>
//   `).join("");
// }

// // Create a new post
// async function createPost(e) {
//   e.preventDefault();
//   const title = document.getElementById("title").value;
//   const description = document.getElementById("description").value;
//   const author = document.getElementById("author").value;

//   await fetch(API_URL, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ title, description, author }),
//   });

//   clearForm();
//   fetchPosts();
// }

// // Delete a post
// async function deletePost(id) {
//   await fetch(`${API_URL}/${id}`, { method: "DELETE" });
//   fetchPosts();
// }

// // Edit a post
// async function editPost(id, title, description, author) {
//   document.getElementById("title").value = title;
//   document.getElementById("description").value = description;
//   document.getElementById("author").value = author;

//   document.getElementById("postForm").onsubmit = async function(e) {
//     e.preventDefault();
//     await fetch(`${API_URL}/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         title: document.getElementById("title").value,
//         description: document.getElementById("description").value,
//         author: document.getElementById("author").value,
//       }),
//     });

//     document.getElementById("postForm").onsubmit = createPost;
//     submitButton.textContent = "Create Post";

//     clearForm();
//     fetchPosts();
//   };
// }

// // Clear form inputs
// function clearForm() {
//   document.getElementById("title").value = "";
//   document.getElementById("description").value = "";
//   document.getElementById("author").value = "";
// }

// // Attach event listener for the form
// document.getElementById("postForm").addEventListener("submit", createPost);

// // Fetch posts on page load
// fetchPosts();



// Автоматично визначає URL API залежно від середовища
const API_URL = window.location.hostname === "localhost" 
  ? "http://localhost:8001/posts" 
  : `${window.location.origin}/posts`;

// Fetch all posts
async function fetchPosts() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch posts");
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
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

// Create a new post
async function createPost(e) {
  e.preventDefault(); // Запобігає перезавантаженню сторінки під час відправки форми
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const author = document.getElementById("author").value;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, author }),
    });
    if (!response.ok) throw new Error("Failed to create post");
    clearForm();
    fetchPosts();
  } catch (error) {
    console.error("Error creating post:", error);
  }
}

// Delete a post
async function deletePost(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Failed to delete post");
    fetchPosts();
  } catch (error) {
    console.error("Error deleting post:", error);
  }
}

// Edit a post
async function editPost(id, title, description, author) {
  // Заповнює форму даними посту
  document.getElementById("title").value = title;
  document.getElementById("description").value = description;
  document.getElementById("author").value = author;

  // Оновлює поведінку форми при відправці
  document.getElementById("postForm").onsubmit = async function(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: document.getElementById("title").value,
          description: document.getElementById("description").value,
          author: document.getElementById("author").value,
        }),
      });
      if (!response.ok) throw new Error("Failed to update post");

      // Відновлює поведінку форми за замовчуванням
      document.getElementById("postForm").onsubmit = createPost;
      clearForm();
      fetchPosts();
    } catch (error) {
      console.error("Error updating post:", error);
    }
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
