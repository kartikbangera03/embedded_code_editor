const name ="main.py"

export function getStoredCode(){
    return localStorage.getItem(name)
} 

export function updateStoredCode(newCode){
    localStorage.setItem(name, newCode);
    return
}

export function loadSavedCode(e){
    const iFrame = document.querySelector("#embeddedIframe")
    const savedCode = getStoredCode();

    setTimeout(function(){
        iFrame.contentWindow.postMessage({
            eventType: 'populateCode',
            language: 'python',
            files: [
                {
                "name": name,
                "content": savedCode ? savedCode : "print('Hello, World!')"
                }
            ]
        }, "*");
    },200)
}





