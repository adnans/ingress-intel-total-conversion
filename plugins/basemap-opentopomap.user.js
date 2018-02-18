// ==UserScript==
// @id             iitc-plugin-basemap-opentopomap@adnans
// @name           IITC plugin: Map layers from opentopomap.org
// @category       Map Tiles
// @version        0.1.20180217
// @namespace      https://github.com/jonatkins/ingress-intel-total-conversion
// @updateURL      https://github.com/adnans/ingress-intel-total-conversion/raw/master/plugins/basemap-opentopomap.user.js
// @downloadURL    https://github.com/adnans/ingress-intel-total-conversion/raw/master/plugins/basemap-opentopomap.user.js
// @description    Map tiles from OpenTopoMap.org
// @include        https://*.ingress.com/intel*
// @include        http://*.ingress.com/intel*
// @match          https://*.ingress.com/intel*
// @match          http://*.ingress.com/intel*
// @include        https://*.ingress.com/mission/*
// @include        http://*.ingress.com/mission/*
// @match          https://*.ingress.com/mission/*
// @match          http://*.ingress.com/mission/*
// @grant          none
// ==/UserScript==


function wrapper(plugin_info) {
// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function') window.plugin = function() {};

// PLUGIN START ////////////////////////////////////////////////////////
// Yes, this is just the Stamen map file hacked up. I don't see any police here.


// use own namespace for plugin
window.plugin.mapTileOpentopo = function() {};



window.plugin.mapTileOpentopo.addLayer = function() {

  var types = {
    '': [ '', 'png', 0, 20 ],
  };

  var baseUrl = window.location.protocol == 'https:' ? 'https://c.tile.opentopomap.org/' : 'https://c.tile.opentopomap.org/';



  for (var layer in types) {
    var info = types[layer];

    var name = info[0];
    var type = info[1];
    var minZoom = info[2];
    var maxZoom = info[3];

    var mapLayer = new L.TileLayer (baseUrl+'{z}/{x}/{y}.png', {
      attribution: 'Kartendaten: © <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>-Mitwirkende, SRTM | Kartendarstellung: © <a href="http://opentopomap.org/">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
      subdomains: 'abcd',
      layer: layer,
      type: type,
      minZoom: minZoom,
      maxNativeZoom: maxZoom,
      maxZoom: 21
    });

    layerChooser.addBaseLayer(mapLayer,'OpenTopoMap '+name);
  }

};

var setup =  window.plugin.mapTileOpentopo.addLayer;

// PLUGIN END //////////////////////////////////////////////////////////


setup.info = plugin_info; //add the script info data to the function as a property
if(!window.bootPlugins) window.bootPlugins = [];
window.bootPlugins.push(setup);
// if IITC has already booted, immediately run the 'setup' function
if(window.iitcLoaded && typeof setup === 'function') setup();
} // wrapper end
// inject code into site context
var script = document.createElement('script');
var info = {};
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) info.script = { version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description };
script.appendChild(document.createTextNode('('+ wrapper +')('+JSON.stringify(info)+');'));
(document.body || document.head || document.documentElement).appendChild(script);


