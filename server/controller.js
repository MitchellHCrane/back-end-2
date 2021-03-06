const houses = require("./db.json");
let houseId = 4;

module.exports = {
  getHouses: (req, res) => res.status(200).send(houses),
  deleteHouse: (req, res) => {
    const index = houses.findIndex((elem) => elem.id === +req.params.id);
    houses.splice(index, 1);
    res.status(200).send(houses);
  },
  createHouse: (req, res) => {
    const { address, price, imageURL } = req.body;
    const newHouse = { id: houseId, address, price, imageURL };
    houses.push(newHouse);
    res.status(200).send(houses);
    houseID++;
  },
  updateHouse: (req, res) => {
    const index = houses.findIndex((elem) => elem.id === +req.params.id);
    const { type } = req.body;
    if (type === "plus") {
      houses[index].price += 10000;
      res.status(200).send(houses);
    } else if (type === "minus" && houses[index].price >= 10000) {
      houses[index].price -= 10000;
      res.status(200).send(houses);
    } else {
      res.status(400).send({ error: "cannot update price" });
    }
  },
};
