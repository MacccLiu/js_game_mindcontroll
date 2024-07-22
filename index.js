function $(selector) {
    return document.querySelector(selector);
}
function $$(selector) {
    return document.querySelectorAll(selector);
}

var maxImgIndex = 15;
var curTargetIndex; // current index
var isOver = false;

var panel = $('.panel');
var initImg = $("#initImg");
var resultImg = $('#resultImg');
var dictionary = $('.dictionary');

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function init() {
    //1.
    curTargetIndex = getRandom(0, maxImgIndex);
    dictionary.innerHTML = ''; // clear the last dictionary 
    //2. generate current dictionary: total 100 images, 
    // if (image index % 9 === 0) => image index = curTargetIndex
    // if not, choose random image from 0~maxImgIndex
    for (var i = 0; i < 100; i++) {
        var imgIndex;
        if (i % 9 === 0) {
            imgIndex = curTargetIndex;
        } else {
            imgIndex = getRandom(0, maxImgIndex);
        }
        dictionary.innerHTML += `
            <div class="item">
                <span class="number">${i}</span>
                <span class="value">
                    <img src="./images/values/${imgIndex}.png">
                </span>
            </div>
        `;
    }

}

// binding click event
panel.addEventListener("click", function (e) {
    if(isOver){
        if(window.confirm("Play again ? ")){
            init();
            initImg.style.opacity = 1;
            resultImg.style.opacity = 0;
            isOver = false;
            // remove the transition and transform
            // remove transitionend event, otherwise, next time will directly trigger transitionend event
            e.currentTarget.setAttribute("style", "");
            panel.removeEventListener('transitionend', transitionendHandle);
        }
    } else {
        // add animation
        e.currentTarget.style.transition = "all 2s";
        e.currentTarget.style.transform = "rotate(1800deg)";
        // after rotating, show the result image to users
        panel.addEventListener("transitionend", transitionendHandle);
    }
})

function transitionendHandle() {
    initImg.style.opacity = 0;
    resultImg.src = `./images/values/${curTargetIndex}.png`;
    resultImg.style.opacity = 1;
    isOver = true;
}

init();