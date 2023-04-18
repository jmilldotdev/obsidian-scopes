import * as React from "react";
import * as ReactDOM from "react-dom";

import { ItemView, WorkspaceLeaf } from "obsidian";
import { VIEW_TYPE_SCOPES_SETTINGS } from "../types";
import ScopesPlugin from "../main";
import { AppContext } from "src/ui/context";
import SettingsForm from "src/ui/SettingsForm";

export default class SettingsItemView extends ItemView {
	plugin: ScopesPlugin;
	constructor(leaf: WorkspaceLeaf, plugin: ScopesPlugin) {
		super(leaf);
		this.plugin = plugin;
	}

	getViewType(): string {
		return VIEW_TYPE_SCOPES_SETTINGS;
	}

	getDisplayText(): string {
		return "Scopes Interface";
	}

	getIcon(): string {
		return "check-small";
	}

	async onOpen(): Promise<void> {
		ReactDOM.render(
			<AppContext.Provider value={this.app}>
				<div className="obsidian-gpt">
					<SettingsForm plugin={this.plugin} />
				</div>
			</AppContext.Provider>,
			this.containerEl.children[1]
		);
	}
}
