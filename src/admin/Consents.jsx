import {useState, useEffect} from "react";
import { format } from "date-fns"

const Consents = () => {
    const theadClass = "border border-gray-300 px-4 py-2 text-white-600"
    const [consents, setConsents] = useState([]);
    const [loaded, setLoaded] = useState([])
    const loadConsents = async (e) => {
        const response = await fetch("https://9llxstbhji.execute-api.eu-north-1.amazonaws.com/dev",
            {
                method: "GET",
                headers: { "Accept" : "application/json" }
            }
        )

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json()
        setConsents(data.consents);
        setLoaded(true)
    }

    useEffect(() =>{
        loadConsents();
    },[])
    return (
        <div>
            <h3 className="text-white-600">Consent</h3>
            <section className="c-space my-20" id="consents">
                {consents.length > 0 && (
                    <div className="overflow-x-auto">
                        {/* <input type="text" name="search" placeholder="Search for an interest" 
                            className='
                            w-full p-3 pl-5 pr-4 mb-5 
                            text-md rounded-lg font-semibold
                            shadow-md focus:outline-none 
                            focus:ring-2 focus:ring-blue-500
                            bg-[#ffffff] placeholder-gray-500'/> */}
                            <table className="table-auto border-collapse border w-full">
                                <thead>
                                    <tr>
                                        <th className={`${theadClass}`}>S/N</th>
                                        <th className={`${theadClass}`}>Full Name</th>
                                        <th className={`${theadClass}`}>Time Consented</th>
                                        <th className={`${theadClass}`}>Topic(s)</th>
                                        <th className={`${theadClass}`}>Role</th>
                                        <th className={`${theadClass}`}>Age</th>
                                        <th className={`${theadClass}`}>Email</th>
                                        <th className={`${theadClass}`}>Phone Number</th>
                                        <th className={`${theadClass}`}>Social(s)</th>
                                        <th className={`${theadClass}`}>Allergies</th>

                                        {/* GUARANTOR INFORMATION */}
                                        <th className={`${theadClass}`}>Guardian's Name</th>
                                        <th className={`${theadClass}`}>Guardian's Age</th>
                                        <th className={`${theadClass}`}>Guardian's Email</th>
                                        <th className={`${theadClass}`}>Guardian's Phone Number</th>
                                        <th className={`${theadClass}`}>Guardian's Allergies</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {consents.map((consent, index) => {
                                    const { consentId, timestamp, fullName, age, email, phoneNumber, social, allergies, guardianName, guardianAge, guardianEmail, guardianPhoneNumber, guardianAllergies, topic, role} = consent;
                                    
                                    return (
                                        <tr key={consentId || index}>
                                            <td className={`${theadClass}`}>{index+1}</td>
                                            <td className={`${theadClass}`}>{fullName}</td>
                                            <td className={`${theadClass}`}> 
                                                {format(new Date(timestamp), "eeee, MMM d, yyyy, HH:mm:ss")}
                                            </td>
                                            <td className={`${theadClass}`}>{topic}</td>
                                            <td className={`${theadClass}`}>{role}</td>
                                            <td className={
                                                `${Number(age) < 18 ? 
                                                    "border border-gray-300 px-4 py-2 text-red-600" :
                                                    theadClass
                                                }`
                                            }>{age}
                                            </td>
                                            <td className={`${theadClass}`}>
                                                <a className="text-yellow-600" href={`mailto:${email}`}>
                                                    {email}
                                                </a>
                                            </td>
                                            <td className={`${theadClass}`}>{phoneNumber}</td>
                                            <td className={`${theadClass}`}>
                                                {social ? 
                                                    <a href={social} target="_blank" className="text-yellow-600">social</a>
                                                : 
                                                    <p>Not Provided</p>
                                                }
                                            </td>
                                            <td className={`${theadClass}`}>
                                                {allergies}
                                            </td>
                                            <td className={`${theadClass}`}>
                                                {guardianName}
                                            </td>
                                            <td className={
                                                `${Number(guardianAge) < 18 ? 
                                                    "border border-gray-300 px-4 py-2 text-red-600" :
                                                    "border border-gray-300 px-4 py-2 text-green-600"
                                                }`
                                            }>{guardianAge}
                                            </td>
                                            <td className={`${theadClass}`}>
                                                <a className="text-yellow-600" href={`mailto:${guardianEmail}`}>
                                                    {guardianEmail}
                                                </a>
                                            </td>
                                            <td className={`${theadClass}`}>
                                                {guardianPhoneNumber}
                                            </td>
                                            <td className={`${theadClass}`}>
                                                {guardianAllergies}
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                    )
                }
                {consents.length < 1 && !setLoaded &&(
                    <p className="text-white-600 text-3xl">Loading...</p>
                )} 

                {consents.length < 1 && setLoaded &&(
                    <p className="text-white-600 text-3xl">No consents found</p>
                )}
            </section>
        </div>
    )
}

export default Consents;