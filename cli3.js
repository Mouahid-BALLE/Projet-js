const readline = require('readline');
const keypress = require('keypress');
const { exec } = require('child_process');
const prompts = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

keypress(process.stdin);

process.stdin.on('keypress', (ch, key) => {
    if (key && key.ctrl && key.name === 'p') {   
        process.exit();
    }
});

async function getEnter(){
     return new Promise(resolve => prompts.question('> ', resolve));
}

async function execCommand(laCommande) {
    return new Promise((resolve, reject) => {

        if(laCommande=='lp'){
            exec('tasklist', (error, stdout, stderr) => {
                if (error) {    
                reject(error);
                return;
                }
                resolve({stdout, stderr});    
            });
        }else if(laCommande.slice(0,4)=='bing'){
            exec('TASKKILL /PID '+laCommande.slice(5), (error, stdout, stderr) => {
                if (error) {    
                reject(error);
                return;
                }
                resolve({stdout, stderr});    
            });
        }else{
            exec(laCommande, (error, stdout, stderr) => {
                if (error) {
                reject(error);
                return;
                }
                resolve({stdout, stderr});    
            });
        }
        
    });
}

async function main() {
    
    console.log("Bienvenue sur votre CLI");

    (async function() {
        
        while (true) {
                let response = await getEnter();
                try {
                    let result = await execCommand(response);
                    console.log(result.stdout);
                } catch (error) {
                    console.error(error);
                }
        }
    })();
  
}

main();
