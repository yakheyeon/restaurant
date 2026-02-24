const CORRECT_PIN = "7564";
let pin = "";
let history = [];

function show(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function move(id) {
    const cur = document.querySelector('.screen.active')?.id;
    if (cur) history.push(cur);
    show(id);
}

function goBack() {
    show(history.pop());
}

/* 메뉴 */
function selectMenu1(v) {
    v === 'set' ? move('menu2') : move('error');
}

function selectMenu2(v) {
    v === 'birthday' ? move('pin') : move('error');
}

/* PIN */
function pressKey(n) {
    if (pin.length >= 4) return;
    pin += n;
    updateDots();
}

function deleteKey() {
    pin = pin.slice(0, -1);
    updateDots();
}

function updateDots() {
    const dots = document.querySelectorAll('.pin-dots span');
    dots.forEach((d, i) => d.classList.toggle('filled', i < pin.length));
    document.getElementById('submitBtn').disabled = pin.length !== 4;
}

function submitPin() {
    pin === CORRECT_PIN ? (pin = "", move('nfc'), startNFC()) : (pin = "", updateDots(), move('pinError'));
}

/* NFC */
async function startNFC() {
    const text = document.getElementById('nfcText');
    if (!('NDEFReader' in window)) {
        move('fail'); return;
    }

    try {
        const nfc = new NDEFReader();
        await nfc.scan();
        text.innerText = "카드를 태그해주세요";

        nfc.onreading = () => {
            navigator.vibrate?.(80);
            move('success');
        };
    } catch {
        move('fail');
    }

}
