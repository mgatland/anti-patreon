"use strict"

//////// pager for goals

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

//////// social share popup windows

//https://jonsuh.com/blog/social-share-links/

function windowPopup(url, width, height) {
  // Calculate the position of the popup so
  // it’s centered on the screen.
  var left = (screen.width / 2) - (width / 2),
      top = (screen.height / 2) - (height / 2);

  window.open(
    url,
    "",
    "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=" + width + ",height=" + height + ",top=" + top + ",left=" + left
  );
}

const jsSocialShares = document.querySelectorAll(".js-social-share");
if (jsSocialShares) {
  [].forEach.call(jsSocialShares, function(anchor) {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      windowPopup(this.href, 500, 300);
    });
  });
}

// payment too low error handling

const paymentTooLowButtonEl = document.querySelector(".js-payment-too-low-button")
const paymentTooLowErrorEl = document.querySelector(".js-payment-too-low-error")

paymentTooLowButtonEl.addEventListener("click", function (e) {
  e.preventDefault()
  paymentTooLowErrorEl.classList.remove("hidden")
  paymentTooLowButtonEl.disabled = true
})