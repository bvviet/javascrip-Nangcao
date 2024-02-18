const imgContainer = document.querySelector(".images");
const wait = function (seconds) {
    return new Promise(function (resolve) {
        setTimeout(resolve, seconds * 1000);
    });
};
const createImage = function (imgPath) {
    return new Promise((resolve, reject) => {
        const img = document.createElement("img");
        img.src = imgPath;

        img.addEventListener("load", function () {
            imgContainer.append(img);
            resolve(img);
        });
        img.addEventListener("error", function () {
            reject(new Error("Image not found"));
        });
    });
};

let currentImg;
createImage("img/img-1.jpg")
    .then((img) => {
        currentImg = img;
        console.log("Image 1 loaded");
        return wait(2);
    })
    .then(() => {
        currentImg.style.display = "none";
        return createImage("img/img-2.jpg");
    })
    .then((img) => {
        currentImg = img;
        console.log("Image 2 loaded");
        return wait(2);
    })
    .then(() => {
        currentImg.style.display = "none";
    })
    .catch((err) => console.err(err));

// Lab 8.3
// PART 1
const loadNPause = async function () {
    try {
        // load image 1
        let img1 = await createImage("img/img-1.jpg");
        console.log("Image 1 loaded");
        await wait(2);
        img1.style.display = "none";
        // load image 1
        let img2 = await createImage("img/img-2.jpg");
        console.log("Image 1 loaded");
        await wait(2);
        img2.style.display = "none";
    } catch (error) {
        console.error(error);
    }
};
// loadNPause();

// PART 2
const loadAll = async function (imgArr) {
    try {
        const imgs = imgArr.map(async (img) => await createImage(img));

        const imgsEl = await Promise.all(imgs);
        console.log(imgsEl);

        imgsEl.forEach((img) => img.classList.add("parallel"));
    } catch (error) {
        console.error(error);
    }
};
// loadAll(["img/img-1.jpg", "img/img-2.jpg", "img/img-3.jpg"]);
