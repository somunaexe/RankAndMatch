import { useRef, useState } from 'react'

const ConsentForm = () => {
    const formRef = useRef();
    const consent = document.getElementById("consent");
    const [message, setMessage] = useState({});
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        name: '',
        age: '',
        email: '',
        phoneNumber: '',
        social: '',
        allergies: '',
        // GUARDIAN'S INFORMATION
        guardianName: '',
        guardianAge: '',
        guardianEmail: '',
        guardianPhoneNumber: '',
        guardianAllergies: '',
    })
    const handleChange = ({ target: { name, value }}) => {
        setForm({ ...form, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(form)
        setLoading(true);
        setMessage({});
        
        let consentApplication = {
            fullName: form.name.trim(),
            age: form.age.toString().trim(),
            email: form.email.trim(),
            phoneNumber: form.phoneNumber.trim(),
            social: form.social.trim() || '',
            allergies: form.allergies.trim() || '',
        }

        if (Number(form.age) < 18) { 
            consentApplication = {
                ...consentApplication,
                guardianName: form.guardianName.trim() || '',
                guardianAge: form.guardianAge.trim() || '',
                guardianEmail: form.guardianEmail.trim() || '',
                guardianPhoneNumber: form.guardianPhoneNumber.trim() || '',
                guardianAllergies: form.guardianAllergies.trim() || '',
            }
        }

        const response = await fetch("https://9llxstbhji.execute-api.eu-north-1.amazonaws.com/dev",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(consentApplication),
            }
        );

        const data = await response.json();
        setMessage(data || "");
        consent?.scrollIntoView()

        // reset form fields
        setForm({
            name: "",
            age: "",
            email: "",
            phoneNumber: "",
            social: "",
            allergies: "",
            guardianName: "",
            guardianAge: "",
            guardianEmail: "",
            guardianPhoneNumber: "",
            guardianAllergies: "",
        });
        setLoading(false);
    }

  return (
    <section className="c-space my-20" id="consent">
        <div className="relative min-h-screen flex items-center justify-center flex-col py-10">
            <img src="/assets/terminal-logo.png" alt="terminal background" className="absolute inset-0 w-full h-full object-cover"/>
            
            <div className="contact-container">
                <h3 className="head-text">✨Consent to shoot✨</h3>
                <p className="text-lg text-white-600 text-justify mt-3">
                    We know you've told as all this before 😅 but please fill the form to confirm your casting. <br/><br/><span className='font-semibold'>Please bring your ID on the day to confirm your identity❗️</span>
                </p>

                {/* CONFIRMATION OR FAILURE MESSAGE */}
                {message && (
                    <p id="message" className={`text-lg ${"message" in message ? "text-green-500" : "text-red-500"} mt-3 font-semibold`}>{message.message || message.error || ""}</p>
                )}

                <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col space-y-7 z-10 relative">
                    <label className="space-y-3">
                        <p className="field-label">Full Name <span className='text-red-500'>*</span></p>
                        <input type="text" name="name" value={form.name} onChange={handleChange} required 
                            className="field-input focus:border-gray-500 focus:outline-none focus:border-2 transition-[border-width] duration-100 ease-in-out" placeholder="ex., John Doe"/>
                    </label>

                    <label className="space-y-3">
                        <p className="field-label">Age <span className='text-red-500'>* </span>(if under 18, you must come with a legal guardian and fill their information in this form)</p>
                        <input type="text" name="age"  value={form.age} onChange={handleChange} onInput={(e) => {e.target.value = e.target.value.replace(/\D/g, '')}} required 
                            className="field-input focus:border-gray-500 focus:outline-none focus:border-2 transition-[border-width] duration-100 ease-in-out" placeholder="ex., 00"/>
                    </label>

                    <label className="space-y-3">
                        <p className="field-label">Email address <span className='text-red-500'>*</span></p>
                        <input type="email" name="email" value={form.email} onChange={handleChange} required 
                            className="field-input focus:border-gray-500 focus:outline-none focus:border-2 transition-[border-width] duration-100 ease-in-out" placeholder="ex., johndoe@gmail.com"/>
                    </label>

                    <label className="space-y-3">
                        <p className="field-label">Phone Number <span className='text-red-500'>* </span>(include the country code)</p>
                        <input type="tel" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} required 
                            className="field-input focus:border-gray-500 focus:outline-none focus:border-2 transition-[border-width] duration-100 ease-in-out" placeholder="ex., +44 1234 1234"
                        />
                    </label>

                    <label className="space-y-3">
                        <p className="field-label">Social(s)</p>
                        <input type="url" name="social" value={form.social} onChange={handleChange} 
                            className="field-input focus:border-gray-500 focus:outline-none focus:border-2 transition-[border-width] duration-100 ease-in-out" placeholder="ex., https://www.social.com/user"
                        />
                    </label>

                    <label className="space-y-3">
                        <p className="field-label">Allergies</p>
                        <input type="text" name="allergies" value={form.allergies} onChange={handleChange} 
                            className="field-input focus:border-gray-500 focus:outline-none focus:border-2 transition-[border-width] duration-100 ease-in-out" placeholder="ex., nuts"
                        />
                    </label>

                    {Number(form.age) < 18 &&
                        (
                            <>
                                <label className="space-y-3">
                                <p className="field-label">Guardian's Full Name <span className='text-red-500'>*</span></p>
                                <input type="text" name="guardianName" value={form.guardianName} onChange={handleChange} required 
                                    className="field-input  focus:border-gray-500 focus:outline-none focus:border-2 transition-[border-width] duration-100 ease-in-out" placeholder="ex., John Doe"
                                />
                                </label>

                                <label className="space-y-3">
                                    <p className="field-label">Guardian's Age <span className='text-red-500'>* {form.guardianAge < 18 && <span className='text-red-500 font-semibold'>Must be over 18 years old</span>}</span></p>
                                    <input type="text" name="guardianAge" value={form.guardianAge} onChange={handleChange} 
                                        onInput={(e) => {e.target.value = e.target.value.replace(/\D/g, '')}} required 
                                        className={`field-input ${form.guardianAge < 18 ? 'border border-red-500' : 'focus:border-gray-500'} focus:outline-none focus:border-2 transition-[border-width] duration-100 ease-in-out`} placeholder="ex., 00"
                                    />
                                </label>

                                <label className="space-y-3">
                                    <p className="field-label">Guardian's Email address <span className='text-red-500'>*</span></p>
                                    <input type="email" name="guardianEmail" value={form.guardianEmail} onChange={handleChange} required 
                                        className="field-input focus:border-gray-500 focus:outline-none focus:border-2 transition-[border-width] duration-100 ease-in-out" placeholder="ex., johndoe@gmail.com"
                                    />
                                </label>

                                <label className="space-y-3">
                                    <p className="field-label">Guardian's Phone Number (include the country code)</p>
                                    <input type="tel" name="guardianPhoneNumber" value={form.guardianPhoneNumber} onChange={handleChange} 
                                        className="field-input focus:border-gray-500 focus:outline-none focus:border-2 transition-[border-width] duration-100 ease-in-out" placeholder="ex., +44 1234 1234"
                                    />
                                </label>

                                <label className="space-y-3">
                                    <p className="field-label">Guardian's Allergies</p>
                                    <input type="text" name="guardianAllergies" value={form.guardianAllergies} onChange={handleChange} 
                                        className="field-input focus:border-gray-500 focus:outline-none focus:border-2 transition-[border-width] duration-100 ease-in-out" placeholder="ex., nuts"
                                    />
                                </label>
                            </>
                        )
                    }
                    
                    <button className="field-btn hover:bg-gray-300 disabled:bg-black-600" type="submit" disabled={loading || (Number(form.age < 18) && Number(form.guardianAge < 18))}>
                        {loading ? 'Sending...' : 'Receive shoot details'}
                        <img src="/assets/arrow-up.png" alt="arrow-up" className="field-btn_arrow"/>
                    </button>
                </form>
            </div>
        </div>
    </section>
  )
}

export default ConsentForm