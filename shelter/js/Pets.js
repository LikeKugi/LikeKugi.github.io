var PETS;

(async function start() {
    PETS = await fetchCards()
})()

async function fetchCards() {
    try {
        let response = await fetch("https://rolling-scopes-school.github.io/likekugi-JSFE2023Q1/shelter/js/data.json");
        if (response.ok) {
            const ans = await response.json();
            return ans;
        } else {
            throw new Error('nodata')
        }
    } catch (e) {
        return false;
    }
}