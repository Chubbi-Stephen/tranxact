export const getDeviceDetails = () => {
	const ua = navigator.userAgent;
	let deviceName = "Unknown Device";
	let location = "Lagos, Nigeria"; // Simulated location

	if (/android/i.test(ua)) {
		deviceName = "Android Phone";
		if (/samsung/i.test(ua)) deviceName = "Samsung Galaxy";
		else if (/google/i.test(ua)) deviceName = "Google Pixel";
	} else if (/iPad|iPhone|iPod/.test(ua)) {
		deviceName = "iPhone";
		if (window.screen.height >= 812) deviceName = "iPhone Pro/Max";
	} else if (/Macintosh/i.test(ua)) {
		deviceName = "MacBook";
	} else if (/Windows/i.test(ua)) {
		deviceName = "Windows PC";
	} else if (/Linux/i.test(ua)) {
		deviceName = "Linux PC";
	}

	return { deviceName, location };
};
