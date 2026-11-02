document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // PAGE 2 - APOLOGY BUTTONS
    // ==========================================

    const forgiveBtn = document.getElementById("forgiveBtn");
    const timeBtn = document.getElementById("timeBtn");
    const response = document.getElementById("apologyResponse");

    if (forgiveBtn && response) {
        forgiveBtn.addEventListener("click", function () {
            response.textContent =
                "Thank you for hearing my heart. I'll do my best to show you through my actions. 💗";
        });
    }

    if (timeBtn && response) {
        timeBtn.addEventListener("click", function () {
            response.textContent =
                "Of course. Take all the time you need. I respect your feelings, and I'll be here when you're ready. 🥺💙";
        });
    }


    // ==========================================
    // PAGE 2 - YES / NO QUESTION
    // ==========================================

    const yesButton = document.getElementById("yesButton");
    const noButton = document.getElementById("noButton");
    const answerArea = document.getElementById("answerArea");
    const yesResponse = document.getElementById("yesResponse");

    if (yesButton && noButton && answerArea && yesResponse) {

        function moveNoButton() {

            const maxX = Math.max(
                0,
                answerArea.clientWidth - noButton.offsetWidth
            );

            const maxY = Math.max(
                0,
                answerArea.clientHeight - noButton.offsetHeight
            );

            noButton.style.position = "absolute";
            noButton.style.left = Math.random() * maxX + "px";
            noButton.style.top = Math.random() * maxY + "px";
        }

        noButton.addEventListener("pointerenter", moveNoButton);

        noButton.addEventListener("click", function (event) {
            event.preventDefault();
            moveNoButton();
        });

        yesButton.addEventListener("click", function () {

            yesResponse.hidden = false;
            answerArea.hidden = true;

            yesResponse.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        });
    }


    // ==========================================
    // PAGE 2 - FOREVER PHOTO
    // IMAGE: assets/special.jpeg
    // ==========================================

    const foreverPhoto = document.querySelector(
        ".forever-photo-frame img"
    );

    const foreverPlaceholder = document.querySelector(
        ".forever-photo-placeholder"
    );

    if (foreverPhoto) {

        function showForeverPhoto() {
            foreverPhoto.hidden = false;

            if (foreverPlaceholder) {
                foreverPlaceholder.hidden = true;
            }
        }

        function showForeverPlaceholder() {
            foreverPhoto.hidden = true;

            if (foreverPlaceholder) {
                foreverPlaceholder.hidden = false;
            }
        }

        foreverPhoto.addEventListener("load", showForeverPhoto);
        foreverPhoto.addEventListener("error", showForeverPlaceholder);

        if (foreverPhoto.complete) {
            if (foreverPhoto.naturalWidth > 0) {
                showForeverPhoto();
            } else {
                showForeverPlaceholder();
            }
        }
    }


    // ==========================================
    // COMMON PHOTO LOADING FUNCTION
    // ==========================================

    function setupPhotos() {

        document.querySelectorAll(".photo-frame img").forEach(function (img) {

            const placeholder =
                img.parentElement.querySelector(".photo-placeholder");

            function showPhoto() {
                img.hidden = false;

                if (placeholder) {
                    placeholder.hidden = true;
                }
            }

            function showPlaceholder() {
                img.hidden = true;

                if (placeholder) {
                    placeholder.hidden = false;
                }
            }

            img.addEventListener("load", showPhoto);
            img.addEventListener("error", showPlaceholder);

            if (img.complete) {
                if (img.naturalWidth > 0) {
                    showPhoto();
                } else {
                    showPlaceholder();
                }
            }
        });
    }


    // ==========================================
    // CREATE PHOTO GALLERY
    // ==========================================

    function createGallery(galleryId, folder, prefix, total) {

        const gallery = document.getElementById(galleryId);

        if (!gallery || gallery.children.length > 0) {
            return;
        }

        const firstGroup = document.createElement("div");
        firstGroup.className = "memory-group";

        for (let i = 1; i <= total; i++) {

            const number = String(i).padStart(2, "0");

            const filename = prefix + number + ".jpeg";
            const path = folder + "/" + filename;

            const card = document.createElement("div");
            card.className = "memory-card";

            card.innerHTML = `
                <div class="photo-frame memory-frame">

                    <img
                        src="${path}"
                        alt="Memory ${i}"
                        loading="eager"
                        hidden
                    >

                    <div class="photo-placeholder">
                        <span>♡</span>
                        <strong>Add Your Photo Here</strong>
                        <small>${path}</small>
                    </div>

                </div>

                <p class="memory-caption">
                    Memory ${i} ♡
                </p>
            `;

            firstGroup.appendChild(card);
        }

        const secondGroup = firstGroup.cloneNode(true);

        secondGroup.setAttribute("aria-hidden", "true");

        gallery.appendChild(firstGroup);
        gallery.appendChild(secondGroup);

        setupPhotos();
    }


    // ==========================================
    // PAGE 3 - 12 MEMORY PHOTOS
    // PATH: assets/memories/
    // ==========================================

    createGallery(
        "memoryGallery",
        "assets/memories",
        "memory-",
        12
    );


    // ==========================================
    // PAGE 4 - 6 UNIVERSE PHOTOS
    // PATH: assets/
    // ==========================================

    createGallery(
        "universeGallery",
        "assets",
        "universe-",
        6
    );


    // ==========================================
    // VIDEO DURATION FORMAT
    // ==========================================

    function formatDuration(seconds) {

        if (!Number.isFinite(seconds)) {
            return "Duration unavailable";
        }

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);

        return (
            String(minutes).padStart(2, "0") +
            ":" +
            String(remainingSeconds).padStart(2, "0")
        );
    }


    // ==========================================
    // PAGE 4 - SIX VIDEO GALLERY
    // PATH: assets/video-01.mp4 TO video-06.mp4
    // ==========================================

    function createVideoGallery() {

        const gallery = document.getElementById("videoGallery");

        if (!gallery || gallery.children.length > 0) {
            return;
        }

        const firstGroup = document.createElement("div");
        firstGroup.className = "video-group";

        for (let i = 1; i <= 6; i++) {

            const number = String(i).padStart(2, "0");

            const filename = "video-" + number + ".mp4";
            const path = "assets/" + filename;

            const card = document.createElement("div");
            card.className = "video-card";

            card.innerHTML = `
                <div class="video-frame">

                    <video
                        controls
                        playsinline
                        preload="metadata"
                        hidden
                    >
                        <source
                            src="${path}"
                            type="video/mp4"
                        >
                    </video>

                    <div class="video-placeholder">
                        <span>♡ ▶</span>
                        <strong>Loading Video...</strong>
                        <small>${path}</small>
                    </div>

                </div>

                <div class="video-information">

                    <p class="video-caption">
                        Our Video ${i} ♡
                    </p>

                    <span class="video-duration">
                        Duration: Loading...
                    </span>

                </div>
            `;

            firstGroup.appendChild(card);
        }


        // Duplicate gallery for continuous movement

        const secondGroup = firstGroup.cloneNode(true);

        secondGroup.setAttribute("aria-hidden", "true");

        gallery.appendChild(firstGroup);
        gallery.appendChild(secondGroup);


        // ======================================
        // VIDEO LOAD AND DURATION HANDLING
        // ======================================

        gallery.querySelectorAll("video").forEach(function (video) {

            const card = video.closest(".video-card");

            const placeholder =
                card.querySelector(".video-placeholder");

            const durationLabel =
                card.querySelector(".video-duration");

            function videoLoaded() {

                video.hidden = false;
                placeholder.hidden = true;

                durationLabel.textContent =
                    "Duration: " + formatDuration(video.duration);
            }

            function videoError() {

                video.hidden = true;
                placeholder.hidden = false;

                placeholder.querySelector("strong").textContent =
                    "Video Not Found";

                durationLabel.textContent =
                    "Please check video filename";
            }

            video.addEventListener("loadedmetadata", videoLoaded);

            video.addEventListener("error", videoError);

            video.addEventListener("loadeddata", function () {
                video.hidden = false;
                placeholder.hidden = true;
            });

            if (video.readyState >= 1) {
                videoLoaded();
            }

        });


        // ======================================
        // PAUSE SLIDER WHILE VIDEO IS PLAYING
        // ======================================

        function updateVideoSlider() {

            const anyPlaying = Array.from(
                gallery.querySelectorAll("video")
            ).some(function (video) {
                return !video.paused && !video.ended;
            });

            gallery.classList.toggle("video-playing", anyPlaying);
        }

        gallery.querySelectorAll("video").forEach(function (video) {

            video.addEventListener("play", updateVideoSlider);
            video.addEventListener("pause", updateVideoSlider);
            video.addEventListener("ended", updateVideoSlider);

        });

    }


    // CREATE PAGE 4 VIDEOS

    createVideoGallery();


    // ==========================================
    // END OF WEBSITE JAVASCRIPT
    // ==========================================

});