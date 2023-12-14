"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const form = this.getElementById("form");
  form.addEventListener("submit", formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);
    formData.append("image", formImage.files[0]);

    if (error === 0) {
      form.classList.add("_sending");
      let response = await fetch("sendmail.php", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        let result = await response.json();
        alert(result.message);
        formPreview.innerHTML = "";
        form.reset();
        form.classList.remove("_sending");
      } else {
        alert("Error");
        form.classList.remove("_sending");
      }
    } else {
      alert("Complete application");
    }
  }

  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll("._req");

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);

      if (input.classList.contains("_email")) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
        }
      } else if (
        input.getAttribute("type") === "checkbox" &&
        input.checked === false
      ) {
        formAddError(input);
        error++;
      } else {
        if (input.value === "") {
          formAddError(input);
          error++;
        }
      }
    }
    return error;
  }
  function formAddError(input) {
    input.parentElement.classList.add("_error");
    input.classList.add("_error");
  }
  function formRemoveError(input) {
    input.parentElement.classList.remove("_error");
    input.classList.remove("_error");
  }

  // Function test e-mail
  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+(\.\w{2,8})+$/.test(input.value);
  }

  //  Get input file to variable
  const formImage = document.getElementById("formImage");
  const formPreview = document.getElementById("formPreview");

  // Listen change in input file
  formImage.addEventListener("change", () => {
    uploadFile(formImage.files[0]);
  });
  function uploadFile(file) {
    if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
      alert("Permission only images.");
      formImage.value = "";
      return;
    }
    // Check size file's (< 2 Mb)
    if (file.size > 2 * 1024 * 1024) {
      alert("File possible less then 2 Mb");
      return;
    }

    let reader = new FileReader();
    reader.onload = function (e) {
      formPreview.innerHTML = `<img src="${e.target.result}" alt="Image">`;
    };
    reader.onerror = function (e) {
      alert("Something wrong!");
    };
    reader.readAsDataURL(file);
  }
});
