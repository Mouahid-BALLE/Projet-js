// Imprime un message de bienvenue pour l'utilisateur
console.log("Bienvenue sur votre CLI");

// Importe le module 'readline' pour utiliser les fonctionnalités de ligne de commande
const readline = require('readline');

// Crée un objet 'prompts' pour interagir avec l'utilisateur via la console
const prompts = readline.createInterface(process.stdin, process.stdout);

// Demande à l'utilisateur une saisie dès le début
prompts.prompt();

// Ecoute l'événement 'line' qui se déclenche lorsque l'utilisateur saisit une réponse
prompts.on('line', (response) => {
    // Convertit la réponse en minuscule pour faciliter la comparaison
    switch (response.toLocaleLowerCase()) {
        // Si la réponse est "aide"
        case 'aide':
            // Imprime un message indiquant que l'aide est disponible
            console.log('ca marche');
            break;

        // Si la réponse est "if"
        case 'if':
            console.log();
            break;

        // Si la réponse est "while"
        case 'while':
            console.log();
            break;

        // Si aucune des réponses précédentes n'a été donnée
        default:
            // Imprime un message indiquant que la réponse n'a pas été comprise
            console.log("pas compris");
            break;
    }
    // Continue à interagir avec l'utilisateur pour une prochaine réponse
    prompts.prompt();
});
