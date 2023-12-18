class Alumno {
    constructor(nombre, apellido, edad, materias = [], calificaciones = []) {
        this.nombre= nombre;
        this.apellido = apellido;
        this.edad= edad;
        this.materias = materias;
        this.calificaciones = calificaciones;
    }

}
class Curso {
    constructor(curso, profesor, alumnos = []) {
        this.curso = curso;
        this.profesor = profesor;
        this.alumnos = alumnos;
    }
}

const alumnos = JSON.parse(localStorage.getItem('Alumnos')) || [];

// Verifica si hay alumnos en LocalStorage (evita que se repitan)
if (alumnos.length === 0) {
    const alumno1 = new Alumno("Juan", "Pérez", 20, ["Historia"], [5.0]);
    const alumno2 = new Alumno("Noemí", "Lagos", 19, ["Ciencias"], [4.5]);
    const alumno3 = new Alumno("Camila", "Ortega", 24, ["Ingles"], [6.3]);
    const alumno4 = new Alumno("Alejandra", "Riveros", 21, ["Matemáticas"], [5.4]);
    const alumno5 = new Alumno("Rocio", "Sepulveda", 22, ["Ciencias"], [3.9]);
    const alumno6 = new Alumno("Javiera", "Villanueva", 21, ["Ingles"], [6.0]);
    const alumno7 = new Alumno("Jennifer", "Vega", 20, ["Arte"], [6.0]);
    const alumno8 = new Alumno("Michel", "Retamal", 19, ["Matemáticas"], [3.9]);
    const alumno9 = new Alumno("Emily", "Cantillana", 20, ["Arte"], [6.6]);
    const alumno10 = new Alumno("Luis", "Zapata", 24, ["Ingles"], [3.9]);
    const alumno11 = new Alumno("Marco", "Castillos", 22, ["Historia"], [6.4]);
    
    alumnos.push(alumno1, alumno2, alumno3, alumno4, alumno5, alumno6, alumno7, alumno8, alumno9, alumno10, alumno11);
    guardarAlumnosEnLocalStorage();
}


const cursos = [
    new Curso("Matemáticas", "Profesor Alejandro", [alumno4, alumno8]),
    new Curso("Historia", "Profesora Carmen", [alumno1, alumno11]),
    new Curso("Ciencias", "Profesor Roberto", [alumno2, alumno5]),
    new Curso("Ingles", "Profesora Matilde", [alumno3, alumno6, alumno10]),
    new Curso("Arte", "Profesor Raul", [alumno7, alumno9]),
];

function mostrarContenido(contenido) {
    // Oculta todos los contenidos
    document.getElementById('contenido1').style.display = "none";
    document.getElementById('contenido2').style.display = "none";
    document.getElementById('contenido3').style.display = "none";
    document.getElementById('contenido4').style.display = "none";

    // Muestra el contenido deseado
    document.getElementById(contenido).style.display = "block";

    // Genera los reglones de la tabla segun contenido
    if(contenido === 'contenido1') {
        const tablaBody = document.getElementById('tablaAlumnosBody');
        tablaBody.innerHTML= '';
        tablaBody.innerHTML = crearFilasTabla(alumnos);
    } else if (contenido === 'contenido2') {
        // mostrar info curso
        const tablaCursosBody = document.getElementById('tablaCursosBody');
        tablaCursosBody.innerHTML = '';
        tablaCursosBody.innerHTML = crearFilasTablaCursos(cursos);
    } else if (contenido === 'contenido3') {
        //mostrar formulario agregar alumno
        document.getElementById('formularioAgregarAlumno').style.display = "block";
    } else if (contenido === 'contenido4') {
        //mostrar formulario agregar materia
        document.getElementById('agregarMateriaAlumno').style.display = "block"
    }
}

function crearFilasTabla(datos) {
    let filasHTML = '';
    // datos = [{nombre, apellido, edad, materias, calificaciones}]
    for (let i = 0; i < datos.length; i++) {
        const { nombre, apellido, edad, materias, calificaciones } = datos[i];
        filasHTML += `
            <tr>
                <td>${nombre}</td>
                <td>${apellido}</td>
                <td>${edad}</td>
                <td>${materias?.join(', ') || 'No identificado'}</td>
                <td>${calificaciones?.join(', ') || ''}</td>
            </tr>
        `;
    }

    return filasHTML;
}

function crearFilasTablaCursos(datos) {
    let filasHTML = '';
    for (let i = 0; i < datos.length; i ++) {
        const { curso, profesor, alumnos } = datos[i];
        filasHTML += `
            <tr>
                <td>${curso}</td>
                <td>${profesor}</td>
                <td>${alumnos.map(alumno => `${alumno.nombre} (${alumno.materias.join(', ')})`).join(', ') || 'No hay alumnos'}</td>
                </tr>
            </tr>
        `;
    }
    return filasHTML;
}   



// Función para agregar un nuevo alumno
function agregarAlumno(nombre, apellido, edad) {
    // Verifica si ya existe el alumno
    if (!alumnos.some(alumno => alumno.nombre === nombre && alumno.apellido === apellido)) {
        // paso 1: crear el alumno
        let nuevoAlumno = { nombre, apellido, edad, materias: [], calificaciones: [] };

        // paso 2: agregar al array de alumnos
        alumnos.push(nuevoAlumno);

        //Paso 3: Guarda el array actualizado en el localStorage
        localStorage.setItem('Alumnos', JSON.stringify(alumnos));

        console.log('Nuevo alumno agregado:', nuevoAlumno);
    }
}

// Funcion guardar alumnos en LocalStorage
function guardarAlumnosEnLocalStorage() {
    localStorage.setItem('Alumnos', JSON.stringify(alumnos));
}

// Funcion para manejar el formulario de agregar alumno
function agregarAlumnoForm(event) {
    event.preventDefault(); //Evita recargar la pagina

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const edad = document.getElementById('edad').value;

    const nuevoAlumno = new Alumno(nombre, apellido, edad);
    alumnos.push(nuevoAlumno);

    //Guarda en LocalStorage
    guardarAlumnosEnLocalStorage();

    //Limpiar el formulario
    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';
    document.getElementById('edad').value = '';
    document.getElementById('materias').value = '';
    document.getElementById('calificaciones').value = '';


    // Mostrar la tabla actualizada
    mostrarContenido('contenido1');

    console.log('Nuevo alumno agregado:', nuevoAlumno);
 
} 

function buscarAlumno() {
    const inputBuscar = document.querySelector('.finder');
    const textoBuscar = inputBuscar.value.toLowerCase();
    
    const resultados = alumnos.filter(alumno =>
        alumno.nombre.toLowerCase().includes(textoBuscar) ||
        alumno.apellido.toLowerCase().includes(textoBuscar)
    );

    const tablaBody = document.getElementById('tablaAlumnosBody');
    tablaBody.innerHTML = crearFilasTabla(resultados);
}

function mostrarFormularioAgregarMateria() {
    // Oculta otros contenidos y muestra el formulario de agregar materia
    document.getElementById('contenido1').style.display = "none";
    document.getElementById('contenido2').style.display = "none";
    document.getElementById('contenido3').style.display = "none";
    document.getElementById('formularioAgregarAlumno').style.display = "none";

    const formularioAgregarMateria = document.getElementById('formularioAgregarMateria');
    formularioAgregarMateria.style.display = "block";
}

function agregarMateriaAlumno() {
    const nombreAlumno = document.getElementById('nombreAlumno').value;
    const apellidoAlumno = document.getElementById('apellidoAlumno').value;
    const materia = document.getElementById('materia').value;

    // Busca al alumno por nombre y apellido
    const alumno = alumnos.find(alumno => alumno.nombre === nombreAlumno && alumno.apellido === apellidoAlumno);

    if (alumno) {
        // Agrega la materia al alumno
        alumno.materias.push(materia);
        // Guarda los cambios en LocalStorage
        guardarAlumnosEnLocalStorage();
        // Muestra la tabla actualizada
        mostrarContenido('contenido1');
    } else {
        alert('Alumno no encontrado');
    }
}

