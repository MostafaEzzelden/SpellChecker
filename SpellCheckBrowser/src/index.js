import { SpellcheckerWasm } from "spellchecker-wasm/lib/browser/index.js";

class SpellCheck {
    async initializeSpellchecker(callback) {
        const wasm = await fetch("file.php?name=spellchecker-wasm.wasm");
        const dictionary = await fetch(
            "file.php?name=frequency_dictionary_en_82_765.txt"
        );
        const bigramLocation = await fetch(
            "file.php?name=frequency_bigramdictionary_en_243_342.txt"
        ); // Optional

        const spellchecker = new SpellcheckerWasm(callback);
        await spellchecker.prepareSpellchecker(
            wasm,
            dictionary,
            bigramLocation
        );
        return spellchecker;
    }

    check(keyword, callback) {
        this.initializeSpellchecker(callback).then(spellchecker => {
            if (Array.isArray(keyword))
                keyword.forEach(word => spellchecker.checkSpelling(word));
            else spellchecker.checkSpellingCompound(keyword);
        });
    }
}

export default SpellCheck;
window.SpellCheck = SpellCheck;
