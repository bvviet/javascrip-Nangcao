const game = {
    team1: "Bayern Munich",
    team2: "Borussia Dortmund",
    player: [
        [
            "Manuel Neuer",
            "Alphonso Davies",
            "Lucas Hernandez",
            "Niklas Süle",
            "Benjamin Pavard",
            "Joshua Kimmich",
            "Leon Goretzka",
            "Thomas Müller",
            " Robert Lewandowski",
            "Kingsley Coman",
            " Leroy Sané",
        ],
        [
            "Gregor Kobel",
            "Thomas Meunier",
            "Manuel Akanji",
            "Mats Hummels",
            "Raphaël Guerreiro",
            "Axel Witsel",
            "Jude Bellingham",
            "Mahmoud Dahoud",
            " Marco Reus",
            "Erling Haaland",
            "Thorgan Hazard",
        ],
    ],
    score: "4:0",
    scored: ["Joshua Kimmich", "Thomas Müller", " Robert Lewandowski", " Leroy Sané"],
    date: "Nov 9th, 2037",
    odds: {
        team1: 1.33,
        x: 3.25,
        team2: 6.5,
    },
};

// 1. Tạo ra 1 mảng cầu thủ cho mỗi đội (variables 'players1' and 'players2')
const [players1, players2] = game.player;
console.log(players1, players2);

// 2
const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);

// 3. Tạo 1 mảng 'allPlayers' bao gồm toàn bộ 22 cầu thủ trên sân
const allPlayers = [...players1, ...players2];
console.log(allPlayers);

// 4
const players1Final = [...players1, "Thiago", "Coutinho", "Perisic"];
console.log(players1Final);

// 5
const {
    odds: { team1, x: draw, team2 },
} = game;
console.log(team1, draw, team2);

// 6
const printGoals = (...players) => {
    console.log(players);
    console.log(`${players.length} goals were score`);
};

printGoals(...game.scored);

// 7
team1 < team2 && console.log("team 1 là đội chiến thắng");
team1 > team2 && console.log("team 2 là đội chiến thắng");

// LAB1.2:
// 1
const { scored } = game;
for (const [index, player] of scored.entries()) {
    console.log(`Goal ${index}: ${player}`);
}

// 2
const odds = Object.values(game.odds);
let avg = 0;
for (const odd of odds) avg += odd;
avg /= odds.length;
console.log(avg);

// 3
for (const [team, odd] of Object.entries(game.odds)) {
    const teamStr = team == "x" ? "draw" : `victory ${game[team]}`;
    console.log(`Odd of ${teamStr} ${odd}`);
}
