// Este script se ejecuta una vez que todo el contenido HTML de la página ha sido cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Seleccionamos el contenedor donde se mostrarán las tarjetas de animales destacados.
    const animalGrid = document.querySelector('.animal-grid');

    /**
     * Función asíncrona para cargar los datos de los animales desde un archivo JSON
     * y mostrarlos en la página.
     */
    async function loadAnimals() {
        try {
            // Realizamos una petición para obtener el archivo 'animals.json'
            // La ruta es relativa al 'index.html', por eso es 'data/animals.json'.
            const response = await fetch('data/animales.json');

            // Verificamos si la respuesta de la petición fue exitosa (código 200 OK).
            if (!response.ok) {
                // Si hay un error HTTP (ej. 404 Not Found), lanzamos una excepción.
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Convertimos la respuesta (que es texto JSON) a un objeto JavaScript.
            const animals = await response.json();

            // Filtramos la lista completa de animales para obtener solo aquellos
            // que están marcados como 'featured: true' para la página de inicio.
            const featuredAnimals = animals.filter(animal => animal.featured);

            // Iteramos sobre cada animal destacado para crear y añadir su tarjeta al DOM.
            featuredAnimals.forEach(animal => {
                // Creamos un nuevo elemento div que representará la tarjeta del animal.
                const animalCard = document.createElement('div');
                // Añadimos una clase CSS para poder estilizar estas tarjetas.
                animalCard.classList.add('animal-card');

                // Rellenamos el HTML interno de la tarjeta con los datos del animal.
                // Usamos `${}` para insertar los valores de las propiedades del objeto 'animal'.
                // La ruta de la imagen (animal.image) viene del JSON.
                // El enlace "Más info" apunta a una futura página de detalle, pasando el ID del animal.
                animalCard.innerHTML = `
                    <img src="${animal.image}" alt="${animal.name}">
                    <h3>${animal.name}</h3>
                    <p>${animal.description}</p>
                    <a href="animal-detail.html?id=${animal.id}" class="btn-secondary">Más info</a>
                `;

                // Añadimos la tarjeta del animal al contenedor principal (animalGrid).
                animalGrid.appendChild(animalCard);
            });

        } catch (error) {
            // Capturamos cualquier error que ocurra durante la carga o procesamiento de los datos.
            console.error('Error al cargar los animales:', error);
            // Si hay un error, mostramos un mensaje amigable al usuario en la página.
            if (animalGrid) {
                 animalGrid.innerHTML = '<p>Lo sentimos, no pudimos cargar los animales en este momento. Por favor, inténtelo de nuevo más tarde.</p>';
            }
        }
    }

    // Verificamos que el 'animalGrid' exista en el DOM antes de intentar cargar los animales.
    // Esto evita errores si el script se ejecutara en una página que no tiene ese elemento.
    if (animalGrid) {
        // Llamamos a la función para iniciar la carga de los animales.
        loadAnimals();
    }
});
