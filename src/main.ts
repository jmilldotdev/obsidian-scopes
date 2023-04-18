import { Plugin, WorkspaceLeaf } from "obsidian";
import { scopesApiV1 } from "src/api";
import { VIEW_TYPE_SCOPES_SETTINGS } from "src/types";
import SettingsItemView from "src/ui/SettingsItemView";

export default class ScopesPlugin extends Plugin {
	api = scopesApiV1(this.app);

	delay(waittimeInMilliseconds: number) {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(2);
			}, waittimeInMilliseconds);
		});
	}

	async getSearch(someSearchQuery: string) {
		// @ts-ignore
		this.app.internalPlugins
			.getPluginById("global-search")
			.instance.openGlobalSearch(someSearchQuery);
		await this.delay(5000);
		let searchResults =
			// @ts-ignore
			this.app.workspace.getLeavesOfType("search")[0].view.dom.resultDoms;
		console.log(searchResults);
	}

	initLeaf(): void {
		if (
			this.app.workspace.getLeavesOfType(VIEW_TYPE_SCOPES_SETTINGS).length
		) {
			return;
		}
		this.app.workspace.getRightLeaf(false).setViewState({
			type: VIEW_TYPE_SCOPES_SETTINGS,
		});
	}

	ensureLeafExists(active: boolean = false): void {
		let { workspace } = this.app;

		let preferredSidebar = "right";

		let leaf: WorkspaceLeaf;
		let existingPluginLeaves = workspace.getLeavesOfType(
			VIEW_TYPE_SCOPES_SETTINGS
		);

		if (existingPluginLeaves.length > 0) {
			leaf = existingPluginLeaves[0];
		} else {
			leaf =
				preferredSidebar === "left"
					? workspace.getLeftLeaf(false)
					: workspace.getRightLeaf(false);
			workspace.revealLeaf(leaf);
			leaf.setViewState({ type: VIEW_TYPE_SCOPES_SETTINGS });
		}

		if (active) {
			workspace.setActiveLeaf(leaf);
		}
	}

	async onload() {
		this.registerView(
			VIEW_TYPE_SCOPES_SETTINGS,
			(leaf: WorkspaceLeaf) => new SettingsItemView(leaf, this)
		);

		this.addCommand({
			id: "show-scopes-interface",
			name: "Show Scopes Interface",
			callback: () => {
				this.ensureLeafExists(true);
			},
		});

		this.app.workspace.onLayoutReady(() => {
			this.ensureLeafExists(false);
		});
	}

	onunload() {}
}
