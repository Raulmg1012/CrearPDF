import { meterDatos,BASEURL, recogerDatos } from "./crud.js";

const usuario = document.getElementById("usuario")
const btnLogin = document.getElementById("login")
const nuevoPDF = document.getElementById("nuevoPDF")
const formularioPDF = document.getElementById("formularioPDF")
const formulario = document.getElementById("formulario")
const crearPDF = document.getElementById("crearPDF")
const panelPDF = document.getElementById("panelPDF")

btnLogin.addEventListener("click",async(e)=>{
    e.preventDefault();
    console.log("Boton login clickeado");
    const username = usuario.value
    const datos = {
        nombreusuario: username
    };
    try{
    const usuarios = await recogerDatos(BASEURL,"usuarios")
    const usuarioRegistrado = usuarios.find((u)=>u.nombreusuario === username)
    if(!usuarioRegistrado){
         await meterDatos(BASEURL, "usuarios", datos);
         console.log("Usuario registrado");
    } else {
        console.log("Usuario ya existe");
    }
        localStorage.setItem("usuarioActual",JSON.stringify(datos))

        mostrarPDF(username)
    }catch(error){
        console.error("Error en el login",error);
    }

    panelPDF.style.display = "block"
})




formulario.addEventListener("submit", (e) => {
    e.preventDefault(); // Esto evita que el formulario se envíe y recargue la página
});

crearPDF.addEventListener("click", async(e)=>{
    e.preventDefault()

    const nombre = formulario["nombre"].value
    const apellido1 = formulario["apellido1"].value
    const apellido2 = formulario["apellido2"].value
    const descripcion = formulario["descripcion"].value

    const doc = new jsPDF()

    doc.text(`Nombre: ${nombre}`,10,10)
    doc.text(`Apellido 1: ${apellido1}`,10,20)
    doc.text(`Apellido 2: ${apellido2}`,10,30)
    doc.text(`Descripcion: ${descripcion}`,10,40)

    const nombreArchivo = `${nombre}${apellido1}${apellido2}.pdf`
    doc.save(nombreArchivo)

    const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"))
    const datosPDF = {
        nombreArchivo: nombreArchivo,
        usuario: usuarioActual.nombreusuario
    }

    try {
        await meterDatos(BASEURL,"pdfs",datosPDF)
        console.log("PDF guardado");
        mostrarPDF(usuarioActual.nombreusuario)
    } catch (error) {
        console.error("Error al guardar PDF",error);
    }


})

const mostrarPDF = async (username) => {
    const listaPDF = document.getElementById("listaPDF")
    listaPDF.innerHTML=""

    try {
        const pdfs = await recogerDatos(BASEURL,"pdfs")
        const pdfsDelUsuario = pdfs.filter((pdf)=>pdf.usuario === username)

        pdfsDelUsuario.forEach((pdf) => {
            const li = document.createElement("li")
            li.textContent = pdf.nombreArchivo
            listaPDF.appendChild(li)
        });

    } catch (error) {
        console.log("Error al mostrar los pdf",error);
    }
}



nuevoPDF.addEventListener("click",(e)=>{
    e.preventDefault()
    formularioPDF.style.display = "block"

})



