// Imports your SCSS stylesheet
import "./style.scss";

import carData from "./data.json";
import { Generator } from "webpack";

console.log(carData);

class CarSearch {
  constructor(carData) {
    //assigning new values --> properties
    this.carData = carData; // storing car data
    console.log(`Inside of Constructo ${carData}`);
    // YEAR | after mthod called => new value for this.year
    this.years = this.getCarYears(); // fetching years
    //MAKE MAP | links year to make types
    this.makeMap = this.createYrsMakeMap(); // Year|Manufacturer Mapping
    /*MODELs MAP| Nested Map* 
        will group nodels by
        - year | Make
        - yaer | Make  => Model 
    */
    this.modelMap = this.createModelMap(); //YEar|Make|model=> Mappins
  }

  //YEAR | dropdown | logic (getData) - getYears data from e/a dataset

  getCarYears() {
    // create a set --> based on year selected / exyracted fom e/a car
    //[...] --> helsp conver SEt back to array| after Years fetched
    return [...new Set(this.carData.map((car) => car.year))]; //fetching "year" property from e/a car
  }
  //----------- YEAR|MAKE MAP - link/values -----

  createYrsMakeMap() {
    const map = new Map();
    //help store years(k):Set(Manucafturers(Values)
    this.carData.forEach(({ year, manufacturer }) => {
      // /loops through e/a object-->destructuring properties year/model --> update Maps

      if (!map.has(year)) map.set(year, new Set());
      // logic | cheking if 'year' found | adds new Make vlaue to the Set
      map.get(year).add(manufacturer); //add Manfct. to corrs. Year
    });
    console.log(`YearMakeMap:${map}`); //chek
    return map; //return Map data
  }
  //---------** NESTED MAP - link/values:year | manufacturer | models-----

  createModelMap() {
    const map = new Map(); // start Maps
    /**
     * Map1-> Year
     * Map2-> Manufacture
     * Map3-> Set(modesl data)
     */

    this.carData.forEach(({ year, manufacturer, model }) => {
      //destructuting properties**
      //loopthrough
      if (!map.has(year)) {
        // new Set --> year=Key -> next Map = "value"
        map.set(year, new Map());
        //ensures maoe has Year" value ! creates new map for Year
      }
      // New Map: store the Manufacturers and retrieves "YEAR" MAP| selected Year
      const manufacturerMap = map.get(year); //Map[| MAnufture(keys) : Set(Models) = "values"

      // cheks if manufacturer in the Map| If NOt -> initialize new Set wiht it
      if (!manufacturerMap.has(manufacturer)) {
        //If not--> will add new Model to Set
        manufacturerMap.set(manufacturer, new Set());
      }

      // adds Model tot Manufatire Set
      manufacturerMap.get(manufacturer).add(model); //adds model to set| model->Make->Year [Relationship**] took a while to wrap my mind aroudnthis one, but i think i got it now..
    });

    return map; // Return the completed Map
  }
  /* Change Dropdown values -> based on data passed || HTML*/

  // ----- YEAR Dropdown ----
  yearDropdown() {
    return (
      this.years
        //loops--> years inside e/a object --> passing to HTML
        .map((year) => `<option value='${year}'>${year}</option>`)
        .join("")
    );
  }

  // ----- MAKE (Manufacturer) Dropdown ----

  makeDropdown(selectedYear) {
    const manufacturers = this.makeMap.get(parseInt(selectedYear)) || [];
    //fetching SEt of manufact. fro Year selected --> If non existent--> empty array*
    return (
      [...manufacturers]
        //coverting SEts to array --> Map through
        .map(
          (manufacturer) =>
            `<option value="${manufacturer}">${manufacturer}</option>`
        )
        .join("")
    );
  }
  // ----- MODEL Dropdown ----

  modelDropdown(selectedYear, selectedMake) {
    const makeMap = this.modelMap.get(parseInt(selectedYear)); //getting the years from nested maps
    let models = [];
    /* --- Logic *** overview| goal --
    1. checks if yearData exists 
    2. chskc for slectedMAke data
    3. if they exist --> push them to modesl [] array 
    */
    if (makeMap && makeMap.has(selectedMake)) {
      //Conditonal=> Map ->has selectd make/manufacturer
      models = [...makeMap.get(selectedMake)];
      //fetches data of models for selected make
      //conversts Set to array ->to loop through
    }
    return models
      .map((model) => `<option value="${model}">${model}</option>`)
      .join("");
  }
}
//----- HTML --> Dynaics | Event Lsitenrs

function startCarSearch(carData) {
  //"instantiate" CarSearch class| passes carData
  const carSearch = new CarSearch(carData);

  //----- PAss data to Dropdowns ---- target by id's
  const yearOptions = document.getElementById("year");
  const makeOptions = document.getElementById("make");
  const modelOptions = document.getElementById("model");

  // pass data --> "Year" options drowpdown | creates new array w/ "yearXX"
  yearOptions.innerHTML = carSearch.yearDropdown();

  //Event Listeners!!
  //  --- Year Option | EVENT LSITENER ---------
  yearOptions.addEventListener("change", () => {
    //assigns value from selected "Year" drpdwn
    const selectedYear = yearOptions.value;
    //logic for Options
    if (selectedYear) {
      // fectching | Makes(manufacturer) w/ Year param
      const makes = carSearch.makeDropdown(selectedYear);
      //passing data to "makeOptins"dprDwn*
      makeOptions.innerHTML = `<option value="">Select Make</option>` + makes;
      makeOptions.disabled = false; //Enables--> Dropdwn

      //modelOptions|CLEARED --> CLEAR/Disables
      modelOptions.innerHTML = `<option value="">Select Model</option>`; //empty- no prev. data selected yet
      modelOptions.disabled = true; // ensures NO dropdown
    } else {
      // ensures "YEAR" option is selected | IF NOT! CLEARS and disables all other options
      makeOptions.innerHTML = `<option value="">Select Make</option>`;
      makeOptions.disabled = true; // ensures NO dropdown
      modelOptions.innerHTML = `<option value="">Select Model</option>`;
      modelOptions.disabled = true; // ensures NO dropdown
    }
  });
  //  --- MAKE (Manufacturer) Option | EVENT LSITENER ---------
  makeOptions.addEventListener("change", () => {
    const selectedYear = yearOptions.value; //fetch selected "Year" drpdwn
    const selectedMake = makeOptions.value; // fetch "MAKE" selectx
    //logic for MakeOptions | NEeded params
    // ensures "YEAR"|"MAKE" optxs selected | IF NOT! CLEARS and disables  MODEL options
    if (selectedMake) {
      // fectching | Models based on Make and w/ Year param
      const models = carSearch.modelDropdown(selectedYear, selectedMake);
      //passing data to "modelOptins" dprDwn*
      modelOptions.innerHTML = `<option>Select Model</option>` + models;
      modelOptions.disabled = false; //Enables--> Dropdwn
    } else {
      modelOptions.innerHTML = `<option value="">Select Model</option>`;
      modelOptions.disabled = true; // ensures NO dropdown
    }
  });
}

//wait for page to load | Start App
window.onload = function () {
  startCarSearch(carData);
};
