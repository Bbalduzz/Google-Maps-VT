# Google-Maps-VT
Google Maps' Vector Tiles implementation made for Scriptable for generating static images of google maps based on address or coordinates

## Usage Example 
```javascript
class GoogleMapsVT {constructor(){}generate_vt_url(_,e,t,m=[1024,1024],s=19){return`https://www.google.com/maps/vt/pb=!1m8!4m7!1m2!1u${m[0]}!2u${m[1]}!2u${s}!3m2!1x${String(_).replace(".","")}!2x${String(e).replace(".","")}!2m35!1e2!2sspotlight!8m32!1m2!12m1!20e1!2m7!1s0x477e4e5cdd6e8637:0x2c4b6f8740858561!2s${encodeURIComponent(t.replace(" ","+"))}!4m2!3d${_}!4d${e}!5e3!6b1!13m10!2shh,a!18m4!6b0!9b1!20b1!21b1!22m3!6e2!7e3!8e2!19u6!19u7!19u11!19u12!19u14!19u29!19u37!19u30!19u61!19u70!2m2!1e4!2st!2m3!1e0!2sm!3i999999!3m3!2sit!3sIT!5e1105!4e0!5m2!1e0!5f2.0`}async getAddressCoordinates(_){let e,t=await new Request(`https://nominatim.openstreetmap.org/?addressdetails=1&q=${encodeURIComponent(_.replace(" ","+"))}&format=json&limit=1`).loadJSON();return t.length>0?{lat:t[0].lat,lon:t[0].lon}:null}}

// === EXAMPLE === //
async function fetchImage(url) {
    const request = new Request(url);
    return await request.loadImage();
}

async function createWidgetWithMap(img) {
    let widget = new ListWidget();
	 let widgetImage = widget.addImage(img);
	 widgetImage.cornerRadius = 10;
	 widgetImage.centerAlignImage()
    if (config.runsInWidget) {
        Script.setWidget(widget);
    } else {
        widget.presentLarge();
    }
    
    Script.complete();
}

let googleMapsVT = new GoogleMapsVT();
let address = "Via Quartieri, Ferrara, FE";
let coordinates = await googleMapsVT.getAddressCoordinates(address); // or u can directly add them
if (coordinates) {
    let url = googleMapsVT.generate_vt_url(coordinates.lat, coordinates.lon, address, [512, 512], 17); // [int, int], int ==> image dimensions, zoom
    let img = await fetchImage(url);
    await createWidgetWithMap(img);
	
} else {
    console.log("Address not found.");
}
```
#### output
![output](https://talk.automators.fm/uploads/default/original/2X/9/95c006a7bab335861197fea23e23ddac97c740b3.png)
