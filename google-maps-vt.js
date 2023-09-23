class GoogleMapsVT {
    constructor() {}
    generate_vt_url(lat, lon, address, dimensions = [512, 512], zoom = 19) {
        let base = "https://www.google.com/maps/vt/pb=";
			let params = [
			    "!1m8", "!4m7",
			    `!1m2!1u${dimensions[0]}!2u${dimensions[1]}!2u${zoom}`,
			    `!3m2!1x${String(lat).replace('.', '')}!2x${String(lon).replace('.', '')}`,
			    "!2m35", "!1e2", "!2sspotlight", "!8m32", "!1m2!12m1!20e1", "!2m7",
			    `!1s0x477e4e5cdd6e8637:0x2c4b6f8740858561`,
			    `!2s${encodeURIComponent(address.replace(' ', '+'))}`,
			    `!4m2!3d${lat}!4d${lon}`,
			    "!5e3", "!6b1", "!13m10", "!2shh,a", "!18m4", "!6b0", "!9b1", "!20b1", "!21b1", "!22m3",
			    "!6e2", "!7e3", "!8e2", "!19u6", "!19u7", "!19u11", "!19u12", "!19u14", "!19u29", "!19u37", 
			    "!19u30", "!19u61", "!19u70", "!2m2!1e4!2st", "!2m3!1e0!2sm!3i999999", "!3m3!2sit!3sIT", 
			    "!5e1105!4e0!5m2!1e0!5f2.0"
			].join('');
		   return base + params;
    }
    async getAddressCoordinates(address) {
        let url = `https://nominatim.openstreetmap.org/?addressdetails=1&q=${encodeURIComponent(address.replace(' ', '+'))}&format=json&limit=1`;
        var request = new Request(url);
	     let response = await request.loadJSON();
        if (response.length > 0) {
            return {
                lat: response[0]["lat"],
                lon: response[0]["lon"]
            };
        } else {
            return null;
        }
    }
}
