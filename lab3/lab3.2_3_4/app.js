const checkDogs = (dogsJulia, dogsKate) => {
    // 1.
    const dogsJuliaCorrected = dogsJulia.slice();
    dogsJuliaCorrected.splice(0, 1);
    dogsJuliaCorrected.splice(-2);
    console.log(dogsJuliaCorrected);
    // 2.
    const dogs = dogsJuliaCorrected.concat(dogsKate);
    console.log(dogs);
    // 3.
    dogs.forEach((dog, i) => {
        if (dog >= 3) {
            console.log(`Dog number ${i + 1} is an adult, and is ${dog} year old`);
        } else {
            console.log(`Dog number ${i + 1} is still a puppy`);
        }
    });
};

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

console.log("LAB3.3:");

// LAB3.3:
const calcAverageHumanAge = (ages) => {
    // 1
    const humanAges = ages.map((age) => (age <= 2 ? age * 2 : 16 + age * 4));
    console.log(humanAges);
    // 2
    const adults = humanAges.filter((humanAge) => humanAge >= 18);
    console.log(adults);

    // 3
    const average = adults.reduce((acc, age, i, arr) => acc + age / arr.length, 0);

    return average;
};
const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
console.log(avg1);

// LAB3.4:
const dogs = [
    { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
    { weight: 8, curFood: 200, owners: ["Matilda"] },
    { weight: 13, curFood: 275, owners: ["Sarah", "John"] },
    { weight: 32, curFood: 340, owners: ["Michael"] },
];

1;
// 1
dogs.forEach((dog, i) => {
    dog.recFood = dog.weight ** 0.75 * 28;
});
console.log(dogs);

// 2
const dogSarah = dogs.find((dog) => dog.owners.includes("Sarah"));
console.log(dogSarah);
console.log(`Sarah's dog is eating too ${dogSarah.curFood > dogSarah.recFood ? "much" : "little"}`);

// 3
const ownersEatTooMuch = dogs
    .filter((dog) => dog.curFood > dog.recFood)
    .map((dog) => dog.owners)
    .flat();
console.log(ownersEatTooMuch);
const ownersEatTooLittle = dogs
    .filter((dog) => dog.curFood < dog.recFood)
    .map((dog) => dog.owners)
    .flat();
console.log(ownersEatTooLittle);

// 4
console.log(`${ownersEatTooMuch.join(" and ")} dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(" and ")} dogs eat too little!`);

// 5
console.log(dogs.some((dog) => dog.curFood === dog.recFood));

// 6
const checkEatingOkay = (dog) => dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;
console.log(dogs.some(checkEatingOkay));

// 7
console.log(dogs.filter(checkEatingOkay));

// 8
const dogsSorted = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(dogsSorted);

