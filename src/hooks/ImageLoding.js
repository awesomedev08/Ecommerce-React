import placeholder from "../assets/image/placeholder.jpg";
import styles from "./css/ImageLoding.css";
function ImageLoding({ image , Class}) {
  let imageOne;
  let imageTow;

  new Promise((resolve, reject) => {
    if (image.data !== undefined) {
      imageOne = image.data.data.attributes.welcomePhoto.data[0].attributes.url;
      imageTow = image.data.data.attributes.welcomePhoto.data[1].attributes.url;
      // console.log(image.data.data.attributes.welcomePhoto.data[1].attributes.url);
      resolve();
    }
  })
    .then(() => {
      document
        .querySelector(".App")
        .querySelectorAll(".ImageLodingClass")
        .forEach((url) => {
          url.addEventListener("load", () => {
            url.src = url.getAttribute("data-src");
          });
        });
    })
    .then(() => {
      document
        .querySelector(".App")
        .querySelectorAll(".ImageLodingClass")
        .forEach((url) => {
          url.addEventListener("load", () => {
            url.classList.remove("ImageLodingClass");
          });
        });
    })
    .then(() => {
      document.querySelectorAll(".ImageLodingClassDiv").forEach((e) => {
        e.classList.remove("ImageLodingClassDiv");
      });
    });

  return (
    <picture className="ImageLodingClassDiv">
      <source media="(min-width: 992px)" srcSet={imageTow}></source>
      <img
        className={"ImageLodingClass" +" "+ Class}
        src={placeholder}
        data-src={imageOne}
        alt="d"
      ></img>

      <span className="top"></span>
      <span className="right"></span>
      <span className="bottom"></span>
      <span className="left"></span>
    </picture>
  );
}

export default ImageLoding;
