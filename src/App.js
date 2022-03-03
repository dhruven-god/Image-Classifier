import * as mobilenet from "@tensorflow-models/mobilenet";
import { useEffect, useRef, useState } from "react";
import "@tensorflow/tfjs-backend-webgl";
import "./index.css";

import { BallTriangle } from "react-loader-spinner";
import Navbar from ".//components/Navbar";
import Footer from "./components/Footer";

function App() {
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  const [isLoading, setLoading] = useState(false);
  const [model, setModel] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [results, setResults] = useState([]);
  const imageRef = useRef();
  const textInputRef = useRef();

  const loadModel = async () => {
    setLoading(true);
    try {
      const model = await mobilenet.load();
      console.log("Successfully loaded model");

      setModel(model);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const uploadImage = (e) => {
    // console.log(e)
    const { files } = e.target;
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setImageURL(url);
    } else {
      setImageURL(null);
    }
  };

  const handleOnChange = (e) => {
    setImageURL(e.target.value);
    setResults([]);
  };

  const predict = async () => {
    // const model = await mobilenet.load();
    const results = await model.classify(imageRef.current);
    setResults(results);
  };
  useEffect(() => {
    loadModel();
  }, []);
  if (isLoading) {
    return (
      <>
        <center style={style}>
          <BallTriangle color="red" height={80} width={80} />
        </center>
      </>
    );
  }
  console.log(results);
  return (
    <div className="bg-slate-200 flex flex-col h-screen">
      <Navbar />
      <div className="p-4 flex-grow grid grid-cols-1 gap-0 sm:grid-cols-2 gap-2">
        <center className="pt-24 ">
          <h1 className="text-3xl font-mono">Image Classifier</h1>
          <br />
          <div className="inp">
            <input
              type="file"
              onChange={uploadImage}
              accept="image/*"
              className="block w-fit cursor-pointer text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            ></input>
            <input
              type="text"
              placeholder="Paste image URL"
              ref={textInputRef}
              onChange={handleOnChange}
              className="bg-gray-50 border mt-8 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-44 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <hr />
          <div className="container">
            <div className="mt-8">
              {imageURL && (
                <img
                  src={imageURL}
                  alt="Uploaded"
                  crossOrigin="anonymous"
                  ref={imageRef}
                  width="320"
                  height="320"
                  className="rounded-lg"
                />
              )}
            </div>

            {imageURL && (
              <button
                className="text-white bg-blue-700 mt-8 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={predict}
              >
                Predict
              </button>
            )}
          </div>
        </center>

        <center className="mt-8 sm:mt-72">
          {results.length > 0 && (
            <div className="flex">
              <div className="block p-6 min-w-full lg:min-w-max rounded-lg shadow-lg bg-white max-w-sm">
                {results.map((result) => {
                  return (
                    <>
                      <h5 key={result.className} className="text-gray-900 text-xl leading-tight font-medium mb-2">
                        {result.className} <br />
                        <div className="bg-gray-200 rounded-full ">
                          <div
                            className={`bg-red-600 text-sm px-12 py-2 font-medium text-blue-100 text-center p-0.5 leading-none rounded-full w-full`}
                          >
                            Probability: {(result.probability * 100).toFixed(0)}
                            %{" "}
                          </div>
                        </div>
                      </h5>
                    </>
                  );
                })}
              </div>
            </div>
          )}
        </center>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
