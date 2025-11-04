import { useState } from "react";

const SERVICE_UUID = "";
const CHARACTERISTIC_UUID = "";

const App = () => {
	const [device, setDevice] = useState(null);
	const [characteristic, setCharacteristic] = useState(null);
	const [status, setStatus] = useState("Disconnected");

	async function connectBLE() {
		try {
			setStatus("Requesting device...");
			const device = await navigator.bluetooth.requestDevice({
				filters: [{ name: "GPS_Glasses" }],
				optionalServices: [SERVICE_UUID],
			});

			const server = await device.gatt.connect();
			const service = await server.getPrimaryService(SERVICE_UUID);
			const characteristic = await service.getCharacteristic(
				CHARACTERISTIC_UUID
			);

			setDevice(device);
			setCharacteristic(characteristic);
			setStatus("✅ Connected to GPS_Glasses");
		} catch (error) {
			console.error(error);
			setStatus("❌ Failed to connect");
		}
	}

	async function triggerGlasses() {
		if (!characteristic) return alert("Not connected to ESP yet!");

		try {
			await characteristic.writeValue(new Uint8Array([1])); // 1 = LED command
			setStatus("🚀 Command sent!");
			setTimeout(() => setStatus("✅ Connected"), 1500);
		} catch (err) {
			console.error(err);
			setStatus("❌ Write failed");
		}
	}

	return (
		<div className="h-screen w-screen flex flex-col gap-6 items-center justify-center bg-gray-100">
			<h1 className="text-3xl font-bold">GPS Glasses BLE Test</h1>
			<p className="text-lg font-medium">{status}</p>

			{!device && (
				<button
					onClick={connectBLE}
					className="px-6 py-3 bg-green-600 text-white text-lg font-bold rounded hover:bg-green-700 hover:scale-105 transition"
				>
					Connect to Glasses
				</button>
			)}

			{device && (
				<button
					onClick={triggerGlasses}
					className="px-6 py-3 bg-blue-600 text-white text-lg font-bold rounded hover:bg-blue-700 hover:scale-105 transition"
				>
					Trigger LED
				</button>
			)}
		</div>
	);
};

export default App;
