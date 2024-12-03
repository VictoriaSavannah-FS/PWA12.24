// Imports your SCSS stylesheet
import "./style.scss";

import carData from "./data.json";

console.log(carData);

class CarSearch {
  constructor(carData) {
    //assigning new values --> properties
    this.carData = carData; // storing car data
    console.log(`Inside of Constructor ${carData}`);
    // YEAR | after mthod called => new value for this.year
    this.years = this.getCarYears(); // fetching years
    //MAKE MAP | links year to make types
    this.makeMap = this.createYrsMakeMap(); // Year|Manufacturer Mapping
    this.modelMap = this.createModelMap(); //YEar|Make|model=> Mappins
  }

  //YEAR | dropdown | logic (getData) - getYears data from e/a dataset

  getCarYears() {
    // create a set --> based on year selected / exyracted fom e/a car
    //[...] --> helps convert Set to array
    return [...new Set(this.carData.map((car) => car.year))];
  }

  //----------- YEAR|MAKE MAP - link/values -----

  createYrsMakeMap() {
    const map = new Map();
    //help store years(k):Set(Manucafturers(Values)
    this.carData.forEach(({ year, Manufacturer }) => {
      // /loops through e/a object-->destructuring properties year/model --> update Maps

      if (!map.has(year)) map.set(year, new Set());
      // logic | cheking if 'year' found | adds new Make vlaue to the Set
      map.get(year).add(Manufacturer); //add Manfct. to corrs. Year
    });
    console.log(`YearMakeMap:`, map); // big diffence in output. multi argument Log (labe, variable)--> displays full object values
    return map; //return Map data
  }
  //---------** NESTED MAP - link/values:year | Manufacturer | models-----

  createModelMap() {
    const map = new Map(); // start Maps
    /**
     * Map1-> Year
     * Map2-> Manufacture
     * Map3-> Set(modesl data)
     */

    this.carData.forEach(({ year, Manufacturer, model }) => {
      //destructuting properties**
      //loopthrough
      if (!map.has(year)) {
        map.set(year, new Map());
        //ensures map has Year" value ! creates new map for Year // new Set year=Key|next Map = "value"
      }
      // New Map: store the Manufacturers and retrieves "YEAR" MAP| selected Year
      const manufacturerMap = map.get(year); //Mapss| MAnufture(keys) : Set(Models) = "values"

      // cheks if Manufacturer in the Map| If NOt -> initialize new Set wiht it
      if (!manufacturerMap.has(Manufacturer)) {
        manufacturerMap.set(Manufacturer, new Set());
        //If not--> will add new Model to Set
      }
      // adds Model tot Manufatire Set
      manufacturerMap.get(Manufacturer).add(model); //adds model to set| model->Make->Year [Relationship**] took a while to wrap my mind aroudnthis one, but i think i got it now..
    });
    console.log(`ModelMap`, map);
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
    //fetching Set of manufact. for Year selected | If non existent--> empty array*
    return (
      [...manufacturers]
        //coverting Set to array -> Map through
        .map(
          (Manufacturer) =>
            `<option value="${Manufacturer}">${Manufacturer}</option>`
        )
        .join("")
    );
  }
  // ----- MODEL Dropdown ----
  modelDropdown(selectedYear, selectedMake) {
    const makeMap = this.modelMap.get(parseInt(selectedYear)); //getting the years from nested maps
    let models = [];
    /* --- Logic *** overview| goal --
    1. checks if yearData exists| 2. chskc for slectedMAke data|3. if they exist --> push them to models [] array 
    */
    if (makeMap && makeMap.has(selectedMake)) {
      //Conditonal=> Map has selectd make/Manufacturer
      models = [...makeMap.get(selectedMake)];
      //fetches data of models for selected make
      //conversts Set to array ->to loop through
    }

    return models
      .map((model) => `<option value="${model}">${model}</option>`)
      .join("");
  }
  //ACTUALLY fetching the Data based on Params*
  getCarParams(selectedYear, selectedMake, selectedModel) {
    return this.carData.find(
      (car) =>
        car.year === parseInt(selectedYear) &&
        car.Manufacturer === selectedMake &&
        car.model === selectedModel
    );
  }
}

//----- HTML --> Dynamics | Event Listeners ----------------

function startCarSearch(carData) {
  //"instantiate" CarSearch class| passes carData
  const carSearch = new CarSearch(carData);

  //----- PAss data to Dropdowns ---- target by id's
  const yearOptions = document.getElementById("year");
  const makeOptions = document.getElementById("make");
  const modelOptions = document.getElementById("model");

  // pass data --> "Year" options drowpdown | creates new array w/ "yearXX"
  yearOptions.innerHTML = carSearch.yearDropdown();

  //  --- MAKE (Manufacturer) Option | UPDATED EVENT LSITENER ---------
  // will autopopualet the drowpdown
  function passModels() {
    const selectedYear = yearOptions.value; //fetch selected "Year" drpdwn
    const selectedMake = makeOptions.value; // fetch "MAKE" selectx

    //logic for MakeOptions | NEeded params

    if (selectedMake) {
      // fectching | Models based on Make and w/ Year param
      const models = carSearch.modelDropdown(selectedYear, selectedMake);
      //passing data to "modelOptins" dprDwn*
      modelOptions.innerHTML = `<option>Select Model</option>` + models;
      modelOptions.disabled = false;

      // Autopopualte / pass data for first Model!
      if (modelOptions.options[1]) {
        modelOptions.value = modelOptions.options[1].value;
      }
    } else {
      modelOptions.innerHTML = `<option value="">Select Model</option>`;
      modelOptions.disabled = true;
    }
    console.log(`Selected Make:${selectedMake}`);
  }

  //Event Listeners!!

  //  --- Year Option | EVENT LSITENER ---------
  yearOptions.addEventListener("change", () => {
    //assigns value from selected "Year" drpdwn
    const selectedYear = yearOptions.value;
    //logic for Options
    if (selectedYear) {
      // fectching | Makes(Manufacturer) w/ Year param
      const makes = carSearch.makeDropdown(selectedYear);
      //passing data to "makeOptins"dprDwn*
      makeOptions.innerHTML = `<option value="">Select Make</option>` + makes;
      makeOptions.disabled = false; //Enables--> Make Dropdwn

      // upadate "Make"options to autopopulate with make[1]--> follow logic
      if (makeOptions.options[1]) {
        makeOptions.value = makeOptions.options[1].value; //first "Make"
        passModels(); //call function to pass "Model" to dropdown

        // //modelOptions|CLEARED --> CLEAR/Disables
        // modelOptions.innerHTML = `<option value="">Select Model</option>`; //empty- no prev. data selected yet
        // modelOptions.disabled = true; // ensures NO dropdown
      }
    } else {
      // ensures "YEAR" option is selected | IF NOT! CLEARS and disables all other options
      makeOptions.innerHTML = `<option value="">Select Make</option>`;
      makeOptions.disabled = true; // ensures NO dropdown
      modelOptions.innerHTML = `<option value="">Select Model</option>`;
      modelOptions.disabled = true; // ensures NO dropdown
    }
    console.log(`SelectedYear ${selectedYear}`);
  });
  //invoke passModels after Make changes
  makeOptions.addEventListener("change", passModels);

  //  --- MODEL Option | EVENT LSITENER ---------
  modelOptions.addEventListener("change", () => {
    const selectedYear = yearOptions.value; //fetch selected "Year" drpdwn
    const selectedMake = makeOptions.value; // fetch "MAKE" selectx
    const selectedModel = modelOptions.value; //fetch modelc selected
    //logic for MakeOptions | Needed params

    if (selectedModel) {
      // fectching | Models based on Make and w/ Year param
      const carData = carSearch.getCarParams(
        selectedYear,
        selectedMake,
        selectedModel
      );
      console.log(`Selected Model: ${selectedModel}`);
      console.log(`Car Details: `, carData);
    }
    console.log(`Selected Make:${selectedModel}`);
  });
}

//wait for page to load | Start App
window.onload = function () {
  startCarSearch(carData);
};
