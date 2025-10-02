// import React, { useState, useEffect } from 'react';
// import './DeviceSettings.css'
// import SideNavigation from '../../../../global/components/user/SideNavigation'
// import DropDownMenu from '../../../../global/components/user/DropDownMenu';
// import Header from '../../../../global/components/user/Header';


// export default function DeviceSettings() {
//     const page = "Device Settings"
//     const searchBar = false

//     const [showDropdown, setShowDropdown] = useState(false);
//     const [users, setUsers] = useState([])

//     useEffect(() => {
//         setUsers(JSON.parse(localStorage.getItem('users')))
//     }, [])

//     return (
//         <div className='container'>
//             <div>
//                 <SideNavigation />
//             </div>
//             <div className='ds-container'>
//                 <div className='ds-header'>
//                     <Header page={page} searchBar={searchBar} />
//                 </div>
//                 {showDropdown && <DropDownMenu />}
//                 <div className='ds-body'>
//                     <div className='ds-settings'>
//                         <div className='ds-1'>
//                             <label>Device Settings</label>
//                             <button>Disconnect</button>
//                         </div>
//                         <div className='ds-2'>
//                             <img className='rbd' src={require('../assets/RBD 1.png')} />
//                             <div className='ds-info'>
//                                 <label>Device Information</label>
//                                 <label>Name: RBD2025</label>
//                                 <label>---------------------------</label>
//                                 <label>Battery: 97%</label>

//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

import React, { useState } from 'react';
import './DeviceSettings.css'
import SideNavigation from '../../../../global/components/user/SideNavigation'
import Header from '../../../../global/components/user/Header';

export default function DeviceSettings({ setCharacteristic }) {
    const page = "Device Settings"
    const searchBar = false

    const [deviceName, setDeviceName] = useState("");
    const [isConnected, setIsConnected] = useState(false);
    const SERVICE_UUID = "0000ffe0-0000-1000-8000-00805f9b34fb";
    const CHARACTERISTIC_UUID = "0000ffe1-0000-1000-8000-00805f9b34fb";

    const handleConnect = async () => {
        try {
            console.log("Requesting BLE device...");
            const device = await navigator.bluetooth.requestDevice({
                filters: [{ services: [SERVICE_UUID] }]
            });

            setDeviceName(device.name || "Unknown Device");

            const server = await device.gatt.connect();
            console.log("Connected to GATT server");

            const service = await server.getPrimaryService(SERVICE_UUID);
            const characteristic = await service.getCharacteristic(CHARACTERISTIC_UUID);

            // Save to parent (so TextToBraille can use it)
            setCharacteristic(characteristic);

            setIsConnected(true);

            device.addEventListener("gattserverdisconnected", () => {
                setIsConnected(false);
                setCharacteristic(null);
                console.log("Device disconnected");
            });

        } catch (error) {
            console.error("Connection failed:", error);
        }
    };

    return (
        <div className='container'>
            <div>
                <SideNavigation />
            </div>
            <div className='ds-container'>
                <div className='ds-header'>
                    <Header page={page} searchBar={searchBar} />
                </div>
                <div className='ds-body'>
                    <div className='ds-settings'>
                        <div className='ds-1'>
                            <label>Device Settings</label>
                            {!isConnected ? (
                                <button onClick={handleConnect}>Connect</button>
                            ) : (
                                <button disabled>Connected</button>
                            )}
                        </div>
                        <div className='ds-2'>
                            <img className='rbd' src={require('../assets/RBD 1.png')} />
                            <div className='ds-info'>
                                <label>Device Information</label>
                                <label>Name: {deviceName || "No device"}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
