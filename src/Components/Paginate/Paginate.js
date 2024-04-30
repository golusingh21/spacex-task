import React, { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import './Paginate.Style.scss';

const Paginate = ({ data, itemsPerPage,setLaunches }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data?.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
 useEffect(()=>{
    var displayedData=[]
    if(currentPage >1){
        displayedData = data.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        );
        setLaunches(displayedData)
    }
    else{
        displayedData=data.slice(0,itemsPerPage)
        setLaunches(displayedData)
    }  
 },[currentPage, data])


  return (
	<>
		{totalPages>1 && (
			<Pagination>
				{[...Array(totalPages)].map((_, index) => (
					<Pagination.Item
						key={index}
						active={index + 1 === currentPage}
						onClick={() => handlePageChange(index + 1)}
						>
						{index + 1}
					</Pagination.Item>
				))}
			</Pagination>
		)}
	</>
  );
};
export default Paginate;
