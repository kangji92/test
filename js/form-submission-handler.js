(function() {
  // form내 모든 데이터를 가져오고 객체 반환
  function getFormData(form) {
    var elements = form.elements;
    var honeypot;

    var fields = Object.keys(elements).filter(function(k) {
      if (elements[k].name === "blockhoney") {
        honeypot = elements[k].value;
        return false;
      }
      return true;
    }).map(function(k) {
      if(elements[k].name !== undefined) {
        return elements[k].name;
      // special case for Edge's html collection
      } else if(elements[k].length > 0) {
        return elements[k].item(0).name;
      }
    }).filter(function(item, pos, self) {
      return self.indexOf(item) == pos && item;
    });

    var formData = {};
    fields.forEach(function(name){
      var element = elements[name];
      
      // 요소 값
      formData[name] = element.value;

      // 요소에 여러항목이 있을 경우 해당 값 가져오기
      if (element.length) {
        var data = [];
        for (var i = 0; i < element.length; i++) {
          var item = element.item(i);
          if (item.checked || item.selected) {
            data.push(item.value);
          }
        }
        formData[name] = data.join(', ');
      }
    });

    // 데이터에 양식별로 값 추가
    formData.formDataNameOrder = JSON.stringify(fields);
    formData.formGoogleSheetName = form.dataset.sheet || "responses"; // 기본 시트명
    formData.formGoogleSendEmail
      = form.dataset.email || ""; // no email by default

    return {data: formData, honeypot: honeypot};
  }

  function handleFormSubmit(event) {  // handles form submit without any jquery
    
    event.preventDefault();           // we are submitting via xhr below
    var form = event.target;
    var formData = getFormData(form);

    if(formData.company.trim() === "google") {
      return;
    }
    
    var data = formData.data;

    // 필드가 채워지면 스팸봇에 의해 채워졌다고 가정
    if (formData.honeypot) {
      // 메일이 전송되지 않음
      document.getElementById("stay").click();
      // return false;
      return;
    }

    // disableAllButtons(form);
    var baseUrl = "aHR0cHM6Ly9zY3JpcHQuZ29vZ2xlLmNvbS9tYWNyb3Mvcy9BS2Z5Y2J5Z2cwVldKRGVHUG1jS3IzbUtTYzhEeVBiX1VRUV8yd3F1a1JhQmFiZHlDeGY1Q0dHaDRDZW5HVUNvMVhEdVhtN0tRUS9leGVj";
    var url = window.atob(baseUrl);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);

    // xhr.withCredentials = true;

    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {

        // console.log("xhr>>", xhr);

        if (xhr.readyState === 4 && xhr.status === 200) {
          form.reset();

          var formElements = form.querySelector(".form-elements")
          var loading =  document.getElementsByClassName("loading")[0];
          var spinner =  document.getElementById("spinner");

          if (formElements) {
            formElements.style.display = "none"; // hide form
          }
          var thankYouMessage = form.querySelector(".thankyou_message");
          var loading =  document.getElementsByClassName("loading")[0];
          var spinner =  document.getElementById("spinner");
          
          if (thankYouMessage) {
            
            thankYouMessage.style.display = "block";
            loading.style.display = "none";
            spinner.style.display = "none";

            document.getElementById("stay").click();
            
            alert("메일이 전송되었습니다. 확인 후 회신드리겠습니다.");
          }
        }

    };
    // Post형식의 data로 보내기위한 url encode form data
    var encoded = Object.keys(data).map(function(k) {
        return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
    }).join('&');

    xhr.send(encoded);

    var loading = document.getElementsByClassName("loading")[0];
    var spinner = document.getElementById("spinner");
    loading.style.display = "block";
    spinner.style.display = "block";

    document.getElementById("stay").click();
  }
  
  function loaded() {
    // form태그의 submit 이벤트 바인딩 
    var forms = document.querySelectorAll("form.gform");
    for (var i = 0; i < forms.length; i++) {
      forms[i].addEventListener("submit", handleFormSubmit, false);
    }
  };

  document.addEventListener("DOMContentLoaded", loaded, false);

 /* function disableAllButtons(form) {
    var buttons = form.querySelectorAll("button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
  }
  */
})();
