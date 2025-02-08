$(document).ready(() => {
  $("#iniciar-sesion").on("click", () => {
    console.log("click");
    $(".cuenta").css({
      display: "flex",
    });
    $(".cuenta-login").css({ display: "flex" });

    $(".acceso").css({ display: "none" });
  });

  // Comprobacion del contenido de los inputs de inicio de sesion para controlar el disabled del boton de inicio de sesion en el apartado cuenta
  $("#nombre-login").on("input", () => {
    enableButton();
  });
  $("#password-login").on("input", () => {
    enableButton();
  });

  // Mostrar el la seccion para elegir el tipo de cuenta que vamos a crear
  $("#crear-cuenta").on("click", () => {
    $(".cuenta").css({
      display: "flex",
    });
    $(".cuenta-nueva").css({ display: "grid" });
    $(".acceso").css({ display: "none" });
  });
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
