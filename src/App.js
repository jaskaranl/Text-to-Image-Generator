import { upload } from "@testing-library/user-event/dist/upload";
import { useState } from "react";
import Modal from "./components/Modal";
function App() {
  const [img, setImage] = useState(null);
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modelOpen, setModelOpen] = useState(false);
  const supriseOption = [
    "a blue ostrich eating mellon",
    "a mastisse style shark on telephone",
    "a pineapple sunbathing",
  ];

  const SurpriseMe = () => {
    setImage(null);
    let number = Math.floor(Math.random() * supriseOption.length);
    setValue(supriseOption[number]);
  };
  const getImages = async () => {
    try {
      const option = {
        method: "POST",
        body: JSON.stringify({ mess: value }),
        headers: { "Content-Type": "application/json" },
      };
      if (value == null) {
        setError("Error,Must have a search term");
        return;
      }
      const response = await fetch("http://localhost:8000/image", option);
      const data = await response.json();
      setImage(data.output);
    } catch (error) {
      console.error(error);
    }
  };

  const uploadFile = async (e) => {
    const formData = new FormData();
    setModelOpen(true);
    formData.append("file", e.target.files[0]);
    setSelectedImage(e.target.files[0]);
    try {
      const option = {
        method: "POST",
        body: formData,
      };
      const response = await fetch("http://localhost:8000/upload", option);
      const data = await response.json();
    } catch (error) {
      console.error(error);
    }
    console.log(22);
  };

  return (
    <div className="app">
      <section className="search-section">
        <p>
          Start with a detailed description
          <span className="surprise" onClick={SurpriseMe}>
            Surprise me
          </span>
        </p>

        <div className="input-container">
          <input
            placeholder="hello"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button onClick={getImages}>Generate</button>
        </div>

        <p className="extra-info">
          <span>
            <label>upload an image</label>
            <input
              id="file"
              onChange={uploadFile}
              accept="image/*"
              type="file"
            ></input>
          </span>
        </p>
        {error && <p>{error}</p>}
        {modelOpen && (
          <div className="overlay">
            <Modal
              setModelOpen={setModelOpen}
              setSelectedImage={setSelectedImage}
              selectedImage={selectedImage}
            />
          </div>
        )}
      </section>
      <section className="image-section">
        {img?.map((image, _index) => (
          <img
            key={_index}
            src={image}
            alt={`Generated image of ${value}`}
          ></img>
        ))}
      </section>
    </div>
  );
}

export default App;
