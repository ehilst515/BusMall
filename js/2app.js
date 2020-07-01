'use strict';
// get item tags from html
var images = document.getElementsByTagName('img');
// initial blank array and indexes for items
var firstItemIndex = 0;
var secondItemIndex = 1;
var thirdItemIndex = 2;
var allItems = [];
var maxVotes = 25;
// var percentagesArray = [];
function Item(itemName, itemSource, itemClicks, timeShown){
  this.itemName = itemName;
  this.itemSource = itemSource;
  if(itemClicks){
    this.itemClicks = itemClicks;
  } else {
    this.itemClicks = 0;
  }
  if(timeShown){
    this.timeShown = timeShown;
  } else {
    this.timeShown = 0;
  }
  allItems.push(this);
}
//Create function for the chart render so that we can access the object properties.
function getItemArray(itemProperty){
  var answer = [];
  for(var j = 0; j < allItems.length; j++){
    answer[j] = allItems[j][itemProperty];
  }
  console.log(answer);
  return answer;
}
// Check for local storage and get info if it exists
var savedVotesString = localStorage.getItem('savedItems');
if(savedVotesString){
  var arrayOfNotVoteObject = JSON.parse(savedVotesString);
  console.log('savedVotesStringParsed ', arrayOfNotVoteObject);
  for(var j = 0; j < arrayOfNotVoteObject.length; j++){
    new Item(arrayOfNotVoteObject[j].itemName,
      arrayOfNotVoteObject[j].itemSource,
      arrayOfNotVoteObject[j].itemClicks,
      arrayOfNotVoteObject[j].timeShown);
  }
} else {
// Create item objects
  new Item('Starwars Bag', 'img/bag.jpg');
  new Item('Banana Slicer', 'img/banana.jpg');
  new Item('Bathroom Stand', 'img/bathroom.jpg');
  new Item('Open Toe Boots', 'img/boots.jpg');
  new Item('Breakfast Maker', 'img/breakfast.jpg');
  new Item('Chair', 'img/chair.jpg');
  new Item('Meatball Bublegum', 'img/bubblegum.jpg');
  new Item('Cthulhu Toy', 'img/cthulhu.jpg');
  new Item('Dog Duck Bill', 'img/dog-duck.jpg');
  new Item('Dragon Meat', 'img/dragon.jpg');
  new Item('Pen Utensils', 'img/pen.jpg');
  new Item('Pet Sweep', 'img/pet-sweep.jpg');
  new Item('Pizza Scissors', 'img/scissors.jpg');
  new Item('Shark Sleeping Bag', 'img/shark.jpg');
  new Item('Baby Sweep', 'img/sweep.png');
  new Item('Tauntaun Sleeping Bag', 'img/tauntaun.jpg');
  new Item('Unicorn Meat', 'img/unicorn.jpg');
  new Item('Tentacle USB', 'img/usb.gif');
  new Item('Self Watering Can', 'img/water-can.jpg');
  new Item('Wine Glass', 'img/wine-glass.jpg');
}
allItems[0].timeShown = 1;
allItems[1].timeShown = 1;
allItems[2].timeShown = 1;
var totalClickCount = 0;
function imageClick(event){
  totalClickCount++;
  console.log('total click count: ', totalClickCount);
  if(event.srcElement.id === 'imgOne'){
    allItems[firstItemIndex].itemClicks++;
  } else if(event.srcElement.id === 'imgTwo'){
    allItems[secondItemIndex].itemClicks++;
  } else if(event.srcElement.id === 'imgThree'){
    allItems[thirdItemIndex].itemClicks++;
  }
  // Get random image from array
  var nextFirstItemIndex = Math.floor(Math.random() * allItems.length);
  // Make sure the FIRST item on the page is not repeated and is not the same as the other two images
  while ((firstItemIndex === nextFirstItemIndex) || (nextSecondItemIndex === nextFirstItemIndex || nextThirdItemIndex === nextFirstItemIndex)){
    nextFirstItemIndex = Math.floor(Math.random() * allItems.length);
  }
  var nextSecondItemIndex = Math.floor(Math.random() * allItems.length);
  // Make sure the SECOND item on the page is not repeated and is not the same as the other two images
  while ((secondItemIndex === nextSecondItemIndex) || (nextThirdItemIndex === nextSecondItemIndex || nextFirstItemIndex === nextSecondItemIndex)){
    nextSecondItemIndex = Math.floor(Math.random() * allItems.length);
  }
  var nextThirdItemIndex = Math.floor(Math.random() * allItems.length);
  // Make sure the THIRD item on the page is not repeated and is not the same as the other two images
  while ((thirdItemIndex === nextThirdItemIndex) || (nextFirstItemIndex === nextThirdItemIndex || nextSecondItemIndex === nextThirdItemIndex)){
    nextThirdItemIndex = Math.floor(Math.random() * allItems.length);
  }

  firstItemIndex = nextFirstItemIndex;
  secondItemIndex = nextSecondItemIndex;
  thirdItemIndex = nextThirdItemIndex;

  //Pick a random item from array
  images[0].src = allItems[firstItemIndex].itemSource;
  images[1].src = allItems[secondItemIndex].itemSource;
  images[2].src = allItems[thirdItemIndex].itemSource;
  allItems[firstItemIndex].timeShown++;
  allItems[secondItemIndex].timeShown++;
  allItems[thirdItemIndex].timeShown++;

  if(totalClickCount >= maxVotes){
    localStorage.setItem('savedItems', JSON.stringify(allItems));
    allItems[firstItemIndex].timeShown++;
    allItems[secondItemIndex].timeShown++;
    allItems[thirdItemIndex].timeShown++;
    var resultsList = document.getElementById('votedList');
    for(var i =0; i < allItems.length; i++){
      var bMallItem = document.createElement('li');
      if(allItems[i].itemClicks === 0){
        var clickPercentage = '0';
      } else {
        clickPercentage = Math.round(( Number(`${allItems[i].itemClicks} `)/ (Number(`${allItems[i].timeShown}`)) * 100));
      }
      bMallItem.textContent = `${allItems[i].itemName} was clicked on ${allItems[i].itemClicks} times and was shown ${allItems[i].timeShown} times. Choosen ` + clickPercentage + '% of times available.';
      resultsList.appendChild(bMallItem);
    }
    for(i = 0; i < images.length; i++){
      images[i].removeEventListener('click', imageClick);
    }
    runChart();
    // Save data to local storage
  }// close total counts if loop
}// close image construction function
// Chart function
function runChart() {
  var ctx = document.getElementById('itemChart').getContext('2d');
  // eslint-disable-next-line no-unused-vars
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: getItemArray('itemName'),
      datasets: [{
        label: '# of Votes',
        data: getItemArray('itemClicks'),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}//close chart function
// Event listener
for(var i = 0; i < images.length; i++){
  images[i].addEventListener('click', imageClick);
}
