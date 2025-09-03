import { socialLinks } from "../constants"
const Links = () => {
  return (
    <div className="flex items-center gap-3">
        {socialLinks.map((link) => (
            <div className="social-icon flex justify-center items-center w-8 h-8">
                <a href={link.href} target="_blank">
                    <img src={link.image} alt={link.name} className="w-6 h-6" />
                </a>
            </div>  
        ))}
    </div>
  )
}

export default Links