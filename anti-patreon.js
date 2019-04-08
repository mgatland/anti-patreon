"use strict"

const forwardEl = document.querySelector(".pager .forward")
const backEl = document.querySelector(".pager .back")
const pageEls = document.querySelectorAll(".page")

console.log(forwardEl)

let page = 1

const showPage = function () {
  if (page >= pageEls.length) page = pageEls.length
  if (page < 1) page = 1
  let counter = 0
  for (const el of pageEls) {
    counter++
    el.classList.toggle("hidden", counter !== page)
  }
  backEl.classList.toggle("disabled", page === 1)
  forwardEl.classList.toggle("disabled", page === pageEls.length)
  console.log(page)
}

const forward = function (e) {
  if (e) e.preventDefault()
  page++
  showPage()
}

const back = function (e) {
  if (e) e.preventDefault()
  page--
  showPage()
}

forwardEl.addEventListener("click", forward);
backEl.addEventListener("click", back);

showPage()