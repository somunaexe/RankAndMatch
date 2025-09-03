import CanvasLoader from '../components/CanvasLoader'
import DemoComputer from '../components/DemoComputer.jsx'
import { myProjects } from '../constants/index.js'
import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Center, OrbitControls } from '@react-three/drei'
import Button from '../components/Button.jsx'
import { saveAs } from 'file-saver'
const Projects = () => {
    const [projectCount, setProjectCount] = useState(myProjects.length)
    const [searchedProjects, setSearchedProjects] = useState(myProjects)
    const [selectedProjectIndex, setSelectedProjectIndex] = useState(0)
    const currentProject = searchedProjects[selectedProjectIndex]
    const [query, setQuery] = useState([])
    let lastSearch = ""
    const findProjects = (e) => {
        const value = e.target.value ? e.target.value : lastSearch
        
        setSearchedProjects(() => {
            // Filter projects by search term
            let filteredProjects = myProjects.filter(project => 
                project.tags.some(tag =>
                    tag.name.toLowerCase().includes(
                        query.length <= 0 && value === "" ? value : query.length > 0 && value === "" ? "qwetuqwertyu" : value.trim().toLowerCase()
                    )
                )
            );
            
            // Filter projects based on saved tags
            let matchedTags = query.length > 0 && (
                myProjects.filter(project => 
                    project.tags.some(tag =>
                        query.some(queryTag =>
                            tag.name.toLowerCase().includes(queryTag.toLowerCase())
                        )
                    )
                )
                
            );
            if(matchedTags) {
                filteredProjects = [...new Map([...filteredProjects, ...matchedTags].map((project) => [project.id, project])
              ).values(),]
            }
            lastSearch = value
            console.log(filteredProjects)
            // Set project count and reset selected project index
            setProjectCount(filteredProjects.length);
            setSelectedProjectIndex(0);
       
            // Return the appropriate list of filtered projects
            return filteredProjects; // Merging both filtered lists
        });       
    }
    const handleNavigation = (direction) => {
        setSelectedProjectIndex((prevIndex) => {
            if(direction === 'previous') return prevIndex === 0 ? projectCount - 1 : prevIndex - 1
            else if(direction === 'next') return prevIndex === projectCount - 1 ? 0 : prevIndex + 1
        })
    }

    const setTagQuery = (e) => {
        const value = e.target.value
        if (value === "") return
        setQuery((prevTagQuery) => {
            if (e.key === "Enter") {
                if (!Array.isArray(prevTagQuery)) prevTagQuery = []; // Ensure it's an array if somehow it becomes undefined or null
                e.target.value = ''
                return [...prevTagQuery, value]
            } else {
                return [...prevTagQuery]
            }
        })
    }

    const removeTagQuery = (e, index) => {
        setQuery(query.filter((_, i) => i !== index))
        findProjects(e)
    }

    const generateProjectDoc = () => {

        const content = searchedProjects.map(project =>
        [
            `Title: ${project.title}`,
            `Languages and Tools: ${project.tags.map(tag => tag.name).join(", ")}`,
            `${project.entry.map((entry, index) => index + 1 + ". " + entry).join("\n")}`
        ].join("\n")
        ).join("\n\n--------------\n\n")

        const blob =  new Blob([content], {type: "text/plain;charset=utf-8"})
        saveAs(blob, "tagged-projects.txt")
        console.log(content.textContent)
    }
  return (
    <section className='c-space my-20' id='projects'>
        <p className="head-text">My Projects</p>
        <div className="grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full">
            <div className="flex flex-col gap-5 relative sm:p-10 py-10 px-5 shadow-2xl shadow-black-200">
                <input type="text" name="search"
                    placeholder="Search by language, tool etc, then press enter to tag it!😄" 
                    style={{position: 'relative', zIndex: 10 }} 
                    onChange={findProjects}
                    onKeyDown={setTagQuery}
                    className='
                    w-full p-3 pl-10 pr-4 
                    text-md rounded-lg font-semibold
                    shadow-md focus:outline-none 
                    focus:ring-2 focus:ring-blue-500
                    bg-[#ffffff] placeholder-gray-500'
                />
                <div className='flex flex-wrap items-center gap-2'>
                    {query.map((tag, index) => (
                        <div key={index} style={{position: 'relative', zIndex: 10 }} className="flex items-center gap-1 bg-[#2455b1] rounded">
                            <span className='text-white px-1 py-1'>{tag}</span>
                            <img src="/assets/close.svg" alt={index} className='w-6 h-6' onClick={(e) => removeTagQuery(e, index)}/>
                        </div>
                        ))
                    }
                </div>
                {searchedProjects.length > 0 ? (
                <>
                    <div className="absolute top-0 right-0" style={{zIndex: 1 }}>
                        <img src={currentProject.spotlight} alt="spotlight" className='w-full h-96 object-cover rounded-xl'/>
                    </div>
                    {/* <div className="p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg" style={currentProject.logoStyle}>
                        <img src={currentProject.logo} alt="logo" className="w-10 h-10 shadow-sm" />
                    </div> */}
                    <div className="flex flex-col gap-5 text-white-600 my-5">
                        <p className="text-white text-2xl font-semibold animatedText">{currentProject.title}</p>
                        <p className="animatedText text-white">{currentProject.desc}</p>
                    <p className="animatedText">{currentProject.subdesc}</p>
                    </div>
                    <div className="flex items-center justify-between flex-wrap gap-5">
                        <div className="flex items-center gap-3">
                            {currentProject.tags.map((tag, index) => (
                                <div key={index} className='tech-logo'>
                                    <img src={tag.path} alt={tag.name} />
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center gap-3" style={{position: 'relative', zIndex: 10 }}>
                            {currentProject.href && (
                                <a className='flex items-center gap-2 cursor-pointer text-white-600' href={currentProject.href} target="_blank" rel="noreferrer">
                                    <p>Check Live Site</p>
                                    <img src="/assets/arrow-up.png" alt="arrow-up" className='w-3 h-3'/>
                                </a>
                            )}
                            <a className='flex items-center gap-2 cursor-pointer text-white-600' href={currentProject.repo} target="_blank" rel="noreferrer">
                                <p>Check GitHub Repository</p>
                                <img src="/assets/arrow-up.png" alt="arrow-up" className='w-3 h-3'/>
                            </a>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-7">
                        <button className="arrow-btn" onClick={() => handleNavigation('previous')}>
                            <img src="/assets/left-arrow.png" alt="left arrow" className='w-4 h-4'/>
                        </button>
                            
                        {query.length > 0 && (
                            <button onClick={generateProjectDoc}><Button name="Download tagged projects info" isBeam containerClass='bg-[#2455b1] text-white' /></button>
                        )}
                        
                        <button className="arrow-btn" onClick={() => handleNavigation('next')} style={{position: 'relative', zIndex: 10 }}>
                            <img src="/assets/right-arrow.png" alt="right arrow" className='w-4 h-4'/>
                        </button>
                    </div>
                </>) : (
                    <p className="text-white-600 text-center font-semibold">No projects found</p>
                )}
            </div>
            <div className="border border-black-300 bg-black-200 rounded-lg h-96 md:h-full">
                <Canvas pixelratio={window.devicePixelRatio}>
                    <ambientLight intensity={Math.PI / 2} />
                    <directionalLight position={[10, 10, 5]} />
                    <Center>
                        <Suspense fallback={<CanvasLoader />}>
                            <group scale={2} position={[0, -3, 0]} rotation={[0, -0.1, 0]}>
                            <DemoComputer texture={currentProject?.texture}/>
                            </group>
                        </Suspense>
                    </Center>
                    <OrbitControls maxPolarAngle={Math.PI / 2} enableZoom={false} />
                </Canvas>
            </div>
        </div>
    </section>
  )
}

export default Projects