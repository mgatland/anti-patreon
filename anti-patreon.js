"use strict"

// Archive warning button 
document.querySelector(".close-cross").addEventListener('click', function (e) {
  e.target.parentElement.style.display = "none"
})

//////// pager for goals
function createGoalPager (startPage) {
  const forwardEl = document.querySelector(".pager .forward")
  const backEl = document.querySelector(".pager .back")
  const pageEls = document.querySelectorAll(".page")

  console.log(forwardEl)

  let page = startPage

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
}

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

//Goals information

function makeGoal(cost, text) {
  return {cost, text}
}

const goals = [
  makeGoal(30, "This would cost me a nice meal and drink with my partner. It's not going to ruin my life but it will be somewhat frustrating."),
  makeGoal(200, "This is a week's rent! Losing this each month would put me in serious financial peril. Better keep those games coming!"),
  makeGoal(500, "Wow. There goes my flights, accomodation and tickets to the New Zealand Games Festival. If I miss a deadline at this tier, I'll have to cancel some travel plans and other big-ticket luxuries."),
  makeGoal(1000, "I can't afford this. Even one failure would be catastrophic. What have I done?"),
]

function makeGoalEls(currentAmount) {
  const pagesEl = document.querySelector(".pages")
  pagesEl.innerHTML = ""
  let page = 1
  for(const goal of goals) {
    const current = Math.min(currentAmount, goal.cost)
    const percent = current * 100 / goal.cost

    let progressText = ""
    if (current === goal.cost) {
      progressText = `-$${current} <span class="primary">(reached!)</span>`
    } else {
      progressText = `-$${current} of -$${goal.cost}`
    }

    const el = `
    <div class="page hidden">
      <h6>${progressText} <span class="smol">per missed deadline</span></h6>
      <div class="progress">
        <div class="progressFilled" style="width:${percent}%;"></div>
      </div>
      <p>${goal.text}</p><br>
      <p class="smol">${page} of ${goals.length}</p>
    </div>
    `
    pagesEl.innerHTML += el
    page++
  }
  let startPage = goals.findIndex(goal => goal.cost > currentAmount)
  if (startPage === -1) startPage = goals.length - 1
  createGoalPager(startPage + 1)
}

//retrieve live data

function getData() {
  //fetch('https://8n1sxrl4ci.execute-api.ap-southeast-2.amazonaws.com/default/addAntiPatron')
  //.then(response => response.text())
  Promise.resolve(123)
  .then (text => {
    const antiPatrons = parseInt(text)
    const antiMoney = antiPatrons * 5
    document.querySelector(".js-patron-count").innerText = antiPatrons
    document.querySelector(".js-money-count").innerText = "-$" + antiMoney

    //goals
    makeGoalEls(antiMoney)
  })
}

//setTimeout(getData, 1000)
getData()

const onlyShowWhenScrolledEl = document.querySelector('.onlyShowWhenScrolled')

// The sticky title header appears when you scroll past the hero image
function handleIntersect(entries, observer) {
  const ratio = entries[0].intersectionRatio
  console.log(ratio)
  onlyShowWhenScrolledEl.classList.toggle("hidden", ratio > 0.01)

}

const triggerEl = document.querySelector(".banner")

function createObserver() {
  var observer

  var options = {
    root: null,
    rootMargin: "-64px 0px 0px 0px", //matches the height of the always-on sticky header
    threshold: 0.01,
  }

  observer = new IntersectionObserver(handleIntersect, options)
  observer.observe(triggerEl)
}

createObserver()