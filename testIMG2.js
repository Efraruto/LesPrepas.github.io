async function test() {
    const r = await fetch('https://pollinations.ai/p/cat');
    console.log('Status:', r.status);
    console.log('Headers:', r.headers.get('content-type'));
}
test();
