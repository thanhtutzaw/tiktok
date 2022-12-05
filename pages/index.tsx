import Head from "next/head";
import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import styles from "../styles/Home.module.css";
// import video from '../public/1.mp4'
import useObserver from "../hooks/useObserver";

const Video = ({ setisplaying, isplaying, src, togglePlay }: any) => {
  let options;

  options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const isVisibile = useObserver(options, videoRef);
  const [loading, setloading] = useState(false)
  useEffect(() => {
    const video = videoRef?.current!;
    video.muted = true;

    // video.play()
    // setisplaying(true)

    // if(!isplaying){
    //   video.play()
    //   video.muted = false;
    // }

    // if (!isplaying) {
    //   video.pause();
    //   video.muted = true;
    // }
    // console.log(video?.);
    if (!isplaying) {
      // video.play();
      // video.muted = false;
    }

    if (isVisibile) {
      // if (!isplaying) {

      video.play();
      // setisplaying(true);    /// here
      if (isplaying) {
        setisplaying(true);
        // video.muted = false;
        // video.setAttribute("autoplay", "true");   /// here
      }
      // console.log({ visible: video.currentSrc });
      // video.style.border = "3px solid red"

      // }
    } else {
      if (!isVisibile) {
        //  video.style.border = "0";
        video.load();
        video.muted = true;
        // video.removeAttribute("autoplay");   /// here
        // console.log(video, video.currentSrc);
      }
    }
  }, [isVisibile, isplaying]);

  // useEffect(() => {
  //   console.log(isVisibile);
  //   const video = videoRef?.current!;
  //   video.muted = true;
  //   video.setAttribute("muted",'true')
  //   // console.log(video?.);
  //   if (isVisibile) {
  //     if (!isplaying) {
  //       // video!.muted = false;
  //       video?.play();

  //       setisplaying(true);
  //       video.muted = false;
  //       video.setAttribute("muted","false")
  //     }
  //   } else {
  //     if (isplaying) {
  //       video.muted =false;
  //       video.setAttribute("muted","true")
  //       video?.load();
  //       setisplaying(false);
  //     }
  //   }
  // }, [isVisibile]);
  function togglePlay2(e: MouseEvent<HTMLVideoElement>) {
    const target = e.target as HTMLVideoElement;
    setisplaying((prev: any) => !prev);

    // if (isplaying === true) {
    //   target.pause();
    //   target.muted = true;
    // }
    // target.play();

    // target.play();
    // target.muted = false;
    // if (isplaying === true) {
    //   target.pause();
    //   target.muted = true;

    //   console.log(target)
    // } else {
    //   target.play();
    //   target.muted = false;
    // }
  }
  return (
    <div className={styles.videoContainer}>
      {isplaying ? null : (
        <div className={styles.playState}>
          <span>
            <img
              className={styles.playIcon}
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAAxElEQVRIie3WMWpCURBG4Q8FSRrtbC2SPhvICmzchVuwtXQLbsE2pVUIkjqQHVgqNmIj6EvxGHhFQAIvcxt/OPVhhrlzh3sKZ4MvTLLFVYNPvJYQB294LiGucMYSw2xxcMQcj9niYIsputni4BvjEuJgjZcS4goXrDDKFgcnLDDIFgd7zNDLFgfvTUHnL23ISJuV7iS3Ooarn1VxkeeUvkDSV2b6J3FQT+pDW8Jb4vRD4Kqe1Kf/Ev4mTj32PhQ6b+9pPT+XHgysHrPM6QAAAABJRU5ErkJggg=="
            />
          </span>
        </div>
      )}
      {loading && (
        <div style={{textAlign:'center'}} className={styles.playState}>
          <span>loading 😞</span>
        </div>
      )}

      <video
        // onSuspend={(e: any) => {
        //   console.log("onSuspend");
        // }}
        // onLoadStart={(e: any) => {
        //   console.log("onLoadStart");
        // }}
        onWaiting={(e: any) => {
          setloading((prev) => !prev);
        }}
        onCanPlay={()=>{
          setloading(false);

        }}
        // onSuspend={()=>{
        //   console.log("loading")
        // }}
        
        ref={videoRef}
        // muted={true}
        playsInline
        onClick={togglePlay2}
        loop={true}
        src={src}
        className={styles.item}
        // controls
        // onCanPlay={
        //   (e)=>{
        //     console.log({oncanplay:e.target})
        //     const target = e.target as HTMLVideoElement;
        //     target.muted = false;}
        // }
        // onStalled={() => console.log("loading")}
        onPlay={(e) => {
          // console.log("playing true (onPlayEvent)");
          const target = e.target as HTMLVideoElement;
          // if (target.readyState === 5) {
          //   console.log("loading")
          // }
          setisplaying(true);
          if (isplaying === true) {
            target.muted = false;
          }
          // target.removeAttribute('muted')

          // target.play();
        }}
      ></video>
    </div>
  );
};
export default function Home() {
  const [isplaying, setisplaying] = useState(false);

  function togglePlay(e: MouseEvent<HTMLVideoElement>) {
    const target = e.target as HTMLVideoElement;
    setisplaying((prev) => !prev);
    target.play();
    target.muted = false;
    if (isplaying === true) {
      target.pause();
      target.muted = true;
    } else {
      // target.play();
      // target.muted = false;
    }
  }

  useEffect(() => {
    const videoElement = document.getElementsByTagName(
      "video"
    ) as HTMLCollectionOf<HTMLVideoElement>;
    // console.log(isplaying)
    Array.from(videoElement).forEach((video) => {
      // const playPromise = video.play()
      // if(playPromise == undefined){
      //   console.log("loading");
      // }
      if (isplaying === false) {
        video.pause();
        // video.muted = true;
        // console.log({ pause: video });
      } else {
        
        video.muted = false;
      }
      // video.play()

      // console.log({else:video})
    });
  }, [isplaying]);

  // useEffect(() => {

  //   let videos = document.getElementsByTagName(
  //     "video"
  //   ) as HTMLCollectionOf<HTMLVideoElement>;
  //   Array.from(videos).forEach((video) => {
  //     let playPromise = video.play();
  //     setisplaying(false);
  //     //
  //     video.muted = true;
  //     if (playPromise !== undefined) {
  //       playPromise
  //         .then((_) => {
  //           let observer = new IntersectionObserver(
  //             (entries) => {
  //               entries.forEach((entry) => {
  //                 console.log(entry);
  //                 if (!entry.isIntersecting && entry.intersectionRatio !== 2 && video.played) {
  //                   // if (!entry.isIntersecting) {
  //                   // setisplaying(false);
  //                   // console.log(entry)
  //                   // video.currentTime = 0;
  //                   // video.pause();
  //                   // video.currentTime = 0;
  //                   video.load();
  //                   // video.muted = true;
  //                   // video.setAttribute("muted",'true');
  //                   video.removeAttribute("autoplay");

  //                   // video.load()
  //                   // console.table({ src: video.currentSrc });
  //                   // setisplaying(false);
  //                   // video.removeAttribute("autoplay");
  //                   // video.style.opacity = '1'
  //                   // video.style.filter = "blur(20px)"
  //                   // video.removeAttribute('autoplay')
  //                   video.style.outline = "3px solid red";
  //                 } else if (entry.intersectionRatio === 2 && video.played) {
  //                   // video.pause()
  //                   // video.currentTime = 0;
  //                   // // video.load()
  //                   // // video.play()
  //                   // video.muted=false;
  //                 } else {
  //                 // } else if (entry.intersectionRatio != 2) {
  //                   console.log({ Playing: video.currentSrc });
  //                   //  video.setAttribute("autoplay", "true");
  //                   // video.style.filter = "blur(0)";
  //                   video.style.outline = "0";

  //                   // video.load();
  //                   // video.currentTime = 0
  //                   // video.load();

  //                   // video.setAttribute("autoplay","true")
  //                   // video.removeAttribute("muted");

  //                   // if(typeof Window !== undefined){
  //                     video.setAttribute("muted", "true");
  //                     video.play();
  //                     video.muted = false;

  //                   // }
  //                   // video.currentTime = 0
  //                   // video.load();
  //                   setisplaying(true);

  //                   // video.currentTime
  //                   // if (video.paused) {
  //                   //   video.currentTime = 0;
  //                   //   video.load();
  //                   // }
  //                   // video.muted=false;
  //                   // video.muted = false;
  //                   // setisplaying(true);
  //                 }
  //               });
  //             },
  //             { root: document.body, threshold: 0.49 }
  //             // { root: document.body, threshold: 0.49 }
  //           );
  //           // } , {rootMargin:'-390px'})
  //           observer.observe(video);
  //         })
  //         .catch((err) => console.log(err));
  //         // console.log(observer)
  //     }
  //   });
  //   // return () => observer
  // }, []);

  return (
    <>
      <Head>
        <title>TikTok NEXT</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Video
          setisplaying={setisplaying}
          togglePlay={togglePlay}
          src={"1.mp4"}
          isplaying={isplaying}
        />
        <Video
          setisplaying={setisplaying}
          togglePlay={togglePlay}
          src={"2.mp4"}
          isplaying={isplaying}
        />
        <Video
          setisplaying={setisplaying}
          togglePlay={togglePlay}
          src={"3.mp4"}
          isplaying={isplaying}
        />
        <Video
          setisplaying={setisplaying}
          togglePlay={togglePlay}
          src={"4.mp4"}
          isplaying={isplaying}
        />
      </main>
    </>
  );
}
