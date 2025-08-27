import { getAllElements } from "./helpers/get-element";

export function changeActivePanel(targetID: string): void {
  const panelsList = Array.from(getAllElements(".panel"));

  const targetPanel = panelsList.find((panel) => panel.id === targetID);
  if (!targetPanel) {
    const panelsID = panelsList.map((panel) => panel.id);
    throw new Error(
      `Panel ID '${targetID}' not found. Available panel IDs: [${panelsID.join(", ")}]`,
    );
  }

  panelsList.forEach((panel) => {
    panel.classList.toggle("panel--active", panel.id === targetID);
  });
}
