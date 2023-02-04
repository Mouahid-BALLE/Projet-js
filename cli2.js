const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("Welcome to the CLI app!");

async function getName() {
  return new Promise(resolve => {
    /*rl.question("", (name) => {
      resolve(name);
    });*/
    console.log("vous avez tapé if");
  });
}

async function getAge() {
  return new Promise(resolve => {
    rl.question("What's your age? ", (age) => {
      resolve(age);
    });
  });
}

async function main() {
  
  /*while(true){ 
    const name = await getName();
    console.log(`Hello, ${name}!`);
    const age = await getAge();
    console.log(`You are ${age} years old.`);}*/
    
    console.log("Bienvenue sur votre CLI");
    const readline = require('readline');
    const prompts = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: true
    });

    (async function() {
        while (true) {
            let response = await new Promise(resolve => prompts.question('Vous : ', resolve));
            switch (response.toLocaleLowerCase()) {
                case 'aide':
                    console.log('ca marche');
                    break;
                case 'if':
                  const name = await getName();
                  console.log(`Hello, ${name}!`);
                    break;
                case 'while':
                    console.log();
                    break;
                case 'exit':
                    console.log("Au revoir!");
                    process.exit();
                    break;
                default:
                    console.log("pas compris");
                    break;
            }
        }
    })();
  
}

main();