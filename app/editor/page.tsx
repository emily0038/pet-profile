import Header from '@/components/header'
import UploadProfilePhoto from '@/components/uploadProfilePhoto'
import PortfolioGallery from '@/components/uploadGallery'
import AboutMe from '@/components/aboutMe'

export default function Page() {
  return (
    <div>
      <Header title="Editor" />
      <div className="px-4 py-4">
        <div>
          <h1>Profile photo</h1>
          <h2>Share a photo of yourself for prospective clients</h2>
          <UploadProfilePhoto />
        </div>
        <div>
          <h1>Portfolio</h1>
          <h2>Showcase your space and happy clients</h2>
          <PortfolioGallery />
        </div>
        <div>
          <h1>About Me</h1>
          <h2>Tell clients about yourself, your experience and background, and what makes you stand out</h2>
          <AboutMe />
        </div>
      </div>
    </div>
  )
}