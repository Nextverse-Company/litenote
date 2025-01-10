import DashboardToast from "../../components/common/DashboardToast.jsx"
import DashboardHeader from '../../components/Dashboard/common/DashboardHeader.jsx';
import RotationLoader from "../../components/Loaders/RotationLoader.jsx"
import { useModalContext } from "../../hooks/useModalContext.jsx";
import { useState, useEffect, useRef } from "react";
import BookmarkList from "../../components/Dashboard/common/BookmarkList.jsx";
import { useGetUserBookmarks } from "../../hooks/useGetUserBookmarks.jsx";
import Tab from "../../components/common/Tab.jsx";
import "../../styles/components/Dashboard/bookmark-page.css"
const BookmarksPage = ({dashboardToast, setDashboardToast, sidebarRef}) => {
    const { getUserBookmarks, isLoading, error, data, bookmarkCount } = useGetUserBookmarks();
    const { closeContextMenu } = useModalContext();
    const [bookmarkData, setBookmarkData] = useState([])
    const [originalBookmarkData, setOriginalBookmarkData] = useState([])
    const [bookmarkNumber, setBookmarkNumber] = useState(bookmarkCount)
  const [tabs, setTab] = useState({
    all : true,
    category : false,
    "date added" : false,
    "read time" : false
  })
  const filterBookmarkAccordingToCategory = () => {
    console.log("setman")
    if(tabs["category"]){
      console.log("setstate")
      const resetAccordingToCategory = [...bookmarkData].sort((a, b) => String(a.category).localeCompare(String(b.category)))
      setBookmarkData(resetAccordingToCategory)
    }
  }
  useEffect(() => {
    // Trigger the sorting effect when category tab is toggled
    if (tabs["category"]) {
      filterBookmarkAccordingToCategory(); // Call filterBookmark directly to sort when category is true
    }
  }, [tabs["category"]]); // Only trigger when the category tab state changes
  useEffect(() => {
    // Trigger the sorting effect when category tab is toggled
    if (tabs["all"]) {
setBookmarkData(originalBookmarkData)
    }
  }, [tabs["all"]]); // Only trigger when the category tab state changes
  useEffect(() => {
setBookmarkNumber(bookmarkCount)
  }, [bookmarkCount])
      const [contextMenu, setContextMenu] = useState()
  return (

      <>
    <main  onClick={closeContextMenu} >
    <div className="litenote-dashboard-right" style={{left : "150px", position : "relative", cursor : "pointer"}}>
    <DashboardHeader sidebarRef={sidebarRef} contextMenu={contextMenu} setContextMenu={setContextMenu}/>
    
    </div>
   <DashboardToast dashboardToast={dashboardToast} setDashboardToast={setDashboardToast}/>
   <div className="litenote-bookmark-title" >
   <h3 style={{display : "flex", flexDirection : "row", alignItems : "center", gap : "5px"}}>
    <span>Filter Your Bookmarks
    </span>
  <span className="bookmark-status-badge"
     >{bookmarkNumber}</span>
  </h3>
  <Tab tabs={tabs} setTab={setTab} labelWidth={200} scale={false}/>
   </div>
   
    <div className="litenote-browse-bookmark-grid">
    <BookmarkList
    bookmarkData={bookmarkData}
    setBookmarkData={setBookmarkData}
    setOriginalBookmarkData={setOriginalBookmarkData}
    setBookmarkNumber={setBookmarkNumber}
    bookmarkNumber={bookmarkNumber}
    data={data} bookmarkCount={bookmarkCount} error={error} isLoading={isLoading} getUserBookmarks={getUserBookmarks}/>
      </div>
    </main>
    </>
    
    
  )
}

export default BookmarksPage