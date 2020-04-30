'use strict'

let currentPosition = { X: window.scrollX, Y: window.scrollY };
let previousPosition = currentPosition;
let element = document.querySelector('.animation-effect');
let scrolling = false;
window.addEventListener('scroll', (event) => {
    let scrollPosition = { X: window.scrollX, Y: window.scrollY };
    if (!scrolling) {
        window.requestAnimationFrame(() => {
            animateOnScroll(scrollPosition);
            scrolling = false;
        });
        scrolling = true;
    }
});

let maxScroll = document.documentElement.clientHeight;

let animation = lottie.loadAnimation({
    container: element,
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: 'resized_ink_drops.json'
});

let animateOnScroll = (scrollPosition) => {
    let maxFrames = animation.assets.length;
    previousPosition = currentPosition;
    currentPosition = scrollPosition;
    let startFrame = Math.round(maxFrames * calculatePercentage(previousPosition.Y));
    let endFrame = Math.round(maxFrames * calculatePercentage(currentPosition.Y));
    animation.playSegments([startFrame, endFrame], true);
}

let calculatePercentage = (xCoordinate) => {
    return (xCoordinate / maxScroll);
}
