//DOM Queries:
const switchForm = document.querySelector(".theme-box-switchbox");
var theme = localStorage.getItem("config");

//eventListener. Listens for a change in checked property of the radio buttons form. When changes, triggers the arrow function defined.
//theme.target (event.target) grabs the target HTML element that triggered the event. Then, if you add .value, you are saying you want to grab the value
//attribute of the HTML element that triggered the event listener. The value is a string (typeof is the same as the value property for the element).
switchForm.addEventListener("change", (theme) => {
  changeTheme(theme.target.value);
});

const changeTheme = (stringValue) => {
  const inputs = document.querySelectorAll("input"); // nodeList containing inputs
  const all = document.querySelector(".everything"); //everything class wrapper is used to change the theme.
  //const tryingRoot = document.querySelector(":root"); and you can select :root pseudoclass to, to change the theme.

  switch (stringValue) {
    case "1":
      if (inputs[1].hasAttribute("checked") === true) {
        inputs[1].removeAttribute("checked");
        all.classList.remove("theme-2");
      } else {
        inputs[2].removeAttribute("checked");
        all.classList.remove("theme-3");
      }
      break;
    case "2":
      if (inputs[0].hasAttribute("checked") === true) {
        inputs[0].removeAttribute("checked");
      } else {
        inputs[2].removeAttribute("checked");
        all.classList.remove("theme-3");
      }
      break;
    case "3":
      if (inputs[0].hasAttribute("checked") === true) {
        inputs[0].removeAttribute("checked");
      } else {
        inputs[1].removeAttribute("checked");
        all.classList.remove("theme-2");
      }
      break;
    default:
      return;
  }

  all.classList.add("theme-" + stringValue);
  inputs[stringValue - 1].setAttribute("checked", true);
  theme = localStorage.setItem("config", stringValue);
};

changeTheme(theme);
