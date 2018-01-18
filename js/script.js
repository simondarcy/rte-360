//dont allow play vids until play btn is pressed
var canPlay = false;

function startVideo(){
    var videoEl = document.querySelector('#video');
    videoEl.play();
    videoEl.pause();
    var playbutton = document.querySelector('#playbtn');
    playbutton.style.display = "none";
    canPlay = true;
}

AFRAME.registerComponent('selectable', {

    init: function () {

        var el = this.el;
        this.el.addEventListener('mouseenter', function (evt) {
            this.emit('fade-out');
        });
        this.el.addEventListener('mouseleave', function (evt) {
            this.setAttribute('material', 'color', '');
            this.emit('fade-in');
        });
        this.el.addEventListener('click', function (evt) {


            this.setAttribute('material', 'color', 'red');
            this.setAttribute('material', 'opacity', 1);
            video_source = el.getAttribute('data-src');

            if (!canPlay){
                return;
            }

            document.querySelector('a-sky').setAttribute("visible", false);
            document.querySelector('#plane').setAttribute("visible", false);
            document.querySelector('#torus').setAttribute("visible", false);
            document.querySelector('#splash').setAttribute("visible", false);
            document.querySelector('#back').setAttribute("visible", true);
            document.querySelector('a-videosphere').setAttribute("visible", true);
            document.querySelector('#videolist').setAttribute("visible", false);

            var videoEl = document.querySelector('#video');
            videoEl.setAttribute('src', video_source);
            videoEl.load();
            videoEl.play();

        });
    }
});


function mobileStart(){
    startVideo();
    canPlay = true;
}

//!todo interface class, update in one go
backBtn = document.getElementById("back");
backBtn.addEventListener('click', function () {
    document.querySelector('#video').pause();
    document.querySelector('a-sky').setAttribute("visible", true);
    document.querySelector('#plane').setAttribute("visible", true);
    document.querySelector('#back').setAttribute("visible", false);
    document.querySelector('a-videosphere').setAttribute("visible", false);
    document.querySelector('#videolist').setAttribute("visible", true);
    document.querySelector('#torus').setAttribute("visible", true);
    document.querySelector('#splash').setAttribute("visible", true);
});

backBtn.addEventListener('mouseenter', function () {
    this.setAttribute('material', 'color', 'blue');
});

backBtn.addEventListener('mouseleave', function () {
    this.setAttribute('material', 'color', '');
});

//!todo better loading etc
window.onload = function() {

    document.querySelector('#loader').style.display = "none";
    document.querySelector('a-scene').setAttribute("visible", true);

    //!todo mobile first
    if (!AFRAME.utils.device.isMobile()){
        //desktop
        canPlay = true;
        document.querySelector('#video').pause();
        //remove play button
        var playbutton = document.querySelector('#playbtn');
        playbutton.style.display = "none";

    } else {
        document.querySelector('#playbtn').style.display = "flex";
    }

};

