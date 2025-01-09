import {  useEffect, useState } from "react";
import ContextMenu from "../common/ContextMenu";
import { FaShareAlt } from "react-icons/fa";
import { FaEllipsisH,  FaBookmark } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useImageLoad from "../../hooks/useImageLoaded";
import { getStoryUrl } from "../../helpers/getStoryUrl";
import useMultipleImageLoad from "../../hooks/useMultipleImageLoaded";

const SuggestionCard = ({ fireClick, story, isLoading}) => {
  const [pictureLoading, setPictureLoading] = useState(true);
  const [avatarLoading, setAvatarLoading] = useState(true);
  const navigate = useNavigate();
  let storyPicture = ""
  if(isLoading === false){
    //  storyPicture = story.picture[Math.round(Math.random())]
    storyPicture = story.picture[0]
  }

  const imageStatus = useMultipleImageLoad(storyPicture, story.avatar)
  useEffect(() => {
    if (!imageStatus) return; // Ensures imageStatus is defined
  
    imageStatus.forEach(({ url, loaded, error }) => {
      if (url === storyPicture) {
        if (loaded) {
          setPictureLoading(false);
        }
        if (error) {
          setPictureLoading(true)
        }
      } else if (url === story.avatar) {
        if (loaded) {
          setAvatarLoading(false);
        }
        if (error) {
          setAvatarLoading(true)

        }
      }
    });
  }, [imageStatus, story.picture, story.avatar]); // Triggers every time imageStatus changes
  const showMyModal = (e) => {
    console.log("why")
    fireClick(e, getStoryUrl(story), story._id)
  }
  const showFullStory = () => {
    const encodedTitle = story.title.toLowerCase() 
    .replace(/[^a-z0-9]+/g, "-") 
    .replace(/^-+|-+$/g, ""); 
    console.log(encodedTitle)
  navigate(`/story/${story.author}/${encodedTitle}/${story._id}`)
  }
  return (
 <> {

  isLoading ? 
  <div className="litenote-profile-story-card">
            <div className="litenote-profile-story-card-inner">
              <div className="litenote-profile-story-image">
                <div  className="skeleton-image caller" />
              </div>
              <div className="litenote-profile-story-content">
              <div style={{display : "flex", flexDirection : "row", justifyContent : "space-between", alignItems  : "center", gap : "10px"}}>
 <div className="skeleton-story-avatar " style={{marginBottom : "10px"}}>&nbsp;</div><h4 className="litenote-profile-story-title skeleton-title">&nbsp;</h4>
              </div>
               
              <h4 className="litenote-profile-story-title skeleton-title">&nbsp;</h4>
                <FaEllipsisH  className="litenote-profile-read-more-share skeleton-options"
                 />
              
                <a  className=" skeleton-button">&nbsp;</a>
             
              </div>
            </div>
          </div>  
   :
          <div className="litenote-profile-story-card">
            <div className="litenote-profile-story-card-inner">
            <div onClick={() => {showFullStory()}}>
            { pictureLoading ?
                <div className="litenote-profile-story-image">
                <div  className="skeleton-image caller" />
              </div>:
              <div className="litenote-profile-story-image">
                <img src={storyPicture} alt="Story Image" />
              </div>
              }
            </div>
           
              
              <div className="litenote-profile-story-content">
             
               <div className="story-card-user-info">
               { avatarLoading ?  <span className="skeleton-story-avatar story-card-avatar"
               style={{alignSelf  :"center"}}
               >&nbsp;</span>
              : <img className="story-card-avatar" src={story.avatar} />
               }
               <span>{story.author}</span>
             
               </div>
               <FaEllipsisH  className="litenote-profile-read-more-share" style={{position : "relative", bottom : "30px"}} 
                onClick={(e) => showMyModal(e)}
               />
              
               
                <h4 className="litenote-profile-story-title">{story.title}</h4>
                <div className="story-card-bottom-info">
               <span className="litenote-profile-story-category">{story.category.charAt(0).toUpperCase() + story.category.slice(1)}</span><span>{story["estimatedReadingTime"]["minutes"] == 0 ? `${story["estimatedReadingTime"]["seconds"]} seconds read` : `${story["estimatedReadingTime"]["minutes"]} minutes read`  }</span>
               </div>
              </div>
            </div>
          </div>
        
 }
 </>
  )
}

export default SuggestionCard