import {useState} from "react"
import * as React from "react"
// IMPORT ANY NEEDED COMPONENTS HERE
import { createDataSet } from "./data/dataset"
import "./App.css"
import Header from './components/Header/Header'
import Instructions from './components/Instructions/Instructions'
import Chip from './components/Chip/Chip'
import NutritionalLabel from './components/NutritionalLabel/NutritionalLabel'
import { nutritionFacts } from "./constants"



// don't move this!
export const appInfo = {
  title: `Fast Food Feud 🍔!`,
  tagline: `Folks' Favorite Friendly Fuel Finder For Food Facts`,
  description: `Finding healthy food is hard. Sometimes we just settle for what's available. That doesn't mean we shouldn't know what's going into our bodies! Fast Food Feud is here to arm the public with all the nutritional facts needed to make informed decisions about fast food consumption.`,
  dataSource: `All data pulled from the MenuStat.org interactive online database.`,
  instructions: {
    start: `Start by clicking on a food category on the left and a fast food joint from the list above. Afterwards, you'll be able to choose from a list of menu items and see their nutritional content.`,
    onlyCategory: `Now select a fast food restaurant from the list above!`,
    onlyRestaurant: `Now select a category from the list on the left!`,
    noSelectedItem: `Almost there! Choose a menu item and you'll have the fast food facts right at your fingertips!`,
    allSelected: `Great choice! Amazing what a little knowledge can do!`,
  },
}
// or this!
const { data, categories, restaurants } = createDataSet()

export function App() {

  // creating useState hooks
  const [clickedCategory, setClickedCategory] = useState(null);
  const [clickedRestaurant, setClickedRestaurant] = useState(null);
  const [clickedMenuItem, setClickedMenuItem] = useState(null);

  // filtering through data array to retrieve menu items that align with current selected restaurant and food category
  let currentMenuItems = data.filter((obj) => {
    return (obj.restaurant === clickedRestaurant && obj.food_category === clickedCategory)
  });

  let instructions = ""; // empty var to store string of instructions based off of state variables

  if (clickedCategory == null && clickedRestaurant == null && clickedMenuItem == null) { // user hasn't selected anything
    instructions = appInfo.instructions.start
  }
  else if (clickedCategory != null && clickedRestaurant == null && clickedMenuItem == null) { // user only selected category
    instructions = appInfo.instructions.onlyCategory
  }
  else if (clickedCategory == null && clickedRestaurant != null && clickedMenuItem == null) { // user only selected restaurant
    instructions = appInfo.instructions.onlyRestaurant
  }
  else if (clickedCategory != null && clickedRestaurant != null && clickedMenuItem == null) { // user selected both category and restaurant, now needs to select a menu item
    instructions = appInfo.instructions.noSelectedItem
  }
  else if (clickedCategory != null && clickedRestaurant != null && clickedMenuItem != null) { // user selected category, restaurant, and menu item
    instructions = appInfo.instructions.allSelected
  }
  

  return (
    <main className="App">
      {/* CATEGORIES COLUMN */}
      <div className="CategoriesColumn col">
        <div className="categories options">
          <h2 className="title">Categories</h2>
          {categories.map((category) => { // creating chip element for each category in array of categories
            return (<Chip key={category} isActive = {clickedCategory === category}  label={category} onClick={() => setClickedCategory(category)} onClose={(e) => {e.stopPropagation(); setClickedCategory(null);}} />)
          })}

          
        </div>
      </div>

      {/* MAIN COLUMN */}
      <div className="container">
        <Header title = {appInfo.title} tagline = {appInfo.tagline} description = {appInfo.description} />

        {/* RESTAURANTS ROW */}
        <div className="RestaurantsRow">
          <h2 className="title">Restaurants</h2>
          <div className="restaurants options">
          {restaurants.map((restaurant) => { // creating chip element for ecah restaurant in array of restaurants
            return (<Chip key={restaurant} isActive = {clickedRestaurant === restaurant} label={restaurant} onClick={() => setClickedRestaurant(restaurant)} onClose={(e) => {e.stopPropagation(); setClickedRestaurant(null);}}/>)
          })}
          </div>
        </div>

      
        <Instructions instructions={instructions}/>

        {/* MENU DISPLAY */}
        <div className="MenuDisplay display">
          <div className="MenuItemButtons menu-items">
            <h2 className="title">Menu Items</h2>
            {currentMenuItems.map((menuItem) => { {/* creating chip elements to show user which menu items are available with selected restaurant and category*/}
              return (<Chip key = {menuItem.item_name} label={menuItem.item_name} isActive ={clickedMenuItem === menuItem} onClick={() => setClickedMenuItem(menuItem)} onClose={(e) => {e.stopPropagation(); setClickedMenuItem(null);}}/>)
            })}
          </div>

          {/* NUTRITION FACTS */}
          <div className="NutritionFacts nutrition-facts"> {/* conditional rendering to check that nutrition label will not pop up until menu item is selected */}
            {clickedMenuItem != null && <NutritionalLabel item = {clickedMenuItem}/>} 
              
      

          </div>
        </div>

        <div className="data-sources">
          <p>{appInfo.dataSource}</p>
        </div>
      </div>
    </main>
  )
}

export default App
