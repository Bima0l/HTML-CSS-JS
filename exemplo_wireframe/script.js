document.getElementById("btnAction").addEventListener("click", function(){alert("Ação de clique realizada!");});

document.getElementById("btnMenu").addEventListener("click", function(){const menuList= document.querySelector(".menu-List");menuList,classList.toggle("show-menu");});

document.querySelector("form").addEventListener("submit", fuction(Event) {Event.preventDefault(); const nome= document.getElementById("nome").value; const email=document.getElementById("email").value; alert('Formulário enviado!\nNome: ${nome}\nEmail:${email}');});