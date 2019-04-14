
const inputEls = [...document.querySelectorAll("input")]
const submitEl = document.querySelector("form button")
const emailEl = document.querySelector("#email")
const emailRepeatEl = document.querySelector(".js-repeat-email")

function updateOnInput(e) {
  if (e.target === emailEl || e.target === emailRepeatEl) {
    const realEmail = email.value
    emailRepeatEl.setCustomValidity(emailRepeatEl.value === realEmail ? "" : "Does not match")
    if (e.target !== emailRepeatEl) {
      //got to display its error message
      onBlur({target: emailRepeatEl})
    }
  }
  const isValidForm = inputEls.every(el => el.validity.valid)
  submitEl.disabled = !isValidForm
}

function getErrorEl(e) {
  return e.target.parentElement.querySelector(".error")
}

function onBlur (e) {
  e.target.classList.add("validate")
  const errorEl = getErrorEl(e)
  errorEl.classList.toggle("hidden", e.target.validity.valid)
}

function onFocus (e) {
  e.target.classList.remove("validate")
  getErrorEl(e).classList.add("hidden")
}

const textEls = inputEls.filter(el => el.type !== "checkbox")

textEls.forEach(el => el.addEventListener("blur", onBlur))

textEls.forEach(el => el.addEventListener("focus", onFocus))

textEls.forEach(el => el.addEventListener("input", updateOnInput))

const checkboxEls = inputEls.filter(el => el.type === "checkbox")

function checkboxUpdate (e) {
  onBlur(e) //show errors (never hidden for checkbox)
  updateOnInput(e) //update submit button
}

checkboxEls.forEach(el => el.addEventListener("input", checkboxUpdate))
checkboxEls.forEach(el => el.addEventListener("blur", checkboxUpdate))

//terms of use

const termsButtonEl = document.querySelector(".js-terms-button")
const termsEl = document.querySelector(".js-terms")

termsButtonEl.addEventListener("click", function (e) {
  e.preventDefault()
  termsEl.classList.toggle("hidden")
})


//emergency virality protection

function getData() {
  fetch('https://8n1sxrl4ci.execute-api.ap-southeast-2.amazonaws.com/default/addAntiPatron')
  .then(response => response.text())
  .then (text => {
    const antiPatrons = parseInt(text)
    if (antiPatrons >= 200) {
      document.querySelector('.js-real-form').innerHTML = 
      `
      <h1 class="primary">Sorry! This has become a bit ridiculous so I'm not taking any more sign ups.</h1>
      `
    }
  })
}

getData()