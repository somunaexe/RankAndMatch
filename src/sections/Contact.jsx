import { useRef, useState } from 'react'
import DVDLogo from '../components/DVDLogo.jsx';
import base64Orders from '../components/FoodOrders.jsx';

const Contact = () => {
    const formRef = useRef();
    const join = document.getElementById("join");
    const [message, setMessage] = useState({});
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        name: '',
        age: '',
        email: '',
        phoneNumber: '',
        social: '',
        allergies: '',
        takes: '',
    })
    
    const [orders, setOrders] = useState([])

    const handleChange = ({ target: { name, value }}) => {
        setForm({ ...form, [name]: value })
    }

    const handleOrderChange = (e) => {
        const orderArray = Array.from(e.target.files)
        setOrders(orderArray)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(form)
        console.log(orders)
        setLoading(true);
        setMessage({});
        
        const enquiry = {
            fullName: form.name.trim(),
            age: form.age.toString().trim(),
            email: form.email.trim(),
            phoneNumber: form.phoneNumber.trim(),
            social: form.social.trim() || '',
            allergies: form.allergies.trim() || '',
            takes: form.takes.trim() || '',
        }

        let basedOrders = []

        const baseTheOrder = async() => {
            basedOrders = await base64Orders(orders)
            console.log(basedOrders)

            const payload = {
                ...enquiry,
                orders: basedOrders
            }
            const response = await fetch("https://9rbgl7kyu7.execute-api.eu-north-1.amazonaws.com/dev",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
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
            allergies: "",
            takes: "",
        });

        setOrders([])

        setLoading(false);
        }
        baseTheOrder()

        
    }

  return (
    <section className="c-space my-20" id="join">

        <div className='relative flex justify-center items-center flex-row max-w-full overflow-hidden'>
            <img src="assets/black-name-nobg.png" alt="name" className='flex-shrink min-w-0 w-full md:w-1/2 h-auto'/>
            <DVDLogo />
        </div>
            

        <div className="relative min-h-screen flex items-center justify-center flex-col py-10 bg-black/90 rounded-lg shadow-2xl backdrop-blur-md">
            {/* <img src="/assets/terminal-logo.png" alt="terminal background" className="absolute inset-0 w-full h-full object-cover"/> */}
            
            <div className="contact-container">
                <h3 className="head-text">Join Us</h3>
                <p className="text-lg text-white-600 mt-3">
                    If you would like to be part of a YouTube video as a Rank and Match judge or contestant, please fill the form below❗️
                </p>

                {/* CONFIRMATION OR FAILURE MESSAGE */}
                {message && (
                    <p id="message" className={`text-lg ${"message" in message ? "text-green-500" : "text-red-500"} mt-3 font-semibold`}>{message.message || message.error || ""}</p>
                )}

                
                <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col space-y-7 z-10 relative">
                    <label className="space-y-3">
                        <p className="field-label">Full Name <span className='text-red-500'>*</span></p>
                        <input type="text" name="name" value={form.name} onChange={handleChange} required 
                            className="field-input focus:border-gray-500 focus:outline-none focus:border-2 transition-[border-width] duration-100 ease-in-out" placeholder="ex., John Doe"
                        />
                    </label>

                    <label className="space-y-3">
                        <p className="field-label">Age <span className='text-red-500'>*</span></p>
                        <input type="text" name="age"  value={form.age} onChange={handleChange} onInput={(e) => {e.target.value = e.target.value.replace(/\D/g, '')}}required 
                            className="field-input focus:border-gray-500 focus:outline-none focus:border-2 transition-[border-width] duration-100 ease-in-out" placeholder="ex., 00"
                        />
                    </label>

                    <label className="space-y-3">
                        <p className="field-label">Email address <span className='text-red-500'>*</span></p>
                        <input type="email" name="email" value={form.email} onChange={handleChange} required 
                            className="field-input focus:border-gray-500 focus:outline-none focus:border-2 transition-[border-width] duration-100 ease-in-out" placeholder="ex., johndoe@gmail.com"
                        />
                    </label>

                    <label className="space-y-3">
                        <p className="field-label">Phone Number <span className='text-red-500'>* </span>(include the country code)</p>
                        <input type="tel" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} required rows={5} 
                            className="field-input focus:border-gray-500 focus:outline-none focus:border-2 transition-[border-width] duration-100 ease-in-out" placeholder="ex., +44 1234 1234"
                        />
                    </label>

                    <label className="space-y-3">
                        <p className="field-label">Social(s)</p>
                        <input type="url" name="social" value={form.social} onChange={handleChange} rows={5} 
                            className="field-input focus:border-gray-500 focus:outline-none focus:border-2 transition-[border-width] duration-100 ease-in-out" placeholder="ex., https://www.social.com/user"
                        />
                    </label>

                    <label className="space-y-3">
                        <p className="field-label">Allergies</p>
                        <input type="text" name="allergies" value={form.allergies} onChange={handleChange} rows={5} 
                            className="field-input focus:border-gray-500 focus:outline-none focus:border-2 transition-[border-width] duration-100 ease-in-out" placeholder="ex., nuts"
                        />
                    </label>

                    <label className="space-y-3">
                        <p className="field-label"><b>Hot takes</b></p>
                        <textarea type="text" name="takes" value={form.takes} onChange={handleChange} rows={5} 
                            className="field-input focus:border-gray-500 focus:outline-none focus:border-2 transition-[border-width] duration-100 ease-in-out" 
                            placeholder="Please write your 3 hot takes, each on a new line"
                        />
                    </label>

                    <label className="space-y-3">
                        <p className="field-label"><b>Food Order History </b></p>
                        <p className='field-label'>Please upload screenshots of your 10 most recent orders from Uber Eats, Deliveroo, and/or Just Eat.</p>
                        <input type="file" multiple name="orders" value={form.orders} onChange={handleOrderChange} className="field-input" />
                    </label>

                    <button className="field-btn hover:bg-gray-300" type="submit" disabled={loading}>
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