document.addEventListener("DOMContentLoaded", function () {
  //agrega un escuchador y espera que se carge el html

  //--------------------------------------------------------------------------------------------------------------------------------------
  //FORMULARIO
  const formulario = document.getElementById("formulario-contacto"); // busca el id
  if (formulario) {
    formulario.addEventListener("submit", function (event) {     // escucha el boton
      event.preventDefault(); // evita recargar la pagina hasta que se complete el formulario o que se envie con errores

      const nombre = document.getElementById("nombre").value;
      const email = document.getElementById("email").value;
      const mensaje = document.getElementById("mensaje").value;

      if (nombre.trim() === "" && email.trim() === "" && mensaje.trim() === ""){
        mostrarError("Complete el formualrio antes de enviar");
        return;
      } else if (nombre.trim() === "") {
        mostrarError("Por favor, ingresa tu nombre.");
        return;
      } else if (email.trim() === "" ||!email.includes("@") ||!email.includes(".")){
        alert("Hay datos incorrectos en el correo electrónico!");
        return;
      } else if (!mensaje.trim()){
        mostrarError("Te falto el texto del mensaje!");
        return;
      } else {
        mostrarMensaje();
        formulario.reset();
      }
    });

    function mostrarError(mensaje) {
      alert(mensaje);
    }

    function mostrarMensaje() {
      alert("Mensaje enviado! ＼(￣▽￣)／ ");
    }
  }

  //--------------------------------------------------------------------------------------------------------------------------------------
  //AUMENTAR/DISMINUIR TAMAÑO DE TEXTO

  const aumentarBtn = document.getElementById("aumentar");
  const disminuirBtn = document.getElementById("disminuir");

  if (aumentarBtn && disminuirBtn) {
    aumentarBtn.addEventListener("click", function () {
        aumentarTamanoTexto();
    });

    disminuirBtn.addEventListener("click", function () {
        disminuirTamanoTexto();
    });
  }

  function aumentarTamanoTexto() {
    const fontSize = parseInt(window.getComputedStyle(document.body).fontSize);
    const nuevotamañoFuente = fontSize + 2 + "px";

    document.body.style.fontSize = nuevotamañoFuente;
  }

  function disminuirTamanoTexto() {
    const fontSize = parseInt(window.getComputedStyle(document.body).fontSize);
    const nuevotamañoFuente = fontSize - 2 + "px";

    document.body.style.fontSize = nuevotamañoFuente;
  }

  //--------------------------------------------------------------------------------------------------------------------------------------
  //ESCUCHAR LIBRO

  const textoParaLeerBtn = document.querySelectorAll(".textoParaLeer");

  textoParaLeerBtn.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const libro = this.getAttribute("data-libro");
      switch (libro) {
        case "libro1":
          hablar("Yuval Noah Harari aborda los retos y las cuestiones más importantes de nuestra era, desde la tecnología y la política hasta el terrorismo y el cambio climático, ofreciendo un análisis profundo y provocador de la actualidad. del libro 1");
          break;
        case "libro2":
          hablar("Robert Greene desglosa estrategias históricas y contemporáneas sobre cómo alcanzar y mantener el poder, utilizando ejemplos de figuras prominentes y enseñanzas prácticas para cualquier aspirante a líder");
          break;
        case "libro3":
          hablar("Benjamin Graham ofrece una guía exhaustiva para la inversión basada en principios de valor a largo plazo, enseñando a los lectores cómo minimizar riesgos y maximizar ganancias en el mercado de valores");
          break;
        case "libro4":
          hablar("Robin Sharma narra la historia de un abogado de éxito que, tras una crisis personal, emprende un viaje espiritual para encontrar la verdadera felicidad y el propósito de la vida");
          break;
        case "libro5":
          hablar("Tim Harford defiende la idea de que un poco de caos puede ser beneficioso, argumentando que la improvisación y el desorden pueden conducir a la creatividad y la eficiencia");
          break;
        case "libro6":
            hablar("Yuval Noah Harari explora el futuro de la humanidad, anticipando los avances tecnológicos y científicos que podrían redefinir lo que significa ser humano en el próximo milenio");
            break;
        case "libro7":
            hablar("Brian Weiss comparte sus experiencias como psiquiatra que, a través de la hipnosis, descubre las vidas pasadas de sus pacientes, abriendo una ventana a la reencarnación y la continuidad del alma");
            break;
        case "libro8":
            hablar("Robert T. Kiyosaki desafía las creencias tradicionales sobre el dinero, ofreciendo lecciones prácticas sobre cómo alcanzar la independencia financiera y construir riqueza a través de inversiones inteligentes");
            break;
        case "libro9":
            hablar("Napoleon Hill ofrece principios y estrategias inspiradas en historias de éxito empresarial, diseñadas para ayudar a los lectores a alcanzar sus metas financieras y personales");
            break;
        case "libro10":
            hablar("Yuval Noah Harari proporciona una visión amplia de la historia de la humanidad, desde la prehistoria hasta la era moderna, explorando cómo nuestra especie ha evolucionado y dominado el planeta");
            break; 
        case "libro11":
            hablar("Mark Manson desafía las normas tradicionales de autoayuda, promoviendo la honestidad brutal y la aceptación de las limitaciones como el camino hacia una vida más auténtica y significativa");
            break; 
        case "libro12":
            hablar("Peter Lynch ofrece consejos prácticos sobre cómo los inversores individuales pueden utilizar sus conocimientos y observaciones cotidianas para identificar y aprovechar oportunidades en el mercado de valores");
            break; 
      }
    });
  });


    function hablar(texto) {
        const speech = new SpeechSynthesisUtterance(texto);
        speech.lang = "es-ES";
        window.speechSynthesis.speak(speech);
    }


   //--------------------------------------------------------------------------------------------------------------------------------------
  // MARCAR & NOTA

  const botonesMarcador = document.querySelectorAll(".marcador");

  botonesMarcador.forEach(function(boton) {
      let libroId = boton.getAttribute("data-libro");
      let marcadoSN = localStorage.getItem("marcador" + libroId) === "true";

      if (marcadoSN) { // Verifica al cargar el estado del marcador
        boton.style.backgroundImage = 'url("img/marcaSi.png")';
      } else {
        boton.style.backgroundImage = 'url("img/marcaNo.png")';
      }

      boton.addEventListener("click", function() { 
          let libroId = this.getAttribute("data-libro");

          if (this.classList.contains("marcado")) {
              this.classList.remove("marcado");
              localStorage.setItem("marcador" + libroId, "false");
              this.style.backgroundImage = 'url("img/marcaNo.png")'; 
          } else {
              this.classList.add("marcado");
              localStorage.setItem("marcador" + libroId, "true");
              this.style.backgroundImage = 'url("img/marcaSi.png")';
              this.setAttribute("aria-label", "Desmarcar"); 
          }
      });
  });


    const notas = document.querySelectorAll("textarea[id^='nota']");
    const botonesGuardar = document.querySelectorAll("button[id^='salvarNota']");
    const botonesEliminar = document.querySelectorAll("button[id^='eliminarNota']");

    for (let i = 0; i < notas.length; i++) {
        let nota = notas[i];
        let guardar = botonesGuardar[i];
        let eliminar = botonesEliminar[i];

        let libroId = nota.id.replace("nota", "");

        let savedNote = localStorage.getItem("nota" + libroId);
        if (savedNote) {
            nota.value = savedNote;
        }

        guardar.addEventListener("click", function () {
            localStorage.setItem("nota" + libroId, nota.value);
            alert("Nota guardada!");
        });

        eliminar.addEventListener("click", function () {
            localStorage.removeItem("nota" + libroId);
            nota.value = "";
            alert("Nota eliminada!");
        });
    }


}); //fin
