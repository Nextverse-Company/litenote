import StorySidebar from "./StorySidebar"
import "../../styles/components/Reader/story-display.css"
import SpecialModal from "../common/SpecialModal"
import StoryBody from "./StoryBody"
import { useModalContext } from "../../hooks/useModalContext"
import Comment from "../../components/common/Comment"
import { useState } from "react"
import StorySuggestions from "./StorySuggestions"
const StoryDisplay = () => {
  const [openModal, setOpenModal] = useState();
  const {  closeContextMenu } = useModalContext()
  return (
    <>
 <section className="s" onClick={closeContextMenu}>
    <StorySidebar setOpenModal={setOpenModal} openModal={openModal}/>
    <div className="story-display-main">
      <StoryBody />
    </div>
    <StorySuggestions />  
   
 </section>
 <SpecialModal openModal={openModal} setOpenModal={setOpenModal} height={500} width={700}
content={<Comment />}

 />
    </>

  )
}

export default StoryDisplay