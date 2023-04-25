const key = 'f278623f5a5facc83a72';


async function translateMyMemory (textToTranslate) {
    const response = await fetch(`https://api.mymemory.translated.net/get?q=${textToTranslate}&langpair=en|pt-br&key=${key}`);
    const result = await response.json();
    return result;
}
