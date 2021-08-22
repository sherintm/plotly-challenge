// Use d3.json() to fetch data from JSON file
// Incoming data is internally referred to as incomingData
// d3.json("../../samples.json").then((incomingData) => {
    // function filterMovieRatings(movie) {
    //   return movie.imdbRating > 8.9;
   // console.log(incomingData)
    // }
  
    // // Use filter() to pass the function as its argument
    // var filteredMovies = incomingData.filter(filterMovieRatings);
  
    // //  Check to make sure your are filtering your movies.
    // console.log(filteredMovies);
  
    // // Use the map method with the arrow function to return all the filtered movie titles.
    // var titles = filteredMovies.map(movies =>  movies.title);
  
    // // Use the map method with the arrow function to return all the filtered movie metascores.
    // var ratings = filteredMovies.map(movies => movies.metascore);
  
    // // Check your filtered metascores.
    // console.log(ratings);
  
    // // Create your trace.
    // var trace = {
    //   x: titles,
    //   y: ratings,
    //   type: "bar"
    // };
  
    // // Create the data array for our plot
    // var data = [trace];
  
    // // Define the plot layout
    // var layout = {
    //   title: "The highest critically acclaimed movies.",
    //   xaxis: { title: "Title" },
    //   yaxis: { title: "Metascore (Critic) Rating"}
    // };
  
    // // Plot the chart to a div tag with id "bar-plot"
//     // Plotly.newPlot("bar-plot", data, layout);
//   });
  

//   // Create an array of each country's numbers
// var us = Object.values(data.us);
// var uk = Object.values(data.uk);
// var canada = Object.values(data.canada);

// // Create an array of music provider labels
// var labels = Object.keys(data.us);

let dropDown = d3.select('#selDataset');
let dropDownData;
let jsonData;

d3.json("../../samples.json").then((incomingData) => {
    jsonData = incomingData;
    dropDownData = incomingData.names;
    //console.log(dropDownData);
    dropDownData.forEach(element => {
        var options = dropDown.append("option");
        options.text(element);
        options.attr("value",element);
        //console.log("Elemet" + element)
    });
});

function optionChanged(value)
{
    console.log(value);
    let row = jsonData.metadata.filter(element => (element.id == value));
    d3.select('#sample-metadata').html("ID: " + row[0].id +
                                       "<br> ETHNICITY: " + row[0].ethnicity +
                                       "<br> GENDER: " + row[0].gender +
                                       "<br> AGE: " + row[0].age +
                                       "<br> LOCATION: " + row[0].location +
                                       "<br> BBTYPE: " + row[0].bbtype +
                                       "<br> WFREQ: " + row[0].wfreq);

    let samples = jsonData.samples.filter(element => (element.id == value));
    console.log(samples[0].sample_values.slice(0, 10));
    var trace = {
        x: samples[0].sample_values.slice(0, 10),
        y: samples[0].otu_ids.slice(0, 10),
        text: samples[0].otu_labels.slice(0, 10),
        type: "bar",
        orientation: 'h'
      };
      // 6. Create the data array for our plot
      var data = [trace];
            
      // 7. Define our plot layout
      var layout = {
        title: "Top 10 Bacteria Cultures Found",
      };
      
      // 8. Plot the chart to a div tag with id "bar-plot"
      Plotly.newPlot("bar", data, layout);
}




// Display the default plots
function init() {


  //Plotly.newPlot("pie", data, layout);
};

// On change to the DOM, call getData()
//3.selectAll("#selDataset").on("change", getData);

// Function called by DOM changes
// function getData() {
//   var dropdownMenu = d3.select("#selDataset");
//   // Assign the value of the dropdown menu option to a variable
//   var dataset = dropdownMenu.property("value");
//   // Initialize an empty array for the country's data
//   var data = [];

//   if (dataset == 'us') {
//       data = us;
//   }
//   else if (dataset == 'uk') {
//       data = uk;
//   }
//   else if (dataset == 'canada') {
//       data = canada;
//   }
//   // Call function to update the chart
//   updatePlotly(data);
// }

// // Update the restyled plot's values
// function updatePlotly(newdata) {
//   Plotly.restyle("pie", "values", [newdata]);
// }

init();
