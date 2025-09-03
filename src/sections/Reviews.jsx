import { clientReviews } from "../constants"
import { useState } from "react"
const Reviews = () => {
    const [pageNumber, setPageNumber] = useState(1)

    const handleNavigation = (direction) => {
        if(direction === "previous") setPageNumber((prevPageNumber) => prevPageNumber === 1 ? Math.ceil(clientReviews.length / 4) : prevPageNumber - 1)
        else setPageNumber((prevPageNumber) => prevPageNumber === Math.ceil(clientReviews.length / 4) ? 1 : prevPageNumber + 1)
    }

    const checkReviewLength = (reviewParam) => {
        const shortLength = 200
        const isLong = reviewParam.length > shortLength
        let slicedReview = (isLong) ? reviewParam.slice(0, shortLength) + '... ' : reviewParam
        return (
            <>
                {slicedReview} {isLong && <span className="hover:underline text-blue-500">read more</span>}
            </>
        );
    }

    const getRating = (rating) => {
        const fullStars = Array.from({ length: rating }).map((_, index) => (
            <img key={index} src="/assets/star.png" alt="star" className="w-5 h-5" />
        ))
        const emptyStars = Array.from({ length: 5 - rating }).map((_, index) => (
            <img key={index} src="/assets/no-star.png" alt="star" className="w-5 h-5" />
        ))
        return (
            <>
                {fullStars}{emptyStars}
            </>
        )
    }

    const getAverageRating = () => {
        return (clientReviews.reduce((prevTotal, review) => prevTotal + review.rating, 0)) / clientReviews.length

    }

    const colourRating = () => {
        const average = getAverageRating()
        if (average >= 4) return 'text-green-500'
        else if(average >= 3 && average < 4) return 'text-yellow-500'
        else return 'text-red-500'
    }

  return (
    <section className="c-space my-20" id="reviews">
        <h3 className="head-text">My Reviews</h3>
        <p className="font-semibold text-white-700">Average Rating: <span className={colourRating()}>{getAverageRating().toFixed(1)}</span>/5</p>
        <div className="client-container">
            {clientReviews.slice(pageNumber * 4 - 4, pageNumber * 4).map(({id, name, review, img, position, link, rating}) => (
                <div key={id} className="client-review">
                    <div>
                        <a href={link} target="_blank"><p className="text-white font-light justify-between">{checkReviewLength(review)}</p></a>
                        <div className="client-content">
                            <div className="flex gap-3">
                                <img src={img ? img : '/assets/blank_profile.png'} alt={name} className="w-12 h-12 rounded-full" />
                                <div className="flex flex-col">
                                    <p className="font-semibold text-white-800">{name}</p>
                                    <p className="text-white-500 md:text-base text-sm">{position}</p>
                                </div>
                            </div>
                            <div className="flex self-end items-center gap-2">
                                {getRating(rating)}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            
        </div>
        <div className="flex justify-between items-center mt-7">
            <button className="arrow-btn" onClick={() => handleNavigation('previous')}>
                <img src="/assets/left-arrow.png" alt="left arrow" className='w-4 h-4'/>
            </button>

            <button className="arrow-btn" onClick={() => handleNavigation('next')}>
                <img src="/assets/right-arrow.png" alt="right arrow" className='w-4 h-4'/>
            </button>
        </div>
    </section>
  )
}

export default Reviews