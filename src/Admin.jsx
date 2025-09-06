import React, {useState, useEffect} from "react";

const Admin = () => {
    const pass = "Wunmi01"
    const [passed, setPassed] = useState(false);
    const [interests, setInterests] = useState([]);
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
        console.log(data.interests)        
        setInterests(data.interests);
    }

    useEffect(() =>{
        loadInterests();
    },[])
    
    const checkPass = (e) =>{
        if (e.target.value === pass) {
            setPassed(true);
        }
    }
    return (
        <div>
            {!passed && 
                <form>
                    <input type="password" onChange={checkPass} />
                </form>
            }

            {passed && interests && (
                interests.map((interest, index) => {
                    const { interestId, timestamp, fullName, age, email, phoneNumber, social} = interest;
                    return (
                        <div key={interestId || index}>
                            <p className="text-white-600">{fullName}</p>
                            <p className="text-white-600">{age}</p>
                            <p className="text-white-600">{email}</p>
                            <p className="text-white-600">{phoneNumber}</p>
                            <a href={social} target="_blank" className="text-yellow-600">{social}</a>
                            <br /><br />
                        </div>
                    )
                })
            )}
        </div>
    )
}

export default Admin;