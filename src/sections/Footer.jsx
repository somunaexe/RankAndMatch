const Footer = () => {
  return (
    <footer className="c-space pt-7 pb-3 border-t border-black-300 flex justify-between items-center flex-wrap gap-5">
        <div className="text-white-500 flex gap-2">
            <p>Terms & Conditions</p>
            <p>|</p>
            <p>Privacy Policy</p>
        </div>
        <p className="text-white-500">Built with React <img src="/assets/react.svg" alt="react" className="w-5 h-5 inline-block" />, Javascript <img src="/assets/javascript.svg" alt="javascript" className="w-5 h-5 inline-block" />, Node.js <img src="/assets/node.png" alt="node" className="w-5 h-5 inline-block" />, Three.js <img src="/assets/three.png" alt="threejs" className="w-5 h-5 inline-block" />, Tailwind CSS <img src="/assets/tailwindcss.png" alt="tailwind" className="w-5 h-5 inline-block" />, AWS <img src="/assets/aws-light.png" alt="aws-light" className="w-5 h-5 inline-block" />, and Git <img src="/assets/git.png" alt="git" className="w-5 h-5 inline-block" />.</p>
        <p className="text-white-500">© 2024 Somuna. All rights reserved.</p>
    </footer>
  )
}

export default Footer