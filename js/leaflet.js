let karte = L.map("map");

const kartenLayer = {
    osm: L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }),
    geolandbasemap: L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapoverlay: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapgrau: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmaphidpi: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmaporthofoto30cm: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapgelaende: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgelaende/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapoberflaeche: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoberflaeche/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    stamen_toner: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    }),
    stamen_terrain: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    }),
    stamen_watercolor: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
    })
};

const layerControl = L.control.layers({
    "Geoland Basemap": kartenLayer.geolandbasemap,
    "Geoland Basemap Grau": kartenLayer.bmapgrau,
    "Geoland Basemap Overlay": kartenLayer.bmapoverlay,
    "Geoland Basemap High DPI": kartenLayer.bmaphidpi,
    "Geoland Basemap Orthofoto": kartenLayer.bmaporthofoto30cm,
    "Geoland Basemap Gelände": kartenLayer.bmapgelaende,
    "Geoland Basemap Oberfläche": kartenLayer.bmapoberflaeche,
    "OpenStreetMap": kartenLayer.osm,
    "Stamen Toner": kartenLayer.stamen_toner,
    "Stamen Terrain": kartenLayer.stamen_terrain,
    "Stamen Watercolor": kartenLayer.stamen_watercolor
}).addTo(karte);

kartenLayer.bmapgrau.addTo(karte);

/*FullScreen*/

karte.addControl(new L.Control.Fullscreen());

/* Naherholungsstätten*/


const naherhol_gruppe = L.markerClusterGroup().addTo(karte);
const sport_gruppe = L.markerClusterGroup().addTo(karte);
const tier_gruppe = L.markerClusterGroup().addTo(karte);
layerControl.addOverlay(naherhol_gruppe, "Naherholungsstätten");
layerControl.addOverlay(sport_gruppe, "Sportstätten");
layerControl.addOverlay(tier_gruppe, "Tier");


for (let aoi of AOI) { //let kann überschireben weren!
    if (aoi.gruppe == "Naherholung") {


        markup = ""
        for (let i = 0; i < aoi.typ.length; i++) {
            markup += `<img src="icons/${aoi.typ[i]}.png">`
        }

        const marker = L.divIcon({
            html: markup,
            className: "ciaoderweil",
            iconSize: [36, 36]
        });

        let aoipin = L.marker(
            [aoi.lat, aoi.lng], {
                icon: marker,
                riseOnHover: true
            }

        ).addTo(naherhol_gruppe);


        var custompopup = `<h5> ${aoi.ort}</h5> <p> Adresse: ${aoi.adresse}</p>` + `<img src=${aoi.bild}>`;
        /*  if (`${aoi.bild}`){
             return `<img src=${aoi.bild}>`;
         } else {
             return "";
         }; */

        aoipin.bindPopup(
            custompopup
        )
    }

    if (aoi.gruppe == "Sport") {


        markup = ""
        for (let i = 0; i < aoi.typ.length; i++) {
            markup += `<img src="icons/${aoi.typ[i]}.png">`
        }

        const marker = L.divIcon({
            html: markup,
            className: "ciaoderweil",
            iconSize: [36, 36]
        });

        let aoipin = L.marker(
            [aoi.lat, aoi.lng], {
                icon: marker,
                riseOnHover: true
            }

        ).addTo(sport_gruppe);


        var custompopup = `<h5> ${aoi.ort}</h5> <p> Adresse: ${aoi.adresse}</p>` + `<img src=${aoi.bild}>`;
        /*  if (`${aoi.bild}`){
             return `<img src=${aoi.bild}>`;
         } else {
             return "";
         }; */

        aoipin.bindPopup(
            custompopup
        )
    }

    if (aoi.gruppe == "Tier") {


        markup = ""
        for (let i = 0; i < aoi.typ.length; i++) {
            markup += `<img src="icons/${aoi.typ[i]}.png">`
        }

        const marker = L.divIcon({
            html: markup,
            className: "ciaoderweil",
            iconSize: [36, 36]
        });

        let aoipin = L.marker(
            [aoi.lat, aoi.lng], {
                icon: marker,
                riseOnHover: true
            }

        ).addTo(tier_gruppe);


        var custompopup = `<h5> ${aoi.ort}</h5> <p> Adresse: ${aoi.adresse}</p>` + `<img src=${aoi.bild}>`;
        /*  if (`${aoi.bild}`){
             return `<img src=${aoi.bild}>`;
         } else {
             return "";
         }; */

        aoipin.bindPopup(
            custompopup
        )
    }
    console.log(tier_gruppe);

} //Für jedes von diesen Elementen in AOI soll 1 Pin an der Stelle lat und lng für diese variable aoi gesetzt werden


karte.fitBounds(naherhol_gruppe.getBounds());

/*MiniMap*/

new L.Control.MiniMap(
    L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
    }), {
        zoomLevelOffset: -4,
        toggleDisplay: true
    }
).addTo(karte);