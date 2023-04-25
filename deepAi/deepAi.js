const api_key = 'e53654d4-fd82-4b9e-aa08-0fa46b93877b';

deepai.setApiKey('e53654d4-fd82-4b9e-aa08-0fa46b93877b');



async function generatorImgHero (textGenerate, nameHero) {
    const Data = `text=${textGenerate}, ${nameHero} é um personagem da marvel.&grid_size=1&negative_prompt=bad anatomy,bad proportions,
                blurry, cloned face, cropped, deformed, dehydrated, disfigured, duplicate,
                error, extra arms, extra fingers, extra legs, extra limbs, fused fingers,
                gross proportions, jpeg artifacts, long neck, low quality, lowres, malformed limbs,
                missing arms, missing legs, morbid, mutated hands, mutation, mutilated, out of frame,
                poorly drawn face, poorly drawn hands, signature, text, too many fingers, ugly, username,
                watermark, worst quality`;

    const resp = await fetch('https://api.deepai.org/api/text2img', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded',
                                    'api-key': api_key,
                                },
                                body: Data
                            })
    const result = await resp.json();
    return result;
}
