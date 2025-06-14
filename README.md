# Guía de Configuración y Gestión de un sitio web para refugios de animales"

Este documento describe los pasos necesarios para configurar, desplegar y gestionar el contenido del sitio web del Refugio Amigo Animal, utilizando Google Sheets y Google Apps Script para la gestión de animales.

---

## 🚀 1. Configuración Inicial del Proyecto (Una Única Vez)

Estos pasos solo necesitas hacerlos una vez para preparar el entorno.

### 1.1. Cómo Crear una Cuenta de GitHub

Si aún no tienes una cuenta de GitHub, es el primer paso para poder alojar tu sitio web y gestionar tu código.

1.  **Visita GitHub:** Abre tu navegador y ve a [github.com](https://github.com/).

2.  **Regístrate:** Haz clic en el botón "Sign up" (Registrarse) en la esquina superior derecha.

3.  **Introduce tus datos:** Sigue las instrucciones para introducir tu dirección de correo electrónico, crear una contraseña y un nombre de usuario.

4.  **Verifica tu cuenta:** Es posible que GitHub te pida verificar tu correo electrónico o completar un pequeño rompecabezas para demostrar que no eres un robot.

5.  **Elige un plan:** Para alojar tu sitio web, la cuenta gratuita es suficiente.

6.  **¡Listo!** Una vez que tu cuenta esté activa, podrás crear repositorios.

### 1.2. Cómo Clonar tu Repositorio (Detallado)

Clonar un repositorio significa descargar una copia del proyecto de GitHub a tu ordenador local. Necesitarás tener Git instalado en tu sistema. Si no lo tienes, puedes descargarlo desde [git-scm.com](https://git-scm.com/downloads).

1.  **Ve a tu repositorio en GitHub:** Abre tu navegador y navega a la página de tu repositorio en GitHub (ej. `https://github.com/tu-usuario/tu-repositorio`).

2.  **Haz clic en el botón "Code":** En la página principal de tu repositorio, busca un botón verde que dice **`<> Code`**.

3.  **Copia la URL HTTPS:** En el menú desplegable que aparece, asegúrate de que la pestaña "HTTPS" esté seleccionada. Copia la URL que se muestra (será algo como `https://github.com/tu-usuario/tu-repositorio.git`). Puedes hacer clic en el icono del portapapeles para copiarla fácilmente.

4.  **Abre tu terminal/línea de comandos:**

    * **Windows:** Busca "CMD" o "PowerShell" en el menú de inicio.

    * **macOS:** Busca "Terminal" en Aplicaciones > Utilidades.

    * **Linux:** Abre tu aplicación de terminal.

5.  **Navega a la carpeta donde quieres guardar el proyecto:** Por ejemplo, si quieres guardarlo en una carpeta llamada `Proyectos` en tu directorio de usuario:

    ```bash
    cd Proyectos
    ```

6.  **Clona el repositorio:** En la terminal, escribe `git clone` seguido de la URL que copiaste y presiona Enter:

    ```bash
    git clone [https://github.com/tu-usuario/tu-repositorio.git](https://github.com/tu-usuario/tu-repositorio.git)
    ```

    Reemplaza la URL con la que copiaste de tu repositorio.

7.  **Accede a la carpeta del proyecto:** Una vez clonado, se creará una nueva carpeta con el nombre de tu repositorio. Entra en ella:

    ```bash
    cd tu-repositorio
    ```

¡Ya tienes una copia local de tu sitio web! Ahora puedes abrir esta carpeta en tu editor de código (como Visual Studio Code).

### 1.3. Configuración de la Hoja de Cálculo de Google (Google Sheet)

Crea una nueva hoja de cálculo en Google Sheets que servirá como tu base de datos para los animales.

1.  **Crea una nueva hoja de cálculo:** Ve a Google Sheets (sheets.google.com) y crea una hoja de cálculo en blanco. Puedes llamarla, por ejemplo, "Animales Refugio".

2.  **Crea la pestaña "Animales":** Dentro de esa hoja de cálculo, asegúrate de tener una pestaña (hoja) llamada **`Animales`**. (Si tiene otro nombre por defecto como "Hoja1", cámbialo a `Animales`.)

3.  **Define los encabezados (columnas):** En la **primera fila** de la pestaña `Animales`, introduce los siguientes encabezados (nombres de columna) **exactamente como se muestran, incluyendo mayúsculas y minúsculas**:

    * `id` (Texto, identificador único para cada animal)

    * `name` (Texto, nombre del animal)

    * `species` (Texto, especie del animal, ej. "Perro", "Gato", "Conejo")

    * `age` (Texto, edad del animal, ej. "2 años", "6 meses")

    * `breed` (Texto, raza del animal, ej. "Labrador", "Siamés", "Mestizo")

    * `description` (Texto, una breve descripción del animal)

    * `image` (Texto, **ruta de la imagen** relativa a la raíz de tu sitio, ej. `img/animales/fido.jpg`)

    * `featured` (Booleano, `TRUE` o `FALSE`. `TRUE` si quieres que aparezca en la sección de destacados de la página de inicio)

    * `isAdopted` (Booleano, `TRUE` o `FALSE`. `TRUE` si el animal ya ha sido adoptado y no debe mostrarse en la web)

    **Ejemplo de cómo deberían verse las primeras filas en tu hoja `Animales`:**

    | id     | name | species | age    | breed              | description                       | image              | featured | isAdopted |
    | :----- | :--- | :------ | :----- | :----------------- | :-------------------------------- | :----------------- | :------- | :-------- |
    | fido-1 | Fido | Perro   | 2 años | Labrador Retriever | Fido es muy juguetón...           | img/animales/fido.jpg | TRUE     | FALSE     |
    | miau-2 | Miau | Gato    | 1 año  | Siamés             | Miau es una gata curiosa...       | img/animales/miau.jpg | TRUE     | FALSE     |
    | luna-4 | Luna | Perro   | 4 años | Mestizo            | Luna es una perra protectora... | img/animales/luna.jpg | FALSE    | TRUE      |

### 1.4. Creación y Despliegue del Google Apps Script

Este script es el "conector" entre tu Google Sheet y tu sitio web.

1.  **Abre el editor de Apps Script:** En tu Google Sheet "Animales Refugio", ve a `Extensiones > Apps Script`. Se abrirá una nueva pestaña con el editor de Apps Script.

2.  **Pega el código del script:** Borra cualquier código que ya exista (`function myFunction() { ... }`) y pega el siguiente código en el editor:

    ```javascript
    /**
     * Función que se ejecuta cuando se realiza una petición GET a la URL de la aplicación web.
     * Esta función lee los datos de la hoja de cálculo de animales y los devuelve como JSON.
     * @param {Object} e El objeto de evento que contiene información sobre la petición.
     * @returns {GoogleAppsScript.Content.TextOutput} Un objeto ContentService que contiene los datos JSON.
     */
    function doGet(e) {
      const sheetName = 'Animales'; // ¡ESTE NOMBRE DEBE COINCIDIR EXACTAMENTE CON LA PESTAÑA EN TU GOOGLE SHEET!
      const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
      const sheet = spreadsheet.getSheetByName(sheetName);

      if (!sheet) {
        return ContentService.createTextOutput(JSON.stringify({ error: `La hoja '${sheetName}' no se encontró.` }))
          .setMimeType(ContentService.MimeType.JSON);
      }

      const range = sheet.getDataRange();
      const values = range.getDisplayValues();

      if (values.length <= 1) {
        return ContentService.createTextOutput(JSON.stringify([])).setMimeType(ContentService.MimeType.JSON);
      }

      const headers = values[0];
      const data = [];

      for (let i = 1; i < values.length; i++) {
        const row = values[i];
        const animal = {};

        headers.forEach((header, index) => {
          const cleanedHeader = header.trim();
          let value = row[index];

          if (typeof value === 'string') {
            if (value.toUpperCase() === 'TRUE') {
              value = true;
            } else if (value.toUpperCase() === 'FALSE') {
              value = false;
            }
          }
          animal[cleanedHeader] = value;
        });
        data.push(animal);
      }

      const output = ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
      
      return output;
    }

    function doPost(e) {
      return ContentService.createTextOutput("").setMimeType(ContentService.MimeType.TEXT);
    }
    ```

3.  **Guarda el script:** Haz clic en el icono del disquete (Guardar proyecto) o presiona `Ctrl + S` (`Cmd + S` en Mac).

4.  **Despliega como Aplicación Web:**

    * Haz clic en **`Desplegar`** (botón azul en la esquina superior derecha).

    * Selecciona **`Nueva implementación`**.

    * Junto a "Tipo de implementación", haz clic en el **icono del engranaje** y selecciona **`Aplicación web`**.

    * Configura lo siguiente:

        * **Descripción:** `API de Animales` (o algo que te ayude a identificarla).

        * **Ejecutar como:** `Yo` (tu dirección de correo electrónico).

        * **Quién tiene acceso:** **`Cualquier usuario`** (¡Esto es **CRÍTICO** para que tu sitio web pueda acceder a los datos!).

    * Haz clic en **`Desplegar`**.

    * La primera vez, es posible que te pida **autorizar el script**. Sigue las indicaciones, permite el acceso a tu hoja de cálculo.

    * Una vez desplegado, se te proporcionará una **"URL de aplicación web"**. **¡COPIA ESTA URL COMPLETA!** Terminará en `/exec`. Guárdala, la necesitarás en el siguiente paso.

### 1.5. Actualizar `config.json` con la URL del Apps Script y Temas

1.  Abre el archivo `data/config.json` en tu repositorio local.

2.  Busca la línea `"appsScriptAnimalsUrl": "TU_URL_DE_APPS_SCRIPT_ANIMALES"` y **reemplázala** con la URL exacta que copiaste en el paso anterior del despliegue de Apps Script.

3.  **Configuración de Temas:**
    Tu archivo `config.json` también es donde defines y seleccionas los **temas de color** de tu sitio web.

    * La propiedad `"defaultTheme"` especifica el nombre del tema que se aplicará por defecto. Asegúrate de que el nombre aquí (`"Tierra Cálida"`, por ejemplo) coincida exactamente con uno de los `name` dentro del array `colorThemes`.

    * Dentro de `colorThemes`, cada objeto define un tema con sus colores primario, secundario, etc. Puedes añadir más temas o modificar los existentes.

    * El `script.js` leerá esta configuración y aplicará las variables CSS correspondientes, cambiando los colores de tu sitio.

    Tu `config.json` debería verse similar a esto (la URL y los valores de los temas serán diferentes):

    ```json
    {
      "siteTitle": "Refugio Amigo Animal",
      "footerText": "© 2025 Refugio Amigo Animal. Todos los derechos reservados.",
      // ... otras configuraciones ...
      "appsScriptAnimalsUrl": "[https://script.google.com/macros/s/AKfycbwWjl7tf1NqUF_4eqkqVGQsYLqBhxyP45PuhHGm5wvTOsAnDDWCQ_ili_46sngRJoYj/exec](https://script.google.com/macros/s/AKfycbwWjl7tf1NqUF_4eqkqVGQsYLqBhxyP45PuhHGm5wvTOsAnDDWCQ_ili_46sngRJoYj/exec)",
      "defaultTheme": "Tierra Cálida",
      "colorThemes": [
        {
          "name": "Default",
          "primary": "#007bff",
          "secondary": "#6c757d",
          "accent": "#28a745",
          "lightBg": "#f8f9fa",
          "whiteBg": "#ffffff",
          "darkText": "#343a40",
          "lightText": "#ffffff",
          "borderColor": "#dee2e6"
        },
        {
          "name": "Tierra Cálida",
          "primary": "#8B4513",
          "secondary": "#A0522D",
          "accent": "#CD853F",
          "lightBg": "#FFF8DC",
          "whiteBg": "#FDF5E6",
          "darkText": "#5A2D0D",
          "lightText": "#ffffff",
          "borderColor": "#D2B48C"
        }
        // ... otros temas ...
      ]
    }
    ```

    Puedes actualizar el resto de la información en este archivo (`siteTitle`, `footerText`, `socialLinks`, `contactInfo`, y los datos de las páginas `aboutPage`, `helpPage`, `contactPage`) para personalizar tu sitio.

### 1.6. Sube las Imágenes de los Animales

Las imágenes de los animales deben estar físicamente en tu repositorio para que el navegador pueda mostrarlas.

1.  **Crea la estructura de carpetas `img/animales/` en la raíz de tu proyecto local.** Si la carpeta `img` ya existe, asegúrate de que dentro de ella crees o uses la carpeta llamada **`animales`**.

2.  Copia los archivos de imagen de tus animales (ej. `fido.jpg`, `miau.jpg`, `coco.jpg`) dentro de la carpeta `img/animales/`. Asegúrate de que los nombres de archivo y las extensiones coincidan exactamente con lo que has puesto en la columna `image` de tu Google Sheet.

3.  **Sincroniza con GitHub:** Tienes dos opciones para subir estos archivos a tu repositorio remoto:

    * **GitHub Desktop:** Abre la aplicación, arrastra las imágenes a la carpeta local, y luego usa los botones de "Commit" y "Push origin".

    * **Interfaz Web de GitHub:** Navega a la carpeta `img/animales/` en tu repositorio en GitHub.com, haz clic en "Add file" > "Upload files" y arrastra/suelta tus imágenes. Luego, haz "Commit".

---

## 2. Gestión de Contenido (Diaria/Frecuente)

Una vez que la configuración inicial está hecha, la gestión del contenido es muy sencilla.

### 2.1. Actualizar Datos de Animales

* Para añadir, editar o eliminar animales, simplemente **modifica directamente tu Hoja de Cálculo de Google "Animales Refugio" en la pestaña `Animales`**.

* **No necesitas usar Git** para los cambios en la hoja de cálculo.

* **Refresco del Sitio Web:** Los cambios en la Google Sheet se reflejarán en tu sitio web en unos segundos o minutos (debido a la caché de Google Apps Script). Para ver los cambios de inmediato, haz un "hard refresh" en tu navegador (`Ctrl + Shift + R` en Windows/Linux o `Cmd + Shift + R` en Mac).

### 2.2. Actualizar Otros Contenidos del Sitio

* Para modificar el título del sitio, el texto del pie de página, los enlaces de redes sociales, o el contenido de las páginas "Quiénes Somos", "Cómo Ayudar" o "Contacto", deberás **editar el archivo `data/config.json`** en tu repositorio local.

* Después de guardar los cambios en `config.json`, necesitarás **subir esos cambios a tu repositorio de GitHub** usando Git:

    ```bash
    git add .
    git commit -m "Actualizado contenido del sitio en config.json"
    git push origin main
    ```

* Haz un "hard refresh" en tu navegador para ver los cambios.

### 2.3. Actualizar Estilos o Funcionalidades del Sitio

* Si deseas cambiar el diseño visual del sitio (`css/style.css`), la lógica JavaScript (`js/script.js`), o cualquier archivo HTML, deberás **editar esos archivos en tu repositorio local**.

* Después de guardar los cambios, sube esos cambios a tu repositorio de GitHub usando Git:

    ```bash
    git add .
    git commit -m "Descripción de los cambios en estilos o funcionalidad"
    git push origin main
    ```

* Haz un "hard refresh" en tu navegador para ver los cambios.

---

¡Listo! Con esta guía, tienes un proceso claro para mantener tu sitio web de Refugio Amigo Animal actualizado.
