export const cards = [
  {
    title: "cat",
    urlImage:
      "https://cdn.pixabay.com/photo/2024/03/07/10/38/simba-8618301_1280.jpg",
    desc: "a picture of a F#$%ing cat",
  },
  {
    title: "cat",
    urlImage:
      "https://cdn.pixabay.com/photo/2024/03/07/10/38/simba-8618301_1280.jpg",
    desc: "a picture of a F#$%ing cat",
  },
  {
    title: "cat",
    urlImage:
      "https://cdn.pixabay.com/photo/2024/03/07/10/38/simba-8618301_1280.jpg",
    desc: "a picture of a F#$%ing cat",
  },
];

export const createCard = (title, urlImage, desc) => {
  // Create the main div element with class "card"
  const cardDiv = document.createElement("div");
  cardDiv.className = "card";

  // Create and append the h2 element with dynamic title
  const heading = document.createElement("h2");
  heading.textContent = title;
  cardDiv.appendChild(heading);

  // Create and append the img element with dynamic URL and alt text
  const image = document.createElement("img");
  image.src = urlImage;
  image.alt = title.toLowerCase(); // Using title for alt text
  cardDiv.appendChild(image);

  // Create and append the p element with dynamic message
  const paragraph = document.createElement("p");
  paragraph.textContent = desc;
  cardDiv.appendChild(paragraph);

  // Return the created card element
  return cardDiv;
};
