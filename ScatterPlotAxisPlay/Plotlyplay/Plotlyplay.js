function buildPlot(country) {
    d3.csv("globalWinePoints.csv").then(function(globalWinePoints) {

        temp=globalWinePoints
        temp=temp.filter(c=>c.country==country)
        xx=[]
        temp.forEach(function(d){
            xx.push(parseFloat(d.price))
        })
        yy=[]
        temp.forEach(function(d){
            yy.push(parseFloat(d.points))
        })
        
        hovertext=[]
        temp.forEach(function(d){
            string=`${d.title}<br> Price:$${d.price} <br> Points: ${d.points}`
            hovertext.push(string)
        })
        
        console.log(xx)
//ATTEMPT AT SLIDER ********************************************************
// //Set up SelectorOptions
// var selectorOptions = {
//     buttons: [{
//         step: 'price',
//         stepmode: 'todate',
//         count: 1,
//         label: '?'
//     }, {
//         step: 'price',
//         stepmode: 'backward',
//         count: 1,
//         label: '??'
//     }, {
//         step: 'all',
//     }],
// };
// function setBarPlot(chosents) {
//     // this function sets up the x-y plot for plotly
//         currentData = getCountryData(chosents);
//         if (type == 1) { 
//             var trace1 = {
//                 x: years,
//                 y: currentData,
//                 width: 400,
//                 height: 500,
//                 mode: 'lines+markers',
//                 marker: {
//                     size: 12,
//                     opacity: 0.5
//                 }
//             }
//             var layout = {
//                 title: `Wine`,
//                 xaxis: { rangeselector: selectorOptions,
//                 rangeslider: {
//                 title: "Price($)"
//                 },
//                 yaxis: {
//                     autorange: true,
//                     title: "Points",
//                     type: "linear"},
//             }
//         else { 
//             var trace1 = {
//             marker: {
//             colors: ["#66FF33","#FF99FF","#FF9900","#CC6600","#FF0000"]},
//             type: "scatter",
//             mode: "markers",
//                 text: hovertext,
//                 x: xx,
//                 y: yy,
//                 line: {
//                 color: "#380059"
//             } 
        
//     };
// };

//         var data = [trace1];
//         Plotly.newPlot("plot", data, layout);//plot data 
// };
    //ORIGINAL XAXIS***************************************************************************************************8
    var trace1 = {
        type: "scatter",
        mode: "markers",
        text: hovertext,
        x: xx,
        y: yy,
        line: {
        color: "#380059"
        }
    };

    var data = [trace1];
    var layout = {
        title: `Wine`,

        xaxis: {
            title: "Price($)",
            //Attempt at slider
            automargin: true,
            showticklabels: true,
            rangeslider:{
            },
        },
        yaxis: {
        autorange: true,
        title: "Points",
        type: "linear"
        },
        showlegend: false
    };
    Plotly.newPlot("plot", data, layout);
    });

  }

  buildPlot("Germany")
