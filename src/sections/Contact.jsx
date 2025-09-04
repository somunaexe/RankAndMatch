import { useRef, useState } from 'react'

const Contact = () => {
    const formRef = useRef();
    const [message, setMessage] = useState({});
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        social: '',
    })

    
    const handleChange = ({ target: { name, value }}) => {
        setForm({ ...form, [name]: value.trim() })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const enquiry = {
            fullName: form.name,
            email: form.email,
            phoneNumber: form.phoneNumber,
            social: form.social,
        }

        const response = await fetch("https://9rbgl7kyu7.execute-api.eu-north-1.amazonaws.com/dev/",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(enquiry),
            }
        );

        const data = await response.json();
        setMessage(data || "");

        // reset form fields
        setForm({
            name: "",
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
                {message && (
                    <p className={`text-lg ${"message" in message ? "text-green-500" : "text-red-500"} mt-3 font-semibold`}>{message.message || message.error || ""}</p>
                )}
                <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col space-y-7 z-10 relative">
                    <label className="space-y-3">
                        <span className="field-label">Full Name *</span>
                        <input type="text" name="name" value={form.name} onChange={handleChange} required className="field-input" placeholder="ex., John Doe"/>
                    </label>

                    <label className="space-y-3">
                        <span className="field-label">Email address *</span>
                        <input type="email" name="email" value={form.email} onChange={handleChange} required className="field-input" placeholder="ex., johndoe@gmail.com"/>
                    </label>

                    <label className="space-y-3">
                        <span className="field-label">Phone Number*</span>
                        <input type="tel" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} required rows={5} className="field-input" placeholder="+44 1234 1234"/>
                    </label>

                    <label className="space-y-3">
                        <span className="field-label">Social</span>
                        <input type="text" name="social" value={form.social} onChange={handleChange} rows={5} className="field-input" placeholder="https://www.instagram.com/user"/>
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