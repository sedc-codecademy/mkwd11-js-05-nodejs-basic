
//FILESYSTEM LIBRARY IN NODEJS REQUIRED TO WORK WITH FILES ON LOCAL SYSTEM STORAGE
const fs = require('fs');

// const path = './novFajlNekakov.txt';
// //write file
// fs.writeFileSync(path, 'Hello from Node.js')

// //read file
// const data = fs.readFileSync(path, { encoding: "utf-8" });

// //append file
// fs.appendFileSync(path,'appended some content')

// const data2 = fs.readFileSync(path, { encoding: "utf-8" });
// console.log(data2);

//DELETE
// fs.unlinkSync(path)
// const data3 = fs.readFileSync(path, { encoding: "utf-8" });

// console.log(data3);

const path = './someJson.json';

const someObject = {
    name: 'hehe',
    age: 5,
}

fs.writeFileSync(path, JSON.stringify(someObject));

const objectFromFile = JSON.parse(fs.readFileSync(path, { encoding: 'utf-8' }))
objectFromFile.isDead = false;

fs.writeFileSync(path, JSON.stringify(objectFromFile));


const interval = setInterval(() => {
    const objectFromFile = JSON.parse(fs.readFileSync(path, { encoding: 'utf-8' }))
    console.log(objectFromFile.name, objectFromFile.isDead);
}, 1000)

setTimeout(() => {
    const objectFromFile = JSON.parse(fs.readFileSync(path, { encoding: 'utf-8' }))
    objectFromFile.isDead = true;
    fs.writeFileSync(path, JSON.stringify(objectFromFile));
    console.log(objectFromFile.name, objectFromFile.isDead);

    //UNCOMMENT THIS TO STOP EXECUTING THE INTERVAL I.E. CLEAR THE INTERVAL
    // clearInterval(interval);
}, 5000)


//CTRL + C in terminal to stop executing the script






