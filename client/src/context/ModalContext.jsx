
import {
createContext,
useState,
useRef,
useEffect,
} from "react"
import useWindowSize from "../hooks/useWindowSize";
export const ModalContext = createContext()
export const ModalContextProvider = ({children}) => {
    const [shareModal, setShareModal] = useState("");
    const [contextMenu, setContextMenu] = useState("");
    const [shareUrl, setShareUrl] = useState("")
    const [currentStoryId, setCurrentStoryId] = useState("")
    const shareRef = useRef();
    const { width, height} = useWindowSize();
    const fireClick = (e, storyUrl, id) => {
        setShareUrl(storyUrl)
        setCurrentStoryId(id)
        updateMenuPosition(e.clientX, e.clientY);
        contextMenu.current.style.visibility = "visible";
      };
    const updateMenuPosition = (x, y) => {
      console.log(contextMenu)
        const maxTopValue = height - contextMenu.current.offsetHeight;
        const maxLeftValue = width - contextMenu.current.offsetWidth;
        contextMenu.current.style.left = `${Math.min(maxLeftValue, x)}px`;
        contextMenu.current.style.top = `${Math.min(maxTopValue, y)}px`;
      };
    const closeContextMenu  = (e) => {
        console.log(currentStoryId)
        if( e?.clientX < parseInt(contextMenu.current?.style.left) || e?.clientX > parseInt(contextMenu.current?.style.left) + contextMenu.current?.offsetWidth )
        {
          console.log("Sushi dynasty")
          contextMenu.current.style.visibility = "hidden";
        }else if(
          e?.clientY < parseInt(contextMenu.current?.style.top) || e?.clientY > parseInt(contextMenu.current?.style.top) + contextMenu.current?.offsetHeight
        ){
          console.log("sushi dynasty")
          contextMenu.current.style.visibility = "hidden";
        }
    }
    useEffect(() => {

      const currentUrl = window.location.href;
      if (contextMenu) {
        if(currentUrl.split("/").includes("dashboard")){
          window.addEventListener('wheel', (event) => {
            if(contextMenu.current){
              contextMenu.current.style.visibility = "hidden";
            }
          });
        window.addEventListener('touchmove', (event) => {
          if(contextMenu.current){
            contextMenu.current.style.visibility = "hidden";
            }
      });
        }else{
          window.addEventListener('scroll', () => {
            if(contextMenu.current){
            contextMenu.current.style.visibility = "hidden";
            }
          });
        }
     
      }
  
      return () => {
        if (contextMenu) {
          if(currentUrl.split("/").includes("dashboard")){
            window.removeEventListener('wheel', (event) => {
              if(contextMenu.current){
                contextMenu.current.style.visibility = "hidden";
                }
          });
          window.removeEventListener('touchmove', (event) => {
            if(contextMenu.current){
              contextMenu.current.style.visibility = "hidden";
              }
        });
          }else{
          window.removeEventListener('scroll', () => {
            if(contextMenu.current){
            contextMenu.current.style.visibility = "hidden";
            }
            
          });
        
        }
      }
      };
    }, [contextMenu]);
      useEffect(() => {
        setShareModal(shareRef);
      }, []);
  
    return (
        <>
        <ModalContext.Provider
        value={{
        contextMenu,
        shareModal,
        shareRef,
        shareUrl,
        currentStoryId,
        setShareUrl,
        fireClick,
        setContextMenu,
        closeContextMenu
        }}
        >
        {children}
</ModalContext.Provider>
        </>
    )
}