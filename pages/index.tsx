import Head from "next/head";
import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import styles from "../styles/Home.module.css";
import useObserver from "../hooks/useObserver";
import Spinner from "../components/Spinner/Spinner";

const Video = ({ setisplaying, isplaying, src, togglePlay }: any) => {
  let options;

  options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const isVisibile = useObserver(options, videoRef);
  const [loading, setloading] = useState(false);
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
      console.log(video.currentSrc);
      video.play()
      // if (!isplaying) {
      // video.play();
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
    // target.pause();
    if(!loading){
      setisplaying((prev: any) => !prev);
    }
    // if(isplaying === false){
    //   setloading(false)
    // }else{
    //   setloading(true)
    // }

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
      <div
        style={{ display: isplaying ? "none" : "block" }}
        className={styles.playState}
      >
        <span>
          <img
            className={styles.playIcon}
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAAxElEQVRIie3WMWpCURBG4Q8FSRrtbC2SPhvICmzchVuwtXQLbsE2pVUIkjqQHVgqNmIj6EvxGHhFQAIvcxt/OPVhhrlzh3sKZ4MvTLLFVYNPvJYQB294LiGucMYSw2xxcMQcj9niYIsputni4BvjEuJgjZcS4goXrDDKFgcnLDDIFgd7zNDLFgfvTUHnL23ISJuV7iS3Ooarn1VxkeeUvkDSV2b6J3FQT+pDW8Jb4vRD4Kqe1Kf/Ev4mTj32PhQ6b+9pPT+XHgysHrPM6QAAAABJRU5ErkJggg=="
          />
        </span>
      </div>

      <Spinner loading={loading} isplaying={isplaying} />

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
        onCanPlay={(e) => {
          const video = e.target as HTMLVideoElement;
          if (video.videoHeight == 720) {
            video.style.backgroundColor = "black";
          }
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
    // target.play();
    // target.muted = false;
    if (isplaying === true) {
      // target.pause();
      // target.muted = true;
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
        if (!isplaying) {
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
      <div className={styles.navBar}>
        <svg
          // width="500px"
          height="60px"
          viewBox="0 -560 1920 1920"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0-2.48h1920v804.95H0z" />
          <g fill="#ee1d52">
            <path d="M300 498.32l1.64 4.63c-.26-.53-.86-2.15-1.64-4.63zM223.84 465.39c2.88-24.87 12.66-38.8 31.09-53.08 26.37-19.34 59.31-8.4 59.31-8.4V339a136.78 136.78 0 0 1 23.94 1.49V424s-32.93-10.94-59.3 8.4c-18.42 14.28-28.22 28.22-31.09 53.09-.09 13.52 2.34 31.18 13.53 46.45q-4.15-2.22-8.46-5.06c-24.65-17.27-29.14-43.17-29.02-61.49zM474.19 219c-18.14-20.74-25-41.68-27.48-56.39h22.82s-4.55 38.57 28.61 76.5l.46.51A132.76 132.76 0 0 1 474.19 219z" />
            <path d="M584.12 277.81v81.83s-29.12-1.18-50.67-6.91c-30.09-8-49.43-20.26-49.43-20.26s-13.36-8.76-14.44-9.36v169.05c0 9.4-2.47 32.9-10 52.51-9.83 25.64-25 42.47-27.79 45.9 0 0-18.45 22.76-51 38.08-29.34 13.82-55.1 13.47-62.8 13.82 0 0-44.53 1.84-84.6-25.34a168.5 168.5 0 0 1-24.16-20.25l.2.14c40.08 27.18 84.6 25.34 84.6 25.34 7.71-.35 33.47 0 62.8-13.82 32.53-15.32 51-38.08 51-38.08 2.76-3.43 18-20.26 27.79-45.91 7.51-19.6 10-43.1 10-52.51V303c1.08.61 14.44 9.37 14.44 9.37s19.34 12.28 49.43 20.26c21.56 5.72 50.67 6.91 50.67 6.91v-64.12c9.96 2.33 18.45 2.97 23.96 2.39z" />
          </g>
          <path
            d="M560.17 275.42v64.11s-29.11-1.19-50.67-6.91c-30.09-8-49.43-20.26-49.43-20.26s-13.36-8.76-14.44-9.37V472c0 9.41-2.47 32.91-10 52.51-9.83 25.65-25 42.48-27.79 45.91 0 0-18.45 22.76-51 38.08-29.33 13.82-55.09 13.47-62.8 13.82 0 0-44.52 1.84-84.6-25.34l-.2-.14a159 159 0 0 1-11.93-13.52c-12.79-16.28-20.63-35.51-22.6-41a.14.14 0 0 1 0-.07c-3.18-9.55-9.84-32.45-8.93-54.64 1.61-39.16 14.81-63.18 18.3-69.21a162.85 162.85 0 0 1 35.54-43.4 147.9 147.9 0 0 1 42.22-25 143.89 143.89 0 0 1 29.78-8.75 146.31 146.31 0 0 1 22.62-2.25v64.87s-32.94-10.94-59.31 8.4c-18.43 14.28-28.21 28.21-31.09 53.08-.12 18.32 4.37 44.22 29 61.51q4.3 2.85 8.46 5.06a66 66 0 0 0 15.49 15c24.06 15.89 44.22 17 70 6.68 17.21-6.81 30.1-22.36 36.21-39.6 3.77-10.76 3.72-21.6 3.72-32.79V162.62h60c2.48 14.71 9.34 35.65 27.48 56.39a132.76 132.76 0 0 0 24.41 20.62c2.64 2.85 16.14 16.93 33.47 25.59a130 130 0 0 0 28.09 10.2z"
            fill="#fff"
          />
          <path
            d="M150.83 522.39v.06l1.48 4.21c-.16-.49-.72-1.98-1.48-4.27z"
            fill="#69c9d0"
          />
          <path
            d="M261.84 350a147.9 147.9 0 0 0-42.22 25 162.85 162.85 0 0 0-35.52 43.49c-3.49 6-16.69 30.05-18.3 69.21-.91 22.19 5.75 45.09 8.93 54.64a.14.14 0 0 0 0 .07c2 5.44 9.81 24.67 22.6 41a159 159 0 0 0 11.93 13.52 166.64 166.64 0 0 1-35.88-33.64c-12.68-16.13-20.5-35.17-22.54-40.79l-.05-.12v-.08c-3.18-9.52-9.86-32.44-8.93-54.66 1.61-39.16 14.81-63.18 18.3-69.21a162.69 162.69 0 0 1 35.52-43.49 147.66 147.66 0 0 1 42.22-25 143.89 143.89 0 0 1 29.78-8.75 147.69 147.69 0 0 1 46.57-.69V339a146.31 146.31 0 0 0-22.62 2.18 143.89 143.89 0 0 0-29.79 8.82z"
            fill="#69c9d0"
          />
          <path
            d="M446.71 162.62h-60v318.61c0 11.19.05 22-3.72 32.79-6.06 17.22-18.95 32.77-36.13 39.67-25.79 10.36-45.95 9.21-70-6.68a66 66 0 0 1-15.49-15c20.49 10.93 38.83 10.74 61.55 1.62C340 526.68 353 511.13 359 493.9c3.78-10.76 3.73-21.6 3.73-32.78V142.49h82.85s-.94 7.93 1.13 20.13zM560.17 257.7v17.72a130 130 0 0 1-28.1-10.2c-17.33-8.66-30.83-22.74-33.47-25.59a91.78 91.78 0 0 0 9.52 5.47c21.07 10.52 41.77 13.67 52.05 12.6z"
            fill="#69c9d0"
          />
          <path
            d="M1448.72 437.3a46.08 46.08 0 0 1-2-13.45v-.33a49.68 49.68 0 0 0 2 13.78zM1547.91 423.52v.33a46.41 46.41 0 0 1-2 13.45 50.82 50.82 0 0 0 2-13.78z"
            fill="none"
          />
          <path
            d="M1446.72 423.85a46.08 46.08 0 0 0 2 13.45 7.91 7.91 0 0 0 .28.91 50.58 50.58 0 0 0 48.32 35.59V525c-24.91 0-42.76.87-69.91-15.19-31-18.32-48.42-51.82-48.42-86.61 0-35.86 19.48-71.81 52.51-89.12 23.94-12.56 42.16-12.65 65.82-12.65v51.17a50.61 50.61 0 0 0-50.6 50.6z"
            fill="#69c9d0"
          />
          <path
            d="M1548.31 423.85a45.75 45.75 0 0 1-2 13.45 6.33 6.33 0 0 1-.28.91 50.56 50.56 0 0 1-48.32 35.59V525c24.92 0 42.76.87 69.91-15.19 31-18.32 48.43-51.82 48.43-86.61 0-35.86-19.49-71.81-52.51-89.12-23.94-12.56-42.17-12.65-65.83-12.65v51.17a50.61 50.61 0 0 1 50.61 50.6z"
            fill="#ee1d52"
          />
          <path
            d="M714.06 275h187.41l-17.32 51.57h-49v197.34h-60.37V326.57h-60.72zm496.7 0v51.57h60.72v197.34h60.33V326.57h49l17.36-51.57zm-268.52 58.77a29.19 29.19 0 1 0-29.19-29.19 29.19 29.19 0 0 0 29.19 29.19zM913 523.91h59.17V354.4H913zm272-191.6h-69.18L1056.19 392V275.19h-58.77l-.2 248.72h59.36V459.1l18.49-16.73 57.6 81.54h63.45l-83.44-119.25zm567.54 72.35l72.35-72.35h-69.18L1696.08 392V275.19h-58.78l-.19 248.72h59.36V459.1l18.53-16.73 57.61 81.54H1836zm-152.1 18.54c0 56.21-46.18 101.78-103.15 101.78s-103.14-45.57-103.14-101.78 46.18-101.78 103.14-101.78S1600.46 367 1600.46 423.2zm-52.55 0a50.6 50.6 0 1 0-50.6 50.6 50.59 50.59 0 0 0 50.62-50.6z"
            fill="#fff"
          />
        </svg>
      </div>
    </>
  );
}
