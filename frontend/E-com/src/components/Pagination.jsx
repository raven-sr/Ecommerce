import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { page } from "../reduxslice/productSlicer";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({ currentPage, totalPages, onPageChange }) {

    if (totalPages <= 1) {
        return null;
    }
    
    return (
    <div className="d-flex justify-content-center my-5">
        <div className="d-flex align-items-center gap-2">

            {/* Previous */}
            <button
                className="btn btn-outline-secondary rounded-circle"
                style={{
                    width: "40px",
                    height: "40px",
                    padding: 0
                }}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <ChevronLeft />
            </button>

            {/* Page Numbers */}
            {[...Array(totalPages)].map((_, index) => {

                const pageNumber = index + 1;

                return (
                    <button
                        key={pageNumber}
                        onClick={() => onPageChange(pageNumber)}
                        className={`btn rounded-circle ${
                            currentPage === pageNumber
                                ? "btn-primary"
                                : "btn-outline-secondary"
                        }`}
                        style={{
                            width: "40px",
                            height: "40px",
                            padding: 0
                        }}
                    >
                        {pageNumber}
                    </button>
                );
            })}

            {/* Next */}
            <button
                className="btn btn-outline-secondary rounded-circle"
                style={{
                    width: "40px",
                    height: "40px",
                    padding: 0
                }}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <ChevronRight/>
            </button>

        </div>
    </div>
);
}

export default Pagination;