// for both showfilter and showaddnew it's basically to show/hide the panels whenever the user filters it
function showFilter() {
    let panel = document.getElementById("filterContent");
    // this code allows us to hide the panel is if it visible to us
    if (panel.style.display === "block") {
        panel.style.display= "none";
    } else {
        panel.style.display= "block";
    }
}
// same code and comments above
function showAddNew() {
    let panel = document.getElementById("newContent");
    if (panel.style.display === "block") {
        panel.style.display= "none";
    } else {
        panel.style.display= "block";
    }
}

// this function lets us filter the articles basd on what category we check
function filterArticles() {
    let checkopinion = document.getElementById("opinionCheckbox").checked;
    let checkrecipe = document.getElementById("recipeCheckbox").checked;
    let checkupdate = document.getElementById("updateCheckbox").checked;
    let articles = document.getElementsByTagName("article");
// loops through every article. it shows it already when the user starts the page but when we click it it hides it
    for (let i = 0; i < articles.length; i++) {
        let a = articles[i];
        a.style.display = "block";
    
        if (a.classList.contains("opinion")) {
            if (checkopinion == false) {
                a.style.display = "none";
            }
        } else if (a.classList.contains("recipe")) {
            if (checkrecipe == false) {
                a.style.display = "none";
            }
        } else if (a.classList.contains("update")) {
            if (checkupdate == false) {
                a.style.display = "none";
            }
        }
    }
}

// similar to above, but this time we get to add the article when the user clicks the button. 
function addNewArticle() {
    let header = document.getElementById("inputHeader").value;
    let inputarticle = document.getElementById("inputArticle").value;
    let type = ""; let label = "";

    if (document.getElementById("opinionRadio").checked) {
        type = "opinion";
        label = "Opinion";
    } else if (document.getElementById("recipeRadio").checked) {
        type = "recipe";
        label = "Recipe";
    } else if (document.getElementById("lifeRadio").checked) {
        type = "update";
        label = "Update";
    }

    // all of these let us create the info for the new article
    let article = document.createElement("article");
    article.className = type;
    let tag = document.createElement("span");
    tag.className = "marker";
    tag.innerText = label;
    let heading2 = document.createElement("h2");
    heading2.innerText = header;
    let paragraph = document.createElement("p");
    paragraph.innerText = inputarticle;

    // this adds our information from the new article to the main page
    article.appendChild(tag); article.appendChild(heading2); article.appendChild(paragraph);
    document.getElementById("articleList").appendChild(article);

    let text = ["inputHeader", "inputArticle"];
    for (let i = 0; i < text.length; i++) {
    document.getElementById(text[i]).value = "";
    }
    let buttons = ["opinionRadio", "recipeRadio", "lifeRadio"];
    for (let i = 0; i < buttons.length; i++) {
    document.getElementById(buttons[i]).checked = false;
    }
    filterArticles();
}
