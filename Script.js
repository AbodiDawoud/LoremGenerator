// Constants for tag options
const tags = ["p", "span", "h1", "h2", "h3", "h4", "h5", "h6"];
let icon = {
    success:
        '<span class="material-symbols-outlined">task_alt</span>',
    error:
        '<span class="material-symbols-outlined">error</span>',
    warning:
        '<span class="material-symbols-outlined">warning</span>',
    info:
        '<span class="material-symbols-outlined">info</span>',
};

// Get DOM elements 
const optionsContainer = document.querySelector(".options");
const outputContainer = document.querySelector(".output");
const tagsSelect = document.getElementById("tags");

// Get DOM sliders, indicators
const paragraphsSlider = document.getElementById("paragraphs");
const wordsSlider = document.getElementById("words");
const paragraphsValue = document.getElementById("paragraphsValue");
const wordsValue = document.getElementById("wordsValue"); 


//<----------------------------[ Functionality ]---------------------------->

//Set sliders fill and text values
paragraphsSlider.addEventListener("input", (event) => {
    const tempSliderValue = event.target.value;
    paragraphsValue.textContent = tempSliderValue;
    const progress = (tempSliderValue / paragraphsSlider.max) * 100;
    paragraphsSlider.style.background = `linear-gradient(to right, #49FF76 ${progress}%, #ccc ${progress}%)`;
});
wordsSlider.addEventListener("input", (event) => {
    const tempValue = event.target.value;
    wordsValue.textContent = tempValue;
    const progress = (tempValue / wordsSlider.max) * 100;
    wordsSlider.style.background = `linear-gradient(to right, #49FF76 ${progress}%, #ccc ${progress}%)`;
});
function progressScript() {
    wordsSlider.style.background = `linear-gradient(to right, #49FF76 ${wordsSlider.value}%, #ccc ${wordsSlider.value}%)`;
}

// Create Options UI 
function CreateOptionsUI() {
    tags.forEach((tag) => {
        var option = document.createElement("option");
        option.value = tag;
        option.textContent = `<${tag}>`;
        tagsSelect.appendChild(option);
    });

    progressScript();

    const generateButton = document.getElementById("generate");
    generateButton.addEventListener("click", generateLoremIpsum);
}

// Generate and display lorem text 
function generateLoremIpsum() {
    const paragraphs = parseInt(paragraphsSlider.value);
    const tag = tagsSelect.value;
    const includeHtml = document.getElementById("include").value;
    const wordsPP = parseInt(wordsSlider.value);

    var text = generateText(paragraphs, tag, includeHtml, wordsPP);

    //Display the generated text
    outputContainer.innerHTML = text;

    //Display toast message
    showToastNotification("Successfully generated lorem text", 4, "success")
}

// Function to generate Lorem Ipsum text
function generateText(paragraphs, tag, includeHtml, wordsPerParagraph) {
    // Create an array of paragraphs 
    const loremIpsumArray = new Array(paragraphs).fill("");

    // Generate words for each paragraph 
    for (let i = 0; i < paragraphs; i++) {
        const words = generateWords(wordsPerParagraph);
        loremIpsumArray[i] = includeHtml === "Yes" ? `<${tag}>${words}</${tag}>` : words;
    }

    // Join paragraphs into a single string 
    return loremIpsumArray.join("\n");
}

// Function to generate a specified number of words 
function generateWords(wordNum) {
    // Lorem Ipsum text for demonstration purposes 
    const loremIpsumText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam in arcu cursus euismod quis viverra nibh. Nunc aliquet bibendum enim facilisis gravida neque convallis a cras. Sagittis purus sit amet volutpat Consequat mauris. Duis ultricies lacus sed turpis tincidunt id. Consequat interdum varius sit amet mattis vulputate. Enim sed faucibus turpis in eu. Ridiculus mus mauris vitae ultricies leo integer malesuada nunc vel. Nulla pharetra diam sit amet nisl suscipit. Lobortis elementum nibh tellus molestie nunc non blandit massa enim. Dis parturient montes nascetur ridiculus mus. Justo nec ultrices dui sapien eget. Enim tortor at auctor urna nunc. Dictumst quisque sagittis purus sit amet volutpat consequat mauris nunc.";

    // Split the Lorem Ipsum text into words 
    const words = loremIpsumText.split(" ");

    return words.slice(0, wordNum).join(" ");
}

// Function to generate a toast message
function showToastNotification(message, duration, type) {
    if (!Object.keys(icon).includes(type))
        type = "info";

    let box = document.createElement("div");
    box.classList.add("toast", `toast-${type}`);
    box.innerHTML = `<div class="toast-content-wrapper">
                    <div class="toast-icon">${icon[type]}</div>
                    <div class="toast-message">${message}</div>
                    <div class="toast-progress"></div>
                    </div>`;
    duration = duration || 5;
    box.querySelector(".toast-progress").style.animationDuration = `${duration}s`;

    let isAlreadyVisiable = document.body.querySelector(".toast");
    if (isAlreadyVisiable)
        isAlreadyVisiable.remove();
    document.body.appendChild(box);
}

CreateOptionsUI();
