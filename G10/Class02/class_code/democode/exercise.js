const fs = require('fs');
const path = require('path');

const tasksPath = path.join(__dirname, 'tasks.json');
const tasksJsonData = JSON.parse(fs.readFileSync(tasksPath));
tasksJsonData.push({
    id: 'some id',
    task: 'Vjezbaj pizda ti materina',
    isFinished: false
})
fs.writeFileSync(tasksPath, JSON.stringify(tasksJsonData))