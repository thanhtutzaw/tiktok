import Head from "next/head";
import Image from "next/image";
import { MouseEvent, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
// import video from '../public/1.mp4'

const Video = ({ setisplaying, isplaying, src, togglePlay }: any) => {
  return (
    <div onClick={togglePlay} className={styles.videoContainer}>
      {isplaying ? <div className={styles.playState}>
          <span>
            Playing
          </span>
          </div> : (
        <div className={styles.playState}>
          <span>
            <img
              className={styles.playIcon}
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAAxElEQVRIie3WMWpCURBG4Q8FSRrtbC2SPhvICmzchVuwtXQLbsE2pVUIkjqQHVgqNmIj6EvxGHhFQAIvcxt/OPVhhrlzh3sKZ4MvTLLFVYNPvJYQB294LiGucMYSw2xxcMQcj9niYIsputni4BvjEuJgjZcS4goXrDDKFgcnLDDIFgd7zNDLFgfvTUHnL23ISJuV7iS3Ooarn1VxkeeUvkDSV2b6J3FQT+pDW8Jb4vRD4Kqe1Kf/Ev4mTj32PhQ6b+9pPT+XHgysHrPM6QAAAABJRU5ErkJggg=="
            />
          </span>
        </div>
      )}
      <video
        muted={true}
        loop={true}
        className={styles.item}
        onPlay={(e) => {
          setisplaying(true);
          // e.target.muted = false;
          // setisplaying(true);
        }}
        onPause={() => {
          // setisplaying(false)
          // setisplaying((prev: any) => !prev);
        }}
        // autoPlay={true}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
};

export default function Home() {
  const [isplaying, setisplaying] = useState(false);

  function togglePlay(e: MouseEvent<HTMLVideoElement>) {
    const target = e.target as HTMLVideoElement;
    // console.log(target.play())
    setisplaying((prev) => !prev);
    target.play();
    // target.muted = false;
    if (isplaying === true) {
      // target.muted = false;
      target.pause();
      // target.muted = true;
    }
  }
  useEffect(() => {
    
    // let videos = document.getElementsByClassName(
    //   "item"
    // ) as HTMLCollectionOf<HTMLDivElement>;
    // Array.from(videos).forEach((item) => {
    //   console.log(item);
    // });
    let videos = document.getElementsByTagName(
      "video"
    ) as HTMLCollectionOf<HTMLVideoElement>;
    Array.from(videos).forEach((video) => {
      let playPromise = video.play();
setisplaying(false);
      video.muted = true;
      if (playPromise !== undefined) {
        playPromise
          .then((_) => {
            let observer = new IntersectionObserver(
              (entries) => {
                entries.forEach((entry) => {
                  if (!entry.isIntersecting && entry.intersectionRatio !== 2) {
                    // if (!entry.isIntersecting) {
                    // setisplaying(false);
                    // console.log(entry)
                    // video.currentTime = 0;
                    // video.pause();
                    // video.currentTime = 0;
                    video.load();
                    video.muted = true;
                    // video.load()
                    // console.table({ src: video.currentSrc });
                    // setisplaying(false);
                    // video.removeAttribute("autoplay");
                    // video.removeAttribute('autoplay')
                    // video.style.opacity = '1'
                    // video.style.filter = "blur(20px)"
                    video.style.outline = "3px solid red";
                  } else if (entry.intersectionRatio === 2 && video.played) {
                    // video.pause()
                    // video.currentTime = 0;
                    // // video.load()
                    // // video.play()
                    // video.muted=false;
                  } else if (entry.intersectionRatio != 2) {
                    console.log({ Playing: video.currentSrc });
                    //  video.setAttribute("autoplay", "true");
                    // video.style.filter = "blur(0)";
                    video.style.outline = "0";

                    // video.load();
                    // video.currentTime = 0
                    // video.load();
                    video.play();
                    video.muted = false;
                    // video.currentTime = 0
                    // video.load();
                    setisplaying(true);

                    // video.currentTime
                    // if (video.paused) {
                    //   video.currentTime = 0;
                    //   video.load();
                    // }
                    // video.muted=false;
                    // video.muted = false;
                    // setisplaying(true);
                  }
                });
              },
              { root: document.body, threshold: 0.49 }
            );
            // } , {rootMargin:'-390px'})
            observer.observe(video);
          })
          .catch((err) => console.log(err));
      }
    });
  }, []);

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
