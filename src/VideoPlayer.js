import React, { useEffect, useState } from "react";
import { Player, ControlBar } from "video-react";
import "video-react/dist/video-react.css";
import ReactPlayer from "react-player";

const Video = () => {
     const [url, setUrl] = useState("");
     const [isYou, setIsYou] = useState(false);
     const [link, setLink] = useState("");

     useEffect(() => {
          if (url !== "") {
               let finder1 = "youtube";
               let finder2 = "drive";
               if (url.includes(finder1)) {
                    console.log("Youtube");
                    setIsYou(true);
                    setLink(url);
               } else if (url.includes(finder2)) {
                    console.log("drive");
                    let newLink = url.replace("/view", "&export=download");
                    newLink = newLink.replace("/file/d/", "/u/0/uc?id=");
                    newLink = newLink.replace("&amp;", "");
                    console.log("newLink", newLink);
                    setIsYou(false);
                    setLink(newLink);
               } else {
                    console.log("File");
                    setIsYou(false);
                    setLink(url);
               }
          }
     }, [url]);

     return (
          <div className="container">
               <div className="row justify-content-center">
                    <div className="col-md-7">
                         <div>
                              <label className="form-label">Video URL</label>
                              <input className="form-control"
                                   onChange={(e) => {
                                        setUrl(e.target.value);
                                   }}
                              />
                              <br />
                              {isYou !== true ? (
                                   <Player
                                        autoPlay={true} loop={true}
                                        preload={true}
                                        src={link}
                                        width="100%"
                                        height="100%"
                                   >
                                        <ControlBar autoHide={true} className="my-class" disableCompletely={true} />
                                   </Player>
                              ) : (
                                   <ReactPlayer
                                        autoPlay
                                        className="react-player"
                                        width="100%"
                                        height="100%"
                                        style={{ padding: 'auto', }}
                                        url={link}
                                        config={{
                                             file: { attributes: { controlsList: "nodownload" } }
                                        }}
                                        controls
                                   />
                              )}
                         </div>
                    </div>
               </div>
          </div>

     );
};

export default Video;

// https://file-examples.com/storage/fe863385e163e3b0f92dc53/2017/04/file_example_MP4_640_3MG.mp4