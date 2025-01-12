export function runCode (){
    console.log("Running Code on First Component Render")
    
    var iFrame = document.querySelector("#myIframe");

    iFrame.contentWindow.postMessage({
        eventType: 'triggerRun'
    }, "*");
   
}

export function populateCode(name){
    console.log("Populating Code  ......")
    const savedCode = localStorage.getItem(name);
  
    var iFrame = document.querySelector("#myIframe");
    console.log("Saved Code : ")    
    console.log(name)
    console.log(savedCode)

    if (savedCode) {
        console.log("Replacing Code.....")
        iFrame.contentWindow.postMessage({
                eventType: 'populateCode',
                language: "python",
                files: [
                {
                "name": name,
                "content": savedCode
                }
            ]
        }, "*");
    }
    

    iFrame.contentWindow.postMessage({
        eventType: 'triggerRun'
    }, "*");
    
    
}