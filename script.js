    // Fonction pour prévisualiser l'image sélectionnée
	function previewImage(event) {
		const image = document.getElementById('characterImage');
		const file = event.target.files[0];
		
		if (file) {
			const reader = new FileReader();
			reader.onload = function (e) {
				image.src = e.target.result;
				image.crossOrigin = "anonymous"; // Ensures CORS is set when loading
				image.style.display = 'block';
			};
			reader.readAsDataURL(file);
		}
	}


	// Function to download the content of the page as a PDF
	document.getElementById('downloadPDF').addEventListener('click', () => {
		const element = document.body; // Assurez-vous que l'élément capturé est bien celui désiré

		// Configuration des options pour générer le PDF
		const options = {
			margin: 0,
			filename: 'Page_Complete.pdf',
			image: { type: 'jpeg', quality: 0.98 },
			html2canvas: {
				scale: 2, // Augmentez ou ajustez l'échelle selon les besoins
				useCORS: true,
				windowWidth: window.innerWidth, // Utilise la largeur complète de la fenêtre
				windowHeight: window.innerHeight // Utilise la hauteur complète de la fenêtre
			},
			jsPDF: { unit: 'px', format: [window.innerWidth, window.innerHeight], orientation: 'portrait' }
		};

		// Génère et enregistre le PDF
		html2pdf().from(element).set(options).save();
	});



    // Fonction pour enregistrer les valeurs des inputs en JSON
    document.getElementById('saveJSON').addEventListener('click', () => {
        const inputs = document.querySelectorAll('input[type="number"], input[type="text"]');
        let data = {};

        // Capture les valeurs de tous les inputs et les ajoute à l'objet data
        inputs.forEach(input => {
            if (input.name || input.id) {  // Vérifie que l'input a un name ou un id
                data[input.name || input.id] = input.value; // Utilise l'attribut name ou id pour identifier chaque input
            }
        });

        // Convertit l'objet en JSON et télécharge le fichier
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'data.json';
        link.click();
    });

    // Fonction pour charger les valeurs des inputs depuis un fichier JSON
    document.getElementById('loadJSON').addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                const data = JSON.parse(e.target.result);
                const inputs = document.querySelectorAll('input[type="number"], input[type="text"]');

                // Remplit les inputs avec les valeurs chargées depuis le fichier JSON
                inputs.forEach(input => {
                    if (input.name || input.id) {  // Vérifie que l'input a un name ou un id
                        if (data[input.name || input.id] !== undefined) {
                            input.value = data[input.name || input.id];
                        }
                    }
                });
            } catch (error) {
                console.error('Erreur lors de la lecture du fichier JSON :', error);
                alert('Le fichier JSON est invalide ou corrompu.');
            }
        };

        reader.readAsText(file);
    });

    // Fonction pour ajouter une ligne dans le tableau de l'inventaire
    document.getElementById('addRowBtn').addEventListener('click', function () {
        const table = document.getElementById('inventoryTable').getElementsByTagName('tbody')[0];
        const rowCount = table.rows.length + 1;

        const row = table.insertRow();
        row.innerHTML = `
            <td><input type="text" id="inv-item-${rowCount}-name" name="inv-item-${rowCount}-name" placeholder="-"></td>
            <td><input type="number" id="inv-item-${rowCount}-weight" name="inv-item-${rowCount}-weight" min="0" placeholder="0"></td>
            <td><input type="number" id="inv-item-${rowCount}-price" name="inv-item-${rowCount}-price" min="0" placeholder="0"></td>
            <td><input type="text" id="inv-item-${rowCount}-desc" name="inv-item-${rowCount}-desc" placeholder="-"></td>
        `;
    });
	
	// Fonction pour ajouter une ligne dans le tableau des Techniques Martiales
	document.getElementById('addMartialRowBtn').addEventListener('click', function () {
				const table = document.getElementById('martialTechniquesTable').getElementsByTagName('tbody')[0];
				const rowCount = table.rows.length + 1;

				const row = table.insertRow();
				row.innerHTML = `
					<td><input type="text" id="martial-tech-${rowCount}-name" name="martial-tech-${rowCount}-name" placeholder="-"></td>
					<td><input type="text" id="martial-tech-${rowCount}-level" name="martial-tech-${rowCount}-level" placeholder="-"></td>
					<td><input type="text" id="martial-tech-${rowCount}-cost" name="martial-tech-${rowCount}-cost" placeholder="-"></td>
					<td><input type="text" id="martial-tech-${rowCount}-desc" name="martial-tech-${rowCount}-desc" placeholder="-"></td>
				`;
			});	

	// Fonction pour ajouter une ligne dans le tableau des Sorts Manaëiques
	document.getElementById('addSpellRowBtn').addEventListener('click', function () {
		const table = document.getElementById('manaSpellsTable').getElementsByTagName('tbody')[0];
		const rowCount = table.rows.length + 1;

		const row = table.insertRow();
		row.innerHTML = `
			<td><input type="text" id="spell-${rowCount}-name" name="spell-${rowCount}-name" placeholder="-"></td>
			<td><input type="text" id="spell-${rowCount}-level" name="spell-${rowCount}-level" placeholder="-"></td>
			<td><input type="text" id="spell-${rowCount}-cost" name="spell-${rowCount}-cost" placeholder="-"></td>
			<td><input type="text" id="spell-${rowCount}-desc" name="spell-${rowCount}-desc" placeholder="-"></td>
		`;
	});
	
	// Fonction pour ajouter une ligne dans le tableau des Talent générique
	document.getElementById('addTalentRowBtn').addEventListener('click', function () {
		const table = document.getElementById('talentgenerique').getElementsByTagName('tbody')[0];
		const rowCount = table.rows.length + 1;

		const row = table.insertRow();
		row.innerHTML = `
			<td><input type="text" id="talent-${rowCount}-name" name="talent-${rowCount}-name" placeholder="-"></td>
			<td><input type="text" id="talent-${rowCount}-level" name="talent-${rowCount}-level" placeholder="-"></td>
			<td><input type="text" id="talent-${rowCount}-cost" name="talent-${rowCount}-cost" placeholder="-"></td>
			<td><input type="text" id="talent-${rowCount}-desc" name="talent-${rowCount}-desc" placeholder="-"></td>
		`;
	});			
	
	// Script pour afficher le pop-up d'aide
	document.getElementById('helpButton').addEventListener('click', () => {
		document.getElementById('helpPopup').style.display = 'block';
	});

	// Script pour fermer le pop-up
	document.getElementById('closePopup').addEventListener('click', () => {
		document.getElementById('helpPopup').style.display = 'none';
	});

	// Fermer le pop-up quand on clique à l'extérieur
	window.addEventListener('click', (event) => {
		const popup = document.getElementById('helpPopup');
		if (event.target === popup) {
			popup.style.display = 'none';
		}
	});


	// Crée une nouvelle image pour le background
	const img = new Image();
	img.src = 'images/BACKGROUND.webp';
	img.crossOrigin = 'anonymous'; // Assure la conformité CORS
	img.onload = function() {
		// Applique l'image de fond et les styles nécessaires
		document.body.style.backgroundImage = `url(${img.src})`;
		document.body.style.backgroundSize = 'contain'; // Définit l'image de fond à couvrir toute la page
		document.body.style.margin = '0';
		document.body.style.display = 'flex';
		document.body.style.justifyContent = 'center';
		document.body.style.alignItems = 'center';
		document.body.style.height = 'auto';
		document.body.style.fontFamily = 'Arial, sans-serif';
		document.body.style.backgroundColor = '#f8f4e3'; // Couleur de fond au cas où l'image ne charge pas
		document.body.style.color = '#333';
		document.body.style.padding = '20px'; // Ajoute de l'espace pour le cadre
		document.body.style.boxSizing = 'border-box';
    		document.body.style.backgroundAttachment = 'fixed'; // Fixe l'image en arrière-plan


	};
	
	particlesJS('particles-js', {
    "particles": {
        "number": {
            "value": 80, // Ajuste le nombre de particules
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": ["#ff4500", "#ff8c00", "#ffd700"] // Couleurs pour simuler des flammes
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
        },
        "opacity": {
            "value": 0.7,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 1,
                "opacity_min": 0.3,
                "sync": false
            }
        },
        "size": {
            "value": 5,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 5,
                "size_min": 1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": false
        },
        "move": {
            "enable": true,
            "speed": 6,
            "direction": "top",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": false
            },
            "onclick": {
                "enable": false
            },
            "resize": true
        }
    },
    "retina_detect": true
});
