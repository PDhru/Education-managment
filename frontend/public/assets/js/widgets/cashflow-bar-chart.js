"use strict";document.addEventListener("DOMContentLoaded",function(){setTimeout(function(){var e={chart:{type:"bar",height:210,toolbar:{show:!1}},plotOptions:{bar:{columnWidth:"70%",borderRadius:2}},fill:{opacity:[1,.4]},stroke:{show:!0,width:3,colors:["transparent"]},dataLabels:{enabled:!1},legend:{position:"top",horizontalAlign:"right",show:!0,fontFamily:"'Public Sans', sans-serif",offsetX:10,offsetY:10,labels:{useSeriesColors:!1},markers:{width:10,height:10,radius:"50%",offsexX:2,offsexY:2},itemMargin:{horizontal:15,vertical:5}},colors:["#4680ff","#4680ff"],series:[{name:"Income",data:[180,90,135,114,120,145,180,90,135,114,120,145]},{name:"Expends",data:[120,45,78,150,168,99,120,45,78,150,168,99]}],grid:{borderColor:"#00000010"},yaxis:{show:!1}};new ApexCharts(document.querySelector("#cashflow-bar-chart"),e).render()},500)});