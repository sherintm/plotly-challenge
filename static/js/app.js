// App.js
let dropDown = d3.select('#selDataset');
let dropDownData;
let jsonData;

d3.json("samples.json").then((incomingData) => {
    jsonData = incomingData;
    dropDownData = incomingData.names;
    dropDownData.forEach(element => {
        var options = dropDown.append("option");
        options.text(element);
        options.attr("value",element);
    });
    optionChanged(jsonData.names[0])
});

function optionChanged(value)
{
    let row = jsonData.metadata.filter(element => (element.id == value));
    // Demographic information for selected option
    d3.select('#sample-metadata').html("ID: " + row[0].id +
                                       "<br> ETHNICITY: " + row[0].ethnicity +
                                       "<br> GENDER: " + row[0].gender +
                                       "<br> AGE: " + row[0].age +
                                       "<br> LOCATION: " + row[0].location +
                                       "<br> BBTYPE: " + row[0].bbtype +
                                       "<br> WFREQ: " + row[0].wfreq);

    var samples = jsonData.samples.filter(element => (element.id == value));
    var otu_ids = samples[0].otu_ids.slice(0, 10).map(element => "OTU" + element);
    console.log(otu_ids);
    var barTrace = {
        x:samples[0].sample_values.slice(0, 10),
        y: otu_ids,
        text: samples[0].otu_labels.slice(0, 10),
        type: "bar",
        orientation: 'h'
      };
      // 6. Create the data array for our plot
      var barData = [barTrace];
            
      // 7. Define our plot layout
      var barLayout = {
        title: "Top 10 Bacteria Cultures Found",
        yaxis: {autorange:"reversed"}
      };
      
      // 8. Plot the chart to a div tag with id "bar-plot"
      Plotly.newPlot("bar", barData, barLayout);

      // Belly button washing frequency
      var gaugeData = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: row[0].wfreq,
          title: { text: "Belly Button Washing Frquency<br><br>Scrubs per Week" },
          type: "indicator",
          mode: "gauge+number",
          gauge: {
            axis: { range: [null, 9], tick0:0, dtick:1 },
            steps: [
              { range: [0, 1], color: "#d6f5f5" },
              { range: [1, 2], color: "#c2f0f0" },
              { range: [2, 3], color: "#adebeb" },
              { range: [3, 4], color: "#99e6e6" },
              { range: [4, 5], color: "#85e0e0" },
              { range: [5, 6], color: "#70dbdb" },
              { range: [6, 7], color: "#5cd6d6" },
              { range: [7, 8], color: "#47d1d1" },
              { range: [8, 9], color: "#33cccc" }
              
            ],
            threshold: {
              line: { color: "purple", width: 4 },
              thickness: 0.75,
              value: row[0].wfreq
            }
          }
        }
      ];
      
      Plotly.newPlot('gauge', gaugeData);

      // Bubble cultures per sample 
      let bubbleTrace = {
        x: samples[0].otu_ids,
        y: samples[0].sample_values,
        text: samples[0].otu_labels,
        mode: 'markers',
        marker: {
          color: samples[0].otu_ids,
          size: samples[0].sample_values
        }
      };
      
      let bubbleData = [bubbleTrace];
      
      let bubbleLayout = {
        title: 'Bacteria Cultures Per Sample',
        xaxis: {'title':'OTU ID'},
        showlegend: false,
      };
      
      Plotly.newPlot('bubble', bubbleData, bubbleLayout);
}
