import type { App, TFile } from "obsidian";
import { SearchScope } from "src/types";

export interface ScopesApiV1 {
	searchScopes: SearchScope[];
	notesInScope: TFile[];
}

const dummyScope: SearchScope = {
	name: "dummy",
	searchString: "untitled",
	enabled: false,
};

export const scopesApiV1 = (app: App): ScopesApiV1 => {
	return {
		searchScopes: [dummyScope],
		// just get all notes in vault for now
		notesInScope: app.vault.getFiles(),
	};
};
