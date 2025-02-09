$(document).ready(() => {
  $("#iniciar-sesion").on("click", () => {
    $(".acceso").slideUp(250);

    $(".cuenta").css({ display: "flex" });
    $(".cuenta-login").css({ display: "flex" });
  });

  // Comprobacion del contenido de los inputs de inicio de sesion para controlar el disabled del boton de inicio de sesion en el apartado cuenta
  $("#nombre-login").on("input", () => {
    enableButton();
  });
  $("#password-login").on("input", () => {
    enableButton();
  });

  function enableButton() {
    let nombre = $("#nombre-login");
    let password = $("#password-login");
    let loginBtn = $("#login");
    if (nombre.val().trim() != "" && password.val().trim() != "") {
      loginBtn.removeAttr("disabled");
      loginBtn.addClass("enabledBtn");
    } else {
      loginBtn.attr("disabled");
      loginBtn.addClass("disabledBtn");
    }
  }

  // Mostrar el la seccion para elegir el tipo de cuenta que vamos a crear
  $("#crear-cuenta").on("click", () => {
    $(".acceso").fadeOut(100, () => {
      $(this).css({ display: "none" });
    });

    $(".cuenta").fadeIn(1000);
    $(".cuenta").css({ display: "flex" });
    $(".cuenta-nueva").css({ display: "grid" });
  });

  // Mostrar formulario nueva cuenta proveedor
  $("#proveedor").on("click", () => {
    $(".cuenta").fadeOut(300, () => {
      $(".crear-cuenta-proveedor").css({ display: "flex" });
    });
  });

  // Mostrar formulario nueva cuenta proveedor
  $("#cliente").on("click", () => {
    $(".cuenta").fadeOut(300, () => {
      $(".crear-cuenta-cliente").css({ display: "flex" });
    });
  });
  // Control del focus en los campos del formulario
  $(".input input").on("focus", function () {
    let element = $(this);
    let parentDiv = element.closest(".input");

    parentDiv.css({
      border: "2px solid #3c3c3c",
    });
  });

  // Control de blur en campos del formulario
  $(".input input").on("blur", function () {
    let element = $(this);
    let parentDiv = element.closest(".input");
    let errorMsg = element.closest(".input-field").find(".campoVacioMsg");

    if (element.val().trim() === "" || element.val() === null) {
      parentDiv.css({
        "background-color": "rgba(255, 0, 0, 0.1)",
        border: "2px solid red",
      });
      errorMsg.show();
    } else {
      parentDiv.css({
        "background-color": "",
        border: "",
      });
      errorMsg.hide();
    }
  });

  // Select fecha nacimiento
  let currentYear = new Date().getFullYear();

  for (let i = currentYear; i >= 1900; i--) {
    $("#year").append(`<option value="${i}">${i}</option>`);
  }

  // Función para actualizar los días según el mes y el año
  function updateDays() {
    let year = $("#year").val();
    let month = $("#month").val();
    let daysInMonth = new Date(year, month, 0).getDate();

    $("#day").empty();
    for (let i = 1; i <= daysInMonth; i++) {
      $("#day").append(`<option value="${i}">${i}</option>`);
    }
  }

  updateDays();
  $("#year, #month").on("change", updateDays);

  // Cambio estado check
  let checkbox = $("#terminos");
  checkbox.on("click", () => {
    checkbox.toggleClass("checked not-checked");
  });

  $("#nombre, #correo, #password, #confirmar-password, #terminos").on(
    "input change",
    function () {
      enableCrearButton();
    }
  );

  // Función para habilitar/deshabilitar el botón de crear cuenta
  function enableCrearButton() {
    function setupValidation(formSelector) {
      // Tomamos el formulario como objeto jQuery
      let $form = $(formSelector);

      // Función que valida el formulario y actualiza el estado del botón
      function validateForm() {
        // Usamos selectores relativos al formulario
        let nombre = $form.find("#nombre").val().trim();
        let correo = $form.find("#correo").val().trim();
        let password = $form.find("#password").val().trim();
        let confirmarPassword = $form.find("#confirmar-password").val().trim();
        let checkboxChecked = $form.find("#terminos").prop("checked");
        let $btn = $form.find("#crearBtn");

        let isFilled =
          nombre !== "" &&
          correo !== "" &&
          password !== "" &&
          confirmarPassword !== "";
        let isPasswordValid = password === confirmarPassword;

        // Mostrar mensaje de error si las contraseñas no coinciden
        if (!isPasswordValid) {
          $form.find("#validPassword").show();
        } else {
          $form.find("#validPassword").hide();
        }

        if (isFilled && isPasswordValid && checkboxChecked) {
          $btn
            .removeClass("disabledBtn")
            .addClass("enabledBtn")
            .prop("disabled", false);
        } else {
          $btn
            .removeClass("enabledBtn")
            .addClass("disabledBtn")
            .prop("disabled", true);
        }
      }

      // Asignar eventos para actualizar la validación
      $form.on("input change", function () {
        validateForm();
      });

      // Asignar eventos de focus y blur para estilos en inputs
      $form.find(".input input").on("focus", function () {
        $(this).closest(".input").css({ border: "2px solid #3c3c3c" });
      });
      $form.find(".input input").on("blur", function () {
        let $input = $(this);
        let $parent = $input.closest(".input");
        let $errorMsg = $input.closest(".input-field").find(".campoVacioMsg");
        if ($input.val().trim() === "") {
          $parent.css({
            "background-color": "rgba(255,0,0,0.1)",
            border: "2px solid red",
          });
          $errorMsg.show();
        } else {
          $parent.css({ "background-color": "", border: "" });
          $errorMsg.hide();
        }
      });

      // Alternar visibilidad de la contraseña (botón "eye")
      $form.find(".eye").on("click", function () {
        let $inputField = $(this).siblings("input");
        let isPassword = $inputField.attr("type") === "password";
        $inputField.attr("type", isPassword ? "text" : "password");
        $(this).attr(
          "src",
          isPassword ? "./img/eye-solid.svg" : "./img/eye-slash-solid.svg"
        );
      });

      // Manejar el estado del checkbox (alternar clases)
      $form.find("#terminos").on("click", function () {
        let $checkbox = $(this);
        if ($checkbox.prop("checked")) {
          $checkbox.removeClass("not-checked").addClass("checked");
        } else {
          $checkbox.removeClass("checked").addClass("not-checked");
        }
        validateForm();
      });

      // Ejecutar la validación inicial al cargar el formulario
      validateForm();
    }

    // Ahora, aplica la validación a ambos formularios
    // Asumiendo que los formularios tienen la clase "crear-cuenta-form"
    // Y que, en cada uno, los IDs son los mismos: #nombre, #correo, #password, #confirmar-password, #terminos, #crearBtn, #validPassword
    setupValidation(".crear-cuenta-proveedor");
    setupValidation(".crear-cuenta-cliente");
  }

  // Verificar contraseñas para mostrar el mensaje si no son iguales
  $(".input input").on("blur", function () {
    let password = $("#password");
    let confirmarContraseña = $("#confirmar-password");
    let validPasswordMsg = $("#validPassword");
    if (password.val() !== confirmarContraseña.val()) {
      validPasswordMsg.show();
    } else {
      validPasswordMsg.hide();
    }
  });

  $("#password, #confirmar-password").on("input", function () {
    let password = $("#password");
    let confirmarContraseña = $("#confirmar-password");
    let validPasswordMsg = $("#validPassword");
    if (password.val() !== confirmarContraseña.val()) {
      console.log(password.val() !== confirmarContraseña.val());
      validPasswordMsg.show();
    } else {
      validPasswordMsg.hide();
    }
  });

  // Cambio de estado del checkbox
  $("#terminos").on("click", function () {
    let $checkbox = $(this);
    console.log("Estado del checkbox:", $checkbox.prop("checked"));
    if ($checkbox.prop("checked")) {
      $checkbox.removeClass("not-checked").addClass("checked");
    } else {
      $checkbox.removeClass("checked").addClass("not-checked");
    }
    enableCrearButton();
  });

  $(".eye").on("click", function () {
    let inputField = $(this).siblings("input");
    let isPassword = inputField.attr("type") === "password";

    if (isPassword) {
      inputField.attr("type", "text");
      $(this).attr("src", "./img/eye-solid.svg");
    } else {
      inputField.attr("type", "password");
      $(this).attr("src", "./img/eye-slash-solid.svg");
    }
  });

  $(document).on("click", "#crearBtn", function (event) {
    console.log("click");
    event.preventDefault();
    // Seleccionamos el formulario más cercano al botón y lo ocultamos
    $(this).closest("form").slideUp(); // Ocultar el formulario actual con animación

    // Mostrar el mensaje de confirmación
    $(".confirmacion").fadeIn();
  });
});
