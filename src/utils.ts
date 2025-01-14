import { TFile } from "obsidian";

export class Utils {

	static async delay(ms: number) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}


	static normalizePathForFile(path: string): string {
		path = path.replace(/\\/gi, "/"); //replace \ to /
		path = path.replace(/%20/gi, " "); //replace %20 to space
		return path;
	}


	static normalizePathForLink(path: string): string {
		path = path.replace(/\\/gi, "/"); //replace \ to /
		path = path.replace(/ /gi, "%20"); //replace space to %20
		return path;
	}

	static normalizeLinkSection(section: string): string {
		section = decodeURI(section);
		return section;
	}

	static async getCacheSafe(fileOrPath: TFile | string) {
		const file = Utils.getFile(fileOrPath);

		while (true) {
			const cache = app.metadataCache.getFileCache(file);
			if (cache) {
				return cache;
			}
	
			await Utils.delay(100);
		}
	}

	static getFile(fileOrPath: TFile | string) {
		if (fileOrPath instanceof TFile) {
			return fileOrPath;
		}

		const abstractFile = app.vault.getAbstractFileByPath(fileOrPath);
		if (!abstractFile) {
			throw `File ${fileOrPath} does not exist`;
		}

		if (!(abstractFile instanceof TFile)) {
			throw `${fileOrPath} is not a file`;
		}

		return abstractFile;
	}
}