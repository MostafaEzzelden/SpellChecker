const SpellcheckerWasm = require("spellchecker-wasm").SpellcheckerWasm;
const wasmPath = require.resolve(
    "spellchecker-wasm/lib/spellchecker-wasm.wasm"
);
const dictionaryLocation = require.resolve(
    "spellchecker-wasm/lib/frequency_dictionary_en_82_765.txt"
);
// Optional bigram support for compound lookups - add only when needed
const bigramLocation = require.resolve(
    "spellchecker-wasm/lib/frequency_bigramdictionary_en_243_342.txt"
);

const spellchecker = new SpellcheckerWasm(resultHandler);

spellchecker
    .prepareSpellchecker(wasmPath, dictionaryLocation, bigramLocation)
    .then(() => {
        [
            "tiss",
            "gves",
            "practiclly",
            "instent",
            "relevent",
            "resuts"
        ].forEach(word => spellchecker.checkSpelling(word));
        spellchecker.checkSpellingCompound("tiss cheks th entir sentance");
    });

function resultHandler(results) {
    // Results are given in the same order they are sent.
    // The most relevant results are order lower in the results index.
    results.map(r => console.log("Results : ", r.term));
    // process.stdout.write(results.map(r => r.term));
}
