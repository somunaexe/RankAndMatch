import { Canvas } from '@react-three/fiber'
import { workExperiences } from '../constants/index.js'
import { Suspense, useState } from 'react'
import { OrbitControls } from '@react-three/drei'
import CanvasLoader from '../components/CanvasLoader'
import Developer from '../components/Developer'
const Experience = () => {
    const [animationName, setAnimationName] = useState('idle')
    const [pageNumber, setPageNumber] = useState(1)

    const handleNavigation = (direction) => {
        if(direction === "previous") setPageNumber((prevPageNumber) => prevPageNumber === 1 ? Math.ceil(workExperiences.length / 3) : prevPageNumber - 1)
        else setPageNumber((prevPageNumber) => prevPageNumber === Math.ceil(workExperiences.length / 3) ? 1 : prevPageNumber + 1)
    }

  return (
    <section className="c-space my-20" id='work'>
        <div className="w-full text-white-600"> 
            <h3 className="head-text">My Experience</h3>
            <div className="work-container">
                <div className="work-canvas" onPointerOver={() => setAnimationName('idle')}>
                    <Canvas>
                        <ambientLight intensity={7} />
                        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                        <directionalLight position={[10, 10, 10]} intensity={1} />
                        <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} />
                        
                        <Suspense fallback={<CanvasLoader />}>
                            <Developer position-y={-3} scale={3} animationName={animationName} />
                        </Suspense>
                    </Canvas>
                </div>

                <div className="work-content">
                    <div className="sm:py-10 py-5 sm:px-5 px-2.5">
                        {workExperiences.slice(pageNumber * 3 - 3, pageNumber * 3, 3).map(({ id, name, pos, icon, duration, title, animation }) => (
                            <div key={id} className="work-content_container group" onClick={() => setAnimationName(animation.toLowerCase())} onPointerOver={() => setAnimationName(animation.toLowerCase())} onPointerOut={() => setAnimationName('idle')}>
                                <div className="flex flex-col h-full justify-start items-center py-2">
                                    <div className="work-content_logo">
                                        <img src={icon ? icon : '/assets/no_company.jfif'} alt="logo" className='w-full h-full' />
                                    </div>
                                    <div className="work-content_bar" />
                                </div>
                                <div className="sm:p-5 px-2.5 py-5">
                                    <p className="font-bold text-white-800">{name}</p>
                                    <p className="text-sm mb-5">{pos} -- {duration}</p>
                                    <p className="group-hover:text-white transition ease-in-out duration-500">{title}</p>
                                </div>
                            </div>
                        ))}

                        <div className="flex justify-between items-center mt-7">
                            <button className="arrow-btn" onClick={() => handleNavigation('previous')}>
                                <img src="/assets/left-arrow.png" alt="left arrow" className='w-4 h-4'/>
                            </button>

                            <button className="arrow-btn" onClick={() => handleNavigation('next')}>
                                <img src="/assets/right-arrow.png" alt="right arrow" className='w-4 h-4'/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>    
    </section>
  )
}

export default Experience