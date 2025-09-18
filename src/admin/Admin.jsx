import Navbar from '../sections/Navbar'
import { adminLinks } from "../constants/index.js"
import Interests from "./Interests.jsx";
import Consents from "./Consents.jsx";
import Topics from "./Topics.jsx";
import { useState, useEffect } from 'react'
const Admin = () => {
    const pass = "Wunmi01"
    const [passed, setPassed] = useState(false);
    const checkPass = (e) =>{
        if (e.target.value === pass) {
            setPassed(true);
        }
    }
    return (
        <main className='max-w-7xl mx-auto'>
            {!passed && 
                <form>
                    <label className="space-y-3">
                        <p className="field-label">Password <span className='text-red-500'>*</span></p>
                        <input type="password" onChange={checkPass} className="field-input" placeholder="Enter Password"/>
                    </label>
                </form>
            }

            {passed && 
                <>
                    <Navbar navLinks={adminLinks} />
                    <Interests />
                    {/* <Consents /> */}
                    {/* <Topics /> */}
                </>
            }
        </main>
    )
}

export default Admin;