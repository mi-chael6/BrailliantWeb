import { useDevice } from "../../context/DeviceContext";
import { Buffer } from "buffer";
import { BleManager } from "react-native-ble-plx";

const manager = new BleManager();
const FALLBACK_SERVICE_UUID = "FFE0";
const FALLBACK_CHARACTERISTIC_UUID = "FFE1";

/**
 * Hook to send text to the connected Braille device
 */
export const useSendToBrailleDevice = () => {
  const { connectedDevice } = useDevice();

  const sendToBrailleDevice = async (text) => {
    try {
      if (!connectedDevice) throw new Error("No connected device");

      const isConnected = await connectedDevice.isConnected();
      if (!isConnected) throw new Error("Device is disconnected");

      await connectedDevice.discoverAllServicesAndCharacteristics();

      let targetChar = null;

      // Try to dynamically find a writable characteristic
      const services = await connectedDevice.services();
      for (const service of services) {
        const characteristics = await service.characteristics();
        targetChar = characteristics.find(
          (c) => c.isWritableWithResponse || c.isWritableWithoutResponse
        );
        if (targetChar) break;
      }

      // Fallback to known FFE1 characteristic if none found
      if (!targetChar) {
        console.warn(
          "⚠️ No writable characteristic found dynamically, using fallback 0xFFE1"
        );
        targetChar = {
          service: FALLBACK_SERVICE_UUID,
          char: FALLBACK_CHARACTERISTIC_UUID,
        };
      }

      // Try Base64 first
      const base64Data = Buffer.from(text, "utf-8").toString("base64");
      try {
        await manager.writeCharacteristicWithResponseForDevice(
          connectedDevice.id,
          targetChar.service,
          targetChar.char,
          base64Data
        );
        console.log(`✅ Sent (Base64): "${text}"`);
        return true;
      } catch (base64Error) {
        console.warn("⚠️ Base64 send failed, retrying as raw text...", base64Error);
      }

      // Fallback → send as raw bytes
      const rawData = Buffer.from(text, "utf-8");
      await manager.writeCharacteristicWithResponseForDevice(
        connectedDevice.id,
        targetChar.service,
        targetChar.char,
        rawData.toString("latin1")
      );
      console.log(`✅ Sent (Raw): "${text}"`);
      return true;

    } catch (err) {
      console.error("❌ Failed to send to Braille device:", err.message || err);
      return false;
    }
  };

  return { sendToBrailleDevice };
};
