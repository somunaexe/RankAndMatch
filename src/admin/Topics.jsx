import {useState, useEffect} from "react";
import { format } from "date-fns"

const Topics = () => {
    const [topics, setTopics] = useState([]);
    const [loaded, setLoaded] = useState(false)
    const theadClass = "border border-gray-300 px-4 py-2 text-white-600"
    const loadTopics = async (e) => {
        const response = await fetch("https://m0umxkjpy6.execute-api.eu-north-1.amazonaws.com/dev",
            {
                method: "GET",
                headers: { "Accept" : "application/json" }
            }
        )

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json()
        const sortedTopics = data.topics.sort((a,b) => new Number(a.serialNumber) - new Number(b.serialNumber))
        console.log(sortedTopics)
        setTopics(sortedTopics);
        setLoaded(true)
    }

    useEffect(() =>{
        loadTopics();
    },[])

    return (
        <div className="bg-black border rounded-lg mb-20">
            <section id="topics" className="c-space my-10">
                <h3 className="head-text text-center">Topics</h3>
                <br/>
                {topics.length > 0 && (
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
                                        <th className={`${theadClass}`}>Topic</th>
                                        <th className={`${theadClass}`}>Special</th>
                                        <th className={`${theadClass}`}>Shot</th>
                                        <th className={`${theadClass}`}>Location</th>
                                        <th className={`${theadClass}`}>Time</th>
                                        <th className={`${theadClass}`}>Uploaded</th>
                                        <th className={`${theadClass}`}>Judges</th>
                                        <th className={`${theadClass}`}>Contestants</th>
                                        <th className={`${theadClass}`}>Crew</th>
                                        <th className={`${theadClass}`}>Special Members</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {topics.map((topicParam, index) => {
                                    const {serialNumber, Topic, Special, Shot, Location, Time, Uploaded, judges, contestants, crew, castMembers} = topicParam;
                                    
                                    return (
                                        <tr key={serialNumber || index}>
                                            <td className={`${theadClass}`}>{serialNumber}</td>
                                            <td className={`${theadClass}`}>{Topic}</td>
                                            <td className={`${theadClass}`}>{Special ? 'Yes' : 'No'}</td>
                                            <td className={`${theadClass}`}>{Shot ? 'Yes' : 'No'}</td>

                                            <td className={`${theadClass}`}> 
                                                {Location ? `${Location}`
                                                : 'Location TBC'
                                                }
                                            </td>
                                            <td className={`${theadClass}`}> 
                                                {Time ? `${format(new Date(Time), "eeee, MMM d, yyyy, HH:mm:ss")}`
                                                : 'Time TBC'
                                                }
                                            </td>
                                            <td className={`${theadClass}`}>{Uploaded ? 'Yes' : 'No'}</td>

                                            {/* CREWMATES AND CASTING INFORMATION */}
                                            <td className={`${theadClass}`}>
                                                {judges?.length > 0 ? (
                                                    judges?.map((name, index) => <p key={index}>{name},</p>)
                                                ) : (
                                                    <p>No judges casted</p>
                                                )}
                                            </td>
                                            <td className={`${theadClass}`}>
                                                {contestants?.length > 0 ? (
                                                    contestants?.map((name, index) => <p key={index}>{name},</p>)
                                                ) : (
                                                    <p>No contestants casted</p>
                                                )}
                                            </td>
                                            <td className={`${theadClass}`}>
                                                {crew.length > 0 ? (
                                                    crew.map((name, index) => <p key={index}>{name},</p>)
                                                ) : (
                                                    <p>No crew</p>
                                                )}
                                            </td>
                                            <td className={`${theadClass}`}>
                                                {castMembers?.length > 0 ? (
                                                    castMembers?.map((name, index) => <p key={index}>{name},</p>)
                                                ) : (
                                                    <p>No special members casted</p>
                                                )}
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                    )
                }
                {topics.length < 1 && !loaded && (
                    <p className="text-white-600 text-3xl">Loading...</p>
                )} 
                {topics.length < 1 && loaded && (
                    <p className="text-white-600 text-3xl">No topics found</p>
                )} 
            </section>
        </div>
    )
}

export default Topics;