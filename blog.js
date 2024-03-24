//dialog  function

var dialog = document.getElementById("dialog");

  function openDialog() {
    dialog.style.display = "block";
  }

  function closeDialog() {
    dialog.style.display = "none";
  }

// ----------open end close  blog dialog-----------
var blogdialog=document.querySelector("#blogdialog")
function openblogDialog(){
  blogdialog.style.display = "block";
}
function closeblogdialog(){
  blogdialog.style.display = "none";
}

// ბლოგ გამმოქვეყნება-- წაშლა  სურათის ატვირთვა----------------------------
  function addPost() {
    var postInputblog = document.getElementById("postInputblog").value;
    var imageInputblog = document.getElementById("imageInputblog").files[0];
    var currentDate = new Date();
    var timestamp = currentDate.toLocaleString();
    var postDiv = document.createElement("div");
    
   
    var postContent =   timestamp  + " <br> "+  " <h2 class='blogtitle_h2'> "+postInputblog+" </h2> "+ " <br> " ;

    if (imageInputblog) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var img = document.createElement("img");
            
            img.src = e.target.result;
            postDiv.appendChild(img);
            postContent += "<br>";
            postContent += "<img  src='" + img.src + "' alt='Uploaded Image'>";
            savePostToLocalStorage(postContent); // Save post with image to localStorage.

        };
        reader.readAsDataURL(imageInputblog);
    } else {
        postDiv.innerHTML = postContent;
        document.getElementById("blog").appendChild(postDiv);
        savePostToLocalStorage(postContent); // Save post without image to localStorage
    }

    // Clear the input fields after posting
    document.getElementById("postInputblog").value = "";
    document.getElementById("imageInputblog").value = null;
    function refreshPage() { //reflesh page
        location.reload();
    }
    refreshPage()
}
function loadPostsFromLocalStorage() {
    var posts = JSON.parse(localStorage.getItem("posts")) || [];
    var blogDiv = document.getElementById("blog");
    posts.forEach(function(post, index) {
        var postDiv = document.createElement("div");
        postDiv.innerHTML =  " <button class='dellpostone' onclick='deletePost(" + index + ")' >Delete</button>" +post ;
        blogDiv.appendChild(postDiv);
    });
}

// Function to save post to localStorage
function savePostToLocalStorage(post) {
    var posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.push(post);
    localStorage.setItem("posts", JSON.stringify(posts));
}

// Function to load posts from localStorage



// Function to delete selected post
function deletePost(index) {
    var posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.splice(index, 1);
    localStorage.setItem("posts", JSON.stringify(posts));
    displayPosts();
}

// Function to delete all posts

function deleteAllPosts() {
    localStorage.removeItem("posts");
    displayPosts();
}


// Function to display posts

function displayPosts() {
    var blogDiv = document.getElementById("blog");
    blogDiv.innerHTML = "";
    loadPostsFromLocalStorage();
}

// Load posts from localStorage when the page loads

window.onload = function() {
    loadPostsFromLocalStorage();
};

// ეს არის ძებნის ფუნქცია---- მიბმული მაქ ღილაკზე +სქროლავს იმაზე რასაც ეძებ
function searchAndFilter() {
  // Get the input value
  var searchText = document.getElementById('searchInput').value.toLowerCase();
  // Get all the h2 elements- ვიღებ ბლოგის სათაურებს ყვეალს- მერე ვატარებ ლუპს
  var h2Elements = document.querySelectorAll('.blogtitle_h2');

  // Loop through each h2 element-- ლუპი გადავტრე ყველა სატაურს თუ სათური შეიცვს ინფუთ ვლიუს, დასქროლავს
  h2Elements.forEach(item => {
    const title = item.textContent.toLowerCase();
    if (title.includes(searchText)) {
      // Show the matching blog item
      item.style.display = 'block';
      item.style.color = "red";
     // დასქროლავს იმ ბლოგის სათაურზე რასაც ეძებ
      item.scrollIntoView({ behavior: 'smooth', block: 'center' });
     
    }
   else {
      // Hide non-matching blog items -დამალვს ყველა ბლოგის სახტურს რასაც არ ეძებ
      item.style.display = 'none';
    }
  });
}


