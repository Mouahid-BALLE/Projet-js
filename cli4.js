const readline = require('readline');
const { exec } = require('child_process');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let exitCli = false;
process.stdin.on('keypress', (_, key) => {
    if (key && key.ctrl && key.name === 'p') {
        exitCli = true;
        rl.close();
    }
});

async function execCommand(laCommande) {
    return new Promise((resolve, reject) => {
        if (laCommande === 'lp') {
            laCommande = 'tasklist';
        } else if (laCommande.slice(0, 4) === 'bing') {
            laCommande = `TASKKILL /PID ${laCommande.slice(5)}`;
        }
        exec(laCommande, (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }
            resolve({stdout, stderr});
        });
    });
}

async function main() {
    console.log('Bienvenue sur votre CLI');

    while (!exitCli) {
        try {
            let response = await new Promise(resolve => rl.question('> ', resolve));
            let result = await execCommand(response);
            console.log(result.stdout);
        } catch (error) {
            console.error(error);
        }
    }
}

main();
