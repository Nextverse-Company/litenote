import "../../../styles/components/Dashboard/dashboard-pagination.css"
import { MdChevronLeft, MdChevronRight} from "react-icons/md"
import ArrowKeyDetector from "../../../hooks/useArrowKeys";
import { useState } from "react";
const DashboardPagination = ({ paginationNumbers, setPaginationNumbers, userCount, currentValue, setCurrentValue}) => {
  const [prev, disablePrev] = useState(false);
  const [next, disableNext] =  useState(false);
  const activeLink = (value) => { 
    setCurrentValue(value)
   }
   const backBtn = () => {
    if(currentValue === 1){
  return disablePrev(true)
}
if(paginationNumbers[paginationNumbers.length - 1] > Math.ceil(userCount /5 )
){
 const newPag = paginationNumbers.slice(0, 2)
 setPaginationNumbers([newPag[0] - 1, ...newPag])
 setCurrentValue(currentValue - 1)
 
}
if (currentValue > 1) {
  setCurrentValue(currentValue - 1);
}
 if(currentValue == paginationNumbers[0]){
  const firstNumber = paginationNumbers[paginationNumbers.length - paginationNumbers.length];
const news = [firstNumber - 1, ...paginationNumbers.slice(0, 2)]
  // Update state
  setPaginationNumbers(news);
  setCurrentValue(currentValue - 1);
}
else if (currentValue > 1) {
  setCurrentValue(currentValue - 1);
}
};

const nextBtn = () => {
if(currentValue === Math.ceil((userCount / 5))){
  return disableNext(true)
}
if(currentValue > Math.ceil((userCount / 5 ))){
 return disableNext(true)
}
if (currentValue < Math.ceil(userCount / 5)) {
  setCurrentValue(currentValue + 1);
}
 if(currentValue === paginationNumbers[paginationNumbers.length - 1]    ){
  const lastNumber = paginationNumbers[paginationNumbers.length - 1];
  // Calculate new pagination array
  const newPaginationNumbers = [...paginationNumbers.slice(1), lastNumber + 1];
  // Update state
  setPaginationNumbers(newPaginationNumbers);
  setCurrentValue(currentValue + 1);
}
};
  return (
<div id="app" className="dashboard-pagination-container"> 
<ArrowKeyDetector  backBtn={backBtn} nextBtn={nextBtn}/> 
<ul className="dashboard-pagination-page">

    <li 
   className={`dashboard-pagination-page__btn ${prev ? 'disabled' : ''}`}
    onClick={() => {backBtn()}} ><span
    ><MdChevronLeft  size={20}/></span></li>
{paginationNumbers.map((value) => (
  <span key={value} 
  className={` dashboard-pagination-page__numbers  ${currentValue === value ? 'active' : ''}`}
  onClick={() => activeLink(value)}
  >{value}</span>
))}
    <li className="dashboard-pagination-page__dots">...</li>
    <li className="dashboard-pagination-page__numbers">
      {   Math.ceil((userCount / 5)   )}
    </li>
    <li   className={`dashboard-pagination-page__btn ${prev ? 'disabled' : ''}`}
     onClick={nextBtn}><span><MdChevronRight size={20} /></span></li>
  </ul>
</div>
  )
}

export default DashboardPagination