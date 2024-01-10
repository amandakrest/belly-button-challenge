//read in json

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(url).then(function(data) {
    console.log(data);
  });


// initialize the page 
let selector = d3.select("#selDataset");
let sampleData;
function init() {

    //populate dropdown menu
    d3.json(url).then(function(data) {
        let names = data.names;
        sampleData=data;

        names.forEach((sample)=> {
            selector.append("option")
            .text(sample)
            .property("value", sample);
        });
        // set sample

        let firstsample = names[0];
        buildCharts= names[0];
        buildMetadata = names[0];

        buildpage();
    });
}

init();

//change data with sample change
function optionChanged(currentValue){
    buildpage()
};

function buildpage() {
    let user_id = selector.property("value");
    console.log(user_id);
    let allsamples= sampleData.samples
    let currentsample = allsamples.filter(function(s){
        return s.id == user_id;
    })[0];
    console.log(currentsample);
    //metadata



    //barchart
    let otu_ids = currentsample.otu_ids.slice(0,10).map(function(id){
        return `otu${id}`
    })
    let sample_values= currentsample.sample_values.slice(0,10)
    let otu_lables = currentsample.otu_labels.slice(0,10)

    let trace1 = {
        y: otu_ids,
        x: sample_values,
        type: 'bar',
        orientation: 'h',
        text: otu_lables
    };
    
    let data = [trace1];
    
    let layout = {
        title: "OTUs"
    };
    
    Plotly.newPlot("bar", data, layout);
  
// //bubblechart
// var trace1 = {
//     x: ,
//     y: ,
//     text: ,
//     mode: 'markers',
//     marker: {
//       color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
//       size: [40, 60, 80, 100]
//     }
//   };
  
//   var data = [trace1];
  
//   var layout = {
//     title: 'Bubble Chart Hover Text',
//     showlegend: false,
//     height: 600,
//     width: 600
//   };
  
//   Plotly.newPlot('myDiv', data, layout);
// };

}







