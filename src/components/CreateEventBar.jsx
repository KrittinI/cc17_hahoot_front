export default function CreateEventBar() {
  return (
    <>
      <div className="flex">
        <img src={URL.createObjectURL(file)} alt="image" />
        <p></p>
        <p></p>
        <button>Save</button>
        <button>Cancel</button>
      </div>
    </>
  );
}
