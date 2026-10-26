export default function decorate(block) {
  [... block.children].forEach((row, index) => {
    row.classList.add("slide");
    [... row.children].forEach((col, index) => {
      if (index === 0) {
        col.classList.add("slide-image")
      }
      if (index ===  1) { // caption div
        col.classList.add('caption')
      }
    });
  });
  const totalSlides = [... block.children].length

  // create prev-next button
  const prevButtonElement = document.createElement("button");
  prevButtonElement.classList.add("arrow", "prev")
  prevButtonElement.setAttribute("aria-label", "Previous slide")
  prevButtonElement.innerHTML = "&#10094;";
  prevButtonElement.onclick = () => moveSlide(-1);
  block.parentElement.appendChild(prevButtonElement);

  const nextButtonElement = document.createElement("button");
  nextButtonElement.classList.add("arrow", "next")
  nextButtonElement.setAttribute("aria-label", "Next slide")
  nextButtonElement.innerHTML = "&#10095;";
  nextButtonElement.onclick = () => moveSlide(1);
  block.parentElement.appendChild(nextButtonElement);

  // create dot container
  const dotsContainerElement  = document.createElement("div")
  dotsContainerElement.classList.add("dots")
  dotsContainerElement.setAttribute("id", "dots");
  block.parentElement.appendChild(dotsContainerElement);


  const dotsContainer = document.getElementById("dots");
  const slides = document.getElementsByClassName("slides")?.item(0);
  let current = 0;
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("button");
    dot.className = "dot" + (i === 0 ? " active" : "");
    dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
    dot.onclick = () => goToSlide(i);
    dotsContainer.appendChild(dot);
  }

  function goToSlide(index) {
    current = (index + totalSlides) % totalSlides;
    slides.style.transform = `translateX(-${current * 100}%)`;

    [...dotsContainer.children].forEach((dot, i) => {
      dot.classList.toggle("active", i === current);
    });
  }

  function moveSlide(direction) {
    goToSlide(current + direction);
  }
}