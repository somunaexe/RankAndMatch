import Globe from 'react-globe.gl' 
import Button from '../components/Button.jsx'
import { useState } from 'react'
const About = () => {
    const [emailCopied, setEmailCopied] = useState(false) 
    const [numberCopied, setNumberCopied] = useState(false) 

    const handleCopy = (detail) => {
        if(detail === 'number') {
            setNumberCopied(true)
            setTimeout(() => setNumberCopied(false), 2000);
            navigator.clipboard.writeText('+447936548807')
            return
        }
        else if(detail === 'email'){
            setEmailCopied(true)
            setTimeout(() => setEmailCopied(false), 2000);
            navigator.clipboard.writeText('somunanzenwa@gmail.com')
            return
        }
    }
  return (
    <section className="c-space my-20" id="about">
        <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">
            
            <div className="col-span-1 xl:row-span-3">
                <div className="grid-container">
                    <img src="/assets/grid1.png" alt="grid-1" className="w-full sm:h-[276px] h-fit object-contain" />
                    <div>
                        <p className="grid-headtext">Hi, I'm Somuna</p>
                        <p className="grid-subtext">Software engineering graduate with strong expertise in mobile, web, and game development. Passionate about creating innovative solutions that make a difference.</p>
                    </div>
                </div>
            </div>

            <div className="col-span-1 xl:row-span-3">
                <div className="grid-container justify-between">
                    <img src="/assets/stack.png" alt="grid-2" className="w-full sm:w-[276px] lg:w-[676px] h-fit object-contain"/>
                    <div>
                        <p className="grid-headtext">Tech Stack</p>
                        <p className="grid-subtext">I specialize in JavaScript with a focus on React and Node.js ecosystems.</p><p className="grid-subtext">Additionaly, I&apos;m an expert in Flutter/Kotlin/Swift and Unity/C# for mobile and game development respectively.</p>
                    </div>
                </div>
            </div>

            <div className="col-span-1 xl:row-span-4">
                <div className="grid-container">
                    <div className="rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center">
                        <Globe
                            height={326}
                            width={326}
                            backgroundColor="rgba(0, 0, 0, 0)"
                            backgroundImageOpacity={0.5}
                            showAtmosphere
                            showGraticules
                            globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
                            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                            // labelsData={[{
                            //     "lat": 53.48, lng: -2.26,
                            //     text: "I'm here!",
                            //     color: 'white',
                            //     size: 100,
                            // }]}
                        />
                    </div>
                    <div>
                        <p className='grid-headtext'>I work remotely across all timezones</p>
                        <p className="grid-subtext">I'm based in the UK, with remote work available</p>
                        <a href='#contactDetails'><Button name="Contact me" isBeam containerClass="w-full mt-10" /></a>
                    </div>
                </div>
            </div>

            <div className="xl:col-span-2 xl:row-span-3">
                <div className="grid-container">
                    <img src="/assets/grid3.png" alt="grid-3" className='w-full sm:h-[266px] h-fit object-contain' />

                    <div>
                        <p className="grid-headtext">My Passion for Coding</p>
                        <p className="grid-subtext">I love solving problems and building software through code. Coding is not just profession, it's my hobby!</p>
                    </div>
                </div>
            </div>

            <div className="xl:col-span-1 xl:row-span-2" id="contactDetails">
                <div className="grid-container">
                    <img src="assets/grid4.png" alt="grid-4" className='w-full md:h-[126px] sm:h-[276px] h-fit object-cover sm:object-top' />
                    <div className="space-y-2">
                        <p className="grid-subtext text-center">Contact me</p>
                        <div className="copy-container" onClick={() =>handleCopy("email")}>
                            <img src={emailCopied ? 'assets/tick.svg' : 'assets/copy.svg'} alt="copy" />
                            <p className="lg:text-2xl md:text-xl font-medium text-gray_gradient text-white">somunanzenwa@gmail.com</p>
                        </div>
                        {/* <div className="copy-container" onClick={() => handleCopy("number")}>
                            <img src={numberCopied ? 'assets/tick.svg' : 'assets/copy.svg'} alt="copy" />
                            <p className="lg:text-2xl md:text-xl font-medium text-gray_gradient text-white">+44 793 654 8807</p>
                        </div> */}
                    </div>
                </div>
            </div>

        </div>
    </section>
  )
}

export default About