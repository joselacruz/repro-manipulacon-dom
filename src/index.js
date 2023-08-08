/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/
window.addEventListener("load", obtainProducts);
const baseURL = "https://platzi-avo.vercel.app/";
const todosLosItem = [];
const containerAvo = document.querySelector(".container-avo");

const formatPrice = (price) => {
  const newPrice = new window.Intl.NumberFormat("en-En", {
    style: "currency",
    currency: "USD",
  }).format(price);
  return newPrice;
};

async function obtainProducts() {
  try {
    const response = await fetch(`${baseURL}api/avo`);
    const responseJson = await response.json();

    responseJson.data.forEach((item) => {
      createProducts({
        src: `${baseURL}${item.image}`,
        name: item.name,
        precio: formatPrice(item.price),
      });
    });

    containerAvo.innerHTML = "";
    containerAvo.append(...todosLosItem);
  } catch (error) {
    console.error(error);
  }
}

function createProducts({ src, name, precio }) {
  const image = document.createElement("img");
  image.setAttribute("data-img", src);
  const title = document.createElement("h2");
  title.textContent = name;
  const price = document.createElement("p");
  price.textContent = `${precio}`;
  const containerProduct = document.createElement("div");
  containerProduct.append(image, title, price);

  todosLosItem.push(containerProduct);
  lazyLoader.observe(image);
}

// API INTL internacionalizacion
// 1- format fechas
// 1- format monedas

const lazyLoader = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const url = entry.target.getAttribute("data-img");
      entry.target.setAttribute("src", url);
      console.log(entry.target);
    }
  });
});
