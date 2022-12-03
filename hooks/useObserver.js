import { useEffect, useMemo, useState } from 'react'

const useObserver = (options, targetRef) => {
    const [isVisibile, setIsVisible] = useState()

    // const callbackFunction = entries => {
    //     const [entry] = entries //const entry = entries[0]
    //     // console.log(entry)
    //     setIsVisible(entry.isIntersecting === true)
    // }

    const optionsMemo = useMemo(() => {
        return options
    }, [options])

    useEffect(() => {
        const currentTarget = targetRef.current
        const playPromise = currentTarget.play()
        
        // currentTarget.muted = true;
        // if (!currentTarget) return;
        if(playPromise != undefined){
            // console.log(playPromise)
            playPromise.then((_)=>{
               let observer = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                        setIsVisible(entry.isIntersecting)
                        if(entry.isIntersecting){
                            // currentTarget.play()
                        }
                    })
                }

                    , optionsMemo)
                if (currentTarget) observer?.observe(currentTarget)
            }).catch(err => {
                // Autoplay was prevented.

                // currentTarget.muted = true;
                // currentTarget.play();
            });
            
            // console.log(currentTarget.currentSrc)
            
        }

        // return () => {
        //     if (currentTarget) observer?.unobserve(currentTarget)
        // }
    }, [targetRef, options])

    return isVisibile
}

export default useObserver 