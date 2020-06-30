'use strict';

// get item tags from html
var images = document.getElementsByTagName('img');

// initial blank array and indexes for items
var firstItemIndex = 0;
var secondItemIndex = 1;
var thirdItemIndex = 2;
var allItems = [];
var maxVotes = 25;

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
new Item('Dog Duck Bill','img/dog-duck.jpg');

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
  while ((firstItemIndex === nextFirstItemIndex) || (nextSecondItemIndex === nextFirstItemIndex)){
    nextFirstItemIndex = Math.floor(Math.random() * allItems.length);
  }

  // Make sure the SECOND item on the page is not repeated and is not the same as the other two images
  while ((secondItemIndex === nextSecondItemIndex) || (nextThirdItemIndex === nextSecondItemIndex)){
    nextSecondItemIndex = Math.floor(Math.random() * allItems.length);
  }

  // Make sure the THIRD item on the page is not repeated and is not the same as the other two images
  while ((thirdItemIndex === nextThirdItemIndex) || (nextFirstItemIndex === nextThirdItemIndex)){
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
  allItems[secondItemIndex].timeShown++;

  if(totalClickCount >= maxVotes){
    var resultsList = document.getElementById('votedList');
    for(var i =0; i < allItems.length; i++){
      var bMallItem = document.createElement('li');
      bMallItem.textContent = `${allItems[i].itemName} was clicked on ${allItems[i].itemClicks} times and was shown ${allItems[i].timeShown} times.`;
      resultsList.appendChild(bMallItem);
    }
    for(i = 0; i < images.length; i++){
      images[i].removeEventListener('click', imageClick);
    }
  }
}// close function

// Event listener
for(var i = 0; i< images.length; i++){
  images[i].addEventListener('click', imageClick);
}
