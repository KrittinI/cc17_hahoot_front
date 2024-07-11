import { Rating } from "react-simple-star-rating";

export default function StarRating({ size = 17, handleRating, onPointerMove, readOnly, initialValue }) {
  return (
    <div className="App">
      <Rating size={size} initialValue={initialValue} onClick={handleRating} SVGstyle={{ display: "inline" }} onPointerMove={onPointerMove} readonly={readOnly} />
    </div>
  );
}
