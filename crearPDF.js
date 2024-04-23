import { meterDatos,BASEURL } from "./crud.js";
import { jsPDF } from "jspdf"

const usuario = document.getElementById("usuario")
const btnLogin = document.getElementById("login")
const nuevoPDF = document.getElementById("nuevoPDF")
const formularioPDF = document.getElementById("formularioPDF")
const formulario = document.getElementById("formulario")
const crearPDF = document.getElementById("crearPDF")

btnLogin.addEventListener("click",async(e)=>{
    e.preventDefault();
    const datos = {
        usuario: usuario.value
    };
    
     try {
         console.log("Usuario logueado");
         await meterDatos(BASEURL, "usuarios", datos);

     } catch (error) {
         console.log(error);
     }


})

crearPDF.addEventListener("click",(e)=>{
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

    doc.save("pdfNuevo")
})

nuevoPDF.addEventListener("click",(e)=>{
    e.preventDefault()
    formularioPDF.style.display = "block"

})



