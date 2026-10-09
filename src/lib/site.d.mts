export interface AyinlaPage {
  html: string;
  title: string;
  description: string;
  noindex: boolean;
  route: string;
}
export declare const sitePaths: string[];
export declare function renderPage(route: string): AyinlaPage;
export declare function escapeHTML(input: unknown): string;
