function showFilter() {
    let panel = document.getElementById("filterContent");

    if (panel.style.display === "block") {
        panel.style.display = "none";
    } else {
        panel.style.display = "block";
    }
}

function showAddNew() {
    let panel = document.getElementById("newContent");

    if (panel.style.display === "block") {
        panel.style.display = "none";
    } else {
        panel.style.display = "block";
    }
}


function filterArticles() {
    let showOpinion = document.getElementById("opinionCheckbox").checked;
    let showRecipe = document.getElementById("recipeCheckbox").checked;
    let showUpdate = document.getElementById("updateCheckbox").checked;

    let articles = document.getElementsByTagName("article");

    for (let i = 0; i < articles.length; i++) {
        let a = articles[i];
        a.style.display = "block";
    
        if (a.classList.contains("opinion")) {
            if (showOpinion == false) {
                a.style.display = "none";
            }
        } else if (a.classList.contains("recipe")) {
            if (showRecipe == false) {
                a.style.display = "none";
            }
        } else if (a.classList.contains("update")) {
            if (showUpdate == false) {
                a.style.display = "none";
            }
        }
    }
}

function addNewArticle() {
    let title = document.getElementById("inputHeader").value;
    let bodyText = document.getElementById("inputArticle").value;
    let category = "";
    let label = "";

    if (document.getElementById("opinionRadio").checked) {
        category = "opinion";
        label = "Opinion";
    } else if (document.getElementById("recipeRadio").checked) {
        category = "recipe";
        label = "Recipe";
    } else if (document.getElementById("lifeRadio").checked) {
        category = "update";
        label = "Update";
    }

    if (title.length < 1 || bodyText.length < 1 || category.length < 1) {
        alert("Please fill in all required fields.");
        return;
    }

    let article = document.createElement("article");
    article.className = category;

    let tag = document.createElement("span");
    tag.className = "marker";
    tag.innerText = label;

    let heading = document.createElement("h2");
    heading.innerText = title;

    let para = document.createElement("p");
    para.innerText = bodyText;

    article.appendChild(tag);
    article.appendChild(heading);
    article.appendChild(para);

    document.getElementById("articleList").appendChild(article);

    let textFields = ["inputHeader", "inputArticle"];
    
    for (let i = 0; i < textFields.length; i++) {
    document.getElementById(textFields[i]).value = "";
    }
    
    let radioButtons = ["opinionRadio", "recipeRadio", "lifeRadio"];
    for (let i = 0; i < radioButtons.length; i++) {
    document.getElementById(radioButtons[i]).checked = false;
    }

    filterArticles();
}
