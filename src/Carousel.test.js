import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

// smoke test
it("renders without crashing", function() {
  render(<Carousel
    photos={TEST_IMAGES}
    title="images for testing"/>);
});

// snapshot test
it("matches snapshot", function() {
  const { asFragment } = render(<Carousel
    photos={TEST_IMAGES}
    title="images for testing" />);
  expect(asFragment()).toMatchSnapshot();
});

// specialized test 1
it("changes picture to right or left according to arrow click", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();

  // move back in the carousel
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);

  // expect the last image to show, but not the current
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
});

// specialized test 2
it("shows and hides arrows appropriately", function () {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  // expect first image to show, and left arrow to be hidden
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('i[class="bi bi-arrow-left-circle"]')
  ).not.toBeInTheDocument();

  //expect next image to show, and both arrows to be visible
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('i[class="bi bi-arrow-left-circle"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('i[class="bi bi-arrow-right-circle"]')
  ).toBeInTheDocument();

  //expect next image to show, and right arrow to be hidden
  fireEvent.click(rightArrow);
  expect(
    container.querySelector('img[alt="testing image 3"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('i[class="bi bi-arrow-left-circle"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('i[class="bi bi-arrow-right-circle"]')
  ).not.toBeInTheDocument();
});