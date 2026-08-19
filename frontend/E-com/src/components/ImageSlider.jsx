import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?q=80&w=1326&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://png.pngtree.com/thumb_back/fw800/background/20240716/pngtree-a-gym-sports-equipment-image_16002414.jpg",
  "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1600&q=80",
  "https://wallpaperbat.com/img/922749-4k-muscle-wallpaper-and-background-image.jpg",
  "https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://wallpaperbat.com/img/3590277-round-gold-colored-analog-watch-with-link-bracelet-watch-luxury-watches-omega-watch-k-wallpaper-hd-luxury-watches-luxury-watches-for-men-watch-wallpaper.jpg"
];


function ImageSlider() {

  // Current image index
  const [current, setCurrent] = useState(0);


  // Automatically change image every 4 seconds
  useEffect(() => {

    const interval = setInterval(() => {

      setCurrent((prev) => (prev + 1) % images.length);

    }, 4000);

    // Cleanup
    return () => clearInterval(interval);

  }, []);

  const prev = ()=>{

    setCurrent((prev)=>(prev === 0 ? images.length-1 : prev-1));
  }

    const next = ()=>{

    setCurrent((prev)=>(prev+1)%images.length);
  }


  return (
    <div className="container-fluid p-0 overflow-hidden shadow-lg position-relative">

      {/* Image row */}
      <div
        className="d-flex "
        style={{
          transform: `translateX(-${current * 100}%)`,
          transition: "transform 0.7s ease-in-out"
        }}
      >

        {images.map((image, index) => (

          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-100 flex-shrink-0 object-fit-cover"
            style={{
              height: "400px"
            }}
          />

        ))}

      </div>

     <button
  onClick={prev}
  className="position-absolute start-0 top-50 translate-middle-y ms-3 border-0 rounded-circle d-flex align-items-center justify-content-center shadow"
  style={{
    width: "35px",
    height: "35px",
    backgroundColor: "rgba(250, 249, 249, 0.45)",
    color: "#2C3E50",
    zIndex: 2
  }}
>
  <ChevronLeft size={24} />
</button>
       <button
  onClick={next}
  className="position-absolute end-0 top-50 translate-middle-y me-3 border-0 rounded-circle d-flex align-items-center justify-content-center shadow"
  style={{
    width: "35px",
    height: "35px",
    backgroundColor: "rgba(250, 249, 249, 0.45)",
    color: "#2C3E50",
    zIndex: 2
  }}
>
  <ChevronRight size={24} />
</button>

{/* Indicators */}
<div className="position-absolute bottom-0 start-50 translate-middle-x d-flex gap-2 mb-3">

  {images.map((_, index) => (

    <button
      key={index}
      onClick={() => setCurrent(index)}
      className="border-0 rounded-pill p-0"
      style={{
        width: current === index ? "32px" : "8px",
        height: "8px",
        backgroundColor:
          current === index
            ? "white"
            : "rgba(255, 255, 255, 0.5)",
        transition: "all 0.3s ease"
      }}
    >
    </button>

  ))}

</div>

    </div>
  );
}

export default ImageSlider;