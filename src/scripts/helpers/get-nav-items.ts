import { getAllElements } from "./get-element";

export function getNavItems(navElement: HTMLElement) {
  const panelsList = getAllElements(".panel");
  const panelsNavRecord: Record<string, string> = {};

  if (!navElement.childElementCount)
    throw new Error(`${navElement} does not have children`);

  Array.from(panelsList).map((panel, index) => {
    if (!panel.id) throw new Error(`${panel} has no ID`);

    const item = navElement.children[index];

    if (!item) return;
    panelsNavRecord[item.id] = panel.id;
  });

  return panelsNavRecord;
}
