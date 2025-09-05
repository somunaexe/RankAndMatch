import { useRef, useState } from 'react'

const Contact = () => {
    const formRef = useRef();
    const join = document.getElementById("join");
    const [message, setMessage] = useState({});
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        name: '',
        age: 0,
        email: '',
        phoneNumber: '',
        social: '',
    })

    
    const handleChange = ({ target: { name, value }}) => {
        setForm({ ...form, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({});
        
        const enquiry = {
            fullName: form.name.trim(),
            age: form.age.toString().trim(),
            email: form.email.trim(),
            phoneNumber: form.phoneNumber.trim(),
            social: form.social.trim() || '',
        }
// fixing mime 
        const response = await fetch(import.meta.env.VITE_API_URL,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(enquiry),
            }
        );

        const data = await response.json();
        setMessage(data || "");
        join?.scrollIntoView()

        // reset form fields
        setForm({
            name: "",
            age: "",
            email: "",
            phoneNumber: "",
            social: "",
        });

        setLoading(false);
    }

  return (
    <section className="c-space my-20" id="join">
        <div className="relative min-h-screen flex items-center justify-center flex-col py-10">
            <img src="/assets/terminal.png" alt="terminal background" className="absolute inset-0 w-full h-full object-cover"/>
            
            <div className="contact-container">
                <h3 className="head-text">Join Us</h3>
                <p className="text-lg text-white-600 mt-3">
                    If you would like to be part of a YouTube video as a Rank and Match contestant, please fill the form join us❗️
                </p>

                {/* CONFIRMATION OR FAILURE MESSAGE */}
                {message && (
                    <p id="message" className={`text-lg ${"message" in message ? "text-green-500" : "text-red-500"} mt-3 font-semibold`}>{message.message || message.error || ""}</p>
                )}

                <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col space-y-7 z-10 relative">
                    <label className="space-y-3">
                        <p className="field-label">Full Name <span className='text-red-500'>*</span></p>
                        <input type="text" name="name" value={form.name} onChange={handleChange} required className="field-input" placeholder="ex., John Doe"/>
                    </label>

                    <label className="space-y-3">
                        <p className="field-label">Age <span className='text-red-500'>*</span></p>
                        <input type="text" name="age"  value={form.age} onChange={handleChange} onInput={(e) => {e.target.value = e.target.value.replace(/\D/g, '')}}required className="field-input" placeholder="ex., 00"/>
                    </label>

                    <label className="space-y-3">
                        <p className="field-label">Email address <span className='text-red-500'>*</span></p>
                        <input type="email" name="email" value={form.email} onChange={handleChange} required className="field-input" placeholder="ex., johndoe@gmail.com"/>
                    </label>

                    <label className="space-y-3">
                        <p className="field-label">Phone Number <span className='text-red-500'>*</span></p>
                        <input type="tel" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} required rows={5} className="field-input" placeholder="ex., +44 1234 1234"/>
                    </label>

                    <label className="space-y-3">
                        <p className="field-label">Social(s)</p>
                        <input type="url" name="social" value={form.social} onChange={handleChange} rows={5} className="field-input" placeholder="ex., https://www.social.com/user"/>
                    </label>

                    <button className="field-btn" type="submit" disabled={loading}>
                        {loading ? 'Sending...' : 'Show your interest'}
                        <img src="/assets/arrow-up.png" alt="arrow-up" className="field-btn_arrow"/>
                    </button>
                </form>
            </div>
        </div>
    </section>
  )
}

export default Contact