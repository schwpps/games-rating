const fs = require('fs').promises;
const { getRandomGame } = require('../appModules/api');
const { config } = require('../appModules/rating');

async function gameRouteController(res) {
    try {
        console.log(config.PATH_TO_RATING_FILE);
        const ratingFile = await fs.readFile(config.PATH_TO_RATING_FILE, 'utf8');
        const data = JSON.parse(ratingFile);
        const game = getRandomGame(data);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(game));
    } catch (error) {
        res.statusCode = 500;
        res.end('Internal Server Error');
        console.log(error);
    }
}

module.exports = gameRouteController;
