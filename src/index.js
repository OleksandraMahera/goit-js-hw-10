import { fetchBreeds, fetchCatByBreed } from "./cat-api";

const breedSelect = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const catInfo = document.querySelector(".cat-info");
const errorMessage = document.getElementById("error-message");

async function populateBreeds() {
  try {
    showLoader();
    breedSelect.disabled = true;

    const breeds = await fetchBreeds();
    breeds.forEach(breed => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });

    hideLoader();
    breedSelect.disabled = false;
  } catch (err) {
    hideLoader();
    showError(err.message);
  }
}

async function displayCatInfo(breedId) {
  try {
    showLoader();
    catInfo.style.display = "none";

    const cat = await fetchCatByBreed(breedId);

    catInfo.innerHTML = `
      <img src="${cat.url}" alt="${cat.breeds[0].name}" />
      <h2>${cat.breeds[0].name}</h2>
      <p>Description: ${cat.breeds[0].description}</p>
      <p>Temperament: ${cat.breeds[0].temperament}</p>
    `;

    hideLoader();
    catInfo.style.display = "block";
  } catch (err) {
    hideLoader();
    showError(err.message);
  }
}

function showLoader() {
  loader.style.display = "block";
}

function hideLoader() {
  loader.style.display = "none";
}

function showError(message) {
  error.textContent = message;
  error.style.display = "block";
}

window.addEventListener("load", () => {
  errorMessage.style.display = "none";
});

breedSelect.addEventListener("change", (event) => {
  const selectedBreedId = event.target.value;
  displayCatInfo(selectedBreedId);
});

populateBreeds();

