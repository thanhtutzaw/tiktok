import { useEffect, useMemo, useState } from 'react'

const useObserver = (options, targetRef) => {
    const [isVisibile, setIsVisible] = useState()

    const callbackFunction = entries => {
        const [entry] = entries //const entry = entries[0]
        setIsVisible(entry.isIntersecting)
    }

    const optionsMemo = useMemo(() => {
        return options
    }, [options])

    useEffect(() => {
        const currentTarget = targetRef.current
        // const playPromise = currentTarget.play()
        let observer = new IntersectionObserver(callbackFunction , optionsMemo)
        // currentTarget.muted = true;
        // if (!currentTarget) return;
        
        if (currentTarget) {
            observer?.observe(currentTarget)
            // console.log(currentTarget)
        }
        // const playPromise = currentTarget.play()
        // if (playPromise != undefined){
            
        //     playPromise.then().catch((err)=>{console.log("hey error "+err)})
        // }

        return () => {
            if (currentTarget) observer?.unobserve(currentTarget)
        }
    }, [targetRef, options])

    // useEffect(() => {
    //     const currentTarget = targetRef.current
    //     const playPromise = currentTarget.play()
        
    //     // currentTarget.muted = true;
    //     // if (!currentTarget) return;
    //     if(playPromise != undefined){
    //         // console.log(playPromise)
    //         playPromise.then((_)=>{
    //            let observer = new IntersectionObserver((entries) => {
    //                 entries.forEach((entry) => {
    //                     setIsVisible(entry.isIntersecting)
    //                     if(entry.isIntersecting){
    //                         // currentTarget.play()
    //                     }
    //                 })
    //             }

    //                 , optionsMemo)
    //             if (currentTarget) observer?.observe(currentTarget)
    //         }).catch(err => {
    //             // currentTarget.removeAttribute('muted')
    //             // let observer = new IntersectionObserver((entries) => {
    //             //     entries.forEach((entry) => {
    //             //         setIsVisible(entry.isIntersecting)
    //             //         if (entry.isIntersecting) {
    //             //             // currentTarget.play()
    //             //         }
    //             //     })
    //             // }

    //             // Autoplay was prevented.
    //             // setIsVisible(entry.isIntersecting)
                
    //             // currentTarget.play();
    //             // currentTarget.muted = true;
    //         });
            
    //         // console.log(currentTarget.currentSrc)
            
    //     }
    //     // observer?.observe(currentTarget)

    //     // return () => {
    //     //     if (currentTarget) observer?.unobserve(currentTarget)
    //     // }
    // }, [targetRef, options])

    return isVisibile
}

export default useObserver 