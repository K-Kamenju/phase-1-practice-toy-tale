let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});



//Global Scope Variable
const toyURL = "http://localhost:3000/toys"
const toyCollection = document.getElementById("toy-collection")


getToys()

//GET request
function getToys() {
  fetch(toyURL)
  .then(res => res.json())
  .then(data => showingToys(data))
 }

 function showingToys(data) {
  data.forEach((element) => {
    const div = document.createElement("div");
    div.className = "card";
    div.id = `card-${element.id}`; // Set a unique ID for each card
    div.innerHTML = `
      <h2>${element.name}</h2>
      <img src="${element.image}" alt="${element.name}"
      <p class="par">${element.likes} likes</p>
      <button class="like-btn" id="${element.id}">Like ❤️</button>
    `;
    
    const likeButton = div.querySelector(".like-btn");
    likeButton.addEventListener("click", () => {
      const newLikes = element.likes + 1;
      // Update the likes in the DOM
      const toyDiv = document.getElementById(`card-${element.id}`); // Use the unique ID
      const likesParagraph = toyDiv.querySelector(".par");
      likesParagraph.textContent = `${newLikes} likes`;
      // Update the likes in the database
      fetch(`${toyURL}/${element.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ likes: newLikes }),
      })
        .then((res) => res.json())
        .then((data) => {
          // Handle the response as needed
          console.log("Likes updated:", data);
        });
    });
    toyCollection.appendChild(div);
  });
}





function collectFormData() {
  const nameInput = document.querySelector(".input-name");
  const imageInput = document.querySelector(".input-imageURL");

  const name = nameInput.value;
  const image = imageInput.value;

  return {name, image};
}

function addingNewToy(formData) {
  fetch(toyURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((data) => {
      // Handle the response as needed
      console.log("New toy added:", data);
    });
}

// Attach the submit event listener to the form
const form = document.querySelector(".add-toy-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = collectFormData(); // Collect the form data
  addingNewToy(formData); // Call the function to add the new toy with the form data
});