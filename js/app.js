'use strict';

// get item tags from html
var images = document.getElementsByTagName('img');

// initial blank array and indexes for items
var firstItemIndex = 0;
var secondItemIndex = 1;
var thirdItemIndex = 2;
var allItems = [];
var maxVotes = 25;

var percentagesArray = [];

function Item(itemName, itemSource){
  this.itemName = itemName;
  this.itemSource = itemSource;
  this.itemClicks = 0;
  this.timeShown = 0;
  allItems.push(this);
}

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
new Item('Univorn Meat', 'img/unicorn.jpg');
new Item('Tentacle USB', 'img/usb.gif');
new Item('Self Watering Can', 'img/water-can.jpg');
new Item('Wine Glass', 'img/wine-glass.jpg');

var totalClickCount = 0;

function imageClick(event){
  totalClickCount++;
  if(event.srcElement.id === 'imgOne'){
    allItems[firstItemIndex].itemClicks++;}//close if
  else if(event.srcElement.id === 'imgTwo'){
    allItems[secondItemIndex].itemClicks++;
  } else if(event.srcElement.id === 'imgThree'){
    allItems[thirdItemIndex].itemClicks++;
  }//close else if

  // Get random image from array
  var nextFirstItemIndex = Math.floor(Math.random() * allItems.length);
  var nextSecondItemIndex = Math.floor(Math.random() * allItems.length);
  var nextThirdItemIndex = Math.floor(Math.random() * allItems.length);

  // Make sure the FIRST item on the page is not repeated and is not the same as the other two images
  while ((firstItemIndex === nextFirstItemIndex) || (nextSecondItemIndex === nextFirstItemIndex || nextThirdItemIndex === nextFirstItemIndex)){
    nextFirstItemIndex = Math.floor(Math.random() * allItems.length);
  }

  // Make sure the SECOND item on the page is not repeated and is not the same as the other two images
  while ((secondItemIndex === nextSecondItemIndex) || (nextThirdItemIndex === nextSecondItemIndex || nextFirstItemIndex === nextSecondItemIndex)){
    nextSecondItemIndex = Math.floor(Math.random() * allItems.length);
  }

  // Make sure the THIRD item on the page is not repeated and is not the same as the other two images
  while ((thirdItemIndex === nextThirdItemIndex) || (nextFirstItemIndex === nextThirdItemIndex || nextSecondItemIndex === nextThirdItemIndex)){
    nextThirdItemIndex = Math.floor(Math.random() * allItems.length);
  }

  firstItemIndex = nextFirstItemIndex;
  secondItemIndex = nextSecondItemIndex;
  thirdItemIndex = nextThirdItemIndex;

  //Pick a random item from array
  images[0].src = allItems[firstItemIndex].itemSource;
  allItems[firstItemIndex].timeShown++;
  images[1].src = allItems[secondItemIndex].itemSource;
  allItems[secondItemIndex].timeShown++;
  images[2].src = allItems[thirdItemIndex].itemSource;
  allItems[thirdItemIndex].timeShown++;

  if(totalClickCount >= maxVotes){
    var resultsList = document.getElementById('votedList');
    for(var i =0; i < allItems.length; i++){
      var bMallItem = document.createElement('li');
      var clickPercentage = Math.round(allItems[i].itemClicks / allItems[i].timeShown * 100);
      if (allItems[i].timeShown < 1){
        clickPercentage = 0;
      }
      bMallItem.textContent = `${allItems[i].itemName} was clicked on ${allItems[i].itemClicks} times and was shown ${allItems[i].timeShown} times. Choosen ` + clickPercentage + '%.';
      resultsList.appendChild(bMallItem);
      //Calculate percentages
      percentagesArray.push(clickPercentage);
      console.log(percentagesArray);
    }
    for(i = 0; i < images.length; i++){
      images[i].removeEventListener('click', imageClick);
    }
  }
}// close image construction function

//Create function for the chart render so that we can access the object properties.
function getItemArray(itemProperty){
  var answer = [];
  for(var j = 0; j < allItems.length; j++){
    answer[j] = allItems[j][itemProperty];
  }
  console.log(answer);
  return answer;
}


// Chart function
function runChart() {

  var ctx = document.getElementById('itemChart').getContext('2d');

  var itemChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: getItemArray('itemName'),
      datasets: [{
        label: '# of Votes',
        data: getItemArray('timesClicked'),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
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
