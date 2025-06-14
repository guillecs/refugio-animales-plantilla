// Este script se ejecuta una vez que todo el contenido HTML de la página ha sido cargado.
document.addEventListener('DOMContentLoaded', () => {
    // --- Selectores de Elementos Globales ---
    const siteTitleElement = document.getElementById('siteTitleDynamic');
    const siteLogoElement = document.getElementById('siteLogoDynamic');
    const footerTextElement = document.getElementById('footerTextDynamic');
    const socialLinksContainer = document.getElementById('socialLinksDynamic');

    // Selectores para las cuadrículas de animales en diferentes páginas
    const featuredAnimalGrid = document.getElementById('featuredAnimalGrid');
    const allAnimalsGrid = document.getElementById('allAnimalsGrid');

    // Selectores para los elementos específicos de la página "Quiénes Somos"
    const aboutTitleElement = document.getElementById('aboutTitleDynamic');
    const missionParagraphsContainer = document.getElementById('missionParagraphsDynamic');
    const valuesTitleElement = document.getElementById('valuesTitleDynamic');
    const valuesListElement = document.getElementById('valuesListDynamic');
    const teamTitleElement = document.getElementById('teamTitleDynamic');
    const teamMembersContainer = document.getElementById('teamMembersDynamic');
    const aboutCtaDynamic = document.getElementById('aboutCtaDynamic');
    const aboutCtaLinkDynamic = document.getElementById('aboutCtaLinkDynamic');

    // Selectores para los elementos específicos de la página "Cómo Ayudar"
    const helpTitleDynamic = document.getElementById('helpTitleDynamic');
    const helpDescriptionDynamic = document.getElementById('helpDescriptionDynamic');
    const helpSectionsContainer = document.getElementById('helpSectionsContainer');

    // Selectores para los elementos específicos de la página "Contacto"
    const contactTitleDynamic = document.getElementById('contactTitleDynamic');
    const contactDescriptionDynamic = document.getElementById('contactDescriptionDynamic');
    const contactEmailDynamic = document.getElementById('contactEmailDynamic');
    const contactEmailLink = document.getElementById('contactEmailLink');
    const contactPhoneDynamic = document.getElementById('contactPhoneDynamic');
    const contactPhoneLink = document.getElementById('contactPhoneLink');
    const contactAddressDynamic = document.getElementById('contactAddressDynamic');
    const contactAddressLink = document.getElementById('contactAddressLink');
    const contactHoursDynamic = document.getElementById('contactHoursDynamic');

    // Las URLs de Google Apps Script se cargarán desde config.json


    /**
     * Función para aplicar un tema de color a las variables CSS.
     * @param {Object} theme - Objeto con las propiedades de color del tema.
     */
    function applyTheme(theme) {
        if (!theme) {
            console.error("No se pudo aplicar el tema: el objeto tema es nulo o indefinido.");
            return;
        }
        const root = document.documentElement; // Accede al elemento <html>

        root.style.setProperty('--primary-color', theme.primary);
        root.style.setProperty('--secondary-color', theme.secondary);
        root.style.setProperty('--accent-color', theme.accent);
        root.style.setProperty('--light-bg', theme.lightBg);
        root.style.setProperty('--white-bg', theme.whiteBg);
        root.style.setProperty('--dark-text', theme.darkText);
        root.style.setProperty('--light-text', theme.lightText);
        root.style.setProperty('--borderColor', theme.borderColor);
    }


    /**
     * Función asíncrona para cargar los datos de configuración global desde config.json.
     * Ahora también aplica los temas de color directamente desde config.json.
     */
    async function loadConfig() {
        let config = null;

        try {
            const response = await fetch('data/config.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            config = await response.json();

            // --- Lógica para aplicar el tema de color desde config.json ---
            const selectedThemeName = config.defaultTheme || "Default"; // Obtiene el tema por defecto
            const activeTheme = config.colorThemes.find(theme => theme.name === selectedThemeName); // Busca el tema en el array

            if (activeTheme) {
                applyTheme(activeTheme); // Aplica el tema si se encuentra
            } else {
                console.warn(`El tema '${selectedThemeName}' no se encontró en 'config.json'. Se aplicará el primer tema disponible como fallback.`);
                if (config.colorThemes && config.colorThemes.length > 0) {
                    applyTheme(config.colorThemes[0]); // Aplica el primer tema si el default no existe
                } else {
                    console.error("No hay temas de color disponibles en 'config.json' para aplicar.");
                }
            }
            // --- Fin de la lógica de temas ---


            // --- Resto de la carga de configuración (sin cambios respecto a versiones anteriores) ---
            if (siteTitleElement) {
                if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
                    document.title = config.siteTitle + " - Inicio";
                } else if (window.location.pathname.includes('adopcion.html')) {
                    document.title = config.siteTitle + " - Adopción";
                } else if (window.location.pathname.includes('quienes-somos.html')) {
                    document.title = config.siteTitle + " - Quiénes Somos";
                } else if (window.location.pathname.includes('como-ayudar.html')) {
                    document.title = config.siteTitle + " - Cómo Ayudar";
                } else if (window.location.pathname.includes('contacto.html')) {
                    document.title = config.siteTitle + " - Contacto";
                }
                 else {
                    document.title = config.siteTitle;
                }
            }

            if (siteLogoElement) {
                siteLogoElement.textContent = config.siteTitle;
            }

            if (footerTextElement) {
                footerTextElement.textContent = config.footerText;
            }

            if (socialLinksContainer && config.socialLinks) {
                socialLinksContainer.innerHTML = '';
                config.socialLinks.forEach(link => {
                    const anchor = document.createElement('a');
                    anchor.href = link.url;
                    anchor.textContent = link.name;
                    socialLinksContainer.appendChild(anchor);
                });
            }

            if (window.location.pathname.includes('quienes-somos.html') && config.aboutPage) {
                if (aboutTitleElement) {
                    aboutTitleElement.textContent = config.aboutPage.title;
                }
                if (missionParagraphsContainer && config.aboutPage.missionParagraphs) {
                    missionParagraphsContainer.innerHTML = '';
                    config.aboutPage.missionParagraphs.forEach(pText => {
                        const p = document.createElement('p');
                        p.textContent = pText;
                        missionParagraphsContainer.appendChild(p);
                    });
                }
                if (valuesTitleElement) {
                    valuesTitleElement.textContent = config.aboutPage.valuesTitle;
                }
                if (valuesListElement && config.aboutPage.values) {
                    valuesListElement.innerHTML = '';
                    config.aboutPage.values.forEach(valueText => {
                        const li = document.createElement('li');
                        li.innerHTML = valueText;
                        valuesListElement.appendChild(li);
                    });
                }
                if (teamTitleElement) {
                    teamTitleElement.textContent = config.aboutPage.teamTitle;
                }
                if (teamMembersContainer && config.aboutPage.teamMembers) {
                    teamMembersContainer.innerHTML = '';
                    config.aboutPage.teamMembers.forEach(member => {
                        const memberCard = document.createElement('div');
                        memberCard.classList.add('team-member-card');
                        memberCard.innerHTML = `
                            <img src="${member.image}" alt="${member.name}" class="rounded-img">
                            <h3>${member.name}</h3>
                            <p class="role">${member.role}</p>
                            <p>${member.description}</p>
                        `;
                        teamMembersContainer.appendChild(memberCard);
                    });
                }
                if (aboutCtaDynamic && aboutCtaLinkDynamic) {
                    aboutCtaDynamic.innerHTML = '';
                    const spanText = document.createElement('span');
                    spanText.textContent = config.aboutPage.callToActionText;
                    const linkElement = document.createElement('a');
                    linkElement.textContent = config.aboutPage.callToActionLinkText;
                    linkElement.href = config.aboutPage.callToActionLinkUrl;
                    aboutCtaDynamic.appendChild(spanText);
                    aboutCtaDynamic.appendChild(linkElement);
                }
            }

            if (window.location.pathname.includes('como-ayudar.html') && config.helpPage) {
                if (helpTitleDynamic) {
                    helpTitleDynamic.textContent = config.helpPage.title;
                }
                if (helpDescriptionDynamic) {
                    helpDescriptionDynamic.textContent = config.helpPage.description;
                }

                if (helpSectionsContainer && config.helpPage.sections) {
                    helpSectionsContainer.innerHTML = '';

                    config.helpPage.sections.forEach(section => {
                        const sectionDiv = document.createElement('div');
                        sectionDiv.classList.add('help-section-card');
                        
                        const sectionTitle = document.createElement('h2');
                        sectionTitle.textContent = section.title;
                        sectionDiv.appendChild(sectionTitle);

                        if (section.paragraphs) {
                            section.paragraphs.forEach(pText => {
                                const p = document.createElement('p');
                                p.textContent = pText;
                                sectionDiv.appendChild(p);
                            });
                        }

                        if (section.items && section.items.length > 0) {
                            const ul = document.createElement('ul');
                            ul.classList.add('help-item-list');
                            section.items.forEach(item => {
                                const li = document.createElement('li');
                                if (item.link) {
                                    const link = document.createElement('a');
                                    link.href = item.link;
                                    link.textContent = item.name;
                                    link.classList.add('btn-secondary', 'small-btn');
                                    li.appendChild(link);
                                    if (item.info) {
                                        const infoSpan = document.createElement('span');
                                        infoSpan.textContent = ` - ${item.info}`;
                                        li.appendChild(infoSpan);
                                    }
                                } else if (item.bankName || item.iban || item.swiftBic) {
                                    let bankDetailsHtml = `<strong>${item.name}</strong>`;
                                    if (item.info) {
                                        bankDetailsHtml += `<br>${item.info}`;
                                    }
                                    if (item.bankName) {
                                        bankDetailsHtml += `<br><strong>Banco:</strong> ${item.bankName}`;
                                    }
                                    if (item.iban) {
                                        bankDetailsHtml += `<br><strong>IBAN:</strong> ${item.iban}`;
                                    }
                                    if (item.swiftBic) {
                                        bankDetailsHtml += `<br><strong>SWIFT/BIC:</strong> ${item.swiftBic}`;
                                    }
                                    li.innerHTML = bankDetailsHtml;
                                } else {
                                    let itemContent = `<strong>${item.name}</strong>`;
                                    if (item.info) {
                                        itemContent += `<br>${Array.isArray(item.info) ? item.info.join('<br>') : item.info}`;
                                    }
                                    li.innerHTML = itemContent;
                                }
                                ul.appendChild(li);
                            });
                            sectionDiv.appendChild(ul);
                        }

                        if (section.infoText) {
                            const infoP = document.createElement('p');
                            infoP.innerHTML = section.infoText;
                            sectionDiv.appendChild(infoP);
                        }

                        helpSectionsContainer.appendChild(sectionDiv);
                    });
                }
            }

            if (window.location.pathname.includes('contacto.html') && config.contactPage) {
                if (contactTitleDynamic) {
                    contactTitleDynamic.textContent = config.contactPage.title;
                }
                if (contactDescriptionDynamic) {
                    contactDescriptionDynamic.textContent = config.contactPage.description;
                }
                if (contactEmailDynamic) {
                    contactEmailDynamic.textContent = config.contactPage.email;
                    if (contactEmailLink) {
                        contactEmailLink.href = `mailto:${config.contactPage.email}`;
                    }
                }
                if (contactPhoneDynamic) {
                    contactPhoneDynamic.textContent = config.contactPage.phone;
                    if (contactPhoneLink) {
                        contactPhoneLink.href = `tel:${config.contactPage.phone.replace(/\s/g, '')}`;
                    }
                }
                if (contactAddressDynamic) {
                    contactAddressDynamic.textContent = config.contactPage.address;
                    if (contactAddressLink) {
                        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(config.contactPage.address)}`;
                        contactAddressLink.href = googleMapsUrl;
                    }
                }
                if (contactHoursDynamic) {
                    contactHoursDynamic.innerHTML = config.contactPage.hours;
                }
            }

        } catch (error) {
            console.error('Error al cargar la configuración:', error);
            // Fallback para toda la configuración si config.json falla
            if (siteTitleElement) document.title = "Refugio Animales";
            if (siteLogoElement) siteLogoElement.textContent = "Refugio Animales";
            if (footerTextElement) footerTextElement.textContent = "© Derechos Reservados.";
            if (socialLinksContainer) socialLinksContainer.innerHTML = '<a href="#">Error de Carga</a>';
            
            // Fallback específicos para "Quiénes Somos"
            if (window.location.pathname.includes('quienes-somos.html')) {
                if (aboutTitleDynamic) aboutTitleDynamic.textContent = "Error al cargar la sección";
                if (missionParagraphsContainer) missionParagraphsContainer.innerHTML = '<p>No se pudo cargar la información de la misión.</p>';
                if (valuesTitleDynamic) valuesTitleDynamic.textContent = "Error";
                if (valuesListElement) valuesListElement.innerHTML = '<li>No se pudieron cargar los valores.</li>';
                if (teamTitleDynamic) teamTitleDynamic.textContent = "Error";
                if (teamMembersContainer) teamMembersContainer.innerHTML = '<p>No se pudo cargar la información del equipo.</p>';
                if (aboutCtaDynamic) aboutCtaDynamic.innerHTML = 'No se pudo cargar la llamada a la acción.';
            }

            // Fallback específicos para "Cómo Ayudar"
            if (window.location.pathname.includes('como-ayudar.html')) {
                if (helpTitleDynamic) helpTitleDynamic.textContent = "Error al cargar las formas de ayuda";
                if (helpDescriptionDynamic) helpDescriptionDynamic.textContent = "No se pudo cargar la descripción.";
                if (helpSectionsContainer) helpSectionsContainer.innerHTML = '<p>Lo sentimos, no pudimos cargar las formas de ayuda en este momento.</p>';
            }

            // Fallback específicos para "Contacto"
            if (window.location.pathname.includes('contacto.html')) {
                if (contactTitleDynamic) contactTitleDynamic.textContent = "Error de Contacto";
                if (contactDescriptionDynamic) contactDescriptionDynamic.textContent = "No pudimos cargar la información de contacto. Por favor, intente de nuevo más tarde.";
                if (contactEmailDynamic) contactEmailDynamic.textContent = "No disponible";
                if (contactEmailLink) contactEmailLink.href = "#";
                if (contactPhoneDynamic) contactPhoneDynamic.textContent = "No disponible";
                if (contactPhoneLink) contactPhoneLink.href = "#";
                if (contactAddressDynamic) contactAddressDynamic.textContent = "No disponible";
                if (contactAddressLink) contactAddressLink.href = "#";
                if (contactHoursDynamic) contactHoursDynamic.textContent = "No disponible";
            }
        }
        return config; // Aseguramos que la configuración se devuelva
    }

    /**
     * Función para crear y añadir una tarjeta de animal al DOM.
     * Ahora muestra directamente la especie, raza, edad y descripción.
     * @param {HTMLElement} gridElement - El contenedor de la cuadrícula donde añadir la tarjeta.
     * @param {Object} animal - Objeto con los datos del animal.
     */
    function createAnimalCard(gridElement, animal) {
        const animalCard = document.createElement('div');
        animalCard.classList.add('animal-card');
        animalCard.innerHTML = `
            <img src="${animal.image}" alt="${animal.name}" onerror="this.onerror=null; this.src='https://placehold.co/400x300/CCCCCC/000000?text=Imagen+No+Disponible';">
            <h3>${animal.name}</h3>
            <p><strong>Especie:</strong> ${animal.species || 'N/A'}</p>
            <p><strong>Raza:</strong> ${animal.breed || 'N/A'}</p>
            <p><strong>Edad:</strong> ${animal.age ? animal.age + ' años' : 'N/A'}</p>
            <p>${animal.description}</p>
        `;
        gridElement.appendChild(animalCard);
    }

    /**
     * Función asíncrona para cargar los datos de los animales.
     * Intenta cargar desde Google Apps Script, si falla, usa el JSON local.
     * @param {string} type - 'featured' para animales destacados, 'all' para todos los animales disponibles.
     * @param {HTMLElement} targetGrid - El elemento HTML de la cuadrícula donde se renderizarán los animales.
     * @param {string} appsScriptAnimalsUrl - La URL del Google Apps Script para animales.
     */
    async function loadAnimals(type, targetGrid, appsScriptAnimalsUrl) {
        if (!targetGrid) {
            return;
        }

        let animalsToProcess = [];
        let source = "local (data/animales.json)"; // Actualizado el mensaje de fallback

        try {
            // --- Intenta cargar animales desde Google Apps Script ---
            if (appsScriptAnimalsUrl && appsScriptAnimalsUrl !== "TU_URL_DE_APPS_SCRIPT_ANIMALES") { // Evita la URL de ejemplo
                console.log("Intentando cargar animales desde Google Apps Script...");
                const sheetResponse = await fetch(appsScriptAnimalsUrl);
                if (sheetResponse.ok) {
                    const sheetData = await sheetResponse.json();
                    if (Array.isArray(sheetData) && sheetData.length > 0) {
                        animalsToProcess = sheetData;
                        source = "Google Apps Script";
                        console.log("Animales cargados exitosamente desde Google Apps Script.");
                    } else {
                        console.warn("Los datos de animales del Google Sheet están vacíos o no tienen el formato esperado. Se recurrirá al fallback.");
                    }
                } else {
                    console.warn(`Falló la carga de animales desde Google Sheet (Estado: ${sheetResponse.status}). Se recurrirá al fallback.`);
                }
            } else {
                console.log("URL de Google Apps Script para animales no configurada o es la de ejemplo. Se usará la configuración local como fallback.");
            }

            // Si la carga desde Apps Script falló o no dio resultados, recurre a animales.json local
            if (animalsToProcess.length === 0) {
                console.log("Cargando animales desde data/animales.json local como fallback.");
                const localResponse = await fetch('data/animales.json');
                if (!localResponse.ok) {
                    throw new Error(`HTTP error! status: ${localResponse.status} al cargar data/animales.json`);
                }
                animalsToProcess = await localResponse.json();
                source = "local (data/animales.json)";
            }

            // Filtrar animales que NO están adoptados (se aplica a datos de Apps Script o locales)
            const availableAnimals = animalsToProcess.filter(animal => !animal.isAdopted);

            // Determinar qué animales mostrar finalmente según el 'type' solicitado
            const animalsToDisplay = type === 'featured' ?
                                     availableAnimals.filter(animal => animal.featured) :
                                     availableAnimals;

            targetGrid.innerHTML = ''; // Limpiar la cuadrícula

            if (animalsToDisplay.length === 0) {
                targetGrid.innerHTML = `<p>No hay animales disponibles en este momento (${source}).</p>`;
                return;
            }

            animalsToDisplay.forEach(animal => {
                createAnimalCard(targetGrid, animal);
            });

        } catch (error) {
            console.error(`Error al cargar los animales desde ${source}:`, error);
            targetGrid.innerHTML = `<p>Lo sentimos, no pudimos cargar los animales en este momento. Por favor, inténtelo de nuevo más tarde (Fuente: ${source}).</p>`;
        }
    }

    // --- Lógica de Carga de Contenido al Cargar la Página ---
    // Envolvemos la carga de config y animals en una función async IIFE (Immediately Invoked Function Expression)
    // para poder usar await y asegurar que config esté disponible antes de loadAnimals.
    (async () => {
        const config = await loadConfig(); // Espera a que la configuración se cargue

        // Luego los animales, si la configuración se cargó correctamente
        if (config) {
            if (featuredAnimalGrid) {
                loadAnimals('featured', featuredAnimalGrid, config.appsScriptAnimalsUrl); // Pasa la URL a loadAnimals
            } else if (allAnimalsGrid) {
                loadAnimals('all', allAnimalsGrid, config.appsScriptAnimalsUrl); // Pasa la URL a loadAnimals
            }
        }
    })();
});
