document.getElementById("hamburger").addEventListener("click", function () {
  document.getElementById("nav-links").classList.toggle("active");
});

const Api_key = "fe67d2d1a08b477d8ea97f79e5f690ae";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("Technology"));

async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apiKey=${Api_key}`);
  const data = await res.json();
  displayNews(data.articles);
}

function displayNews(articles) {
  const newsContainer = document.querySelector(".card_container");
  newsContainer.innerHTML = "";

  articles.forEach((article) => {
    const template = document
      .querySelector("#template_card")
      .content.cloneNode(true);

    template.querySelector("img").src = article.urlToImage || "placeholder.jpg"; // Fallback image
    template.querySelector("h3").textContent = article.title;
    template.querySelector("p").textContent = article.description;
    template.querySelector(".source_name").textContent = article.source.name;
    template.querySelector(".publish_date").textContent = new Date(
      article.publishedAt
    ).toLocaleDateString();
    template.querySelector("a").href = article.url;

    newsContainer.appendChild(template);
  });
}

// Add event listener for navigation links
document.querySelectorAll(".nav-center a").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const query = event.target.getAttribute("data-query");
    if (query) {
      fetchNews(query);
      document.getElementById("nav-links").classList.remove("active");
    }
  });
});

// Add event listener for the search button
document.querySelector(".search-button").addEventListener("click", () => {
  const query = document.querySelector(".search-bar").value;
  if (query) {
    fetchNews(query);
  }
});

// Add event listener for the search bar to handle Enter key press
document.querySelector(".search-bar").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const query = document.querySelector(".search-bar").value;
    if (query) {
      fetchNews(query);
    }
  }
});
