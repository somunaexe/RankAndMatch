import React, {useState, useEffect} from "react";
import { format } from "date-fns"

const Interests = () => {
    const [interests, setInterests] = useState([]);
    const theadClass = "border border-gray-300 px-4 py-2 text-white-600"
    const loadInterests = async (e) => {
        const response = await fetch("https://9rbgl7kyu7.execute-api.eu-north-1.amazonaws.com/dev",
            {
                method: "GET",
                headers: { "Accept" : "application/json" }
            }
        )

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json()
        const sortedInterests = data.interests.sort((a,b) => new Date(a.timestamp) - new Date(b.timestamp))
        console.log(sortedInterests)
        setInterests(sortedInterests);
    }

    useEffect(() =>{
        loadInterests();
    },[])

    return (
        <div>
            <section id="interests" className="c-space my-20">
                <h3 className="head-text">Interests</h3>
                <hr/><br/>
                {interests.length > 0 && (
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
                                        <th className={`${theadClass}`}>Time Applied</th>
                                        <th className={`${theadClass}`}>Age</th>
                                        <th className={`${theadClass}`}>Email</th>
                                        <th className={`${theadClass}`}>Phone Number</th>
                                        <th className={`${theadClass}`}>Social(s)</th>
                                        <th className={`${theadClass}`}>Allergies</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {interests.map((interest, index) => {
                                    const { interestId, timestamp, fullName, age, email, phoneNumber, social, allergies} = interest;
                                    
                                    return (
                                        <tr key={interestId || index}>
                                            <td className={`${theadClass}`}>{index+1}</td>
                                            <td className={`${theadClass}`}>{fullName}</td>
                                            <td className={`${theadClass}`}> 
                                                {format(new Date(timestamp), "eeee, MMM d, yyyy, HH:mm:ss")}
                                            </td>
                                            <td className={`${theadClass}`}>{age}</td>
                                            <td className={`${theadClass}`}>{email}</td>
                                            <td className={`${theadClass}`}>{phoneNumber}</td>
                                            <td className={`${theadClass}`}>
                                                {social ? 
                                                    <a href={social} target="_blank" className="text-yellow-600">link</a>
                                                : 
                                                    <p>Not Provided</p>
                                                }
                                            </td>
                                            <td className={`${theadClass}`}>{allergies ? allergies : "None"}</td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                    )
                }
                {interests.length < 1 && (
                    <p className="text-white-600 text-3xl">Loading...</p>
                )} 
            </section>
        </div>
    )
}

export default Interests;