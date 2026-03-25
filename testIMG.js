async function test() {
    const r = await fetch('https://image.pollinations.ai/prompt/cat');
    console.log('Status:', r.status);
    console.log('Headers:', r.headers.get('content-type'));
}
test();
