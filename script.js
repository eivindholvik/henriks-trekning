const eleNumOfBooks = document.querySelector("#numOfBooks");
const eleBooks = document.querySelector(".books");
const eleSubmit = document.querySelector(".submit");

eleNumOfBooks.value = 0;
let currentNumOfBooks = eleNumOfBooks.value;

const drawPrizes = (bookss, numberOfPrizess) => {
  let numberOfPrizes = numberOfPrizess;

  const books = bookss;

  console.log(books);

  // [
  //   { color: "blue", numberOfTicets: 100 },
  //   { color: "purple", numberOfTicets: 100 },
  //   { color: "pink", numberOfTicets: 100 },
  //   { color: "green", numberOfTicets: 100 },
  // ];
  const tickets = [];
  const winners = [];

  books.forEach((ele) => {
    console.log("1");
    for (let i = 1; i <= ele.numberOfTickets; i++) {
      console.log("2");
      tickets.push({ color: ele.color, number: i, letter: ele.letter });
    }
  });

  console.log(tickets);
  console.log(numberOfPrizes);

  if (
    numberOfPrizes === undefined ||
    isNaN(numberOfPrizes) ||
    numberOfPrizes === ""
  ) {
    numberOfPrizes = Math.floor(tickets.length / 15);
  }

  for (let i = 0; i < numberOfPrizes; i++) {
    winners.push(
      tickets.splice(Math.floor(Math.random() * tickets.length), 1)[0]
    );
  }
  console.log(tickets);
  console.log(winners);
  return winners;
};

const newBook = document.createElement("DIV");
newBook.innerHTML = `<label for="color">Color:</label>
<input type="text" id="color" name="color" value="" />
<label for="numOfTickets">Number of tickets:</label>
<input type="number" id="numOfTickets" name="numOfTickets" value="100" />
<label for="letter">Letter:</label>
<input type="text" id="letter" name="letter" value="No letter" />`;
// document.body.appendChild(newBook.cloneNode(true));
// document.body.removeChild(document.body.lastElementChild);
// document.body.removeChild(document.body.lastElementChild);
// document.body.removeChild(document.body.lastElementChild);

const manageBooks = (change) => {
  if (isNaN(change) || change === 0) {
    console.log("miss");
    return;
  }
  if (change > 0) {
    for (let i = 0; i < change; i++) {
      eleBooks.appendChild(newBook.cloneNode(true));
    }
    return;
  }
  for (let i = 0; i < Math.abs(change); i++) {
    eleBooks.removeChild(eleBooks.lastElementChild);
  }
};

const renderWinners = (winners) => {
  const eleWinners = document.querySelector(".winners");
  eleWinners.innerHTML = "";
  winners.forEach((winner) => {
    const newWinner = document.createElement("DIV");
    newWinner.classList.add("winner");
    newWinner.style = `background-color: ${winner.color}`;
    newWinner.innerHTML = `<div class="header"><h2>${winner.number}</h2><h3>${winner.letter}</h3></div>`;
    eleWinners.appendChild(newWinner);
  });
};

console.log(eleNumOfBooks);
eleNumOfBooks.addEventListener("change", (e) => {
  if (eleNumOfBooks.value < 0) eleNumOfBooks.value = 0;
  console.log(eleNumOfBooks.value);
  const change = eleNumOfBooks.value - currentNumOfBooks;
  manageBooks(change);
  currentNumOfBooks = eleNumOfBooks.value;
});

eleSubmit.addEventListener("click", (e) => {
  e.preventDefault();

  const colorList = [
    ...document.querySelector(".books").querySelectorAll("#color"),
  ];
  const numOfTicketsList = [
    ...document.querySelector(".books").querySelectorAll("#numOfTickets"),
  ];
  const letterList = [
    ...document.querySelector(".books").querySelectorAll("#letter"),
  ];

  const bookList = [];

  colorList.forEach((color, index) => {
    bookList.push({
      color: color.value,
      numberOfTickets: numOfTicketsList[index].value,
      letter: letterList[index].value,
    });
  });

  const winners = drawPrizes(
    bookList,
    !isNaN(document.querySelector("#numOfPrizes").value)
      ? document.querySelector("#numOfPrizes").value
      : undefined
  );

  renderWinners(winners);
});
