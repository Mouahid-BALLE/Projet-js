const readline = require('node:readline');
const { exec } = require('child_process');
const os = require("os");

// variable pour quitter la boucle
let exitCli = false;

// une interface readline pour interagir avec l'utilisateur
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// ctrl+p pour quitter le terminal
process.stdin.on('keypress', (_, key) => {
    if (key && key.ctrl && key.name === 'p') {
        exitCli = true;
        rl.close();
    }
});

// les fonctions 
async function execCommand(laCommande) {
    return new Promise((resolve, reject) => {
        if (os.platform() === "win32") {
            if (laCommande === 'lp') {
                laCommande = 'tasklist';
            } else if (laCommande.slice(0, 6) === 'bing-k') {
                laCommande = `taskkill /pid ${laCommande.slice(7)}`;
            }else if (laCommande.slice(0, 5) === 'lance'){
                laCommande =`start ${laCommande.slice(5)}`;
            }else if (!laCommande){
                return reject("");
            }
        } else {
        if (os.platform() === "linux") {
            if (laCommande=== 'lp') {
                laCommande = 'ps -ef';
            } else if (laCommande.slice(0, 6) === 'bing-k') {
                laCommande = `kill ${laCommande.slice(7)}`;
            }else if (laCommande.slice(0, 6) === 'bing-p') {
                laCommande = `kill -19 ${laCommande.slice(7)}`;
            }else if (laCommande.slice(0, 6) === 'bing-c') {
                laCommande = `kill -18 ${laCommande.slice(7)}`;
            }else if (laCommande.slice(0, 5) === 'lance'){
                laCommande =`exec ${laCommande.slice(5)}`;
            }else if (laCommande.slice(-1) === '!'){
                laCommande = laCommande.replace('!','&');
            }else if(laCommande==='aide'){
                console.log("Liste des commandes disponibles:");
                console.log("- lp (Windows) / ps -ef (Linux) : affiche la liste des processus en cours");
                console.log("- bing-k [pid] (Windows) / kill [pid] (Linux) : tue le processus avec l'id [pid]");
                console.log("- bing-p [pid] (Linux uniquement) : envoie le signal SIGSTOP au processus avec l'id [pid]");
                console.log("- bing-c [pid] (Linux uniquement) : envoie le signal SIGCONT au processus avec l'id [pid]");
                console.log("- lance [nom de l'application] : lance  l'application desir??e");
                console.log("- [commande]! (Linux uniquement) : lance l'application en arri??re-plan");
                return reject("");
            }else if (!laCommande){
                return reject("");
            }
        }}
        exec(laCommande, (error, stdout, stderr) => {
            if (error) {
                return reject(error);
            }
            return resolve({stdout, stderr});
        });
    }); 
}
            
async function main() {
    // Afficher un message de bienvenue pour l'utilisateur
    console.log('Bienvenue sur votre CLI, incroyablement performant et optimis?? qui merite surement une tr??s bonne note haha');
    console.log('Tapez aide pour avoir la lise des commandes')

    // Boucle principale pour demander ?? l'utilisateur d'entrer une commande
    while (!exitCli) {
        try {
            // Attendre la r??ponse de l'utilisateur
            let response = await new Promise(resolve => rl.question('> ', resolve));
            // Ex??cuter la commande entr??e par l'utilisateur
            let result = await execCommand(response);

            // Afficher le r??sultat de la commande
            console.log(result.stdout);
        } catch (error) {
            // G??rer les erreurs ??ventuelles
            console.error(error);
        }
    }  

}

main();
