let articleSelected

const ls = localStorage,
d = document,
$articlesDiv = d.querySelector(".articles"),
$createArticleBtn = d.querySelector(".create-article"),
$createArticleForm = d.querySelector(".create-article-form"),
$goUp = d.querySelector(".go-up"),
$completeArticle = d.querySelector(".complete-article"),
$cancelBtn = d.querySelector(".cancel"),
$createBtn = d.querySelector(".create"),

getArticles = () => {
  let articleArr = []
  if(ls.getItem("articles") == undefined) ls.setItem("articles", JSON.stringify(articleArr))

  let returnArticles = localStorage.getItem("articles")
  return JSON.parse(returnArticles)
}

let articles = getArticles(),
$articleDiv= d.querySelectorAll(".article"),
firstTime = true

const createArticle = (title, description, image, text) => {
  articles.push(new Article(title, description, image, text))
  ls.setItem("articles", JSON.stringify(articles))
}

class Article{
  constructor(title, description, image, text){
    this.title = title
    this.description = description
    this.image = image
    this.text = text
  }
}

/*Imprimir articulos en pantalla*/

const createArticleMarkup = (article) => {

  /*Crear etiquieta*/

  const $div = d.createElement("div"),
  $textDiv =  d.createElement("div"),
  $title = d.createElement("h2"),
  $text =  d.createElement("p"),
  $image =  d.createElement("img")

  $textDiv.classList.add("text")

  $textDiv.appendChild($title)
  $textDiv.appendChild($text)
  $div.appendChild($textDiv)
  $div.appendChild($image)

  $div.classList.add("article")

  /*Introducir valores*/

  $title.textContent = article.title
  $text.textContent = article.description
  $image.setAttribute("src", article.image)

  /*Insertar en HTML*/

  $articlesDiv.appendChild($div)

  $articleDiv= d.querySelectorAll(".article")
}

/*Diseñar articulos*/

$createArticleBtn.addEventListener("click", e => {
  $goUp.classList.add("is-active")
  $createArticleForm.classList.add("overflow-hidden")
  setTimeout(() => {
    $createArticleForm.classList.remove("overflow-hidden")
    $createArticleForm.classList.add("is-active")
  }, 1000);
})

/*Mostrar articulos al hacer click*/

const $articleTitle = d.querySelector(".complete-article h2"),
$articleDescription = d.querySelector(".description"),
$articleContent = d.querySelector(".content"),
$articleImg = d.querySelector(".complete-article img")

const configNewArticles = () => {
$articleDiv.forEach((el, index) => {
  el.addEventListener("click", e=> {
    articles = getArticles()

    articleSelected = index

    const article = articles[index]

    $articleTitle.textContent = article.title
    $articleDescription.textContent = article.description
    $articleContent.textContent = article.text
    $articleImg.setAttribute("src", article.image)

    $createArticleForm.classList.add("overflow-hidden")
    $goUp.classList.add("is-active")
    setTimeout(() => {
      $completeArticle.classList.add("is-active-article")
    }, 1000);
  })
})
}

/*Botones*/

$cancelBtn.addEventListener("click", e => {
  $createArticleForm.classList.remove("is-active")
    $goUp.classList.remove("is-active")
    d.querySelector(".form-title").value = ""
  d.querySelector(".form-image").value = ""
  d.querySelector(".form-description").value = ""
  d.querySelector(".form-content").value = ""
})

$createBtn.addEventListener("click", e => {
  const title = d.querySelector(".form-title").value,
  image = d.querySelector(".form-image").value,
  description = d.querySelector(".form-description").value,
  content = d.querySelector(".form-content").value
  createArticle(title, description, image, content)

  $createArticleForm.classList.remove("is-active")
    $goUp.classList.remove("is-active")

  d.querySelector(".form-title").value = ""
  d.querySelector(".form-image").value = ""
  d.querySelector(".form-description").value = ""
  d.querySelector(".form-content").value = ""
  showArticles()
  configNewArticles()
})

const showArticles = () =>{
  if (firstTime) {
    articles.forEach(el => {
    createArticleMarkup(el)
    configNewArticles()
  })
    firstTime = false
  }
  else {
    for (let i = 1; i < (articles.length); i++) {
    $articlesDiv.removeChild($articlesDiv.lastChild)}
    articles.forEach(el => {
    createArticleMarkup(el)
  })
  
  }
}

const $deleteArticle = d.querySelector(".delete")

$deleteArticle.addEventListener("click", e => {
  console.log(articles);
  articles.splice(articleSelected, 1)
  console.log(articles);
  ls.setItem("articles", JSON.stringify(articles))
  for (let i = -1; i < (articles.length); i++) {
    $articlesDiv.removeChild($articlesDiv.lastChild)}
  showArticles()
  configNewArticles()
  $completeArticle.classList.remove("is-active-article")
  $goUp.classList.remove("is-active")
  
})

showArticles()

/*Go back*/

const $goBackBtn = d.querySelector(".go-back")

$goBackBtn.addEventListener("click", e => {
  $completeArticle.classList.remove("is-active-article")
  $goUp.classList.remove("is-active")
})