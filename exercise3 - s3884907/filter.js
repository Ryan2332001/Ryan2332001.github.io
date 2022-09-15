function filterCategory(filterSelection, filterBy){ 
    let itemsToFiler = Array.from (document.getElementsByClassName("RecipeCardWrapper")); //to acquire an array of the items on the page //
                        //create Array from the list of elements// 

    for(let listitem of itemsToFiler){   
        //the collection of items allow running code on every single thing, instead of having to run a different line of Variables.//
      if(listitem.dataset[filterSelection] === filterBy){
        //The If statement examines anything in the FilterSelection and determines whether or not to execute the block of code (display the  RecipeCardWrapper) depending on whether or not that assertion is true.//

         listitem.style.display="flex";

      } else{        
         listitem.style.display="none";
      }
    }
}

