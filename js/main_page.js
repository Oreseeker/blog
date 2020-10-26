function getPageArticles(data, page) {
    /* Function process the whole bunch of articles stored in data variable
    and selects only those that present on the page with the number of articles
    per page defined by inner variable "perPage". */
    const perPage = 5; // number of articles per page
    const articlesOnPage = data.filter(element => {
        const idx = element.id;
        return idx > perPage * (page - 1) && idx <= perPage * page;
    });
    return articlesOnPage;
}

function sortArticles(articles, key) {
    /* Function sorts articles by the given key. */
    const localArticles = Object.assign([], articles);
    switch(key) {
        case "reversed-id":
            localArticles.sort((el1, el2) => el2.id - el1.id);
            break;
        case "id":
            localArticles.sort((el1, el2) => el1.id - el2.id);
            break;
    }
    return localArticles;
}

function displaySingleArticle(article) {
    /* Function cretes a DOM node with data article on the main page. */
    const template = `
    <article class="article-preview">
        <h2>${article.title}</h2>
        <p>
            ${article.description}
        </p>
        <a href="#" class="read-more">Read more</a>
    </article>
    `;
    const articleWrapper = document.querySelector(".article-preview-wrapper");
    const articleElement = document.createElement("article");
    articleElement.classList.toggle("article-preview");
    articleElement.innerHTML = template;
    articleWrapper.appendChild(articleElement);
}

function displayAllArticlesOnPage(articles, page) {
    /* Function creates DOM nodes for each article with corresponding data. */
    const articlesOnPage = getPageArticles(articles, page);
    for (let idx = 0; idx < articlesOnPage.length; idx++) {
        displaySingleArticle(articlesOnPage[idx]);
    }
}

function displayRecentPosts(articles) {
    /* Function creates DOM nodes for recent posts section filled
       with the data about recent posts */
    const numberOfRecentPosts = 5;
    const lowerIndex = articles.length - 1 - numberOfRecentPosts;
    const upperIndex = articles.length - 1;
    const recentArticles = articles.slice(lowerIndex, upperIndex+1).reverse();
    console.log(recentArticles);
    const recentPosts = document.querySelector("#recent-posts");
    const lst = document.createElement("ul");
    lst.classList.toggle("unmarked-list");
    recentPosts.appendChild(lst);
    for (let i = 0; i < Math.min(numberOfRecentPosts, recentArticles.length); i++) {
        const item = document.createElement("li");
        item.innerHTML = recentArticles[i].title;
        lst.appendChild(item);
    }
}

function main() {
    let articles = null;
    let sortedArticles = null;
    const promise = new Promise(function (resolve, reject) {
        const request = new XMLHttpRequest();
        request.open("GET", "http://localhost:3000/articles")
        request.setRequestHeader("content-type", "application/json");
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                articles = JSON.parse(request.responseText);
                sortedArticles = sortArticles(articles, "reversed-id");
                // alert("OK");
                resolve();
            }
        };
        request.send();
    })
    .then(() => {
        displayAllArticlesOnPage(sortedArticles, 1);
        displayRecentPosts(articles);
    });
}

main();
