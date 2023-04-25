const myKey = '3ded58be2f421f600208787da4b53cac';
const novaData = Date.parse(new Date().toISOString());
let controller = null;

var hash = md5(`${novaData}27dcf7b50e6505b4b19c42dc5b6220826c78f71a3ded58be2f421f600208787da4b53cac`);

let data = {
  "apikey": myKey,
  "ts": novaData,
  "hash": hash
}

async function reqGeneric (param) {
  if (controller !== null) {
    controller.abort();
  }

  controller = new AbortController();

  const response = await fetch(`https://gateway.marvel.com/v1/public/${param}&ts=${novaData}&apikey=${myKey}&hash=${hash}`);
  const result = await response.json();
  return result;
}

async function reqLink (params) {
  const response = await fetch(`${params}ts=${novaData}&apikey=${myKey}&hash=${hash}`);
  const result = await response.json();
  return result;
}