import React, {useState, useEffect} from "react";
import { format } from "date-fns"

const Consents = () => {

    const [consents, setConsents] = useState([]);
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
    }

    useEffect(() =>{
        loadConsents();
    },[])
    return (
        <div>
            <p className="text-white-600">Consent</p>
            <section className="c-space my-20" id="consents">
                {consents && (
                    consents.map((consent, index) => {
                        const { consentId, timestamp, fullName, age, email, phoneNumber, social} = consent;
                        return (
                            <div key={consentId || index}>
                                <p className="text-white-600">{fullName}</p>
                                <p className="text-white-600"> Applied: {timestamp}</p>
                                <p className="text-white-600">{age}</p>
                                <p className="text-white-600">{email}</p>
                                <p className="text-white-600">{phoneNumber}</p>
                                <a href={social} target="_blank" className="text-yellow-600">{social}</a>
                                <br /><br />
                            </div>
                        )
                    })
                )}
            </section>
        </div>
    )
}

export default Consents;