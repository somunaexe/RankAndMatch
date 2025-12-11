import {useRef, useState, useEffect} from "react";
import { format } from "date-fns"
import ConfirmModal from "../components/ConfirmModal";

const Interests = () => {
    const [interests, setInterests] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [topicId, setTopicId] = useState("")
    const [role, setRole] = useState("judges")
    const [currentInterestId, setCurrentInterestId] = useState("")
    const [timestamp, setTimestamp] = useState('')
    const [email, setEmail] = useState('')
    const [consentMessage, setConsentMessage] = useState('')
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
        // setLoaded(false)
    }

    const requestConsent = async(e) => {
        e.preventDefault()
        const currentTime = new Date().toISOString()
        console.log(`${currentInterestId},\n ${email},\n${currentTime}, \n${topicId}\n, ${role}`)
        
        await fetch("https://x12ex8za7c.execute-api.eu-north-1.amazonaws.com/dev/",
            {
                method: "POST",
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify({interestId: currentInterestId, email: email, topicId: topicId.trim(), role: role, currentTime: currentTime})
            }
        ).then(async (res) => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            setConsentMessage(data.message || "No response");
        }).catch(err => console.error("Error:", err));
        setTimestamp('')
        setTopicId('')
        setRole('judges')
    }

    useEffect(() =>{
        loadInterests();
    },[])

    return (
        <div id="interests" className="bg-black border rounded-lg mb-20">
            <section className="c-space my-10">
                <h3 className="head-text text-center">Interests</h3>
                <br/>
                
                <ConfirmModal isOpen={modalIsOpen}>
                    <button type="button" className="bg-red-500 font-medium text-white h-8 w-8 rounded-full flex items-center justify-center" 
                        onClick={() => {
                            setModalIsOpen(false)
                            setCurrentInterestId('')
                            setTopicId('')
                            setRole('judges')
                            setEmail('')
                            setTimestamp('')
                        }}
                    >
                        x
                    </button>
                    <form className="mt-12 flex flex-col space-y-7 z-10 relative">
                        <p className="text-green-500">{consentMessage}</p>
                        <label className="space-y-3">
                            <p className="field-label">Topic ID <span className='text-red-500'>*</span></p>
                            <input type="text" name="id" value={topicId} onChange={(e) => setTopicId(e.target.value)} required 
                                className="field-input focus:border-gray-500 focus:outline-none focus:border-2 transition-[border-width] duration-100 ease-in-out" placeholder="ex., xxxx-xxxx-xxxx"/>
                        </label>

                        <label className="space-y-3">
                            <p className="field-label">Role <span className='text-red-500'>* </span></p>
                            <select 
                                name="role" value={role} onChange={(e) => setRole(e.target.value)} required 
                                className="field-input focus:border-gray-500 focus:outline-none focus:border-2 transition-[border-width] duration-100 ease-in-out"
                            >
                                <option value="judges">Judge</option>
                                <option value="contestants">Contestant</option>
                                <option value="crew">Crew</option>
                            </select>
                        </label>

                        <p className="text-white">Are you sure you want to send the consent form?</p>
                        <button button="submit" className="btn" onClick={requestConsent}>Yes</button>
                    </form>
                </ConfirmModal>

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
                                        <th className={`${theadClass}`}>Send Consent form?</th>
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
                                            <td>
                                                <div className="flex justify-center">
                                                    <button className="btn m-3 hover:bg-gray-300" 
                                                        onClick={() => {
                                                            setCurrentInterestId(interestId)
                                                            setModalIsOpen(true)
                                                            setEmail(email)
                                                        }}
                                                    >Cast?</button>
                                                </div>
                                            </td>

                                            <td className={`${theadClass}`}>{index+1}</td>
                                            <td className={`${theadClass}`}>{fullName}</td>
                                            <td className={`${theadClass}`}> 
                                                {format(new Date(timestamp), "eeee, MMM d, yyyy, HH:mm:ss")}
                                            </td>
                                            <td className={`${theadClass}`}>{age}</td>
                                            <td className={`${theadClass}`}>
                                                <a className="text-yellow-600" href={`mailto:${email}`}>
                                                    {email}
                                                </a>
                                            </td>
                                            <td className={`${theadClass}`}>{phoneNumber}</td>
                                            <td className={`${theadClass}`}>
                                                {social ? 
                                                    <a href={social} target="_blank" className="text-yellow-600">link</a>
                                                : 
                                                    ''
                                                }
                                            </td>
                                            <td className={`${theadClass}`}>{allergies}</td>
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

                {/* {interests.length < 1 && setLoaded &&(
                    <p className="text-white-600 text-3xl">No interests found</p>
                )}  */}
            </section>
        </div>
    )
}

export default Interests;