let num_cards_GLOBAL = 5;

let cards = [
    {
        videoId: "8sXRyHI3bLw"
    },
    {
        videoId: "cUzklzVXJwo"
    },
    {
        videoId: "IV3dnLzthDA"
    },
    {
        videoId: "nmgFG7PUHfo"
    },
    {
        videoId: "ey_EjSzKFWQ"
    },
    {
        videoId: "9P6rdqiybaw"
    },
    {
        videoId: "isdLel273rQ"
    },
    {
        videoId: "JdFRjsEZrmU"
    },
    {
        videoId: "1qw5ITr3k9E"
    },
    {
        videoId: "jvqFAi7vkBc"
    }
];


const IsMobile = () => {
    let width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.getElementsByTagName("body")[0].clientWidth;

    if (width <= 736) {
        return true;
    } else {
        return false;
    }
};

const CheckSizeAttributes = () => {
    let width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.getElementsByTagName("body")[0].clientWidth;

    let carousels = document.getElementsByClassName("card-carousel");

    let old_num_cards = num_cards_GLOBAL;
    let new_num_cards;

    if (width > 1501) {
        new_num_cards = 5;
    } else if (width <= 1500 && width > 1100) {
        new_num_cards = 4;
    } else if (width <= 1100 && width > 520) {
        new_num_cards = 3;
    } else if (width <= 520) {
        new_num_cards = 2;
    }

    for (let i = 0; i < carousels.length; i++) {
        if (carousels[i].children.length > 2) {
            for (let j = 1; j < carousels[i].children.length - 1; j++) {
                carousels[i].children[j].style.display = "none";
            }
            for (let j = 1; j < new_num_cards + 1; j++) {
                carousels[i].children[j].style.display = "flex";
            }
        }
    }

    num_cards_GLOBAL = new_num_cards;
};

const ResizeHeader = () => {
    let width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.getElementsByTagName("body")[0].clientWidth;

    if (width <= 815) {
        if (document.getElementsByClassName("hamburger").length <= 0) {
            let header = document.getElementsByClassName("header")[0];
            let main_nav = header.getElementsByClassName("main-nav")[0];
            let right_nav = header.getElementsByClassName("right-nav")[0];

            let hamburger = document.createElement("div");
            hamburger.classList.add("hamburger");
            hamburger.innerHTML = `<svg fill="currentColor" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
          </svg>`;
            main_nav.remove();
            right_nav.remove();

            let bottom_header = document.createElement("div");
            bottom_header.classList.add("header-bottom");
            bottom_header.append(main_nav, right_nav);
            bottom_header.style.display = "none";

            hamburger.addEventListener("click", function () {
                if (bottom_header.style.display == "none") {
                    bottom_header.style.display = "flex";
                    header.style.paddingBottom = "9px";
                    header.style.paddingTop = "9px";
                } else {
                    bottom_header.style.display = "none";
                    header.style.paddingBottom = "0px";
                    header.style.paddingTop = "0px";
                }
            });

            header.classList.add("header-change");

            let top_header = document.createElement("div");
            top_header.classList.add("header-top");
            top_header.append(header.children[0], hamburger);

            header.innerHTML = "";
            header.append(top_header, bottom_header);
        }
    } else {
        if (document.getElementsByClassName("hamburger").length > 0) {
            let header = document.getElementsByClassName("header")[0];
            let main_nav = header.getElementsByClassName("main-nav")[0];
            let right_nav = header.getElementsByClassName("right-nav")[0];
            let brand = header.getElementsByClassName("brand")[0];

            header.classList.remove("header-change");
            header.children[0].remove();
            header.children[0].remove();
            header.append(brand, main_nav, right_nav);
        }
    }
};

const RedirectToDisclaimer = () => {
    window.location.href = "disclaimer.html";
};

const AddCards = () => {
    let carousel_width = document.getElementsByClassName("card-carousel")[0].clientWidth;
    let btn_width = document.getElementsByClassName("carousel-btn")[0].clientWidth + document.getElementsByClassName("carousel-btn")[1].clientWidth;
    let num_cards = num_cards_GLOBAL;
    let card_margin = 2;
    let initial_width = 1920;
    let initial_height = 1080;

    let scale = (100 * ((carousel_width - btn_width) / num_cards - card_margin * 2)) / initial_width;

    let carousels = document.getElementsByClassName("card-carousel");

    for (let i = 0; i < carousels.length; i++) {
        let not_chosen = [];
        for (let c = 0; c < cards.length; c++) {
            not_chosen.push(c);
        }

        for (let j = 0; j < cards.length; j++) {
            let chosen_index = Math.floor(Math.random() * not_chosen.length);
            let chosen_card = cards[not_chosen[chosen_index]];
            not_chosen.splice(chosen_index, 1);

            let card = document.createElement("div");
            card.classList.add("card");
            // Embed YouTube video thumbnail
            let videoThumbnail = document.createElement("img");
            videoThumbnail.src = `https://img.youtube.com/vi/${chosen_card.videoId}/0.jpg`;
            videoThumbnail.classList.add("video-thumbnail");
            card.appendChild(videoThumbnail);

            // Add click event listener to open video page
            card.addEventListener("click", function () {
                window.open(`https://www.youtube.com/watch?v=${chosen_card.videoId}`, "_blank");
            });
            card.style.width = initial_width * (scale / 100) + "px";
            card.style.height = initial_height * (scale / 100) + "px";
            card.style.margin = `0px ${card_margin}px`;
            card.style.minWidth = initial_width * (scale / 100) + "px";
            card.style.minHeight = initial_height * (scale / 100) + "px";

            carousels[i].insertBefore(card, carousels[i].children[carousels[i].children.length - 1]);
        }
    }
};


const CheckCards = () => {
    let carousels = document.getElementsByClassName("card-carousel");

    for (let i = 0; i < carousels.length; i++) {
        let carousel_width = carousels[i].clientWidth;

        let btn_width =
            carousels[i].getElementsByClassName("carousel-btn")[0].clientWidth +
            carousels[i].getElementsByClassName("carousel-btn")[1].clientWidth;

        let num_cards = num_cards_GLOBAL;
        let card_margin = 2;
        let initial_width = 1920;
        let initial_height = 1080;

        let scale =
            (100 *
                ((carousel_width - btn_width) / num_cards - card_margin * 2)) /
            initial_width;

        let cards = carousels[i].getElementsByClassName("card");

        for (let i = 0; i < cards.length; i++) {
            cards[i].style.width = initial_width * (scale / 100) + "px";
            cards[i].style.height = initial_height * (scale / 100) + "px";
            cards[i].style.margin = `0px ${card_margin}px`;
            cards[i].style.minWidth = initial_width * (scale / 100) + "px";
            cards[i].style.minHeight = initial_height * (scale / 100) + "px";
        }

        if (IsMobile()) {
            carousels[i].style.height =
                1.6 * (initial_height * (scale / 100)) + "px";
        } else {
            carousels[i].style.height = "auto";
        }
    }
};

const AddCarouselButtons = () => {
    let carousels = document.getElementsByClassName("card-carousel");
    for (let i = 0; i < carousels.length; i++) {
        let btn1 = document.createElement("div");
        btn1.classList.add("carousel-btn");
        btn1.innerHTML = `<svg fill="currentColor" viewBox="0 0 16 16" onclick="Previous(this);">
                            <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                        </svg>`;

        let btn2 = document.createElement("div");
        btn2.classList.add("carousel-btn");

        btn2.innerHTML = `<svg fill="currentColor" viewBox="0 0 16 16" onclick="Next(this);">
                            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                        </svg>`;

        carousels[i].append(btn1, btn2);
    }
};

const ScrollFunction = () => {
    let header = document.getElementsByClassName("header")[0];
    if (document.documentElement.scrollTop > 1) {
        header.classList.add("header-active");
    } else {
        header.classList.remove("header-active");
    }
};

const MakeJumbotron = () => {
    let height =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.getElementsByTagName("body")[0].clientHeight;

    document.getElementsByClassName("top")[0].style.height = `${height}px`;
};

let slide_index = 0;


const SmoothScroll = (id) => {
    let element = document.getElementById(id);
    element.scrollIntoView({ behavior: "smooth", block: "center" });
};

const Next = (elem) => {
    let carousel = elem.parentElement.parentElement;
    let first_elem = carousel.children[1];
    let next_elem;

    for (let i = 0; i < carousel.children.length; i++) {
        if (carousel.children[i].style.display == "none") {
            next_elem = carousel.children[i];
            break;
        }
    }

    first_elem.style.display = "none";
    first_elem.remove();
    carousel.insertBefore(
        first_elem,
        carousel.children[carousel.children.length - 1]
    );

    next_elem.style.display = "flex";
};

const Previous = (elem) => {
    let carousel = elem.parentElement.parentElement;
    let last_display_item;
    let prev_elem = carousel.children[carousel.children.length - 2];

    for (let i = 0; i < carousel.children.length; i++) {
        if (
            carousel.children[i].style.display != "none" &&
            !carousel.children[i].classList.contains("carousel-btn")
        ) {
            last_display_item = carousel.children[i];
        }
    }

    last_display_item.style.display = "none";

    carousel.insertBefore(prev_elem, carousel.children[1]);

    prev_elem.style.display = "flex";
};

window.onload = function() {
    // All the functions you want to execute after the page loads go here.
    // For example:
    AddCards();
    CheckSizeAttributes();
    CheckCards();
    AddCarouselButtons();
    ScrollFunction();
    MakeJumbotron();
    SmoothScroll();
    Next();
    Previous();
    // ...

    // Dispatch the resize event at the end
    window.dispatchEvent(new Event('resize'));
};



