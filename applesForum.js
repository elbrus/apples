window.apples=window.apples||{},window.apples.director=window.apples.director||function(a){"use strict";var b=function(){function b(b,c){var d=a("table:eq(2) td",c);return{ID:b.split("=")[1],Overall:a.trim(d.eq(0).text()),Leader:a.trim(d.eq(2).text()),RDM:a.trim(d.eq(4).text()),RDE:a.trim(d.eq(6).text()),RDA:a.trim(d.eq(8).text()),Exp:a.trim(d.eq(10).text()),Pits:a.trim(d.eq(12).text()),Motivation:a.trim(d.eq(14).text()),Age:a.trim(d.eq(17).text())}}function c(b){var c=a("table:eq(2)",b),d=c.find("th"),e=c.find("td");return['<table class="directorPopup" style="width: 150px; font: 10px Arial; position: absolute; border: 1px solid #333; background: #f7f5d1; padding: 2px 5px; color: darkblue; display: none;"><tr><td>',d.first().text(),"</td><td>",e.first().text(),"</td></tr><tr><td>",d.eq(1).text(),"</td><td>",e.eq(2).text(),"</td></tr><tr><td>",d.eq(2).text(),"</td><td>",e.eq(4).text(),"</td></tr><tr><td>",d.eq(3).text(),"</td><td>",e.eq(6).text(),"</td></tr><tr><td>",d.eq(4).text(),"</td><td>",e.eq(8).text(),"</td></tr><tr><td>",d.eq(5).text(),"</td><td>",e.eq(10).text(),"</td></tr><tr><td>",d.eq(6).text(),"</td><td>",e.eq(12).text(),"</td></tr><tr><td>",d.eq(7).text(),"</td><td>",e.eq(14).text(),"</td></tr><tr><td>",d.eq(8).text(),"</td><td>",e.eq(17).text(),"</td></tr></table>"].join("")}this.getSkills=function(b,d){a.ajax({type:"GET",url:b,success:function(a){a&&d&&d(c(a))}})},this.getInfo=function(c,d,e){a.ajax({type:"GET",url:c,success:function(a){a&&d&&d(b(c,a))},error:function(){e&&e()}})}};return new b}(jQuery),window.apples.driver=window.apples.driver||function(a){"use strict";var b=function(){function b(b,c){var d=a("table:eq(3) td",c);return{ID:b.split("=")[1],Overall:a.trim(d.eq(1).text()),Conc:a.trim(d.eq(3).text()),Talent:a.trim(d.eq(5).text()),Agr:a.trim(d.eq(7).text()),Exp:a.trim(d.eq(9).text()),TI:a.trim(d.eq(11).text()),Stamina:a.trim(d.eq(13).text()),Charisma:a.trim(d.eq(15).text()),Motivation:a.trim(d.eq(17).text()),Reputation:a.trim(d.eq(20).text()),Weight:a.trim(d.eq(23).text()),Age:a.trim(d.eq(26).text()),Fav:a.map(a('a[href^="TrackDetails"]',c),function(a){return a.href.split("id=")[1]})}}function c(b){var c=a("table:eq(3)",b),d=c.find("th"),e=c.find("td");return['<table class="driverPopup" style="width: 150px; font: 10px Arial; position: absolute; border: 1px solid #333; background: #f7f5d1; padding: 2px 5px; color: darkblue; display: none;"><tr><td>',d.first().text(),"</td><td>",e.first().text(),"</td></tr><tr><td>",d.eq(1).text(),"</td><td>",e.eq(2).text(),"</td></tr><tr><td>",d.eq(2).text(),"</td><td>",e.eq(4).text(),"</td></tr><tr><td>",d.eq(3).text(),"</td><td>",e.eq(6).text(),"</td></tr><tr><td>",d.eq(4).text(),"</td><td>",e.eq(8).text(),"</td></tr><tr><td>",d.eq(5).text(),"</td><td>",e.eq(10).text(),"</td></tr><tr><td>",d.eq(6).text(),"</td><td>",e.eq(12).text(),"</td></tr><tr><td>",d.eq(7).text(),"</td><td>",e.eq(14).text(),"</td></tr><tr><td>",d.eq(8).text(),"</td><td>",e.eq(16).text(),"</td></tr><tr><td>",d.eq(9).text(),"</td><td>",e.eq(19).text(),"</td></tr><tr><td>",d.eq(10).text(),"</td><td>",e.eq(22).text(),"</td></tr><tr><td>",d.eq(11).text(),"</td><td>",e.eq(25).text(),"</td></tr></table>"].join("")}this.getSkills=function(b,d){a.ajax({type:"GET",url:b,success:function(a){a&&d&&d(c(a))}})},this.getInfo=function(c,d,e){a.ajax({type:"GET",url:c,success:function(a){a&&d&&d(b(c,a))},error:function(){e&&e()}})}};return new b}(jQuery),window.apples.staff=window.apples.staff||function(a){"use strict";var b=function(){function b(a){return{OA:c(a,0)[0],Skills:c(a,1),Levels:c(a,2)}}function c(b,c){return a(".squashed:eq("+c+") > tbody > tr",b).map(function(){return parseInt(a(this).children("td:first").text().trim(),10)}).toArray().filter(function(a){return!isNaN(a)})}function d(){var b=a(".squashed:last > tbody > tr"),c=0;return b.each(function(){c+=parseInt(a(this).children("td:first").text().trim(),10)}),+(Math.round(c/b.length+"e+2")+"e-2")}this.addFunctionality=function(){a(".orange.center").append("<p>Average: "+d()+"</p>")},this.getInfo=function(c,d){a.ajax({type:"GET",url:"/StaffAndFacilities.asp",success:function(a){a&&c&&c(b(a))},error:function(){d&&d()}})}};return new b}(jQuery),window.apples.directors=window.apples.directors||function(a,b){"use strict";var c=function(){var c=this;this.addFunctionality=function(){var d=a("table:eq(1)");if(preferences.SettingsSetup.TDL.Sort){var e={border:"none",background:"rgb(52,84,127)",color:"#ccc"};d.find("tr:first th").each(function(b){var f=a(this),g=f.text().trim().toLowerCase();"minimal salary"!==g&&"minimal signing fee"!==g&&"rank"!==g||f.click(function(){a(".directorPopup").remove(),a(".fastView").css(e);var f=d.find("tr").get();f.sort(function(a,d){return c.parseCell(a,b).replace(/\$|\./g,"")-c.parseCell(d,b).replace(/\$|\./g,"")}),d.append(f)}).css("cursor","pointer"),"overall"!==g&&"age"!==g&&"offers"!==g||f.click(function(){a(".directorPopup").remove(),a(".fastView").css(e);var f=d.find("tr").get();f.sort(function(a,d){return c.parseCell(a,b)-c.parseCell(d,b)}),d.append(f)}).css("cursor","pointer"),"technical director name"===g&&f.click(function(){a(".directorPopup").remove(),a(".fastView").css(e);var f=d.find("tr").get();f.sort(function(a,d){var e=c.parseCell(a,b),f=c.parseCell(d,b);return"NAME"===e?-1:"NAME"===f?1:e<f?-1:e>f?1:0}),d.append(f)}).css("cursor","pointer")})}d.find("tr").each(function(b){var c=a(this);b?preferences.SettingsSetup.DL.Skills&&c.append('<td id="'+a("td a:first",this).attr("href")+'" class="fastView" style="cursor: pointer">[+]</td>'):c.append("<th></th>")}),preferences.SettingsSetup.DL.Skills&&a(".fastView").on("click",function(c){var d=a(this);a(".directorPopup").remove(),d.mouseout(function(){a(".directorPopup").remove()}),b.getSkills(d.attr("id"),function(b){a("body").append(b),a(".directorPopup").css({top:c.pageY,left:c.pageX-160}).show()})})},this.parseCell=function(b,c){return a(b).children("td:eq("+c+")").text().toUpperCase()}};return new c}(jQuery,window.apples.director),window.apples.drivers=window.apples.drivers||function(a,b){"use strict";var c=function(){var c=this;this.addFunctionality=function(){var d=a("table:eq(3)");if(preferences.SettingsSetup.DL.Sort){var e={border:"none",background:"rgb(52,84,127)",color:"#ccc"};d.find("tr:first th").each(function(b){var f=a(this),g=f.text().trim().toLowerCase();"minimal salary"!==g&&"minimal signing fee"!==g&&"rank"!==g||f.click(function(){a(".driverPopup").remove(),a(".fastView").css(e);var f=d.find("tr").get();f.sort(function(a,d){return c.parseCell(a,b).replace(/\$|\./g,"")-c.parseCell(d,b).replace(/\$|\./g,"")}),d.append(f)}).css("cursor","pointer"),"overall"!==g&&"age"!==g&&"offers"!==g||f.click(function(){a(".driverPopup").remove(),a(".fastView").css(e);var f=d.find("tr").get();f.sort(function(a,d){return c.parseCell(a,b)-c.parseCell(d,b)}),d.append(f)}).css("cursor","pointer"),"driver name"===g&&f.click(function(){a(".driverPopup").remove(),a(".fastView").css(e);var f=d.find("tr").get();f.sort(function(a,d){var e=c.parseCell(a,b),f=c.parseCell(d,b);return"NAME"===e?-1:"NAME"===f?1:e<f?-1:e>f?1:0}),d.append(f)}).css("cursor","pointer")})}d.find("tr").each(function(b){var c=a(this);b?preferences.SettingsSetup.DL.Skills&&c.append('<td id="'+a("td a:first",this).attr("href")+'" class="fastView" style="cursor: pointer">[+]</td>'):c.append("<th></th>")}),preferences.SettingsSetup.DL.Skills&&a(".fastView").on("click",function(c){var d=a(this);a(".driverPopup").remove(),d.mouseout(function(){a(".driverPopup").remove()}),b.getSkills(d.attr("id"),function(b){a("body").append(b),a(".driverPopup").css({top:c.pageY,left:c.pageX-160}).show()})})},this.parseCell=function(b,c){return a(b).children("td:eq("+c+")").text().toUpperCase()}};return new c}(jQuery,window.apples.driver),window.apples.qualify1=window.apples.qualify1||function(a){"use strict";var b=function(){function b(b){var e={Practice:a.map(a('table:eq(5) tr[class="pointerhand"]',b),function(b){var c=a(b).children("td[onclick]");return{Lap:a.trim(c.eq(0).text()),LTime:a.trim(c.eq(1).text()),Mistake:a.trim(c.eq(2).text()),NTime:a.trim(c.eq(3).text()),FWing:a.trim(c.eq(4).text()),RWing:a.trim(c.eq(5).text()),Engine:a.trim(c.eq(6).text()),Brakes:a.trim(c.eq(7).text()),Gear:a.trim(c.eq(8).text()),Susp:a.trim(c.eq(9).text()),Tyres:a.trim(c.eq(10).text())}})};if(~a("table:eq(6)",b).text().indexOf("Qualify 1 lap data")){var f=a("table:eq(6) tr:last > td",b),g=a("table:eq(3) img:first",b),h=g.parent().text();e.Q1={Data:{Time:a.trim(f.eq(0).text()),FWing:a.trim(f.eq(1).text()),RWing:a.trim(f.eq(2).text()),Engine:a.trim(f.eq(3).text()),Brakes:a.trim(f.eq(4).text()),Gear:a.trim(f.eq(5).text()),Susp:a.trim(f.eq(6).text()),TType:f.eq(7).children("img").attr("title"),Tyres:a.trim(f.eq(8).text()),Risk:a.trim(f.eq(9).text())},Weather:g.attr("title"),Temp:c(h),Hum:d(h)}}return e}function c(a){var b=a.substring(a.indexOf("Temp")+6);return b.substring(0,b.indexOf("C"))}function d(a){var b=a.substring(a.indexOf("Humidity")+10);return b.substring(0,b.indexOf("%")+1)}this.getInfo=function(c,d){a.ajax({type:"GET",url:"/Qualify.asp",success:function(a){a&&c&&c(b(a))},error:function(){d&&d()}})},this.addFunctionality=function(){if(preferences.SettingsSetup.Q1){var b,c,d;a(".pointerhand td").css("text-align","left");for(var e=1;e<=8;e++)if(b=window.getLapComment(e),"undefined"!=typeof b&&b.indexOf("<font")===-1){c=b.split("<br><b>");for(var f=1,g=c.length-1;f<=g;f++)switch(d=c[f].split("</b>"),d[1]){case"  Try to favor a bit more the low revs":a(".pointerhand:eq("+(e-1)+") > td:eq(6)").append("-");break;case"  I feel that I do not have enough engine power in the straights":a(".pointerhand:eq("+(e-1)+") > td:eq(6)").append("+");break;case"  The engine revs are too high":a(".pointerhand:eq("+(e-1)+") > td:eq(6)").append("-");break;case"  The engine power on the straights is not sufficient":a(".pointerhand:eq("+(e-1)+") > td:eq(6)").append("+");break;case"  You should try to favor a lot more the high revs":a(".pointerhand:eq("+(e-1)+") > td:eq(6)").append("+");break;case"  I would like to have the balance a bit more to the front":a(".pointerhand:eq("+(e-1)+") > td:eq(7)").append("+");break;case"  Put the balance a bit more to the back":a(".pointerhand:eq("+(e-1)+") > td:eq(7)").append("-");break;case"  I think the brakes effectiveness could be higher if we move the balance to the back":a(".pointerhand:eq("+(e-1)+") > td:eq(7)").append("-");break;case"  I think the brakes effectiveness could be higher if we move the balance to the front":a(".pointerhand:eq("+(e-1)+") > td:eq(7)").append("+");break;case"  I would feel a lot more comfortable to move the balance to the front":a(".pointerhand:eq("+(e-1)+") > td:eq(7)").append("+");break;case"  I am very often in the red. Put the gear ratio a bit higher":a(".pointerhand:eq("+(e-1)+") > td:eq(8)").append("+");break;case"  The gear ratio is too low":a(".pointerhand:eq("+(e-1)+") > td:eq(8)").append("+");break;case"  I cannot take advantage of the power of the engine. Put the gear ratio a bit lower":a(".pointerhand:eq("+(e-1)+") > td:eq(8)").append("-");break;case"  The gear ratio is too high":a(".pointerhand:eq("+(e-1)+") > td:eq(8)").append("-");break;case"  I think with a bit more rigid suspension I will be able to go faster":a(".pointerhand:eq("+(e-1)+") > td:eq(9)").append("+");break;case"  The suspension rigidity is too high":a(".pointerhand:eq("+(e-1)+") > td:eq(9)").append("-");break;case"  The car is too rigid. Lower a bit the rigidity":a(".pointerhand:eq("+(e-1)+") > td:eq(9)").append("-");break;case"  The suspension rigidity is too low":a(".pointerhand:eq("+(e-1)+") > td:eq(9)").append("+");break;case"  The car is far too rigid. Lower a lot the rigidity":a(".pointerhand:eq("+(e-1)+") > td:eq(9)").append("-");break;case"  I am missing a bit of grip in the curves":a(".pointerhand:eq("+(e-1)+") > td:eq(4)").append("+"),a(".pointerhand:eq("+(e-1)+") > td:eq(5)").append("+");break;case"  The car could have a bit more speed in the straights":a(".pointerhand:eq("+(e-1)+") > td:eq(4)").append("-"),a(".pointerhand:eq("+(e-1)+") > td:eq(5)").append("-");break;case"  The car is very unstable in many corners":a(".pointerhand:eq("+(e-1)+") > td:eq(4)").append("+"),a(".pointerhand:eq("+(e-1)+") > td:eq(5)").append("+");break;case"  The car is lacking some speed in the straights":a(".pointerhand:eq("+(e-1)+") > td:eq(4)").append("-"),a(".pointerhand:eq("+(e-1)+") > td:eq(5)").append("-")}}}}};return new b}(jQuery),window.apples.qualify2=window.apples.qualify2||function(a){"use strict";var b=function(){function b(b){var e=a("table:eq(5) tr:last > td",b);if(e.length>2){var f=a("table:eq(3) img:eq(1)",b),g=f.parent().text();return{Data:{Time:a.trim(e.eq(0).text()),FWing:a.trim(e.eq(1).text()),RWing:a.trim(e.eq(2).text()),Engine:a.trim(e.eq(3).text()),Brakes:a.trim(e.eq(4).text()),Gear:a.trim(e.eq(5).text()),Susp:a.trim(e.eq(6).text()),Fuel:a.trim(e.eq(7).text()),TType:e.eq(8).children("img").attr("title"),Tyres:a.trim(e.eq(9).text()),Risk:a.trim(e.eq(10).text())},Weather:f.attr("title"),Temp:c(g),Hum:d(g)}}return null}function c(a){var b=a.substring(a.indexOf("Temp")+6);return b.substring(0,b.indexOf("C"))}function d(a){var b=a.substring(a.indexOf("Humidity")+10);return b.substring(0,b.indexOf("%")+1)}function e(){var a,b,c,d,e,o,p=[],q=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],r=f(),s=[preferences.WetSetup.C.fWing,preferences.WetSetup.C.rWing,preferences.WetSetup.C.engine,preferences.WetSetup.C.brakes,preferences.WetSetup.C.gear,preferences.WetSetup.C.suspension],t=[preferences.WetSetup.C2.fWing,preferences.WetSetup.C2.rWing,preferences.WetSetup.C2.engine,preferences.WetSetup.C2.brakes,preferences.WetSetup.C2.gear,preferences.WetSetup.C2.suspension],u=[preferences.WetSetup.V1.fWing,preferences.WetSetup.V1.rWing,preferences.WetSetup.V1.engine,preferences.WetSetup.V1.brakes,preferences.WetSetup.V1.gear,preferences.WetSetup.V1.suspension],v=[preferences.WetSetup.V2.fWing,preferences.WetSetup.V2.rWing,preferences.WetSetup.V2.engine,preferences.WetSetup.V2.brakes,preferences.WetSetup.V2.gear,preferences.WetSetup.V2.suspension],w=[preferences.WetSetup.V3.fWing,preferences.WetSetup.V3.rWing,preferences.WetSetup.V3.engine,preferences.WetSetup.V3.brakes,preferences.WetSetup.V3.gear,preferences.WetSetup.V3.suspension],x=g();if(o=1===r[0]&&1===r[2]?[preferences.TemperatureSetup.Wet.fWing,preferences.TemperatureSetup.Wet.rWing,preferences.TemperatureSetup.Wet.engine,preferences.TemperatureSetup.Wet.brakes,preferences.TemperatureSetup.Wet.gear,preferences.TemperatureSetup.Wet.suspension]:[preferences.TemperatureSetup.Dry.fWing,preferences.TemperatureSetup.Dry.rWing,preferences.TemperatureSetup.Dry.engine,preferences.TemperatureSetup.Dry.brakes,preferences.TemperatureSetup.Dry.gear,preferences.TemperatureSetup.Dry.suspension],preferences.SettingsSetup.TemperatureChange&&r[1]!==r[3])for(e=r[3]-r[1],c=0,d=o.length;c<d;c++)q[c]=q[c+s.length]=q[c+2*s.length]=h(o[c],e),x[c]=i(o[c],e,x[c]);if(p=x.slice(0),0===r[0]&&1===r[2])for(c=0,d=s.length;c<d;c++)q[c]=q[c]+j(s[c],u[c],r[3]),p[c]=k(s[c],u[c],r[3],x[c]),q[c+s.length]=q[c+s.length]+j(s[c],v[c],r[3]),p[c+s.length]=k(s[c],v[c],r[3],x[c]),q[c+2*s.length]=q[c+2*s.length]+j(t[c],w[c],r[3]),p[c+2*s.length]=k(t[c],w[c],r[3],x[c]);else if(1===r[0]&&0===r[2])for(c=0,d=s.length;c<d;c++)q[c]=q[c]+l(s[c],u[c],r[3]),p[c]=m(s[c],u[c],r[3],x[c]),q[c+s.length]=q[c+s.length]+l(s[c],v[c],r[3]),p[c+s.length]=m(s[c],v[c],r[3],x[c]),q[c+2*s.length]=q[c+2*s.length]+l(t[c],w[c],r[3]),p[c+2*s.length]=m(t[c],w[c],r[3],x[c]);if(!preferences.SettingsSetup.TemperatureChange&&r[1]!==r[3])for(e=r[3]-r[1],c=0,d=p.length;c<d;c++)q[c]=q[c]+h(o[c%6],e),p[c]=i(o[c%6],e,p[c]);for(p=n(p),c=0,d=p.length;c<d;c++)p[c]>999&&(p[c]=999),p[c]<0&&(p[c]=0);return 6===p.length?(a='<a class="lime" href="javascript: QuickLink({href})" title="Change: {title}">Temperature change</a>',q.length?(b=q[0]+", "+q[1]+", "+q[2]+", "+q[3]+", "+q[4]+", "+q[5],a=a.replace(/{title}/g,b)):a=a.replace(/{title}/g,"-"),b=p[0]+","+p[1]+","+p[2]+","+p[3]+","+p[4]+","+p[5],a=a.replace(/{href}/g,b)):(a='<a class="lime" href="javascript: QuickLink({href1})" title="Change: {title1}">Version 1</a>&nbsp;<a class="lime" href="javascript: QuickLink({href2})" title="Change: {title2}">Version 2</a>&nbsp;<a class="lime" href="javascript: QuickLink({href3})" title="Change: {title3}">Version 3</a>',q.length?(b=q[0]+", "+q[1]+", "+q[2]+", "+q[3]+", "+q[4]+", "+q[5],a=a.replace(/{title1}/g,b)):a=a.replace(/{title1}/g,"-"),b=p[0]+","+p[1]+","+p[2]+","+p[3]+","+p[4]+","+p[5],a=a.replace(/{href1}/g,b),q.length?(b=q[6]+", "+q[7]+", "+q[8]+", "+q[9]+", "+q[10]+", "+q[11],a=a.replace(/{title2}/g,b)):a=a.replace(/{title2}/g,"-"),b=p[6]+","+p[7]+","+p[8]+","+p[9]+","+p[10]+","+p[11],a=a.replace(/{href2}/g,b),q.length?(b=q[12]+", "+q[13]+", "+q[14]+", "+q[15]+", "+q[16]+", "+q[17],a=a.replace(/{title3}/g,b)):a=a.replace(/{title3}/g,"-"),b=p[12]+","+p[13]+","+p[14]+","+p[15]+","+p[16]+","+p[17],a=a.replace(/{href3}/g,b)),a}function f(){var b,c=[],d=a("table:eq(3)");return c.push("Rain"===d.find("img:first").attr("title")?1:0),b=d.find("img:first").parent().text(),b=b.substring(b.indexOf("Temp")+6),c.push(b.substring(0,b.indexOf("C")-1)),c.push("Rain"===d.find("img:eq(1)").attr("title")?1:0),b=d.find("img:eq(1)").parent().text(),b=b.substring(b.indexOf("Temp")+6),c.push(b.substring(0,b.indexOf("C")-1)),c}function g(){var b=a("table:eq(10) a").attr("href");return b=b.substring(b.indexOf("(")+1),b=b.substring(0,b.indexOf(")")),b.split(",")}function h(a,b){return Math.round(a*b)}function i(a,b,c){return Math.round(a*b)+parseInt(c,10)}function j(a,b,c){return Math.round((43-c)*a+b)}function k(a,b,c,d){return Math.round(parseInt(d,10)+(43-c)*a+b)}function l(a,b,c){return Math.round((43-c)*a+b)*-1}function m(a,b,c,d){return Math.round(parseInt(d,10)-(43-c)*a-b)}function n(a){return a[0]>999&&a[1]<999?(a[1]+=a[0]-999,a[0]=999):a[0]<999&&a[1]>999&&(a[0]+=a[1]-999,a[1]=999),a.length>6&&(a[6]>999&&a[7]<999?(a[7]+=a[6]-999,a[6]=999):a[6]<999&&a[7]>999&&(a[6]+=a[7]-999,a[7]=999)),a.length>12&&(a[12]>999&&a[13]<999?(a[13]+=a[12]-999,a[12]=999):a[12]<999&&a[13]>999&&(a[12]+=a[13]-999,a[13]=999)),a}this.addFunctionality=function(){preferences.SettingsSetup.Q2&&a('input[type="submit"]:not(:disabled)').length&&a("table:eq(10) th:first").append("<br>"+e())},this.getInfo=function(c,d){a.ajax({type:"GET",url:"/Qualify2.asp",success:function(a){a&&c&&c(b(a))},error:function(){d&&d()}})}};return new b}(jQuery),window.apples.update=window.apples.update||function(a){"use strict";var b=function(){this.addFunctionality=function(){a("table:eq(1) tr:gt(0):not(:last)").each(function(){var b=a(this).children("td:eq(3)"),c=parseInt(b.text().trim(),10);c>=80&&b.css({background:"#f00",fontWeight:"bold"})})}};return new b}(jQuery),window.apples.analysis=window.apples.analysis||function(a){"use strict";var b=function(){function b(b){var g=a("#PracticeData",b).length?0:-2,h=a("table:eq("+(5+g)+") tr:last > td:gt(0)",b),i=a("table:eq("+(6+g)+") tr:last > td",b),j=a("table:eq("+(10+g)+") tr:last > td",b),k=d(a("table:eq("+(3+g)+") tr:gt(0)",b)),l=1,m=[],n=[],o=a("table:eq("+(18+g)+")",b);if("dvFinAnalisysTable"!==o.parent().attr("id")&&o.text().indexOf("Technical problems")===-1){m=a.map(o.find("tr:gt(0)"),function(b){var c=a(b).children("td"),d=parseInt(c.eq(0).text().match(/\d+/g)[1],10),f=e(k,l,d);return l=d+1,{Lap:d,Reason:a.trim(c.eq(1).text()),Tyres:a.trim(c.eq(2).text()),Fuel:a.trim(c.eq(3).text()),Refill:a.trim(c.eq(4).text()),Time:a.trim(c.eq(5).text()),Temp:f[0],Hum:f[1]}});var p=o.siblings("p");if(p.length){var q=f(k,l);m.push({Lap:"Last",Tyres:p.eq(0).text().match(/\d+/)[0]+"%",Fuel:p.eq(1).text().match(/\d+/)[0]+"l",Temp:q[0],Hum:q[1]})}}return o.text().indexOf("Technical problems")!==-1?n=c(o):(o=a("table:eq("+(19+g)+")",b),o.text().indexOf("Technical problems")!==-1&&(n=c(o))),{ID:a('a[href^="TrackDetails"]',b).attr("href").split("=")[1],Setup:{FWing:a.trim(h.eq(0).text()),RWing:a.trim(h.eq(1).text()),Engine:a.trim(h.eq(2).text()),Brakes:a.trim(h.eq(3).text()),Gear:a.trim(h.eq(4).text()),Susp:a.trim(h.eq(5).text())},Risks:{Start:a.trim(a("table:eq("+(6+g)+") tr:eq(2)",b).text()),Overtake:a.trim(i.eq(0).text()),Defend:a.trim(i.eq(1).text()),DryClear:a.trim(i.eq(2).text()),WetClear:a.trim(i.eq(3).text()),Malf:a.trim(i.eq(4).text())},Pits:m,CarParts:a.map(a("table:eq("+(2+g)+") tr:gt(1)",b).filter(function(a){return a%2===0}),function(b){var c=a(b).children("td");return{Cha:a.trim(c.eq(0).text()),Eng:a.trim(c.eq(1).text()),FWing:a.trim(c.eq(2).text()),RWing:a.trim(c.eq(3).text()),Underb:a.trim(c.eq(4).text()),Sidep:a.trim(c.eq(5).text()),Cool:a.trim(c.eq(6).text()),Gear:a.trim(c.eq(7).text()),Bra:a.trim(c.eq(8).text()),Susp:a.trim(c.eq(9).text()),Elec:a.trim(c.eq(10).text())}}),Position:[a.trim(j.eq(0).text()),a.trim(j.eq(1).text())],Boost:a('a[style="color:lime;font-weight:bold;"]',b).map(function(){return parseInt(a(this).text(),10)}).toArray(),CarProblem:a('font[color="orange"]',b).filter(function(){return"Car problem"===a(this).text().trim()}).first().parents("tr:first").find("a").text(),StartAccident:1===a('font[color="orange"]',b).filter(function(){return"Start accident"===a(this).text().trim()}).length,TechnicalProblems:n,Energy:a(".barLabel",b).map(function(){return parseInt(a(this).text(),10)}).toArray()}}function c(b){var c=[];return b.find("tr:gt(0)").each(function(){var b=a(this).find("td");c.push({Lap:parseInt(b.first().text().replace("Lap",""),10),Problem:b.last().text().trim()})}),c}function d(b){var c=[],d=[],e=[];return b.each(function(b){var f=a(this).find("td");d[b]=parseInt(f.eq(5).text(),10),e[b]=parseInt(f.eq(6).text(),10),b&&(c[b-1]=f.eq(1).text())}),{lapTimes:c,temp:d,hum:e}}function e(a,b,c){for(var d=[0,0],e=b;e<=c;e++)d[0]+=a.temp[e],d[1]+=a.hum[e];return d[0]=g(d[0]/(c-b+1),2),d[1]=g(d[1]/(c-b+1),2),d}function f(a,b){for(var c=[0,0],d=b,e=a.temp.length;d<e;d++)c[0]+=a.temp[d],c[1]+=a.hum[d];return c[0]=g(c[0]/(e-b),2),c[1]=g(c[1]/(e-b),2),c}function g(a,b){var c=Math.pow(10,b);return Math.round(a*c)/c}this.getInfo=function(c,d){a.ajax({type:"GET",url:"/RaceAnalysis.asp",success:function(a){a&&c&&c(b(a))},error:function(){d&&d()}})},this.addFunctionality=function(){var b,c,h=a("#PracticeData").length?0:-2,i=d(a("table:eq("+(3+h)+") tr:gt(0)"));if(preferences.SettingsSetup.RA.Total){var j=[0,0];for(b=1,c=i.temp.length;b<c;b++)j[0]+=i.temp[b],j[1]+=i.hum[b];j[0]/=i.temp.length-1,j[1]/=i.hum.length-1,a("table:eq("+(3+h)+") > *").append('<tr style="" onmouseover="this.style.backgroundColor=\'#3B2D47\';" onmouseout="this.style.backgroundColor=\'\';"><td bgcolor="#1b2d47" align="center" class="speccell" colspan="2"><b>Total</b></td><td align="center" class="speccell">&nbsp;</td><td align="center" class="speccell">&nbsp;</td><td align="center" class="speccell">&nbsp;</td><td align="center" class="speccell">'+g(j[0],2)+'&deg;</td><td align="center" class="speccell">'+g(j[1],2)+'%</td><td nowrap="" align="center" class="speccell">&nbsp;</td></tr>')}if(preferences.SettingsSetup.RA.Stats){var k=[[0,0]],l=0;i.lapTimes.sort().forEach(function(a){var b=a.split(":");1===b.length&&(b[1]=b[0],b[0]=0);var c=b[1].split(".");k[l][0]<b[0]||k[l][1]<c[0]?(l++,k[l]=[b[0],c[0]],k[l][3]=1):k[l][3]=k[l][3]+1});var m=['<br /><h2>Lap time statistics</h2><table class="styled center" cellspacing="1" cellpadding="1" border="0" align="center" width="100%" id="statisticas"><tr bgcolor="#1b2d47"><td align="center" class="speccellnobot">Time</td><td align="center" class="speccellnobot">Repeats</td><td align="center" class="speccellnobot">%</td></tr>'];for(b in k)b>0&&m.push('<tr onmouseout="this.style.backgroundColor=\'\';" onmouseover="this.style.backgroundColor=\'#3B2D47\';"><td align="center" class="speccellnobot">'+k[b][0]+":"+k[b][1]+'</td><td align="center" color="#88bb88" class="speccellnobot">'+k[b][3]+'</td><td align="center" class="speccellnobot">'+(100*k[b][3]/i.lapTimes.length).toFixed(2)+"%</td></tr>");m.push("</table>"),a("table:eq("+(5+h)+")").after(m.join(""))}if(preferences.SettingsSetup.RA.Avg){var n=1,o=a("table:eq("+((preferences.SettingsSetup.RA.Stats?19:18)+h)+")");if("dvFinAnalisysTable"!==o.parent().attr("id")&&o.text().indexOf("Technical problems")===-1){var p=o.find("tr");p.each(function(b){var c=a(this);if(b){var d=parseInt(c.find("td:first").text().match(/\d+/g)[1],10),f=e(i,n,d);c.append('<td class="center"><b>'+f[0]+'&deg;</b></td><td class="center"><b>'+f[1]+"%</b></td>"),n=d+1}else c.append('<th class="center">Avg.<br>temp.</th><th class="center">Avg.<br>hum.</th>')}),o.css("width","100%");var q=o.siblings("p");if(q.length){var r=f(i,n),s=q.eq(0).text().match(/\d+/)[0],t=q.eq(1).text().match(/\d+/)[0];o.append('<tr><td nowrap="" class="center">Last<br>Stint</td><td class="center">&nbsp;</td><td class="center"><font color="#00ddff"><b>'+s+'%</b></font></td><td class="center"><b>'+t+'l</b></td><td class="center">&nbsp;</td><td class="center">&nbsp;</td><td class="center"><b>'+r[0]+'&deg;</b></td><td class="center"><b>'+r[1]+"%</b></td></tr>")}}}}};return new b}(jQuery),window.apples.setup=window.apples.setup||function(a){"use strict";var b=function(){function b(){var b=a("#StartTyres"),c=a("table:eq(3) img:eq(1)").attr("title");"Rain"===c&&"6"!==b.val()||"Rain"!==c&&"6"===b.val()?b.parent().css("background","red"):b.parent().css("background","")}this.addFunctionality=function(){a("font").length&&confirm("Send data to apples?")&&window.apples.forum.sendData(),a("#StartTyres").on("change",b),b()}};return new b}(jQuery),window.apples.tests=window.apples.tests||function(a){"use strict";var b=function(){function b(b){var e=a("table:eq(3) img:eq(0)",b),f=e.parent().text(),g=a.map(a("table:eq(4) tr:gt(0):lt(4)",b),function(b){var c=a(b).children("td");return[a.trim(c.eq(0).text()),a.trim(c.eq(1).text()),a.trim(c.eq(2).text())]});return a("table:eq(6) tr:gt(7):lt(3)",b).each(function(){g.push(a.trim(a(this).children("td:last").text()))}),{Laps:a.map(a('table:eq(5) tr[class="pointerhand"]',b),function(b){var c=a(b).children("td");return{Lap:a.trim(c.eq(0).text()),Done:a.trim(c.eq(1).text()),BTime:a.trim(c.eq(2).text()),MTime:a.trim(c.eq(3).text()),FWing:a.trim(c.eq(4).text()),RWing:a.trim(c.eq(5).text()),Engine:a.trim(c.eq(6).text()),Brakes:a.trim(c.eq(7).text()),Gear:a.trim(c.eq(8).text()),Susp:a.trim(c.eq(9).text()),Tyres:a.trim(c.eq(10).text()),Fuel:a.trim(c.eq(11).text()),TyresC:a.trim(c.eq(12).text()),FuelL:a.trim(c.eq(13).text()),TType:c.eq(14).children("img").attr("title")}}),Points:g,Weather:e.attr("title"),Temp:c(f),Hum:d(f)}}function c(a){var b=a.substring(a.indexOf("Temp")+6);return b.substring(0,b.indexOf("C"))}function d(a){var b=a.substring(a.indexOf("Humidity")+10);return b.substring(0,b.indexOf("%")+1)}this.getInfo=function(c,d){a.ajax({type:"GET",url:"/Testing.asp",success:function(a){a&&c&&c(b(a))},error:function(){d&&d()}})}};return new b}(jQuery),window.apples.forum=window.apples.forum||function(a,b,c,d,e,f,g){"use strict";var h=function(){function h(){s={ID:null,Q1:null,Q2:null,Practice:[],Driver:null,TD:null,Test:null,Race:null,NextRace:null,Staff:null}}function i(){$.ajax({type:"POST",url:"http://obuoliai.andajus.lt/gprotest.php",data:JSON.stringify(s),dataType:"json",contentType:"application/json;charset=UTF-8",complete:function(){$(".overlay, .overlay-message").hide()}})}function j(){$.ajax({type:"GET",url:"/gpro.asp",success:function(a){if(a){var b=[];s.ID=$("#managerinformation, .xmanagerinfo",a).find('a[href^="Manager"]').attr("href").split("=")[1];var c=$('#racebar a[href^="TrackDetails"]',a);c.length&&(s.NextRace=c.attr("href").split("=")[1]),$('a[href^="Qualify.asp"]',a).length&&b.push($.Deferred(function(a){m(a)}).promise()),$('a[href^="Qualify2.asp"]',a).length&&b.push($.Deferred(function(a){n(a)}).promise()),$('a[href^="RaceAnalysis.asp"]',a).length&&b.push($.Deferred(function(a){p(a)}).promise()),c=$('a[href^="DriverProfile"]',a),c.length&&b.push($.Deferred(function(a){k(a,c.attr("href"))}).promise()),c=$('a[href^="TechDProfile"]',a),c.length&&b.push($.Deferred(function(a){l(a,c.attr("href"))}).promise()),$('a[href^="Testing.asp"]',a).length&&b.push($.Deferred(function(a){o(a)}).promise()),b.push($.Deferred(function(a){q(a)}).promise()),b.push($.Deferred(function(a){r(a)}).promise()),$.when.apply(null,b).done(function(){i()})}}})}function k(b,c){a.getInfo(c,function(a){s.Driver=a,b.resolve()},function(){b.resolve()})}function l(a,c){b.getInfo(c,function(b){s.TD=b,a.resolve()},function(){a.resolve()})}function m(a){d.getInfo(function(b){s.Practice=b.Practice,b.Q1&&(s.Q1=b.Q1),a.resolve()},function(){a.resolve()})}function n(a){e.getInfo(function(b){s.Q2=b,a.resolve()},function(){a.resolve()})}function o(a){f.getInfo(function(b){s.Test=b,a.resolve()},function(){a.resolve()})}function p(a){c.getInfo(function(b){s.Race=b,a.resolve()},function(){a.resolve()})}function q(a){$.ajax({type:"GET",url:"/EconomyHistory.asp",success:function(b){var c=$.map($("table tr:gt(1)",b),function(a){return $.trim($(a).children("td:eq(1)").text())});s.TestsBeforePractice=c.indexOf("Testing session costs")<c.indexOf("Qualify 2 lap costs"),a.resolve()},error:function(){a.resolve()}})}function r(a){g.getInfo(function(b){s.Staff=b,a.resolve()},function(){a.resolve()})}var s;this.sendData=function(){$(".overlay, .overlay-message").show(),h(),j()}};return new h}(window.apples.driver,window.apples.director,window.apples.analysis,window.apples.qualify1,window.apples.qualify2,window.apples.tests,window.apples.staff),function(a,b,c,d,e,f,g,h){"use strict";var i=function(){function i(a){var b=0;return~a.indexOf("Qualify2")?b=1:~a.indexOf("RaceAnalysis")?b=2:~a.indexOf("Qualify")?b=3:~a.indexOf("AvailTechDirectors")?b=4:~a.indexOf("AvailDrivers")?b=5:~a.indexOf("UpdateCar")?b=6:~a.indexOf("RaceSetup")?b=7:~a.indexOf("StaffAndFacilities")&&(b=8),b}var j=i(location.href);if($('a[href*="UpdateProfile.asp"]').length){var k=$("#managersonline");k&&(k.prepend('<li><a href="#" onclick="window.apples.forum.sendData()">Send data</a></li>'),$("body").append('<div style="position:absolute;top:0;bottom:0;left:0;right:0;display:none;z-index:9998;background-color:rgba(190,190,190,0.4);" class="overlay"></div><div style="position:absolute;left:45%;top:25%;display:none;z-index:9999;font-weight:bold;font-size:35px;color:#0f0;" class="overlay-message">Sending data...</div>'))}switch(j){case 1:e.addFunctionality();break;case 2:c.addFunctionality();break;case 3:d.addFunctionality();break;case 4:b.addFunctionality();break;case 5:a.addFunctionality();break;case 6:f.addFunctionality();break;case 7:g.addFunctionality();break;case 8:h.addFunctionality()}};$(document).ready(function(){i()})}(window.apples.drivers,window.apples.directors,window.apples.analysis,window.apples.qualify1,window.apples.qualify2,window.apples.update,window.apples.setup,window.apples.staff);