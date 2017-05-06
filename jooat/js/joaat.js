function jenkinsOneAtATimeHashSigned(key){
    var keyLowered = key.toLowerCase();
    var length = keyLowered.length;
    var hash, i;

    for (hash = i = 0; i < length; i++){
        hash += keyLowered.charCodeAt(i);
        hash += (hash << 10);
        hash ^= (hash >>> 6);
    }

    hash += (hash << 3);
    hash ^= (hash >>> 11);
    hash += (hash << 15);

    return hash;
}

function convertToUnsigned(value){
    return (value >>> 0);
}

function onHashButtonClick() {
    var inputArea = document.getElementById("inputTextArea");
    var outputArea = document.getElementById("outputTextArea");

    var keyToHash = inputArea.value;

    var hashSigned = jenkinsOneAtATimeHashSigned(keyToHash);
    var hashUnsigned = convertToUnsigned(hashSigned);
    var hashHex = hashUnsigned.toString(16).toUpperCase();

    outputArea.value = "Signed: " + hashSigned + "\r\nUnsigned: " + hashUnsigned + "\r\nHex: 0x" + hashHex;
}